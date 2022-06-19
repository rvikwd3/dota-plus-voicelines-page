// react imports
import { animated, easings, useSpring, useTransition } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import React, { forwardRef, SyntheticEvent, useContext, useState } from "react";

// useContext imports
import { IsSmallDisplayContext } from "../context/IsSmallDisplayContextProvider";
import { DispatchContext } from "../context/VoicelineAudioContextProvider";

// misc imports
import { VoicelineContainerEntry } from "../../types";
import { plusTierIconUrlList } from "../config";
import { CopyIcon, InteractableCopyIcon, LeftChevronIcon } from "../icons";
import { uniqueStrings } from "../utils/uniqueStrings";

// component imports
import MobileCommandDrawer from "./MobileCommandDrawer";
import { Command, HeroIconWithTooltip, VoicelineText } from "./VoicelineEntry";


type Props = {
  entry: VoicelineContainerEntry;
  updateRowHeight: (updatedHeight: number) => void;
  recalculateRowHeight: () => void;
  id?: string;
  classname?: string;
};

const Voiceline = forwardRef(
  (
    { entry, updateRowHeight, recalculateRowHeight, id, classname }: Props,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    const audioDispatch = useContext(DispatchContext);
    const isSmallDisplay = useContext(IsSmallDisplayContext);
    const [copiedState, setCopiedState] = useState<boolean>(false); // 'Slide to copy' state
    const [drawerState, setDrawerState] = useState<boolean>(false);
    const slideLeftBound = 100; // Distance voiceline can be slid left for 'Slide to copy'

    // MobileCommandDrawer Expand/Collapse spring animation
    const animateDrawer = useTransition(drawerState, {
      from: {
        y: -52,
        opacity: 0,
        maxHeight: 0,
      },
      enter: {
        y: 0,
        opacity: 1,
        maxHeight: 52,
      },
      leave: {
        y: -52,
        opacity: 0,
        maxHeight: 0,
      },
      config: {
        duration: 400,
        easing: easings.easeOutCubic,
      },
      immediate: !isSmallDisplay, // disable drawer animation if NOT small display
    });

    // Handle clicking on a voiceline
    const onVoicelineClick = (event: SyntheticEvent) => {
      event.preventDefault();
      // If larger display, don't play the voiceline on click
      if (!isSmallDisplay) {
        audioDispatch({ type: "STOP" });
        audioDispatch({
          type: "PLAY_AUDIO",
          payload: { url: entry.voiceline.url },
        });
      }
      // If smaller display, toggle expand/collapse the command drawer on tap(onClick handler)
      if (isSmallDisplay) {
        drawerState ? updateRowHeight(-52) : updateRowHeight(52); // update virtual List with open/closed drawer Voiceline Row heights
        setDrawerState((isShowing) => !isShowing);
      }
    };

    // Handle swiping a voiceline to the left (react-use-gesture)
    const [{ x }, api] = useSpring(() => ({ x: 0 }));
    const bind = useDrag(
      ({ down, active, distance, offset: [x] }) => {
        // On sliding 100px left, copy voiceline command
        if (!active && distance[0] >= slideLeftBound) {
          copyCommandToClipboard();
        }

        // On sliding left, change swipe text to copied if not done so already
        if (active && distance[0] >= slideLeftBound && !copiedState) {
          // After 200ms set copiedState to True, then revert after 2sec
          setTimeout(() => {
            setCopiedState(true);
          }, 200);
          setTimeout(() => {
            setCopiedState(false);
          }, 2000);
        }
        api.start({ x: down ? x : 0, immediate: down });
      },
      {
        enabled: isSmallDisplay,
        axis: "x",
        from: () => [x.get(), 0],
        bounds: {
          left: -slideLeftBound,
          right: 0,
        },
        filterTaps: true,
      }
    );

    const copyCommandToClipboard = () => {
      navigator.clipboard.writeText(entry.command);
    };

    const enableImageClickOnMobile = (event: SyntheticEvent) =>
      !isSmallDisplay && event.stopPropagation();

    return (
      <div ref={ref} id="voicelineAndDrawer">
        <div id="voiceline" className="relative">
          <div
            id="slideToCopy"
            className="absolute md:hidden w-full h-full pr-2"
          >
            {copiedState ? (
              <div className="w-full h-full flex items-center justify-end text-neutral-400">
                <span>Copied!</span>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-end text-neutral-400">
                <LeftChevronIcon className="w-7 stroke-neutral-300 -mr-1 stroke-2" />
                <CopyIcon className="w-[30px] stroke-neutral-300" />
              </div>
            )}
          </div>
          <animated.div
            key={entry.command}
            className={`z-10 touch-pan-y relative grid cursor-pointer voicelineItem voicelineItem-grid px-2 md:px-3`}
            onClick={onVoicelineClick}
            {...bind()}
            style={{ x }}
          >
            {!isSmallDisplay && (
              <Command
                id="command"
                className="text-gray-400 text-md font-bold text-right"
                command={entry.command}
              />
            )}
            <HeroIconWithTooltip
              iconUrl={entry.heroIconUrl}
              tooltipText={uniqueStrings(entry.heroNames).join(", ").toLowerCase()}
              className="justify-self-end"
            />
            <img
              id="plusTierIcon"
              src={plusTierIconUrlList[entry.plusTierName]}
              className="justify-self-center cursor-default w-7 md:w-8 shadow-sm"
              onClick={enableImageClickOnMobile}
              onLoad={recalculateRowHeight}
            />
            <VoicelineText
              id="voicelineText"
              text={entry.voiceline.text}
              isClickable={isSmallDisplay} // Disable clickable if smallDisplay (isSmallDisplay)
              plusTierName={entry.plusTierName}
            />
            {!isSmallDisplay && (
              <InteractableCopyIcon
                id="copyIcon"
                copyCallback={copyCommandToClipboard}
                className="hidden md:block justify-self-end drop-shadow-sm cursor-pointer mr-8"
                svgClassName="w-9 stroke-neutral-300 active:scale-75 transition duration-100"
              />
            )}
          </animated.div>
        </div>
        {animateDrawer((style, showDrawer) => {
          return (
            showDrawer && (
              <animated.div
                id="drawer"
                style={style}
                className={`shadow-xl md:hidden`}
              >
                <MobileCommandDrawer
                  command={entry.command}
                  voicelineUrl={entry.voiceline.url}
                  copyCommandToClipboard={copyCommandToClipboard}
                />
              </animated.div>
            )
          );
        })}
      </div>
    );
  }
);

export default Voiceline;
