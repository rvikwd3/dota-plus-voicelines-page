import { useEffect, useState } from "react";
import { SearchContainer } from "./components/Search";
import VoicelinesListContainer from "./components/VoicelinesListContainer";
import IsSmallDisplayContextProvider from "./context/IsSmallDisplayContextProvider";

const App = () => {
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [heroFilter, setHeroFilter] = useState<string | null>("");

  useEffect(() => {
    // console.log(`Search input value: ${searchInputValue}`);
  }, [searchInputValue]);

  return (
    <div className="w-full h-full flex flex-col justify-center">
      <h1 className="text-center font-bold text-4xl text-rose-500">
        Dota Plus Voiceline Page
      </h1>
      <IsSmallDisplayContextProvider>
        <SearchContainer
          searchInputValue={searchInputValue}
          setSearchInputValue={setSearchInputValue}
          heroFilter={heroFilter}
          setHeroFilter={setHeroFilter}
        />
        <VoicelinesListContainer searchInputValue={searchInputValue} />
      </IsSmallDisplayContextProvider>
    </div>
  );
};

export default App;
