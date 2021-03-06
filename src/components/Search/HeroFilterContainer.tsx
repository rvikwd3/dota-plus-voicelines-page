import React, { SyntheticEvent } from "react";
import { HeroFilterItem } from "../../../types";
import { ChevronUpIcon } from "../../icons";

type Props = {
  searchInputValue: string;
  heroesToShow: HeroFilterItem[];
  closeContainer: () => void;
  onHeroFilterItemClick: (event: SyntheticEvent) => void;
  id?: string;
  className?: string;
};

export const HeroFilterContainer = React.memo(
  ({
    searchInputValue,
    heroesToShow,
    closeContainer,
    onHeroFilterItemClick,
    id,
    className,
  }: Props) => {
    // Prevent onMouseDown from firing an onBlur event to SearchBar, before onClick has a chance to fire
    // https://stackoverflow.com/a/57630197/10081445
    const delaySearchBarOnBlur = (event: SyntheticEvent) => {
      event.preventDefault();
    };

    return (
      <div
        className={`bg-zinc-900 rounded-md border-4 hover:border-neutral-300 border-neutral-400 focus:border-neutral-300 outline-none overflow-y-scroll ${className}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 px-4 py-2">
          {heroesToShow.map((heroFilterItem) => (
            <div
              key={heroFilterItem.name[heroFilterItem.name.length - 1]}
              data-heroname={
                heroFilterItem.name[heroFilterItem.name.length - 1]
              }
              className="group flex flex-row gap-x-2 p-2.5 flex-grow basis-1/4 active:bg-zinc-700 rounded-xl hover:bg-neutral-800 hover:shadow-lg transition duration-200 ease-out cursor-pointer"
              onClick={onHeroFilterItemClick}
              onMouseDown={delaySearchBarOnBlur}
            >
              <div className="bg-stone-300 group-hover:bg-white rounded-full border-2 border-neutral-500 group-hover:border-neutral-300 w-12 h-12 flex items-center justify-center drop-shadow-pop transition duration-200 ease-out cursor-pointer">
                <img
                  src={heroFilterItem.icon}
                  className="w-8 h-8 drop-shadow-dark"
                />
              </div>
              <span className="text-neutral-300 group-hover:text-white group-hover:translate-x-1 text-lg tracking-wide [text-shadow:0_4px_8px_rgba(0,0,0,0.2)] font-bold capitalize text-left self-center transition duration-300 ease-out">
                {heroFilterItem.name[heroFilterItem.name.length - 1]}
              </span>
            </div>
          ))}
        </div>
        <div
          className="group sticky flex py-1 bottom-0 bg-inherit items-center justify-center active:bg-zinc-700 transiton duration-150 ease-out cursor-pointer"
          onClick={closeContainer}
        >
          <ChevronUpIcon className="group-hover:-translate-y-1 w-9 h-9 md:w-11 md:h-11 transition duration-150 ease-out" />
        </div>
      </div>
    );
  }
);
