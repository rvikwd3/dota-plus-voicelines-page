import { HeroFilterItem } from "../../types";
import heroesLookupTable from "../data/heroesLookupTable_manuallyHydrated.json";

export const parseHeroFilterItems = (): HeroFilterItem[] => {
  return heroesLookupTable.map(entry => ({name: entry.name, icon: entry.icon, avatar: entry.avatar, selection: entry.selection }));
}