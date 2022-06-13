import { useSpring, useTransition, animated, easings } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { forwardRef, useState } from "react";

import { VoicelineContainerEntry } from "../../types";
import { plusTierIconUrlList } from "../config";
import { InteractableCopyIcon, LeftChevronIcon, CopyIcon } from "../icons";
import { Command, HeroIconWithTooltip, VoicelineText } from "./VoicelineEntry";
import MobileCommandDrawer from "./MobileCommandDrawer";

const Voiceline = forwardRef((
  {
      entry,
      isSmallDisplay,
      setCurrentVoiceline,
      id,
      classname,
    }: {
      entry: VoicelineContainerEntry;
      isSmallDisplay: boolean;
      setCurrentVoiceline: (url: string) => void;
      id?: string;
      classname?: string;
    },
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    const [copiedState, setCopiedState] = useState<boolean>(false); // 'Slide to copy' state
    const [showMobileCommandDrawer, setShowMobileCommandDrawer] =
      useState<boolean>(false); // Show expand-collapse state for 'command' drawer on mobile
    const slideLeftBound = 170; // Distance voiceline can be slid left for 'Slide to copy'

    const animateDrawer = useTransition(showMobileCommandDrawer, {
      from: {
        y: -52,
        opacity: 0,
        // maxHeight: 0
      },
      enter: {
        y: 0,
        opacity: 1,
        // maxHeight: 52
      },
      leave: {
        y: -52,
        opacity: 0,
        // maxHeight: 0
      },
      config: {
        duration: 400,
        easing: easings.easeOutCubic,
      },
    });

    const onVoicelineClick = () => {
      // If larger display, don't play the voiceline on click
      if (!isSmallDisplay) {
        setCurrentVoiceline(entry.voiceline.url);
      }
      // If smaller display, toggle expand/collapse the command drawer on tap(onClick handler)
      if (isSmallDisplay) {
        setShowMobileCommandDrawer((isShowing) => !isShowing);
      }
    };

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

    const setVoicelineUrl = () => {
      setCurrentVoiceline(entry.voiceline.url);
    };

    return (
      <div ref={ref} id="voicelineAndDrawer">
        <div id="voiceline" className="relative">
          <div id="slideToCopy" className="absolute md:hidden w-full h-full pr-2">
            {copiedState ? (
              <div className="w-full h-full flex items-center justify-end text-neutral-400">
                <span>Copied!</span>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-end text-neutral-400">
                <span>Slide to copy</span>
                <LeftChevronIcon className="w-5 stroke-neutral-400 -mr-1" />
                <CopyIcon className="w-6 stroke-neutral-400" />
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
              tooltipText={entry.heroNames.join(", ")}
              className="justify-self-end"
            />
            <img
              id="plusTierIcon"
              src={plusTierIconUrlList[entry.plusTierName]}
              className="justify-self-center cursor-default w-7 md:w-8 shadow-sm"
              onClick={(e) => !isSmallDisplay && e.stopPropagation()}
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
        {isSmallDisplay &&
          animateDrawer(
            (style, showDrawer) =>
              showDrawer && (
                <animated.div id="drawer" style={style} className={`shadow-xl md:hidden`}>
                  <MobileCommandDrawer
                    command={entry.command}
                    copyCommandToClipboard={copyCommandToClipboard}
                    setCurrentVoiceline={setVoicelineUrl}
                  />
                </animated.div>
              )
          )}
      </div>
    );
  }
);

export default Voiceline;
