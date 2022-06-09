import { VoicelineContainerEntry } from "../../types";
import { plusTierIconUrlList } from "../config";
import { CopyIcon } from "../icons";
import { Command, VoicelineText } from "./VoicelineEntry";
import { lazy, Suspense, useEffect, useState } from "react";
import Spinner from "./Spinner";

const Voiceline = lazy(() => import("./Voiceline"));

const VoicelinesListContainer = ({
  voicelines,
}: {
  voicelines: VoicelineContainerEntry[];
}) => {
  const [voicelineUrl, setVoicelineUrl] = useState<string>();
  const [voicelineAudio, setVoicelineAudio] = useState<HTMLAudioElement>(new Audio());
  const controller = new AbortController();

  const playCurrentVoiceline = () => {
    voicelineAudio.volume = 0.4;
    voicelineAudio.addEventListener(
      "canplaythrough",
      () => voicelineAudio.play(),
      { signal: controller.signal }
    );
  }

  const stopCurrentVoiceline = () => {
      controller.abort();
      voicelineAudio.pause();
      voicelineAudio.currentTime = 0;
  }

  const changeVoiceline = (url: string) => {
    if (url === voicelineUrl) {
      voicelineAudio.ended && voicelineAudio.play();
    } else {
      setVoicelineUrl(url);
      setVoicelineAudio(new Audio(url));
    }
  }

  useEffect(() => {
    playCurrentVoiceline();
    return () => {
      stopCurrentVoiceline();
    };
  }, [voicelineUrl]);

  return (
    <div id="list-container" className="flex justify-center">
      <Suspense
        fallback={
          <div className="flex text-center justify-center items-center pt-28">
            <Spinner />
          </div>
        }
      >
        <ul className="md:w-5/6 lg:w-4/6 flex flex-col gap-y-2">
          {voicelines.map((entry) => (
            <Voiceline
              key={entry.command}
              entry={entry}
              setCurrentVoiceline={changeVoiceline}
            />
          ))}
        </ul>
      </Suspense>
    </div>
  );
};

export default VoicelinesListContainer;
