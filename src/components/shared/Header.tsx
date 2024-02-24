import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";

type Props = {};
const Header = (props: Props) => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex items-center justify-between">
        <Link className="w-36" href={"/"}>
          <Image
            src={"/assets/images/logo.svg"}
            width={128}
            height={38}
            alt="Evently logo"
          />
        </Link>

        <SignedIn>
          {/* Wrapped in signed in : to show only when user is authenticated */}
          <nav className="md:flex-between hidden w-full max-w-xs">
            <NavItems />
          </nav>
        </SignedIn>

        {/* Authentication using Clerk */}
        <div className="flex w-32 justify-end gap-3 pe-2">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
            {/* For small screens */}
            <MobileNav />
          </SignedIn>
          <SignedOut>
            <Button className="rounded-full" asChild size={"lg"}>
              <Link href={"/sign-in"}>Login</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};
export default Header;
