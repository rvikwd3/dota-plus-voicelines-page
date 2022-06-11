import React, { forwardRef } from "react";
import { CopyIcon, PlayAudioIcon } from "../icons";

type CommandDrawerProps = {
  command: string;
  setCurrentVoiceline: () => void;
  copyCommandToClipboard: () => void;
};

const MobileCommandDrawer = (props: CommandDrawerProps) => (
  <div id="mobileCommandUnderdisplay">
    <div className="grid grid-cols-7 w-full bg-stone-900 rounded-b-xl py-1 items-center gap-x-2 px-2">
      <span className="col-span-5 text-neutral-200 shadow-sm">
        {props.command}
      </span>
      <div
        className="col-span-1 cursor-pointer"
        onClick={props.setCurrentVoiceline}
      >
        <PlayAudioIcon className="w-[30px] drop-shadow-sm" />
      </div>
      <div
        className="col-span-1 cursor-pointer drop-shadow-sm"
        onClick={props.copyCommandToClipboard}
      >
        <CopyIcon className="w-[30px]" />
      </div>
    </div>
  </div>
);

export default MobileCommandDrawer;
