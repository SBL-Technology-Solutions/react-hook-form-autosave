import { Menu } from "lucide-react";
import Link from "next/link";
import { Navbar } from "./Navbar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/Sheet";

export const Header = () => {
  return (
    <header className=" flex justify-between items-center p-4">
      <Link className="text-white font-semibold text-lg" href="/">
        React Hook Form Autosave
      </Link>
      <Navbar className="md:flex space-x-6 items-center text-sm hidden" />
      <Sheet>
        <SheetTrigger className="md:hidden">
          <Menu className="h-8 w-8" />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>React Hook Form AutoSave</SheetTitle>
          </SheetHeader>
          <Navbar className="flex flex-col space-y-4 my-8" />
        </SheetContent>
      </Sheet>
    </header>
  );
};
