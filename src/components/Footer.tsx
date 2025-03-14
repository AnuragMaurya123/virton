import { importantlinks1, importantlinks2, socialimg } from "@/constant";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12 w-full text-white">
      {/* Main Content Section */}
      <div className="mx-6 py-10 md:text-left">
        <div className="flex-col lg:flex-row md:flex-row items-start grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* About Section */}
          <div className="lg:w-96">
            {/* Logo */}
            <img src="/logo.png" alt="Company Logo" />
            {/* About Description */}
            <p className="text-sm sm:text-base mb-8">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum, eligendi, voluptatibus deleniti ipsum officiis alias ex impedit.
            </p>
            {/* Social Media Icons */}
            <div className="flex items-center gap-4">
              {socialimg.map((social, index) => (
                <img
                  key={index}
                  src={social.image}
                  className="w-6 h-6 md:w-8 md:h-8"
                  alt="Social Icon"
                />
              ))}
            </div>
          </div>

          {/* Links Section */}
          <div className="flex-col md:flex-row items-start justify-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* First Set of Links */}
            <div className="flex flex-col items-start justify-center">
              <h6 className="mb-4 flex justify-center font-bold uppercase md:justify-start text-lg sm:text-xl">
                Important Links
              </h6>
              {importantlinks1.map((link, index) => (
                <Link
                  key={index}
                  to={link.link}
                  className="mb-2 text-sm sm:text-base"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Second Set of Links */}
            <div className="flex flex-col items-start justify-center">
              <h6 className="mb-4 flex justify-center font-bold uppercase md:justify-start text-lg sm:text-xl">
                Important Links
              </h6>
              {importantlinks2.map((link, index) => (
                <Link
                  key={index}
                  to={link.link}
                  className="mb-2 text-sm sm:text-base"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-8 border-neutral-300 dark:border-neutral-600" />

      {/* Footer Bottom Section */}
      <div className="flex flex-col items-center gap-4 justify-center">
        {/* Copyright Text */}
        <div className="text-sm sm:text-base">
          Copyright © 2025. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
