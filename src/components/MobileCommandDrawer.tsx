import { CopyIcon, PlayAudioIcon } from "../icons";

type CommandDrawerProps = {
  command: string;
  setCurrentVoiceline: () => void;
  copyCommandToClipboard: () => void;
};

const MobileCommandDrawer = (props: CommandDrawerProps) => {
  return (
    <div id="mobileCommandUnderdisplay">
      <div className="z-0 grid grid-cols-7 w-full bg-stone-900 rounded-b-xl py-1 items-center gap-x-2 px-2">
        <span className="col-span-5 text-neutral-400 shadow-sm font-bold">
          {props.command}
        </span>
        <div
          className="col-span-1 cursor-pointer justify-self-center"
          onClick={props.setCurrentVoiceline}
        >
          <PlayAudioIcon className="w-[30px] drop-shadow-sm" />
        </div>
        <div
          className="col-span-1 cursor-pointer justify-self-center"
          onClick={props.copyCommandToClipboard}
          data-tooltip="Copied!"
        >
          <CopyIcon className="w-[30px] drop-shadow-sm" />
        </div>
      </div>
    </div>
  );
};

export default MobileCommandDrawer;
