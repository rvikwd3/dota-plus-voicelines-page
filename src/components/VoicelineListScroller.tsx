import React, { useCallback, useEffect, useRef, useState } from "react";
import { VoicelineContainerEntry } from "../../types";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import Voiceline from "./Voiceline";
import {
  incrementVoicelinesShownOnScroll,
  initialVoicelinesShown,
} from "../config";
import {
  ListChildComponentProps,
  VariableSizeList as List,
  FixedSizeList as FList,
  ListOnScrollProps,
} from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

const VoicelineListScroller = ({
  voicelines,
  setCurrentVoiceline,
}: {
  voicelines: VoicelineContainerEntry[];
  setCurrentVoiceline: (url: string) => void;
}) => {
  // const { loadMoreTriggerRef, limit } = useInfiniteScroll(
  //   initialVoicelinesShown,
  //   incrementVoicelinesShownOnScroll
  // );

  const [isSmallDisplay, setIsSmallDisplay] = useState<boolean>(
    !window.matchMedia("(min-width: 768px").matches
  );

  useEffect(() => {
    window
      .matchMedia("(min-width: 768px")
      .addEventListener("change", (e) => setIsSmallDisplay(!e.matches));
  }, []);

  const listRef = useRef<List | null>(null);
  const listContainerRef = useRef<HTMLDivElement | null>(null);
  const rowHeights = useRef<{ [key: number]: number }>({});
  const [scrollOffset, setScrollOffset] = useState<number>(0);

  const Row = ({ index, style }: ListChildComponentProps) => {
    const rowRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      if (rowRef.current) {
        // console.log(
        //   `Client height for '%c${voicelines[index].command}%c' is %c${rowRef.current.clientHeight}`,
        //   "color: cyan",
        //   "color: white",
        //   "color: forestgreen"
        // );
        setRowHeight(index, rowRef.current.clientHeight);
      }
    }, [rowRef]);

    return (
      <div style={style}>
        <Voiceline
          ref={rowRef}
          key={voicelines[index].command}
          entry={voicelines[index]}
          isSmallDisplay={isSmallDisplay}
          setCurrentVoiceline={setCurrentVoiceline}
        />
      </div>
    );
  };

  const getRowHeight = (index: number) => {
    return rowHeights.current[index] + 8 || 60;
  };

  const setRowHeight = useCallback((index: number, size: number) => {
    rowHeights.current = { ...rowHeights.current, [index]: size };
    listRef.current!.resetAfterIndex(0);
  }, []);

  // onKeyDown event listener added to an e.g. <div> that wraps list/grid
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case "PageUp": // page up
        listRef.current!.scrollTo(
          scrollOffset - listContainerRef.current!.clientHeight
        );
        break;
      case "PageDown": // page down
        listRef.current!.scrollTo(
          scrollOffset + listContainerRef.current!.clientHeight
        );
        break;
      case "Home":
        listRef.current!.scrollTo(0);
        break;
    }
  };

  // onScroll handler added to list
  const handleListScroll = ({ scrollOffset }: ListOnScrollProps) => {
    setScrollOffset(scrollOffset);
  };

  return (
    <div
      className="md:w-5/6 max-w-6xl h-full self-center"
      ref={listContainerRef}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <AutoSizer>
        {({ width, height }) => (
          <List
            ref={listRef}
            className="no-list-scrollbar"
            onScroll={handleListScroll}
            width={width}
            height={height}
            itemCount={voicelines.length}
            itemSize={getRowHeight}
          >
            {Row}
          </List>
        )}
      </AutoSizer>
      {/* <div className="md:w-5/6 max-w-6xl flex flex-col gap-y-2 select-none md:select-auto">
        {voicelines.map((entry) => (
          <Voiceline
          key={entry.command}
          entry={entry}
          isSmallDisplay={isSmallDisplay}
          setCurrentVoiceline={setCurrentVoiceline}
          />
          ))}
        </div> */}
      {/* <div
        id="loadMoreVoicelinesArrow"
        ref={loadMoreTriggerRef}
        className="text-neutral-200 text-xl text-center p-4 mb-10"
        >
        {limit <= voicelines.length && (
          <DownArrow className="animate-bounce drop-shadow-sm" />
          )}
        </div> */}
    </div>
  );
};

export default VoicelineListScroller;
