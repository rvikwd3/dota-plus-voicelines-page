import { animated, config, useTransition } from "@react-spring/web";
import { SyntheticEvent, useContext } from "react";
import { IsSmallDisplayContext } from "../../context/IsSmallDisplayContextProvider";
import {
  CancelIcon,
  CopyIcon,
  FilterIcon,
  PasteIcon,
  PlayAudioIcon,
  SearchIcon
} from "../../icons";
import { DarkenBackdrop } from "./DarkenBackdrop";
import { MobileHelpTip } from "./MobileHelpTip";

interface Props extends React.ComponentPropsWithoutRef<"div"> {
  handleHelpDialogClose: (event: SyntheticEvent) => void;
  showDialog: boolean;
}

export const MobileHelpDialog = ({
  handleHelpDialogClose,
  showDialog,
  className
}: Props) => {
  const isSmallDisplay = useContext(IsSmallDisplayContext);
  const slideHelpDialog = useTransition(showDialog, {
    from: { transform: "translate3d(0, 100%, 0)" },
    enter: { transform: "translate3d(0, 0%, 0)" },
    leave: { transform: "translate3d(0, 100%, 0)" },
    config: config.default,
  });
  const icons = {
    search: (className: string) => <SearchIcon className={className} />,
    playAudio: (className: string) => <PlayAudioIcon className={className} />,
    copy: (className: string) => <CopyIcon className={className} />,
    paste: (className: string) => <PasteIcon className={className} />,
    filter: (className: string) => <FilterIcon className={className} />,
  };

  const helpTip = {
    search: (className: string) => (
      <span className={className}>
        Search for a voiceline by typing a part of the voiceline in the{" "}
        <strong>Search Bar</strong>
      </span>
    ),
    playAudio: (className: string) => (
      <span className={className}>
        <strong>Tap / Click</strong> on a voiceline, then tap on the{" "}
        <PlayAudioIcon
          className="inline w-6 h-6"
          aria-label="Play Audio Icon"
        />{" "}
        'Play Audio' icon to play the voiceline's audio.
      </span>
    ),
    copy: (className: string) => (
      <span className={className}>
        <strong>Copy</strong> the voiceline command by sliding the voiceline to
        the left.
      </span>
    ),
    paste: (className: string) => (
      <span className={className}>
        <strong>Paste</strong> the voiceline command into Twitch Chat to play it
        on stream!
      </span>
    ),
    filter: (className: string) => (
      <span className={className}>
        Filter voicelines by a Hero by selecting a Hero from the{" "}
        <strong>Filter Hero</strong> list. Tap the Search Bar to open the Filter
        Hero list.
      </span>
    ),
  };

  return (
    <>
      <DarkenBackdrop showBackdrop={showDialog && isSmallDisplay} className="z-20 absolute w-full h-full"/>
      {slideHelpDialog(
        (styles, show) => show && (
            <animated.div
              style={styles}
              className={`${className}`}
            >
              <div className="z-30 absolute w-full h-full flex justify-center items-center">
                <div className="w-11/12 h-[85%] bg-neutral-800 rounded-[50px] shadow-lg overflow-hidden">
                  <div className="relative mt-3 w-full h-full flex flex-col gap-y-4 items-center">
                    <div
                      className="absolute right-6 top-2"
                      onClick={handleHelpDialogClose}
                    >
                      <CancelIcon className="w-9 h-9 stroke-neutral-200 active:scale-90" />
                    </div>
                    <span
                      id="helpDialogTitle"
                      className="text-[34px] text-neutral-200 font-bold underline decoration-2 underline-offset-4 uppercase text-center tracking-[0.15em]"
                    >
                      help
                    </span>
                    <div className="w-full flex-1 overflow-auto">
                      <div
                        id="helpContents"
                        className="flex flex-col gap-y-11 pb-10"
                      >
                        <MobileHelpTip
                          tipLabel="search"
                          icon={icons.search}
                          tipTextSpan={helpTip.search}
                          tipImgUrl="/images/help/searchDrink.png"
                        />
                        <MobileHelpTip
                          tipLabel="playAudio"
                          icon={icons.playAudio}
                          tipTextSpan={helpTip.playAudio}
                          tipImgUrl="/images/help/playAudio_never.png"
                        />
                        <MobileHelpTip
                          tipLabel="copy"
                          icon={icons.copy}
                          tipTextSpan={helpTip.copy}
                          tipImgUrl="/images/help/slideCopy.png"
                        />
                        <MobileHelpTip
                          tipLabel="paste"
                          icon={icons.paste}
                          tipTextSpan={helpTip.paste}
                          tipImgUrl="/images/help/chatPaste.png"
                        />
                        <MobileHelpTip
                          tipLabel="filter"
                          icon={icons.filter}
                          tipTextSpan={helpTip.filter}
                          tipImgUrl="/images/help/heroFilter.png"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </animated.div>
          )
      )}
    </>
  );
};
