import { animated, config, useTransition } from "@react-spring/web";
import { SyntheticEvent } from "react";
import { CancelIcon } from "../../icons";

interface Props extends React.ComponentPropsWithoutRef<"div"> {
  showDrawer: boolean;
  handleMenuClose: (event: SyntheticEvent) => void;
  handleMobileHelpNavClick: (event: SyntheticEvent) => void;
}

export const MobileNavDrawer = ({
  showDrawer,
  handleMenuClose,
  handleMobileHelpNavClick,
  className,
}: Props) => {
  const slideMenu = useTransition(showDrawer, {
    from: { transform: "translate3d(-130%, 0, 0)" },
    enter: { transform: "translate3d(0%, 0, 0)" },
    leave: { transform: "translate3d(-130%, 0, 0)" },
    config: config.default,
  });
  return (
    <>
      {slideMenu(
        (styles, show) =>
          show && (
            <animated.div
              id="mobileNavSlideout"
              style={styles}
              className={`w-8/12 h-full bg-[#222] shadow-menu border-r-2 border-zinc-400 ${className}`}
            >
              <div className="flex flex-col gap-y-4 w-full relative">
                <div
                  className="absolute top-6 right-4 active:scale-90"
                  onClick={handleMenuClose}
                >
                  <CancelIcon className="w-10 h-10 drop-shadow-md" />
                </div>
                <div className="flex flex-col gap-y-7 mt-28 ml-10">
                  <a
                    href="#"
                    className="self-start"
                    onClick={handleMobileHelpNavClick}
                  >
                    <span className="text-3xl tracking-wide font-bold text-white [text-shadow:0_4px_8px_rgba(0,0,0,0.2)]">
                      Help
                    </span>
                  </a>
                  <a
                    href="#"
                    className="text-3xl tracking-wide text-white font-bold self-start [text-shadow:0_4px_8px_rgba(0,0,0,0.2)]"
                  >
                    About
                  </a>
                </div>
              </div>
            </animated.div>
          )
      )}
    </>
  );
};
