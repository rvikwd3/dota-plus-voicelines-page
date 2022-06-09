import { useState } from "react";
import { VoicelineContainerEntry } from "../types";
import VoicelinesListContainer from "./components/VoicelinesListContainer";

import { plusTierIconUrlList } from "./config";
import { parseHeroesLookupTable } from "./utils/parseHeroesLookupTable";

const App = () => {
  const [voicelinesToShow, setVoicelinesToShow] = useState<
    VoicelineContainerEntry[]
  >(parseHeroesLookupTable());

  return (
    <div className="w-full h-full">
      <h1 className="text-center font-bold text-4xl text-sky-600">
        Dota Plus Voiceline Page
      </h1>
      <VoicelinesListContainer voicelines={voicelinesToShow} />
    </div>
  );
};

export default App;
