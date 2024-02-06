import React, { CSSProperties, HTMLAttributes } from "react";

const timerStyle: CSSProperties = {
  fill: "none",
  stroke: "#8cc63f",
  strokeMiterlimit: 10,
  strokeWidth: "50px",
  strokeDasharray: "1000",
  transitionProperty: "offset",
  transitionDuration: "0.25s",
  transitionTimingFunction: "linear",
  transitionDelay: "0s"
};

export enum TimerPosition {
  Beginning = 0,
  Half = 500,
  End = 1000
}

export interface TimerNodeProps {
  position: number;
  character: string;
}

const TimerNode = React.forwardRef<
  SVGSVGElement,
  TimerNodeProps & HTMLAttributes<SVGAElement>
>(
  (props, ref): JSX.Element => {
    /*
<path 
    d="
    M cx cy
    m -r, 0
    a r,r 0 1,0 (r * 2),0
    a r,r 0 1,0 -(r * 2),0
    "            
/>
  */
    return (
      <svg viewBox="0, 0, 368.7, 368.7" className={props.className} ref={ref}>
        <path
          style={{ ...timerStyle, strokeDashoffset: `${props.position}` }}
          d="
            M 184.35, 184.35
            m 0, -159.35
            a 159.35, 159.35  180  1 1  0,318.7
            a 159.35, 159.35  180  1 1  0,-318.7
            "
        />
        <circle cx="184.35" cy="184.35" r="159.35" fill="#E6E7E8" />
        <text
          style={{
            fill: "#1D3756",
            fontSize: `${(props.character.length === 1 ? "15em" : "8em")}`,
            fontFamily: "Trebuchet MS"
          }}
          x="50%"
          y="56%"
          dominantBaseline="middle"
          textAnchor="middle"
        >
          {props.character}
        </text>
      </svg>
    );
  }
);

export default TimerNode;
