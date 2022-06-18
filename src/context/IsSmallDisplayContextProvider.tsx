import { createContext, PropsWithChildren, useEffect, useState } from "react";

export const IsSmallDisplayContext = createContext<boolean>(true);

const IsSmallDisplayContextProvider = ({children}: PropsWithChildren) => {
    const [isSmallDisplay, setIsSmallDisplay] = useState<boolean>(
      !window.matchMedia("(min-width: 768px").matches
    );

    useEffect(() => {
      window
        .matchMedia("(min-width: 768px")
        .addEventListener("change", (e) => setIsSmallDisplay(!e.matches));
    }, []);

    return (
      <IsSmallDisplayContext.Provider value={isSmallDisplay}>
        {children}
      </IsSmallDisplayContext.Provider>
    )
}

export default IsSmallDisplayContextProvider;