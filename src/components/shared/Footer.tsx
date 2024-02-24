import Image from "next/image";
import Link from "next/link";

type Props = {};
const Footer = (props: Props) => {
  return (
    <footer className="border-t">
      <div className="wrapper flex-between flex-col gap-4 text-center sm:flex-row">
        <Link href={"/"}>
          <Image
            src={"/assets/images/logo.svg"}
            alt="logo"
            width={138}
            height={38}
          />
        </Link>
        <p className="p-medium-16">
          {" "}
          {new Date().getFullYear()} &copy; Evently. All Rights Reserved.
        </p>{" "}
      </div>
    </footer>
  );
};
export default Footer;
