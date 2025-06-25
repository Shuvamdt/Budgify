import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [myAccount, setMyAccount] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleAccount = () => setMyAccount(!myAccount);

  const nav1 = useRef();
  const nav2 = useRef();
  const nav3 = useRef();

  const mobMenu = useRef();
  const tl = useRef();

  const handleHover = (ref, hover) => {
    gsap.to(ref.current, {
      scale: hover ? 1.3 : 1,
      color: hover ? "#9D0208" : "#03071E",
      duration: 0.5,
    });
  };

  useGSAP(() => {
    gsap.from("a", {
      y: -10,
      opacity: 0,
      delay: 0.7,
      duration: 1.2,
      stagger: 0.3,
    });
    tl.current = gsap.timeline({ paused: true });
    tl.current.to(mobMenu.current, {
      x: -420,
      duration: 0.4,
    });
    tl.current.from("#items", {
      opacity: 0,
      x: 150,
      duration: 0.8,
      stagger: 0.2,
    });
    tl.current.from("#close", {
      opacity: 0,
      duration: 0.2,
    });
  });

  useEffect(() => {
    if (menuOpen) {
      tl.current.play();
    } else {
      tl.current.reverse();
    }
  }, [menuOpen]);

  return (
    <div className="flex-col overflow-x-hidden">
      <div className="sticky flex h-auto w-full px-5 py-2 my-1 items-center justify-between">
        <div className="flex px-1">
          <a href="/" className="flex justify-center items-center">
            <div className="px-1">
              <img src="Logo.png" className="h-8 w-8 md:h-10 md:w-10" />
            </div>
            <h1 className="font-1 text-2xl md:text-3xl">Bugit</h1>
          </a>
        </div>

        <div className="hidden md:flex justify-evenly items-center px-2 text-lg lg:text-xl font-1">
          <a
            href="/dashboard"
            ref={nav1}
            className="px-5"
            onMouseEnter={() => handleHover(nav1, true)}
            onMouseLeave={() => handleHover(nav1, false)}
          >
            Dashboard
          </a>
          <a
            href="/expenses"
            ref={nav2}
            className="px-5"
            onMouseEnter={() => handleHover(nav2, true)}
            onMouseLeave={() => handleHover(nav2, false)}
          >
            Expenses
          </a>
          <a
            href="/about"
            ref={nav3}
            className="px-5"
            onMouseEnter={() => handleHover(nav3, true)}
            onMouseLeave={() => handleHover(nav3, false)}
          >
            About
          </a>
        </div>

        <div className="hidden md:flex justify-evenly items-center px-2">
          <img
            src="user.png"
            alt="User logo"
            className="h-8 w-8"
            onClick={toggleAccount}
          />
        </div>

        <div className="md:hidden px-5 absolute right-2 z-10">
          <img
            src="menu.png"
            alt="menu icon"
            className="h-8 w-8"
            onClick={toggleMenu}
          />
        </div>
      </div>

      {myAccount && (
        <div className="fixed flex flex-col justify-center items-center font-1 w-40 top-20 py-2 right-5 z-5 rounded-lg bg-[#FAA307] border border-[#DC2F02]">
          <ul className="flex flex-col items-center justify-center">
            <li className="py-2">
              <a href="/my-account">My Account</a>
            </li>
            <li className="py-2">
              <a href="/signup">Sign in</a>
            </li>
          </ul>
        </div>
      )}

      <div
        ref={mobMenu}
        className="absolute md:hidden font-1 flex flex-col px-5 w-140 top-0 h-full left-140 sm:left-190 z-5 bg-[#E85D04]"
      >
        <div className="flex flex-col justify-end absolute top-3 right-115 z-10">
          <img
            src="close.png"
            alt="close icon"
            id="close"
            className="h-3 w-3"
            onClick={toggleMenu}
          />
        </div>
        <div className="absolute top-3 px-1 text-xs">
          <ul className="flex flex-col items-start justify-center">
            <li id="items" className="py-0.5">
              <a href="/dashboard">Dashboard</a>
            </li>
            <li id="items" className="py-0.5">
              <a href="/expenses">Expenses</a>
            </li>
            <li id="items" className="py-0.5">
              <a href="/about">About</a>
            </li>
            <li id="items" className="py-0.5">
              <a href="/my-account">My Account</a>
            </li>
            <li id="items" className="py-0.5">
              Sign out
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
