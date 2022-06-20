import { SyntheticEvent } from "react";
import { CancelIcon, PlayAudioIcon, SearchIcon } from "../../icons";
import { HelpTip } from "./HelpTip";

interface Props extends React.ComponentPropsWithoutRef<"div"> {
  handleHelpDialogClose: (event: SyntheticEvent) => void;
}

export const MobileHelpDialog = ({ handleHelpDialogClose }: Props) => {
  const searchIcon = (className: string) => (
    <SearchIcon className={className} />
  );
  const playAudioIcon = (className: string) => (
    <PlayAudioIcon className={className} />
  );
  const helpTipSearchTextSpan = (className: string) => (
    <span className={className}>
      Search for a voiceline by typing a part of the voiceline in the{" "}
      <strong>Search Bar</strong>
    </span>
  );
  const helpTipPlayAudioTextSpan = (className: string) => (
    <span className="text-neutral-200 text-xl [text-shadow:0_4px_8px_rgba(0,0,0,0.95)]">
      <strong>Tap / Click</strong> on a voiceline, then tap on the{" "}
      <PlayAudioIcon className="inline w-6 h-6" aria-label="Play Audio Icon" />{" "}
      'Play Audio' icon to play the voiceline's audio.
    </span>
  );

  return (
    <div className="z-30 absolute w-full h-full flex justify-center items-center bg-black/60">
      <div className="w-10/12 h-[85%] bg-neutral-800 rounded-[50px] shadow-lg overflow-hidden">
        <div className="relative mt-3 w-full h-full flex flex-col gap-y-4 items-center">
          <div
            className="absolute right-6 top-2"
            onClick={handleHelpDialogClose}
          >
            <CancelIcon className="w-9 h-9 stroke-neutral-200 active:scale-90" />
          </div>
          <span
            id="helpDialogTitle"
            className="text-[34px] text-neutral-200 font-bold underline decoration-2 underline-offset-4 uppercase text-center tracking-[0.15em]"
          >
            help
          </span>
          <div className="w-full flex-1 overflow-auto">
            <div id="helpContents" className="flex flex-col gap-y-11 pb-10">
              <HelpTip
                tipLabel="search"
                icon={searchIcon}
                tipTextSpan={helpTipSearchTextSpan}
                tipImgUrl="/images/help/searchDrink.png"
              />
              <HelpTip
                tipLabel="playAudio"
                icon={playAudioIcon}
                tipTextSpan={helpTipPlayAudioTextSpan}
                tipImgUrl="/images/help/playAudio_never.png"
              />
              <div className="p-8 bg-rose-500"></div>
              <div className="p-8 bg-emerald-500"></div>
              <div className="p-8 bg-sky-500"></div>
              <div className="p-8 bg-violet-500"></div>
              <div className="p-8 bg-orange-500"></div>
              <div className="p-8 bg-rose-500"></div>
              <div className="p-8 bg-emerald-500"></div>
              <div className="p-8 bg-sky-500"></div>
              <div className="p-8 bg-violet-500"></div>
              <div className="p-8 bg-orange-500"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
