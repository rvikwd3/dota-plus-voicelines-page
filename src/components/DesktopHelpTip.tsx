import { SyntheticEvent, useState } from "react";
import { HelpContentSwitch } from "../../types";

interface Props extends React.ComponentPropsWithoutRef<"div"> {
  icon: (className: string) => React.ReactNode;
  tipTitle: string;
  tipText: (className: string) => React.ReactNode;
  tipImgUrl: string;
}

const DesktopHelpTip = ({
  className,
  icon,
  tipTitle,
  tipText,
  tipImgUrl,
}: Props) => {
  const [textImgSwitch, setTextImgSwitch] = useState<HelpContentSwitch>(
    HelpContentSwitch.text
  );

  const handleHelpContentClick = (event: SyntheticEvent) =>
    setTextImgSwitch(
      (prevState) =>
        (prevState =
          prevState === HelpContentSwitch.text
            ? HelpContentSwitch.img
            : HelpContentSwitch.text)
    );

  return (
    <div className={`w-1/4 h-36 relative grid grid-rows-4 gap-y-2 justify-items-center ${className}`}>
      <div className="row-span-1 flex flex-row items-center gap-x-2">
        {icon("w-8 h-8 stroke-neutral-200")}
        <span className="text-xl font-bold text-neutral-200 textShadow">
          {tipTitle}
        </span>
      </div>
      {textImgSwitch === HelpContentSwitch.text ? (
        <div onClick={handleHelpContentClick} className="row-span-3 cursor-pointer text-center">
          {tipText(
            "text-base leading-tight tracking-wide text-center text-neutral-200 textShadow"
          )}
        </div>
      ) : (
        <div
          className="max-w-max h-max row-span-3 rounded-xl border border-neutral-700 overflow-hidden shadow-md cursor-pointer"
          onClick={handleHelpContentClick}
        >
          <img src={tipImgUrl} className=""/>
        </div>
      )}
    </div>
  );
};

export default DesktopHelpTip;
