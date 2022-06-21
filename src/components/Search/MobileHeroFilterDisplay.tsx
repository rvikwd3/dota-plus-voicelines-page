import { SyntheticEvent, useMemo } from "react";
import { CancelIcon } from "../../icons";
import { parseHeroFilterItems } from "../../utils/parseHeroFilterItems";

interface Props extends React.ComponentPropsWithoutRef<"div"> {
  heroName: string;
  clearHeroFilter: () => void;
}

export const MobileHeroFilterDisplay = ({
  heroName,
  clearHeroFilter,
}: Props) => {
  const getHeroIconUrl = useMemo(
    () => parseHeroFilterItems().find((item) => item.name.includes(heroName))?.icon,
    [heroName]
  );

  const handleCancelClick = (event: SyntheticEvent) => {
    event.stopPropagation(); // Prevent SearchBar from opening the HeroFilterContainer on clicking Cancel
    clearHeroFilter();
  };

  return (
    <div className="flex flex-row mx-3 items-center gap-x-2 mb-2">
      <div onClick={handleCancelClick} className="active:scale-90">
        <CancelIcon className="w-9 h-9" />
      </div>
      <div className="bg-stone-800 rounded-full p-2">
        <img src={getHeroIconUrl} className="w-7 h-7" />
      </div>
      <span className="pl-1 text-xl text-white capitalize font-bold">
        {heroName}
      </span>
    </div>
  );
};
