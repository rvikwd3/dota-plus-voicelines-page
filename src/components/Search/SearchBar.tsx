import { SyntheticEvent } from "react";

export const SearchBar = ({
  searchInputValue,
  setSearchInputValue,
  onSearchInputFocus,
  onSearchInputBlur,
  id,
  className,
}: {
  searchInputValue: string;
  setSearchInputValue: (value: string) => void;
  onSearchInputFocus: (event: SyntheticEvent) => void;
  onSearchInputBlur: (event: SyntheticEvent) => void;
  id?: string;
  className?: string;
}) => {
  const onSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearchInputValue(event.target.value);
  };

  const clearSearchInput = (event: SyntheticEvent) => {
    event.preventDefault();
    setSearchInputValue("");
  };

  return (
    <div className={`${className} relative w-full md:w-5/6 max-w-6xl`} id={id}>
      <span className="sr-only">Search</span>
      <span className="absolute ml-3 pointer-events-none inset-y-0 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="z-10 icon icon-tabler icon-tabler-search stroke-neutral-300 shadow-sm"
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
        className="z-0 w-full h-12 md:h-14 pr-2 pl-12 py-2 rounded-md bg-zinc-800 border-4 border-neutral-700 hover:border-neutral-600 focus:border-neutral-400 text-neutral-100 placeholder:text-neutral-400 text-lg md:text-2xl tracking-tight [text-shadow:0_4px_8px_rgba(0,0,0,0.12)] outline-none transition duration-200 ease-in"
        placeholder="Search for heroes and quotes..."
        type="text"
        name="search"
        value={searchInputValue}
        onChange={onSearchInputChange}
        onFocus={onSearchInputFocus}
        onBlur={onSearchInputBlur}
      />
      {searchInputValue.length > 0 && (
        <span
          onClick={clearSearchInput}
          className="absolute right-4 cursor-pointer inset-y-0 flex items-center active:scale-75 hover:scale-95 transition duration-100 ease-in"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="z-10 icon icon-tabler icon-tabler-x shadow-sm stroke-neutral-500 hover:stroke-neutral-200 transition duration-100 ease-out"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#ffffff"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </span>
      )}
    </div>
  );
};
