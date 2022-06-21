import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { CancelIcon } from "../../icons";
import { parseHeroFilterItems } from "../../utils/parseHeroFilterItems";

interface Props extends React.ComponentPropsWithoutRef<"div"> {
  heroName: string;
  clearHeroFilter: () => void;
}

export const SearchBarHeroFilterDisplay = ({ heroName, clearHeroFilter }: Props) => {
  const [heroIconUrl, setHeroIconUrl] = useState<string>("");
  const [heroFilterName, setHeroFilterName] = useState<string>(heroName);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

  const filterRef = useRef<HTMLDivElement>(null);
  const heroNameRef = useRef<HTMLSpanElement>(null);

  // Animate collapsing HeroFilterDisplay
  // https://css-tricks.com/using-css-transitions-auto-dimensions/
  const collapse = () => {

    if (filterRef.current) {
      const scrollWidth = filterRef.current.scrollWidth;  // 
      const tempTransitions = filterRef.current.style.transition;
      filterRef.current.style.transition = "";
      requestAnimationFrame(() => {
        if (filterRef.current) {
          filterRef.current.style.width = scrollWidth + "px";
          filterRef.current.style.transition = tempTransitions;
        }

        requestAnimationFrame(() => {
          if (filterRef.current) {
            filterRef.current.style.width = 0 + "px";
            filterRef.current.classList.add("collapsed");

            filterRef.current.addEventListener(
              "transitionend",
              function handleTransitionEnd() {
                // IF clause protects setting isCollapsed & heroFilterName on load
                // We want to prevent setting heroFilterName because on load heroName is empty string
                if (!isCollapsed) {
                  setIsCollapsed(true);
                  setHeroFilterName(heroName);
                }
                this.removeEventListener("transitionend", handleTransitionEnd);
              }
            );
          }
        });
      });
    }
  };

  // Animate expanding HeroFilterDisplay
  // https://css-tricks.com/using-css-transitions-auto-dimensions/
  const expand = () => {
    if (filterRef.current && heroNameRef.current) {
      filterRef.current.style.display = "flex";
      const heroNameScrollWidth = heroNameRef.current.scrollWidth;
      filterRef.current.style.width = heroNameScrollWidth + 80 + "px";  // 80px is approximately how wide the rest of the HeroFilterDisplay elements are
      filterRef.current.classList.remove("collapsed");
    }
    setIsCollapsed(false);
  };

  useEffect(() => {
    // On heroName change, set heroFilterName and find the heroIconUrl
    const heroIconUrl = parseHeroFilterItems().find((item) =>
      item.name.includes(heroName)
    )?.icon;
    heroIconUrl && setHeroIconUrl(heroIconUrl);

    // If setting heroName from empty to non-empty, set heroFilterName THEN expand
    // Else FIRST collapse HeroFilterDisplay, then set heroFilterName
    heroName ? setHeroFilterName(heroName) : collapse();
  }, [heroName]);

  useEffect(() => {
    heroFilterName && expand();
  }, [heroFilterName]);

  // Remove element from DOM if collapsed
  useEffect(() => {
    if (filterRef.current) {
      filterRef.current.style.display = isCollapsed ? "none" : "block";
    }
  }, [isCollapsed]);

  const handleCancelClick = (event: SyntheticEvent) => {
    event.stopPropagation(); // Prevent SearchBar from opening the HeroFilterContainer on clicking Cancel
    clearHeroFilter();
  };

  return (
    <div ref={filterRef} className="heroFilterItem">
      <div className="flex flex-row gap-x-1 pl-2 pr-3 py-2 rounded-2xl bg-neutral-600 items-center">
        <div
          onClick={handleCancelClick}
          className="hover:scale-110 cursor-pointer flex-grow-0"
        >
          <CancelIcon className="w-6 h-6" />
        </div>
        <img src={heroIconUrl} className="w-7 h-7 flex-grow-0" />
        <span
          ref={heroNameRef}
          className="text-neutral-100 text-lg w-max text-left font-bold tracking-wide capitalize whitespace-nowrap flex-shrink-0"
        >
          {heroFilterName}
        </span>
      </div>
    </div>
  );
};