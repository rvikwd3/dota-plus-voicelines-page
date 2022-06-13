export const HeroIcon = ({
  iconUrl,
  id,
  className,
}: {
  iconUrl: string;
  id?: string;
  className?: string;
}) => {
  return (
    <div className="justify-self-center cursor-default shadow-sm">
      <img id="heroIcon" src={iconUrl} className="cursor-auto w-7 md:w-8" />
    </div>
  );
};
