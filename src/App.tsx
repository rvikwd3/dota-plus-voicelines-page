// react imports
import { SyntheticEvent, useState } from "react";

// component imports
import DesktopHelpSection from "./components/DesktopHelpSection";
import { AboutDialog, MobileHelpDialog } from "./components/Dialogs";
import { MobileNavDrawer, Navbar } from "./components/Navigation";
import { SearchContainer } from "./components/Search";
import VoicelinesListContainer from "./components/VoicelinesListContainer";

// context imports
import IsSmallDisplayContextProvider from "./context/IsSmallDisplayContextProvider";

const App = () => {
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [heroFilter, setHeroFilter] = useState<string>("");
  const [showMobileNavMenu, setShowMobileNavMenu] = useState<boolean>(false);
  const [showMobileHelpDialog, setShowMobileHelpDialog] =
    useState<boolean>(false);
  const [showDesktopHelpSection, setShowDesktopHelpSection] =
    useState<boolean>(false);
  const [showAbout, setShowAbout] = useState<boolean>(false);

  const handleMobileNavDrawerClose = (event: SyntheticEvent) => {
    setShowMobileNavMenu(false);
  };

  const handleMobileHelpDialogClose = (event: SyntheticEvent) => {
    setShowMobileHelpDialog(false);
  };

  const handleMobileHelpNavClick = (event: SyntheticEvent) => {
    setShowMobileNavMenu(false);
    setShowMobileHelpDialog(true);
  };

  const handleMobileAboutNavClick = (event: SyntheticEvent) => {
    setShowMobileNavMenu(false);
    setShowAbout(true);
  };

  const handleDesktopHelpNavClick = (event: SyntheticEvent) => {
    setShowDesktopHelpSection(true);
  };

  const handleAboutNavClick = (event: SyntheticEvent) => {
    setShowAbout(true);
  };

  const handleHelpSectionCloseClick = (event: SyntheticEvent) => {
    setShowDesktopHelpSection(false);
  };

  const handleAboutDialogClose = (event: SyntheticEvent) => {
    setShowAbout(false);
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      <MobileNavDrawer
        className="md:hidden z-40 absolute"
        showDrawer={showMobileNavMenu}
        handleMenuClose={handleMobileNavDrawerClose}
        handleHelpClick={handleMobileHelpNavClick}
        handleAboutClick={handleMobileAboutNavClick}
      />
      <IsSmallDisplayContextProvider>
        <MobileHelpDialog
          className="md:hidden z-30 absolute w-full h-full"
          showDialog={showMobileHelpDialog}
          handleHelpDialogClose={handleMobileHelpDialogClose}
        />
        <AboutDialog
          className="z-30 absolute w-full h-full"
          showAbout={showAbout}
          handleAboutClose={handleAboutDialogClose}
        />
      </IsSmallDisplayContextProvider>
      <div className="z-0 w-full h-full flex flex-col justify-center relative">
        <Navbar
          className="z-10 mb-2"
          setShowNavMenu={setShowMobileNavMenu}
          setShowMobileHelpDialog={setShowMobileHelpDialog}
          handleDesktopHelpClick={handleDesktopHelpNavClick}
          handleAboutClick={handleAboutNavClick}
        />
        <DesktopHelpSection
          className="z-0"
          showHelpSection={showDesktopHelpSection}
          handleHelpClose={handleHelpSectionCloseClick}
        />
        <IsSmallDisplayContextProvider>
          <SearchContainer
            className="mt-2"
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
