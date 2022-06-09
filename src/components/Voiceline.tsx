import React, { ReactPropTypes, useState } from "react";
import { VoicelineContainerEntry } from "../../types";
import { plusTierIconUrlList } from "../config";
import { CopyIcon } from "../icons";
import { Command, VoicelineText } from "./VoicelineEntry";
import { HeroIcon } from "./VoicelineEntry/HeroIcon";

const Voiceline = ({
  entry,
  setCurrentVoiceline,
  id,
  classname,
}: {
  entry: VoicelineContainerEntry;
  setCurrentVoiceline: (url: string) => void;
  id?: string;
  classname?: string;
}) => {
  const onVoicelineClick = () => {
    setCurrentVoiceline(entry.voiceline.url);
  }

  return (
    <>
      <li
        key={entry.command}
        className={`grid cursor-pointer voicelineContainer-grid voicelineContainer md:px-2`}
        onClick={onVoicelineClick}
      >
        <Command
          id="command"
          className="inline z-10 text-gray-400 text-md font-bold text-right"
          command={entry.command}
        />
        <HeroIcon className="cursor-default z-10" iconUrl={entry.heroIconUrl} tooltip={entry.heroNames.join(", ")} />
        <img
          id="plusTierIcon"
          src={plusTierIconUrlList[entry.plusTierName]}
          className="cursor-default z-10 w-7 md:w-8"
          onClick={(e) => e.stopPropagation()}
        />
        <VoicelineText
          id="voicelineText"
          className="z-10"
          text={entry.voiceline.text}
          plusTierName={entry.plusTierName}
        />
        <CopyIcon
          id="copyIcon"
          commandToCopy={entry.command}
          className="z-10 hidden md:block justify-self-end"
        />
      </li>
    </>
  );
};

export default Voiceline;
