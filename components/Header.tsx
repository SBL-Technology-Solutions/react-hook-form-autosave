import githubLogo from "@/public/githubLogo.svg";
import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  return (
    <header className=" flex justify-between items-center p-4">
      <Link
        className="text-white font-semibold text-lg"
        href="/examples/autosave-with-hook"
      >
        React Hook Form Autosave
      </Link>
      <nav className="flex space-x-6 items-center text-sm">
        <Link className="text-white hover:text-gray-300" href="/examples/basic">
          Basic
        </Link>
        <Link
          className="text-white hover:text-gray-300"
          href="/examples/autosave-without-hook"
        >
          AutoSave Without Hook
        </Link>
        <Link
          className="text-white hover:text-gray-300"
          href="/examples/autosave-with-hook"
        >
          AutoSave With Hook
        </Link>
      </nav>
      <a
        href="https://github.com/SBL-Technology-Solutions/react-hook-form-autosave"
        target="_blank"
        rel="noreferrer"
      >
        <Image src={githubLogo} alt="Github Logo" className="h-8 w-8" />
      </a>
    </header>
  );
};
