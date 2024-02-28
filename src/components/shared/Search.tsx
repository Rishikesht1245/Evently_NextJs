"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

const Search = ({ placeholder }: { placeholder: string }) => {
  const [query, setQuery] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  //search api call with debouncing

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let newUrl;
      if (query) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "query",
          value: query,
        });
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["query"],
        });
      }

      router.push(newUrl, { scroll: false });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, router, searchParams]);
  return (
    <div className="flex-center min-h-[54px] w-full rounded-full bg-grey-50 px-4 py-2">
      <Image
        src="/assets/icons/search.svg"
        alt="Search"
        width={24}
        height={24}
      />
      <Input
        type="text"
        placeholder={placeholder}
        className="p-regular-16 bg-grey-50 border-0 placeholder:text-grey-500 outline-none focus:outline-none focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        onChange={(e) => setQuery(e?.target?.value)}
      />
    </div>
  );
};
export default Search;
