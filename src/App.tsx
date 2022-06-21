import { useTransition, config, animated, easings } from "@react-spring/web";
import { SyntheticEvent, useState } from "react";
import DesktopHelpTip from "./components/DesktopHelpTip";
import {
  MobileHelpDialog,
  MobileHelpDialogBackdrop,
} from "./components/MobileHelpDialog";
import { MobileNavDrawer, Navbar } from "./components/Navigation";
import { SearchContainer } from "./components/Search";
import VoicelinesListContainer from "./components/VoicelinesListContainer";
import IsSmallDisplayContextProvider from "./context/IsSmallDisplayContextProvider";
import { CancelIcon } from "./icons";

const App = () => {
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [heroFilter, setHeroFilter] = useState<string>("");
  const [showMobileNavMenu, setShowMobileNavMenu] = useState<boolean>(false);
  const [showMobileHelpDialog, setShowMobileHelpDialog] =
    useState<boolean>(false);

  const handleMobileNavDrawerClose = (event: SyntheticEvent) => {
    setShowMobileNavMenu(false);
  };

  const handleHelpDialogClose = (event: SyntheticEvent) => {
    setShowMobileHelpDialog(false);
  };

  const handleMobileHelpNavClick = (event: SyntheticEvent) => {
    setShowMobileNavMenu(false);
    setShowMobileHelpDialog(true);
  };

  return (
    <div className="relative w-full h-full">
      <MobileNavDrawer
        className="md:hidden z-40 absolute"
        showDrawer={showMobileNavMenu}
        handleMenuClose={handleMobileNavDrawerClose}
        handleMobileHelpNavClick={handleMobileHelpNavClick}
      />
      <MobileHelpDialogBackdrop
        className="md:hidden z-20 absolute w-full h-full"
        showBackdrop={showMobileHelpDialog}
      />
      <MobileHelpDialog
        className="md:hidden z-30 absolute w-full h-full"
        showDialog={showMobileHelpDialog}
        handleHelpDialogClose={handleHelpDialogClose}
      />
      <div className="z-0 w-full h-full flex flex-col justify-center relative">
        <Navbar
          setShowNavMenu={setShowMobileNavMenu}
          setShowMobileHelpDialog={setShowMobileHelpDialog}
        />
        <div className="hidden mt-4 md:block md:w-5/6 md:max-w-6xl relative self-center bg-stone-800 rounded-lg">
          <div className="flex flex-row items-center justify-between gap-x-5 py-4 px-12">
            <DesktopHelpTip className="p-8"/>
            <span className="text-2xl text-white">HELP</span>
            <span className="text-2xl text-white">HELP</span>
            <span className="text-2xl text-white">HELP</span>
            <span className="text-2xl text-white">HELP</span>
          </div>
        </div>
        <IsSmallDisplayContextProvider>
          <SearchContainer
            searchInputValue={searchInputValue}
            setSearchInputValue={setSearchInputValue}
            heroFilter={heroFilter}
            setHeroFilter={setHeroFilter}
          />
          <VoicelinesListContainer
            searchInputValue={searchInputValue}
            heroFilter={heroFilter}
          />
        </IsSmallDisplayContextProvider>
      </div>
    </div>
  );
};

export default App;
