import { useMemo } from "react";
import { VoicelineContainerEntry } from "../../types";
import VoicelineListScroller from "./VoicelineListScroller";
import { parseHeroesLookupTable } from "../utils/parseHeroesLookupTable";
import VoicelineAudioContextProvider from "../context/VoicelineAudioContextProvider";

const VoicelinesListContainer = ({
  searchInputValue,
}: {
  searchInputValue: string;
}) => {
  const voicelinesToShow = useMemo<VoicelineContainerEntry[]>(() => {
    const allVoicelines = parseHeroesLookupTable();
    const uniqueVoicelines = new Set<VoicelineContainerEntry>();
    if (searchInputValue.length > 0) {
      allVoicelines
        .filter((vc) =>
          vc.heroNames
            .map((name) => name.toLowerCase())
            .includes(searchInputValue.toLowerCase())
        )
        .forEach((item) => uniqueVoicelines.add(item));
      allVoicelines
        .filter((vc) =>
          vc.voiceline.text
            .toLowerCase()
            .includes(searchInputValue.toLowerCase())
        )
        .forEach((item) => uniqueVoicelines.add(item));
      return Array.from(uniqueVoicelines);
    } else {
      return allVoicelines;
    }
  }, [searchInputValue]);

  return (
      <VoicelineAudioContextProvider>
        <VoicelineListScroller voicelines={voicelinesToShow} />
      </VoicelineAudioContextProvider>
  );
};

export default VoicelinesListContainer;
