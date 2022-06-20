import React, { SyntheticEvent } from "react";
import { HelpIcon, MenuIcon } from "../icons";

interface Props extends React.ComponentPropsWithoutRef<'nav'> {
  setShowNavMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setShowMobileHelpDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar = ({ setShowNavMenu, setShowMobileHelpDialog }: Props) => {
  const handleMenuClick = (event: SyntheticEvent) => {
    setShowNavMenu(true);
  }

  const handleMobileNavHelpClick = (event: SyntheticEvent) => {
    setShowNavMenu(false);
    setShowMobileHelpDialog(true);
  }

  return (
    <nav className="w-full md:w-5/6 md:max-w-6xl mx-auto px-4 py-2 md:py-1 md:rounded-b-sm bg-stone-800 flex flex-row items-center place-content-between">
      <div className="md:hidden active:scale-90" onClick={handleMenuClick}>
        <MenuIcon className="w-10 h-10 drop-shadow-xl" />
      </div>

      <div className="w-[172px] text-center">
        <span className="text-white text-2xl uppercase font-bold tracking-widest leading-7 [text-shadow:0_4px_8px_rgba(0,0,0,0.95)]">
          dota plus voice lines
        </span>
      </div>

      <div className="hidden md:flex md:flex-row gap-x-9 px-4 items-center">
        <a href="#" className="">
          <div className="flex items-center gap-x-1">
            <span className="text-xl font-bold text-white">Help</span>
            <HelpIcon className="w-8 h-8 drop-shadow-xl" />
          </div>
        </a>
        <a href="#" className="text-xl text-white font-bold [text-shadow:0_4px_8px_rgba(0,0,0,0.2)]">
          About
        </a>
      </div>

      <div className="md:hidden active:scale-90 transition duration-100 ease-out" onClick={handleMobileNavHelpClick}>
        <HelpIcon className="w-10 h-10 drop-shadow-xl" />
      </div>
    </nav>
  );
};

export default Navbar;