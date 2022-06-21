import { animated, easings, useTransition } from "@react-spring/web";

interface Props extends React.ComponentPropsWithoutRef<"div"> {
  showBackdrop: boolean;
}

export const DarkenBackdrop = ({ showBackdrop, className }: Props) => {
  const fadeBackdrop = useTransition(showBackdrop, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      duration: 400,
      easing: easings.easeOutCubic,
    },
  });
  return (
    <>
      {fadeBackdrop(
        (styles, show) =>
          show && (
            <animated.div
              id="darkBackdrop"
              style={styles}
              className={`bg-black/80 ${className}`}
            />
          )
      )}
    </>
  );
};
