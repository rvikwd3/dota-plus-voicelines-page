import { useEffect } from "react";
import { VoicelineContainerEntry } from "../../types";
import {
  incrementVoicelinesShownOnScroll,
  initialVoicelinesShown,
} from "../config";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import { DownArrow } from "../icons";
import Spinner from "./Spinner";
import Voiceline from "./Voiceline";

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
  useEffect(() => {
    console.log(`Current limit: %c${limit}`, "color: turquoise;");
  }, [limit]);

  return (
    <div className="flex flex-col items-center">
      <ul className="md:w-5/6 lg:w-4/6 flex flex-col gap-y-2">
        {voicelines.slice(0, limit).map((entry) => (
          <Voiceline
            key={entry.command}
            entry={entry}
            setCurrentVoiceline={setCurrentVoiceline}
          />
        ))}
      </ul>
      <div
        ref={loadMoreTriggerRef}
        className="text-neutral-200 text-xl text-center p-4 mb-8"
      >
        <DownArrow className="animate-bounce"/>
      </div>
    </div>
  );
};

export default VoicelineListScroller;
