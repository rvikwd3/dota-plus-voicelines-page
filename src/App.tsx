import { useEffect, useState } from "react";
import { SearchBarContainer } from "./components/SearchBar";
import VoicelinesListContainer from "./components/VoicelinesListContainer";

const App = () => {
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  
  useEffect(() => {
    console.log(`Search input value: ${searchInputValue}`);
  }, [searchInputValue]);

  return (
    <div className="w-full h-full flex flex-col justify-center">
      <h1 className="text-center font-bold text-4xl text-rose-500">
        Dota Plus Voiceline Page
      </h1>
      <SearchBarContainer searchInputValue={searchInputValue} setSearchInputValue={setSearchInputValue}/>
      <VoicelinesListContainer searchInputValue={searchInputValue}/>
    </div>
  );
};

export default App;
