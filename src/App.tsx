import { useTransition, config, animated } from "@react-spring/web";
import { SyntheticEvent, useState } from "react";
import { MobileHelpDialog } from "./components/MobileHelpDialog";
import Navbar from "./components/Navbar";
import { SearchContainer } from "./components/Search";
import VoicelinesListContainer from "./components/VoicelinesListContainer";
import IsSmallDisplayContextProvider from "./context/IsSmallDisplayContextProvider";
import { CancelIcon, HelpIcon, PlayAudioIcon, SearchIcon } from "./icons";

const App = () => {
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [heroFilter, setHeroFilter] = useState<string>("");
  const [showMobileNavMenu, setShowMobileNavMenu] = useState<boolean>(false);
  const [showMobileHelpDialog, setShowMobileHelpDialog] =
    useState<boolean>(false);
  const slideMenu = useTransition(showMobileNavMenu, {
    from: { transform: "translate3d(-130%, 0, 0)" },
    enter: { transform: "translate3d(0%, 0, 0)" },
    leave: { transform: "translate3d(-130%, 0, 0)" },
    config: config.default,
  });

  const handleMenuClose = (event: SyntheticEvent) => {
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
      {showMobileHelpDialog && (
        <MobileHelpDialog handleHelpDialogClose={handleHelpDialogClose} />
      )}
      {slideMenu(
        (styles, show) =>
          show && (
            <animated.div
              id="mobileNavSlideout"
              style={styles}
              className="z-40 absolute w-6/12 h-full bg-neutral-700 shadow-menu border-r-2 border-zinc-400"
            >
              <div className="flex flex-col gap-y-4 w-full">
                <div className="ml-3 mt-2" onClick={handleMenuClose}>
                  <CancelIcon className="w-10 h-10 drop-shadow-md" />
                </div>
                <div className="flex flex-col gap-y-7 mr-3">
                  <a
                    href="#"
                    className="self-end"
                    onClick={handleMobileHelpNavClick}
                  >
                    <span className="text-2xl font-bold text-white [text-shadow:0_4px_8px_rgba(0,0,0,0.2)]">
                      Help
                    </span>
                  </a>
                  <a
                    href="#"
                    className="text-2xl text-white font-bold self-end [text-shadow:0_4px_8px_rgba(0,0,0,0.2)]"
                  >
                    About
                  </a>
                </div>
              </div>
            </animated.div>
          )
      )}
      <div className="z-0 w-full h-full flex flex-col justify-center">
        <Navbar
          setShowNavMenu={setShowMobileNavMenu}
          setShowMobileHelpDialog={setShowMobileHelpDialog}
        />
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
