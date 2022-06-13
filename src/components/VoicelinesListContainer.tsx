import { useEffect, useMemo, useState } from "react";
import { VoicelineContainerEntry } from "../../types";
import VoicelineListScroller from "./VoicelineListScroller";
import { parseHeroesLookupTable } from "../utils/parseHeroesLookupTable";

const VoicelinesListContainer = () => {
  const voicelinesToShow = useMemo<VoicelineContainerEntry[]>(
    parseHeroesLookupTable,
    []
  );

  const [voicelineUrl, setVoicelineUrl] = useState<string>();
  const [voicelineAudio, setVoicelineAudio] = useState<HTMLAudioElement>(
    new Audio()
  );
  const controller = new AbortController();

  const playCurrentVoiceline = () => {
    voicelineAudio.volume = 0.4;
    voicelineAudio.addEventListener(
      "canplaythrough",
      () => voicelineAudio.play(),
      { signal: controller.signal }
    );
  };

  const stopCurrentVoiceline = () => {
    controller.abort();
    voicelineAudio.pause();
    voicelineAudio.currentTime = 0;
  };

  const changeVoiceline = (url: string) => {
    if (url === voicelineUrl) {
      voicelineAudio.ended && voicelineAudio.play();
    } else {
      setVoicelineUrl(url);
      setVoicelineAudio(new Audio(url));
    }
  };

  useEffect(() => {
    playCurrentVoiceline();
    return () => {
      stopCurrentVoiceline();
    };
  }, [voicelineUrl]);

  return (
    <VoicelineListScroller
      setCurrentVoiceline={changeVoiceline}
      voicelines={voicelinesToShow}
    />
  );
};

export default VoicelinesListContainer;
