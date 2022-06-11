export const HeroIcon = ({
  iconUrl,
  tooltip,
  id,
  className,
}: {
  iconUrl: string;
  tooltip: string;
  id?: string;
  className?: string;
}) => {
  return (
    <div data-tooltip={tooltip} className={`${className}`}>
      <img id="heroIcon" src={iconUrl} className="cursor-auto w-7 md:w-8" />
    </div>
  );
};
