import { PropsWithRef } from "react";
import { VoicelineContainerEntry } from "../../../types";

export const Command = ({ command, className, id }: {
  command: string;
  className: string;
  id: string;
}) => {
  return (
    <div id={id} className={className} >
      <span className="cursor-auto" onClick={(e) => e.stopPropagation()}>{command.replace(/\!chatwheel| 0/g, "")}</span>
    </div>
  )
};
