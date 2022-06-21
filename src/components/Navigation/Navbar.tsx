import React, { SyntheticEvent } from "react";
import { HelpIcon, MenuIcon } from "../../icons";

interface Props extends React.ComponentPropsWithoutRef<"nav"> {
  setShowNavMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setShowMobileHelpDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Navbar = ({ setShowNavMenu, setShowMobileHelpDialog }: Props) => {
  const handleMenuClick = (event: SyntheticEvent) => {
    setShowNavMenu(true);
  };

  const handleMobileNavHelpClick = (event: SyntheticEvent) => {
    setShowNavMenu(false);
    setShowMobileHelpDialog(true);
  };

  return (
    <nav className="w-full md:w-11/12 md:max-w-7xl mx-auto px-4 py-2 md:py-1 md:rounded-b-sm bg-neutral-900 flex flex-row items-center place-content-between">
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
            <span className="text-xl text-neutral-200 hover:text-neutral-50 hover:underline underline-offset-4 decoration-neutral-200">
              Help
            </span>
            <HelpIcon className="w-8 h-8 drop-shadow-xl" />
          </div>
        </a>
        <a
          href="#"
          className="text-xl text-neutral-200 hover:text-neutral-50 hover:underline underline-offset-4 decoration-neutral-200 [text-shadow:0_4px_8px_rgba(0,0,0,0.2)]"
        >
          About
        </a>
      </div>

      <div
        className="md:hidden active:scale-90 transition duration-100 ease-out"
        onClick={handleMobileNavHelpClick}
      >
        <HelpIcon className="w-10 h-10 drop-shadow-xl" />
      </div>
    </nav>
  );
};
