import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { GoogleLogout, GoogleLogin } from "react-google-login";
import { IoMdAdd } from "react-icons/io";

const Navbar = () => {
  return (
    <div>
      <Link>
        <div>
          <Image className="cursor-pointer" />
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
