import { useEffect, useState } from "react";

export const SearchBar = ({searchInputValue, setSearchInputValue}: {searchInputValue: string; setSearchInputValue: (value: string) => void;}) => {

  const onSearchInputChange = (event: React.ChangeEvent<HTMLInputElement> ) => {
    event.preventDefault();
    setSearchInputValue(event.target.value);
  }

  return (
    <div className="relative w-full md:w-5/6">
      <span className="sr-only">Search</span>
      <span className="absolute ml-3 pointer-events-none inset-y-0 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-search stroke-neutral-300"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="#ffffff"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <circle cx="10" cy="10" r="7" />
          <line x1="21" y1="21" x2="15" y2="15" />
        </svg>
      </span>
      <input
        className="w-full pr-2 pl-12 py-2 rounded-md bg-zinc-800 border-4 border-neutral-700 focus:border-neutral-400 text-neutral-100 placeholder:text-neutral-400 text-2xl tracking-tight outline-none transition duration-200 ease-in"
        placeholder="Search for heroes and quotes..."
        type="text"
        name="search"
        value={searchInputValue}
        onChange={onSearchInputChange}
      />
    </div>
  );
};
