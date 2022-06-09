export interface Voiceline {
  text: string;
  url: string;
}

export enum PlusTier {
  bonus = "bonus",
  bag = "bag",
  bronze = "bronze",
  silver = "silver",
  gold = "gold",
  platinum = "platinum",
  master = "master",
  grandmaster = "grandmaster"
}

export interface VoicelineContainerEntry {
  command: string;
  heroNames: string[];
  heroIconUrl: string;
  plusTierName: PlusTier;
  plusTierIconUrl: string;
  voiceline: Voiceline;
}

export type PlusVoicelines =  {
  [key in PlusTier]?: Array<Voiceline>;
}

export interface Hero {
  name: Array<String>;
  icon: string;
  selection: string;
  avatar: string;
  plusVoicelines: PlusVoicelines;
}