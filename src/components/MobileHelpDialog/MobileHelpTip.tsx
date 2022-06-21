interface Props extends React.ComponentPropsWithoutRef<"div"> {
  icon: (className: string) => React.ReactNode;
  tipTextSpan: (className: string) => React.ReactNode;
  tipImgUrl: string;
  tipLabel: string;
}

export const MobileHelpTip = ({ icon, tipTextSpan, tipImgUrl, tipLabel }: Props) => {
  return (
    <div id={`helpTip-${tipLabel}`} className="flex flex-col gap-y-4">
      <div className="px-4 flex flex-row gap-x-4 items-center">
        <div>{icon("w-11 h-11 drop-shadow-md")}</div>
        {tipTextSpan( "text-neutral-200 text-xl [text-shadow:0_4px_8px_rgba(0,0,0,0.95)]")}
      </div>
      <div className="mx-4 rounded-xl border border-neutral-700 overflow-hidden shadow-md">
        <img src={tipImgUrl} />
      </div>
    </div>
  );
};
