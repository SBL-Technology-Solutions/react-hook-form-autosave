import githubLogo from "@/public/githubLogo.svg";
import Image from "next/image";
import Link from "next/link";

export const Navbar = ({ className }: React.ComponentProps<"nav">) => {
  return (
    <nav className={className}>
      <Link className="text-white hover:text-gray-300" href="/examples/basic">
        Basic
      </Link>
      <Link
        className="text-white hover:text-gray-300"
        href="/examples/autosave-without-hook"
      >
        AutoSave Without Hook
      </Link>
      <Link className="text-white hover:text-gray-300" href="/">
        AutoSave With Hook
      </Link>
      <a
        href="https://github.com/SBL-Technology-Solutions/react-hook-form-autosave"
        target="_blank"
        rel="noreferrer"
      >
        <Image src={githubLogo} alt="Github Logo" className="h-8 w-8" />
      </a>
    </nav>
  );
};
