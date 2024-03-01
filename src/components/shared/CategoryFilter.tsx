"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllCategories } from "@/lib/actions/category.actions";
import { ICategory } from "@/lib/database/models/category.model";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
const CategoryFilter = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllCategories();

      categoryList && setCategories(categoryList as ICategory[]);
    };
    getCategories();
  }, []);

  //search api call with debouncing

  const onSelectCategory = (value: string) => {
    let newUrl;
    // category present and it is not equal to All
    if (value && value !== "All") {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "category",
        value: value,
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["category"],
      });
    }

    // scroll : false is set to disable browser to scroll to the top of the screen
    router.push(newUrl, { scroll: false });
  };
  return (
    <Select onValueChange={(value: string) => onSelectCategory(value)}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem className="select-item p-regular-14" value="All">
          All
        </SelectItem>
        {categories?.map((category) => (
          <SelectItem
            className="select-item p-regular-14"
            value={category?.name}
            key={category._id}
          >
            {category?.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
export default CategoryFilter;
