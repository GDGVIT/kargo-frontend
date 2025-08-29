"use client";

import React from "react";
import Link from "next/link";
import { MdArrowForwardIos } from "react-icons/md";
import { usePathname } from "next/navigation";

const Breadcrumbs: React.FC = () => {
  const pathname = usePathname();
  const pathSegments =
    typeof pathname === "string" ? pathname.split("/").filter(Boolean) : [];

  return (
    <div className="flex items-center">
      <span className="hidden sm:flex items-center">
        {pathSegments.map((segment, idx) => {
          const href = "/" + pathSegments.slice(0, idx + 1).join("/");
          return (
            <React.Fragment key={idx}>
              <MdArrowForwardIos className="text-xs mx-1" />
              <Link href={href}>
                <span
                  className="text-[#9DA3B3] text-base font-normal select-none mx-1 flex items-center h-full"
                  style={{ letterSpacing: "1px" }}
                >
                  {segment
                    .split("-")
                    .map((s: string) => s.charAt(0).toUpperCase() + s.slice(1))
                    .join(" ")}
                </span>
              </Link>
            </React.Fragment>
          );
        })}
      </span>
    </div>
  );
};

export default Breadcrumbs;
