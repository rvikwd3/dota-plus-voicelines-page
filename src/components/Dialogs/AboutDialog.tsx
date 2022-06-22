import { animated, config, useTransition } from "@react-spring/web";
import { SyntheticEvent, useContext } from "react";
import { IsSmallDisplayContext } from "../../context/IsSmallDisplayContextProvider";
import { CancelIcon, DiscordIcon, GithubIcon, TwitterIcon } from "../../icons";
import { DarkenBackdrop } from "./DarkenBackdrop";

interface Props extends React.ComponentPropsWithoutRef<"div"> {
  showAbout: boolean;
  handleAboutClose: (event: SyntheticEvent) => void;
}

export const AboutDialog = ({
  showAbout,
  handleAboutClose,
  className,
}: Props) => {
  const isSmallDisplay = useContext(IsSmallDisplayContext);
  const slideAboutDialog = useTransition(showAbout, {
    from: { transform: "translate3d(0, 100%, 0)" },
    enter: { transform: "translate3d(0, 0%, 0)" },
    leave: { transform: "translate3d(0, 100%, 0)" },
    config: config.default,
  });

  return (
    <>
      <DarkenBackdrop
        showBackdrop={showAbout}
        className="w-full h-full absolute z-20"
      />
      {slideAboutDialog(
        (styles, show) =>
          show && (
            <animated.div
              style={styles}
              className={`flex justify-center items-center ${className}`}
            >
              <div className="relative w-11/12 md:w-8/12 max-w-[800px] h-[80%] md:h-[70%] bg-neutral-900 rounded-3xl border-4 border-neutral-800 hover:border-neutral-700 shadow-lg overflow-hidden flex justify-center transition duration-200 ease-out">
                <div
                  className="absolute z-10 top-3 right-4 cursor-pointer"
                  onClick={handleAboutClose}
                >
                  <CancelIcon className="w-10 h-10 stroke-neutral-400 active:scale-90 transition duration-100 ease-out" />
                </div>
                <div className="w-5/6 no-list-scrollbar h-full flex flex-col gap-y-8 items-center justify-between overflow-y-scroll">
                  <span className="pt-8 pb-4 uppercase text-3xl tracking-widest font-bold text-neutral-200">
                    about
                  </span>
                  <p className="text-neutral-200 text-base text-center tracking-wide">
                    This website was developed as a reference to use with the
                    Streamer Dota Voiceline project.
                    <br />
                    You can find the Streamer Dota Voiceline project on Github.
                  </p>
                  <a
                    href="#"
                    className="group px-4 py-2 border-2 bg-neutral-800 hover:bg-neutral-700 hover:-translate-y-0.5 active:bg-neutral-900 active:translate-y-0.5 border-neutral-600 hover:border-neutral-400 rounded-2xl flex flex-row items-center gap-x-2 transition duration-200 ease-out"
                  >
                    <GithubIcon className="w-9 h-9 stroke-neutral-200 group-hover:stroke-white group-hover:scale-110 transition duration-200 ease-out" />
                    <span className="text-lg text-neutral-200 tracking-wide group-hover:text-white text-center">
                      Streamer Dota Voiceline Project
                    </span>
                  </a>
                  <p className="text-neutral-300 text-base">
                    Inspired by{" "}
                    <a
                      href="https://www.twitch.tv/tsunami643/"
                      className="hover:text-violet-400 transition duration-300 ease-out"
                    >
                      tsunami643's{" "}
                    </a>
                    <a
                      href="https://clips.twitch.tv/NastyThoughtfulTitanHeyGuys-iCZEKXSnLILbuJFW"
                      className="cursor-pointer hover:text-violet-400"
                    >
                      Twitch Chat Point Reward - Dota Plus Voiceline
                    </a>
                  </p>
                  <p className="text-neutral-400 text-base">
                    <img
                      className="inline w-5 h-5 mx-1"
                      src="/images/bonus.png"
                    />{" "}
                    'Bonus' Dota Plus Tier icon used with permission from{" "}
                    <a
                      href="https://www.twitch.tv/tsunami643/"
                      className="hover:text-violet-400 transition duration-300 ease-out"
                    >
                      tsunami643
                    </a>
                  </p>
                  <div className="flex flex-col gap-y-2">
                    <img
                      className="w-16 h-16 rounded-full border-neutral-200 border-2 self-center hover:scale-110 transition duration-200 ease-out"
                      src="/images/avatar/croppedOpenAIProfile.jpg"
                    />
                    <span className="text-neutral-200 text-center text-base font-bold">
                      Ravikiran Kawade
                    </span>
                    <div className="flex flex-row gap-x-4 justify-center">
                      <a href="https://github.com/rvikwd3">
                        <GithubIcon className="w-8 h-8 stroke-neutral-500 hover:stroke-white hover:scale-125 transition duration-200 ease-out" />
                      </a>
                      <a href="https://twitter.com/rvikwd7">
                        <TwitterIcon className="w-8 h-8 stroke-neutral-500 hover:stroke-sky-300 hover:scale-125 transition duration-200 ease-out" />
                      </a>
                      <a href="https://discordapp.com/users/258205847480565760/">
                        <DiscordIcon className="w-8 h-8 stroke-neutral-500 hover:stroke-indigo-500 hover:scale-125 transition duration-200 ease-out" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </animated.div>
          )
      )}
    </>
  );
};
