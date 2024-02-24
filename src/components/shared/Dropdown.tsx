"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ICategory } from "@/lib/database/models/category.model";
import { startTransition, useEffect, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "../ui/input";
import {
  createCategory,
  getAllCategories,
} from "@/lib/actions/category.actions";

type Props = {
  value?: string;
  onChange?: () => void;
};

const Dropdown = ({ onChange, value }: Props) => {
  // state to store categories from DB
  const [categories, setCategories] = useState<ICategory[]>([]);
  //   State to store new category to add
  const [newCategory, setNewCategory] = useState<string>("");

  //add category
  const handleAddCategory = () => {
    createCategory({ categoryName: newCategory?.trim() }).then((category) => {
      setCategories((prev) => [...prev, category]);
    });
  };

  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllCategories();

      categoryList && setCategories(categoryList as ICategory[]);
    };
    getCategories();
  }, []);

  return (
    <Select onValueChange={onChange} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue className="text-grey-500" placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {categories?.length > 0 &&
          categories?.map((category) => (
            <SelectItem
              key={category?._id}
              value={category?._id}
              className="select-item p-regular-16"
            >
              {category?.name}
            </SelectItem>
          ))}
        {/* Alert for adding new category */}
        <AlertDialog>
          <AlertDialogTrigger className="p-medium-14 flex w-full text-primary-500 hover:bg-primary-50 focus:text-primary-500 rounded-sm py-3 pl-8">
            Add New Category
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>New Category</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  type="text"
                  placeholder="Category name"
                  className="input-field mt-3"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e?.target?.value)}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                //   To process in backend : avoid blocking of UI : not urgetn
                onClick={() => startTransition(handleAddCategory)}
              >
                Save
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
};
export default Dropdown;
