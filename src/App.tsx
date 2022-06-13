import { SearchBarContainer } from "./components/SearchBar";
import VoicelinesListContainer from "./components/VoicelinesListContainer";

const App = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <h1 className="text-center font-bold text-4xl text-sky-600">
        Dota Plus Voiceline Page
      </h1>
      <SearchBarContainer />
      <VoicelinesListContainer />
    </div>
  );
};

export default App;
