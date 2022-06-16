import { SyntheticEvent, useContext, useState } from "react";
import { usePopper } from "react-popper";
import { DispatchContext } from "../context/VoicelineAudioContextProvider";
import { InteractableCopyIcon, PlayAudioIcon } from "../icons";
import AnimateTooltip from "./AnimateTooltip";

type CommandDrawerProps = {
  command: string;
  voicelineUrl: string;
  copyCommandToClipboard: () => void;
};

const MobileCommandDrawer = (props: CommandDrawerProps) => {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const audioDispatch = useContext(DispatchContext);

  const [tooltipRef, setTooltipRef] = useState<HTMLDivElement | null>();
  const [popperRef, setPoppperRef] = useState<HTMLDivElement | null>();
  const [arrowRef, setArrowRef] = useState<HTMLDivElement | null>();
  const { update, styles, attributes } = usePopper(tooltipRef, popperRef, {
    placement: "top",
    modifiers: [
      {
        name: "arrow",
        options: {
          element: arrowRef,
        },
      },
      {
        name: "offset",
        options: {
          offset: [0, 0],
        },
      },
    ],
  });

  const onPlayAudioIconClick = (event: SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 1000);
    audioDispatch({ type: "STOP"});
    audioDispatch({ type: "PLAY_AUDIO", payload: { url: props.voicelineUrl } });
  };

  return (
    <div id="mobileCommandUnderdisplay">
      <div className="z-0 grid grid-cols-7 w-full bg-stone-900 rounded-b-xl py-1 items-center gap-x-2 px-2">
        <span className="col-span-5 text-neutral-400 shadow-sm font-bold">
          {props.command}
        </span>
        <div
          className="col-span-1 cursor-pointer justify-self-center active:scale-75 transition duration-100"
          ref={setTooltipRef}
          onClick={onPlayAudioIconClick}
        >
          <PlayAudioIcon className="w-[30px] drop-shadow-sm stroke-neutral-300" />
        </div>
        <AnimateTooltip id="playingAudioTooltip" show={showTooltip}>
          <div
            className="w-max tooltip bg-stone-700 text-neutral-100 px-2 py-2 text-sm text-center rounded-md shadow-xl"
            role="tooltip"
            data-popper-placement="top"
            ref={setPoppperRef}
            style={styles.popper}
            {...attributes.popper}
          >
            <div className="arrow" ref={setArrowRef} style={styles.arrow} />
            <span>Playing...</span>
          </div>
        </AnimateTooltip>
        <div className="col-span-1 cursor-pointer justify-self-center items-center">
          <InteractableCopyIcon
            id="mobileCopyIcon"
            className="drop-shadow-sm"
            svgClassName="w-[30px] stroke-neutral-300 active:scale-75 transition duration-100"
            copyCallback={props.copyCommandToClipboard}
          />
        </div>
      </div>
    </div>
  );
};

export default MobileCommandDrawer;
