import { VoicelineContainerEntry } from "../../types";
import { plusTierIconUrlList } from "../config";
import { CopyIcon } from "../icons";
import { Command, VoicelineText } from "./VoicelineEntry";
import { HeroIcon } from "./VoicelineEntry/HeroIcon";

import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

const Voiceline = ({
  entry,
  enableDrag,
  setCurrentVoiceline,
  id,
  classname,
}: {
  entry: VoicelineContainerEntry;
  enableDrag: boolean;
  setCurrentVoiceline: (url: string) => void;
  id?: string;
  classname?: string;
}) => {
  const onVoicelineClick = () => {
    setCurrentVoiceline(entry.voiceline.url);
  };

  const copyCommandToClipboard = () => {
    navigator.clipboard.writeText(entry.command);
  };

  const [{ x }, api] = useSpring(() => ({ x: 0 }));
  const bind = useDrag(
    ({ event, down, active, distance, offset: [x] }) => {
      // On sliding 100px left, copy voiceline command
      if (!active && distance[0] > 100) {
        copyCommandToClipboard();
      }
      api.start({ x: down ? x : 0, immediate: down });
    },
    {
      enabled: enableDrag,
      axis: "x",
      from: () => [x.get(), 0],
      bounds: {
        left: -150,
        right: 0,
      },
      filterTaps: true,
    }
  );

  return (
    <div className="relative">
      <div className="absolute md:hidden z-0 w-full h-full bg-slate-600 flex items-center justify-end text-neutral-400">
        Slide to copy
      </div>
      <animated.li
        key={entry.command}
        className={`touch-pan-y z-10 relative voicelineItem grid cursor-pointer voicelineItem-grid md:px-2`}
        onClick={onVoicelineClick}
        {...bind()}
        style={{ x }}
      >
        <Command
          id="command"
          className="inline text-gray-400 text-md font-bold text-right"
          command={entry.command}
        />
        <HeroIcon
          className="cursor-default"
          iconUrl={entry.heroIconUrl}
          tooltip={entry.heroNames.join(", ")}
        />
        <img
          id="plusTierIcon"
          src={plusTierIconUrlList[entry.plusTierName]}
          className="cursor-default w-7 md:w-8"
          onClick={(e) => !enableDrag && e.stopPropagation()}
        />
        <VoicelineText
          id="voicelineText"
          text={entry.voiceline.text}
          isClickable={enableDrag}  // Disable clickable if smallDisplay (enableDrag)
          plusTierName={entry.plusTierName}
        />
        <CopyIcon
          id="copyIcon"
          copyCallback={copyCommandToClipboard}
          className="hidden md:block justify-self-end hover:-translate-y-[2px] transition"
        />
      </animated.li>
    </div>
  );
};

export default Voiceline;
