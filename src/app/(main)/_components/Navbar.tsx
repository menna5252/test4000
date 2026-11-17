"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { ArrowUpRight, TextAlignJustify } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { DropdownMenuAvatar } from "./Dropdown";
import { usePathname } from "next/navigation";
import NextAuthProvider from "@/providers/nextauth.provider";

export type NavigationSection = {
  title: string;
  href: string;
};

const navigationData: NavigationSection[] = [
  {
    title: "feed",
    href: "/feed",
  },
  {
    title: "profile",
    href: "/profile",
  },
  {
    title: "notifications",
    href: "/notifications",
  },
  
];



const Navbar = () => {
  const [sticky, setSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();
  const handleScroll = useCallback(() => {
    setSticky(window.scrollY >= 50);
  }, []);

  const handleResize = useCallback(() => {
    if (window.innerWidth >= 768) setIsOpen(false);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [handleScroll, handleResize]);

  return (
    <div>
      <header className="bg-background">
        <div className="max-w-7xl mx-auto w-full px-4 py-4 sm:px-6">
          <nav
            className={cn(
              "w-full flex items-center h-fit justify-between gap-3.5 lg:gap-6 transition-all duration-500",
              sticky
                ? "p-2.5 bg-background/60 backdrop-blur-lg border border-border/40 shadow-2xl shadow-primary/5 rounded-full"
                : "bg-transparent border-transparent"
            )}
          >
            <Link href="/" className="text-2xl font-bold text-blue-900">
              Route Posts
            </Link>
            <div>
              <NavigationMenu className="max-lg:hidden bg-muted p-0.5 rounded-full ">
                <NavigationMenuList className="flex gap-0">
                  {navigationData.map((navItem) => (
                    <NavigationMenuItem key={navItem.title}>
                      <NavigationMenuLink  render={<Link href={navItem.href}  />}
                       
                        className={`px-2 lg:px-4 py-2 my-1 text-lg capitalize text-blue-900 font-medium rounded-full   
                            outline outline-transparent hover:outline-border hover:shadow-xs transition tracking-normal
                            ${pathName === navItem.href ? "bg-white":''}
                            `}
                      >
                        {navItem.title}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
             
              </NavigationMenu>
            </div>
               <NextAuthProvider>
                <DropdownMenuAvatar/>
               </NextAuthProvider>

            <div className="lg:hidden">
              <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenuTrigger className="rounded-full bg-background border border-border p-2 outline-none flex items-center justify-center cursor-pointer transition-colors">
                  <TextAlignJustify size={20} />
                  <span className="sr-only">Menu</span>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-56 mt-2"
                >
                  {navigationData.map((item) => (
                    <DropdownMenuItem key={item.title}>
                      <Link href={item.href} className="w-full cursor-pointer text-sm font-medium">{item.title}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
