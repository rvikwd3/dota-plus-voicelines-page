import { PlusTier, VoicelineContainerEntry } from "../../types";
import { chatwheelCommand, plusTierIconUrlList } from "../config";
import { heroesLookupTable } from "../data/heroesLookupTable_manuallyHydrated";

/*
 * Reduce the heroesLookupTable to a flat collection of Voiceline Entries
 */
export const parseHeroesLookupTable = (): VoicelineContainerEntry[] => {
  let voicelineContainerEntries: VoicelineContainerEntry[] =
    // Scope: All Heroes, All PlusTiers
    // Collect all the mapped VoicelineContainerEntries for all the PlusTiers for all the Heroes
    heroesLookupTable.reduce(
      (entries, hero) =>
        entries.concat(
          // Scope: Single Hero, All PlusTiers
          // Collect all the mapped VoicelineContainerEntries for all the PlusTiers
          Object.keys(hero.plusVoiceLines).reduce(
            (voicelineEntries, plusTierName) => {
              // Include index in command if more than one voiceline
              const totalVoicelines = hero.plusVoiceLines[plusTierName as PlusTier].length;

              return voicelineEntries.concat(
                // Scope: Single Hero, Single PlusTier
                // Map all the Voicelines in a PlusTier to VoicelineContainerEntries
                hero.plusVoiceLines[plusTierName as PlusTier].map(
                  (voiceline, index) => ({
                    command: `${chatwheelCommand} ${hero.name[0]} ${plusTierName}${totalVoicelines > 1 ? ` ${index + 1}` : ""}`,
                    heroNames: hero.name,
                    heroIconUrl: hero.icon,
                    plusTierName: plusTierName as PlusTier,
                    plusTierIconUrl: plusTierIconUrlList[plusTierName as PlusTier],
                    voiceline: voiceline,
                  })
                )
              );
            },
            [] as VoicelineContainerEntry[]
          )
        ),
      [] as VoicelineContainerEntry[]
    );

  return voicelineContainerEntries;
};
