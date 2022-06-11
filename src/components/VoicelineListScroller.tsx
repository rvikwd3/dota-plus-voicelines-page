import { useEffect, useState } from "react";
import { VoicelineContainerEntry } from "../../types";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import Voiceline from "./Voiceline";
import {
  incrementVoicelinesShownOnScroll,
  initialVoicelinesShown,
} from "../config";
import { DownArrow } from "../icons";

const VoicelineListScroller = ({
  voicelines,
  setCurrentVoiceline,
}: {
  voicelines: VoicelineContainerEntry[];
  setCurrentVoiceline: (url: string) => void;
}) => {
  const { loadMoreTriggerRef, limit } = useInfiniteScroll(
    initialVoicelinesShown,
    incrementVoicelinesShownOnScroll
  );

  const [isSmallDisplay, setIsSmallDisplay] = useState<boolean>(
    !window.matchMedia("(min-width: 768px").matches
  );

  useEffect(() => {
    window
      .matchMedia("(min-width: 768px")
      .addEventListener("change", (e) => setIsSmallDisplay(!e.matches));
  }, []);

  return (
    <div className="flex flex-col items-center">
      <ul className="md:w-5/6 lg:w-4/6 flex flex-col gap-y-2 overflow-hidden select-none md:select-auto">
        {voicelines.slice(0, limit).map((entry) => (
          <Voiceline
            key={entry.command}
            entry={entry}
            enableDrag={isSmallDisplay}
            setCurrentVoiceline={setCurrentVoiceline}
          />
        ))}
      </ul>
      <div
        ref={loadMoreTriggerRef}
        className="text-neutral-200 text-xl text-center p-4 mb-10"
      >
        {limit <= voicelines.length && <DownArrow className="animate-bounce" />}
      </div>
    </div>
  );
};

export default VoicelineListScroller;
