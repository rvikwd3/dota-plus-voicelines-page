import { animated, easings, useTransition } from "@react-spring/web";

const AnimateTooltip = ({ children, show, id }: { children: React.ReactNode; show: boolean; id?: string; }) => {
  const animateTooltip = useTransition(show, {
    from: { opacity: 0, y: 5 },
    enter: { opacity: 1, y: 1 },
    leave: { opacity: 0, y: 5 },
    config: {
      duration: 200,
      easing: easings.easeOutQuart,
    },
  });
  return (
    <>
      {animateTooltip(
        (style, item) =>
          item && <animated.div id={`${id}`} className="absolute z-20" style={style}>{children}</animated.div>
      )}
    </>
  );
};

export default AnimateTooltip;