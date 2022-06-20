import React, { createContext, PropsWithChildren, useReducer } from "react";

type ReducerAction =
  | { type: "PLAY_AUDIO"; payload: { url: string } }
  | { type: "STOP" };

export const StateContext = createContext({ audio: new Audio() });
export const DispatchContext = createContext<React.Dispatch<ReducerAction>>(
  () => {}
);

const VoicelineAudioContextProvider = ({ children }: PropsWithChildren) => {
  const voicelineAudioReducer = (
    state: { audio: HTMLAudioElement; controller: AbortController },
    action: ReducerAction
  ) => {
    switch (action.type) {
      case "PLAY_AUDIO":
        const audio = new Audio(action.payload.url);
        const controller = new AbortController();
        audio.volume = 0.4;
        audio.addEventListener("canplaythrough", () => audio.play(), {
          signal: controller.signal,
        });
        return { ...state, audio: audio, controller: controller };
      case "STOP":
        state.audio.pause();
        state.audio.currentTime = 0;
        state.controller.abort();
        return { ...state };
      default:
        return state;
    }
  };

  const [audioState, audioDispatch] = useReducer(voicelineAudioReducer, {
    audio: new Audio(),
    controller: new AbortController(),
  });

  return (
    <DispatchContext.Provider value={audioDispatch}>
      <StateContext.Provider value={audioState}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export default VoicelineAudioContextProvider;
