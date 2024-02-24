"use server";

import { CreateUserParams, UpdateUserParams } from "@/types";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";
import Event from "../database/models/event.module";
import Order from "../database/models/order.model";
import { revalidatePath } from "next/cache";

export const createUser = async (userData: CreateUserParams) => {
  try {
    await connectToDatabase();

    const newUser = await User.create(userData);

    // to convert mongo db document to normal object
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
};

export async function getUserById(userId: string) {
  try {
    await connectToDatabase();

    const user = await User.findById(userId);

    if (!user) throw new Error("User not found");
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}

export const updateUser = async (clerkId: string, user: UpdateUserParams) => {
  try {
    await connectToDatabase();

    //     new : true --- To send the updated user
    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });

    if (!updatedUser) throw new Error("User update Failed");
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
};

export const deleteUser = async (clerkId: string) => {
  try {
    await connectToDatabase();

    const userToDelete = await User.findOne({ clerkId });
    if (!userToDelete) throw new Error("User not found");

    await Promise.all([
      // Update the events collection to remove reference to the user
      Event.updateMany(
        // Matches all the event documents created by that user
        { _id: { $in: userToDelete.events } },
        //removing the references to that deleted user
        { $pull: { organizer: userToDelete?._id } }
      ),

      // Update the order collection to remove references to the user
      Order.updateMany(
        { _id: { $in: userToDelete.orders } },
        // removing buyer field from the document
        { $unset: { buyer: 1 } }
      ),

      /*In summary, $unset is used to remove a specific field from 
      documents, while $pull is used to remove specific values 
      from an array field in documents. */
    ]);

    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    handleError(error);
  }
};
