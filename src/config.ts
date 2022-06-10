import { PlusTier } from "../types"

export const chatwheelCommand: string = "!chatwheel"

export const plusTierIconUrlList: {[key in PlusTier]: string} = {
  bonus: "/images/bonus.png",
  bag: "/images/bagit_1_png.png",
  bronze: "/images/bronze.png",
  silver: "/images/silver.png",
  gold: "/images/gold.png",
  platinum: "/images/platinum.png",
  master: "/images/master.png",
  grandmaster: "/images/grandmaster.png",
}

export const initialVoicelinesShown: number = 50;
export const incrementVoicelinesShownOnScroll: number = 40;