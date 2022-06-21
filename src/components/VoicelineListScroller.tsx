// react imports
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";

// type imports
import { VoicelineContainerEntry } from "../../types";

// library imports
import AutoSizer from "react-virtualized-auto-sizer";
import {
  ListChildComponentProps,
  ListOnScrollProps,
  VariableSizeList as List
} from "react-window";

// context imports
import { IsSmallDisplayContext } from "../context/IsSmallDisplayContextProvider";

// component imports
import Voiceline from "./Voiceline";

const Row = ({ index, style, data }: ListChildComponentProps) => {
  const rowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (rowRef.current && !data.rowHeights.current[index]) {
      data.setRowHeight(index, rowRef.current.clientHeight);
    }
  }, [rowRef]);

  const updateOffsetRowHeight = (updatedHeight: number) => {
    if (rowRef.current && data.rowHeights.current[index]) {
      data.setRowHeight(index, data.rowHeights.current[index] + updatedHeight);
      if (data.listRef.current) {
        data.listRef.current.resetAfterIndex(0);
      }
    }
  };

  const recalculateRowHeight = () => {
    if (rowRef.current && data.rowHeights.current[index]) {
      data.setRowHeight(index, rowRef.current.clientHeight);
    }
    data.listRef.current && data.listRef.current.resetAfterIndex(0);
  };

  if (index === data.voicelines.length) {
    return (
      <div
        style={{
          ...style,
          height: "8px",
          top: (style.top as number) + data.gutterSize,
        }}
        className="block bg-inherit"
      ></div>
    );
  }

  return (
    <div
      style={{
        ...style,
        top: (style.top as number) + data.gutterSize,
        height: (style.height as number) - data.gutterSize,
      }}
      className="animateRow"
    >
      <Voiceline
        ref={rowRef}
        key={data.voicelines[index].command}
        entry={data.voicelines[index]}
        updateRowHeight={updateOffsetRowHeight}
        recalculateRowHeight={recalculateRowHeight}
      />
    </div>
  );
};

const VoicelineListScroller = React.memo(
  ({ voicelines }: { voicelines: VoicelineContainerEntry[] }) => {
    const listRef = useRef<List | null>(null);
    const listContainerRef = useRef<HTMLDivElement | null>(null);
    const rowHeights = useRef<{ [key: number]: number }>({});
    const [scrollOffset, setScrollOffset] = useState<number>(0);
    const isSmallDisplay = useContext(IsSmallDisplayContext);
    const gutterSize = 8;

    const getRowHeight = (index: number) => {
      return rowHeights.current[index] + gutterSize || 5;
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
        className="w-full md:w-5/6 max-w-6xl select-none md:select-auto h-full self-center"
        id="virtualListContainer"
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
              itemCount={voicelines.length + 1}
              itemSize={getRowHeight}
              itemData={{
                listRef: listRef,
                rowHeights: rowHeights,
                setRowHeight: setRowHeight,
                gutterSize: gutterSize,
                voicelines: voicelines,
                isSmallDisplay: isSmallDisplay,
              }}
            >
              {Row}
            </List>
          )}
        </AutoSizer>
      </div>
    );
  }
);

export default VoicelineListScroller;
