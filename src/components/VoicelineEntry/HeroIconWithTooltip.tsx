import { useState } from "react";
import { usePopper } from "react-popper";
import AnimateTooltip from "../AnimateTooltip";

export const HeroIconWithTooltip = ({
  iconUrl,
  tooltipText,
  id,
  className,
}: {
  iconUrl: string;
  tooltipText: string;
  id?: string;
  className?: string;
}) => {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [tooltipRef, setTooltipRef] = useState<HTMLDivElement | null>();
  const [popperRef, setPoppperRef] = useState<HTMLDivElement | null>();
  const [arrowRef, setArrowRef] = useState<HTMLDivElement | null>();
  const { update, styles, attributes, state } = usePopper(tooltipRef, popperRef, {
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
          offset: [0, 10],
        },
      },
    ],
  });

  const [hoverTimeout, setHoverTimeout] = useState<number>();
  const hoverIcon = () => {
    setShowTooltip(true);
    clearTimeout(hoverTimeout); // debounce not hover
  };
  const notHoverIcon = () => {
    setHoverTimeout(setTimeout(() => setShowTooltip(false), 200)); // setup for debounce if element is re-hovered
  };

  return (
    <>
      <div
        onMouseEnter={hoverIcon}
        onMouseLeave={notHoverIcon}
        id={id}
        className="justify-self-center cursor-default shadow-sm"
        ref={setTooltipRef}
      >
        <img id="heroIcon" src={iconUrl} className="cursor-auto w-7 md:w-8" />
      </div>
      <AnimateTooltip show={showTooltip}>
        <div
          className="w-max tooltip bg-stone-700 text-neutral-100 px-2 py-2 text-sm text-center rounded-md shadow-2xl max-w-[200px]"
          role="tooltip"
          data-popper-placement="top"
          ref={setPoppperRef}
          style={styles.popper}
          {...attributes.popper}
        >
          <div className="arrow" ref={setArrowRef} style={styles.arrow} />
          {tooltipText}
        </div>
      </AnimateTooltip>
    </>
  );
};
