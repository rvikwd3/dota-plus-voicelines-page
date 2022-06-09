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
    <div data-tooltip={tooltip}>
      <img id="heroIcon" src={iconUrl} className={`${className} cursor-auto w-7 md:w-8`} />
    </div>
  );
};
