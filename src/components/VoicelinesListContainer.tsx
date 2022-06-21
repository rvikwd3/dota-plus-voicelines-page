import { useMemo } from "react";
import { VoicelineContainerEntry } from "../../types";
import VoicelineAudioContextProvider from "../context/VoicelineAudioContextProvider";
import { parseHeroesLookupTable } from "../utils/parseHeroesLookupTable";
import VoicelineListScroller from "./VoicelineListScroller";

const VoicelinesListContainer = ({
  searchInputValue,
  heroFilter,
}: {
  searchInputValue: string;
  heroFilter: string;
}) => {
  const voicelinesToShow = useMemo<VoicelineContainerEntry[]>(() => {
    let voicelineEntries = parseHeroesLookupTable();

    // If heroFilter is set: only show voicelines for that hero
    if (heroFilter.length > 0) {
      voicelineEntries = voicelineEntries.filter((vce) =>
        vce.heroNames.includes(heroFilter)
      );
    }

    // Filter voicelines based on searchInput
    const uniqueVoicelines = new Set<VoicelineContainerEntry>();
    if (searchInputValue.length > 0) {
      // If searchInput is a hero name, show all voicelines of that hero
      voicelineEntries
        .filter((vce) =>
          vce.heroNames
            .map((name) => name.toLowerCase())
            .includes(searchInputValue.toLowerCase())
        )
        .forEach((item) => uniqueVoicelines.add(item));

      // Filter rest of the voicelines by voiceline text based on searchInput
      voicelineEntries
        .filter((vce) =>
          vce.voiceline.text
            .toLowerCase()
            .includes(searchInputValue.toLowerCase())
        )
        .forEach((item) => uniqueVoicelines.add(item));

      return Array.from(uniqueVoicelines);
    }

    return voicelineEntries;
  }, [searchInputValue, heroFilter]);

  return (
    <VoicelineAudioContextProvider>
      <VoicelineListScroller voicelines={voicelinesToShow} />
    </VoicelineAudioContextProvider>
  );
};

export default VoicelinesListContainer;
