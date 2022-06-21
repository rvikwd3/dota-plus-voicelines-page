import { animated, config, useTransition } from "@react-spring/web";
import { SyntheticEvent } from "react";
import {
  CancelIcon,
  CopyIcon,
  MicrophoneIcon,
  PasteIcon,
  PlayAudioIcon,
} from "../icons";
import DesktopHelpTip from "./DesktopHelpTip";

interface Props extends React.ComponentPropsWithoutRef<"div"> {
  showHelpSection: boolean;
  handleHelpClose: (event: SyntheticEvent) => void;
}

const DesktopHelpSection = ({
  className,
  showHelpSection,
  handleHelpClose,
}: Props) => {
  const slideHelpSection = useTransition(showHelpSection, {
    from: { transform: "translateY(-200px)", opacity: 0, maxHeight: 0 },
    enter: { transform: "translateY(0px)", opacity: 1, maxHeight: 200 },
    leave: { transform: "translateY(-200px)", opacity: 0, maxHeight: 0 },
    config: config.default,
  });

  const desktopHelpTips = {
    listen: {
      icon: (className: string) => <PlayAudioIcon className={className} />,
      tipTitle: "Listen",
      tipText: (className: string) => (
        <span className={className}>
          Play a voiceline by clicking anywhere along the voiceline
        </span>
      ),
      tipImgUrl: "/images/help/playAudio_heyEverybody.png",
    },
    copy: {
      icon: (className: string) => <CopyIcon className={className} />,
      tipTitle: "Copy",
      tipText: (className: string) => (
        <span className={className}>
          Copy the command for the voiceline by clicking on the ‘Copy’ symbol
        </span>
      ),
      tipImgUrl: "/images/help/copyHover.png",
    },
    paste: {
      icon: (className: string) => <PasteIcon className={className} />,
      tipTitle: "Paste",
      tipText: (className: string) => (
        <span className={className}>
          Paste the voiceline command into Twitch Chat
        </span>
      ),
      tipImgUrl: "/images/help/chatPaste.png",
    },
    play: {
      icon: (className: string) => <MicrophoneIcon className={className} />,
      tipTitle: "Play",
      tipText: (className: string) => (
        <span className={className}>
          After a short delay, the selected voiceline will be played on stream!
        </span>
      ),
      tipImgUrl: "/images/help/play_heyEverybody.png",
    },
  };
  return (
    <>
      {slideHelpSection(
        (styles, show) =>
          show && (
            <animated.div
              style={styles}
              className={`hidden md:block md:w-5/6 md:max-w-6xl min-h-max relative self-center bg-stone-800 rounded-lg ${className}`}
            >
              <div
                id="closeHelp"
                className="absolute top-2 right-3 cursor-pointer"
                onClick={handleHelpClose}
              >
                <CancelIcon className="w-9 h-9 stroke-neutral-200 active:scale-90" />
              </div>
              <div className="flex flex-row items-center justify-between gap-x-8 pt-8 pb-4 px-8">
                <DesktopHelpTip {...desktopHelpTips.listen} />
                <DesktopHelpTip {...desktopHelpTips.copy} />
                <DesktopHelpTip {...desktopHelpTips.paste} />
                <DesktopHelpTip {...desktopHelpTips.play} />
              </div>
            </animated.div>
          )
      )}
    </>
  );
};

export default DesktopHelpSection;
