import sblLogo from "@/public/sblLogo.svg";
import Image from "next/image";

export const Footer = () => {
  return (
    <div className="flex justify-center">
      <a
        href="https://www.sbltechsolutions.com/"
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-2 text-white text-xl font-semibold"
      >
        <Image
          src={sblLogo}
          alt="SBL Technology Solutions Logo"
          className="h-12 w-12"
        />
        SBL Technology Solutions
      </a>
    </div>
  );
};
