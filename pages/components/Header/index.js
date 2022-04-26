import React from "react";
import Image from "next/image";
import Link from "next/link";

function Header({ darkNav = false }) {
  return (
    <header>
      <div className="flex justify-between p-20">
        <div className="logo">
          <Link href={"/"}>
            <a>
              <Image
                src={darkNav ? "/logo.svg" : "/logo_white.svg"}
                layout="fill"
                alt="Dorfschule Logo"
                objectFit="contain"
              />
            </a>
          </Link>
        </div>
        <div className={`nav ${darkNav ? "dark" : ""}`}>
          <Link href={"/informationen"}>
            <span>Informationen</span>
          </Link>
          <Link href={"/gallerie"}>
            <span>Gallerie</span>
          </Link>
          <Link href={"/verein"}>
            <span>Verein</span>
          </Link>
          <Link href={"/kontakt"}>
            <span>Kontakt</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
