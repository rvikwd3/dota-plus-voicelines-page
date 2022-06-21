import { animated, easings, useTransition } from "@react-spring/web";

interface Props extends React.ComponentPropsWithoutRef<"div"> {
  showBackdrop: boolean;
}

export const MobileHelpDialogBackdrop = ({ showBackdrop, className }: Props) => {
  const fadeHelpDialogBackdrop = useTransition(showBackdrop, {
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
      {fadeHelpDialogBackdrop(
        (styles, show) =>
          show && (
            <animated.div
              style={styles}
              className={`bg-black/80 ${className}`}
            />
          )
      )}
    </>
  );
};
