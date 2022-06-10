import { lazy, Suspense } from "react";
import Spinner from "./components/Spinner";

const VoicelinesListContainer = lazy(() => import("./components/VoicelinesListContainer"));

const App = () => {
  return (
    <div className="w-full h-full">
      <h1 className="text-center font-bold text-4xl text-sky-600">
        Dota Plus Voiceline Page
      </h1>

      <Suspense
        fallback={
          <div className="flex text-center justify-center items-center pt-28">
            <Spinner />
          </div>
        }
      >
        <VoicelinesListContainer />
      </Suspense>
    </div>
  );
};

export default App;
