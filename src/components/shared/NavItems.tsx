"use client";
import { headerLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavItems = () => {
  const pathname = usePathname();

  return (
    <ul className="flex md:flex-between flex-col w-full items-start gap-5 md:flex-row">
      {headerLinks?.map((link) => {
        return (
          <li
            key={link?.route}
            className={`${
              pathname === link?.route && "text-primary-500"
            } flex-center p-medium-16 whitespace-nowrap`}
          >
            <Link href={link?.route}>{link?.label}</Link>
          </li>
        );
      })}
    </ul>
  );
};
export default NavItems;
