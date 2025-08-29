declare module "react-fast-marquee" {
  import * as React from "react";
  interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
    speed?: number;
    gradient?: boolean;
    gradientColor?: string;
    gradientWidth?: number | string;
    pauseOnHover?: boolean;
    pauseOnClick?: boolean;
    direction?: "left" | "right" | "up" | "down";
    delay?: number;
    loop?: number;
    play?: boolean;
    autoFill?: boolean;
    onFinish?: () => void;
    onCycleComplete?: () => void;
    onMount?: () => void;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
  }
  const Marquee: React.FC<MarqueeProps>;
  export default Marquee;
}
