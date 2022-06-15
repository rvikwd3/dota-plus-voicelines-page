import { useMemo } from "react";
import { VoicelineContainerEntry } from "../../types";
import VoicelineListScroller from "./VoicelineListScroller";
import { parseHeroesLookupTable } from "../utils/parseHeroesLookupTable";
import VoicelineAudioContextProvider from "../context/VoicelineAudioContextProvider";

const VoicelinesListContainer = () => {
  const voicelinesToShow = useMemo<VoicelineContainerEntry[]>(
    parseHeroesLookupTable,
    []
  );

  return (
    <VoicelineAudioContextProvider>
      <VoicelineListScroller voicelines={voicelinesToShow} />
    </VoicelineAudioContextProvider>
  );
};

export default VoicelinesListContainer;
