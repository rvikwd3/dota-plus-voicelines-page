import { SyntheticEvent, useState } from "react";
import { usePopper } from "react-popper";
import AnimateTooltip from "../components/AnimateTooltip";
import { CopyIcon } from "./CopyIcon";

export const InteractableCopyIcon = ({
  copyCallback,
  className,
  svgClassName,
  id,
}: {
  copyCallback: () => void;
  className?: string;
  svgClassName?: string;
  id?: string;
}) => {
  const [copyState, setCopyState] = useState<string>("Copy Command");
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  const [tooltipRef, setTooltipRef] = useState<HTMLAnchorElement | null>();
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

  const [hoverTimeout, setHoverTimeout] = useState<number>();

  const hoverCopyIcon = () => {
    setShowTooltip(true);
    clearTimeout(hoverTimeout); // debounce not hover
  };

  const notHoverCopyIcon = () => {
    setHoverTimeout(setTimeout(() => setShowTooltip(false), 200)); // setup for debounce if element is re-hovered
  };

  const onIconClick = async (event: SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();
    copyCallback();
    setCopyState("Copied!");
    !!update && await update();   // update is not loaded on isSmallDisplay devices
    setTimeout(async () => {
      setCopyState("Copy Command");
      !!update && await update();
    }, 5000);
  };

  return (
    <>
      <a
        onClick={onIconClick}
        onMouseEnter={hoverCopyIcon}
        onMouseLeave={notHoverCopyIcon}
        id={id}
        ref={setTooltipRef}
        className={`${className}`}
      >
        <CopyIcon className={`${svgClassName}`} />
      </a>
      <AnimateTooltip show={showTooltip}>
        <div
          className="w-max tooltip bg-stone-700 text-neutral-100 px-2 py-2 text-sm text-center rounded-md shadow-xl"
          role="tooltip"
          data-popper-placement="top"
          ref={setPoppperRef}
          style={styles.popper}
          {...attributes.popper}
        >
          <div className="arrow" ref={setArrowRef} style={styles.arrow} />
          {copyState}
        </div>
      </AnimateTooltip>
    </>
  );
};
