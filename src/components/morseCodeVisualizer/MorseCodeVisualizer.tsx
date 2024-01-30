import { useEffect, useState, useRef } from "react";
import "./MorseCodeVisualizer.css";
import TimerNode from "../timerNode/TimerNode";
import Line from "../line/Line";
import MorseCodeTree from "../../lib/morseCodeTree/MorseCodeTree";
import { dit, dah } from "../../lib/sound/sound";

const OFFSET_MAX = 1000;
const TIMER_SPEED = 10;

function useKeyboardEvent(key: string, callback: () => void) {
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === key) {
        callback();
      }
    };

    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
    };
  });
}

const MorseCodeVisualizer = () => {
  const useGeneratedRef = () => {
    return useRef(null);
  }

  const [isPaused, setIsPaused] = useState(true);
  const [offset, setOffset] = useState(0);
  const [tree, setTree] = useState(new MorseCodeTree(useGeneratedRef, true));
  const [message, setMessage] = useState("");
  // const ref = {
  //   E: useRef<SVGSVGElement>(null),
  //   I: useRef<SVGSVGElement>(null)
  // }
  //const refNodeE = useRef<SVGSVGElement>(null);
  //const refNodeI = useRef<SVGSVGElement>(null);

  const handleClearClick = () => {
    setMessage("");
  };

  const handleBackspaceClick = () => {
    setMessage(message.slice(0, message.length - 1));
  }

  const handleDitClick = () => {
    dit.play();
    setIsPaused(true);
    tree.offset = 0;
    setTree(tree.dit);
    setOffset(0);
    setIsPaused(false);
  };

  const handleDahClick = () => {
    dah.play();
    setIsPaused(true);
    tree.offset = 0;
    setTree(tree.dah);
    setOffset(0);
    setIsPaused(false);
  };

  useEffect(() => {
    if (!isPaused && offset < OFFSET_MAX) {
      const timerId = setTimeout(() => {
        if (!isPaused) {
          const newOffset = offset + TIMER_SPEED;

          setOffset(newOffset);
          tree.offset = newOffset;

          //Fire callback when timer ends
          if (newOffset >= OFFSET_MAX) {
            //props.onTimerEnds();
            setMessage(message + tree.value);
            tree.restart();
            setTree(tree);
          }
        }
      }, 10);

      return () => clearTimeout(timerId);
    }
  });

  useKeyboardEvent("ArrowLeft", handleDitClick);
  useKeyboardEvent("ArrowRight", handleDahClick);
  useKeyboardEvent("Backspace", handleBackspaceClick);
  useKeyboardEvent("Delete", handleClearClick);

  return (
    <div className="tree-container">
      <div className="tree-row one">
        <div className="tree-node">
          <button onClick={handleClearClick}>Clear</button>
          <button onClick={handleDitClick}>Dit ( . )</button>
          <button onClick={handleDahClick}>Dah ( - )</button>
        </div>
      </div>
      <div className="tree-row one">
        <div className="tree-node">
        <TimerNode
            position={0}
            character="Start"
            className="node"
            ref={tree.dict["root"].ref}
          />
        </div>
      </div>
      <div className="tree-row two">
        <div className="tree-node">
          <TimerNode
            position={tree.dict["E"].payload.offset}
            character="E"
            className="node"
            ref={tree.dict["E"].ref}
          />
        </div>
        <div className="tree-node">
          <TimerNode
            position={tree.dict["T"].payload.offset}
            character="T"
            className="node"
            ref={tree.dict["T"].ref}
          />
        </div>
      </div>
      <div className="tree-row three">
        <div className="tree-node">
          <TimerNode
            position={tree.dict["I"].payload.offset}
            character="I"
            className="node"
            ref={tree.dict["I"].ref}
          />
        </div>
        <div className="tree-node">
          <TimerNode
            position={tree.dict["A"].payload.offset}
            character="A"
            className="node"
            ref={tree.dict["A"].ref}
          />
        </div>
        <div className="tree-node">
          <TimerNode
            position={tree.dict["N"].payload.offset}
            character="N"
            className="node"
            ref={tree.dict["N"].ref}
          />
        </div>
        <div className="tree-node">
          <TimerNode
            position={tree.dict["M"].payload.offset}
            character="M"
            className="node"
            ref={tree.dict["M"].ref}
          />
        </div>
      </div>
      <div className="tree-row four">
        <div className="tree-node">
          <TimerNode
            position={tree.dict["S"].payload.offset}
            character="S"
            className="node"
            ref={tree.dict["S"].ref}
          />
        </div>
        <div className="tree-node">
          <TimerNode
            position={tree.dict["U"].payload.offset}
            character="U"
            className="node"
            ref={tree.dict["U"].ref}
          />
        </div>
        <div className="tree-node">
          <TimerNode
            position={tree.dict["R"].payload.offset}
            character="R"
            className="node"
            ref={tree.dict["R"].ref}
          />
        </div>
        <div className="tree-node">
          <TimerNode
            position={tree.dict["W"].payload.offset}
            character="W"
            className="node"
            ref={tree.dict["W"].ref}
          />
        </div>
        <div className="tree-node">
          <TimerNode
            position={tree.dict["D"].payload.offset}
            character="D"
            className="node"
            ref={tree.dict["D"].ref}
          />
        </div>
        <div className="tree-node">
          <TimerNode
            position={tree.dict["K"].payload.offset}
            character="K"
            className="node"
            ref={tree.dict["K"].ref}
          />
        </div>
        <div className="tree-node">
          <TimerNode
            position={tree.dict["G"].payload.offset}
            character="G"
            className="node"
            ref={tree.dict["G"].ref}
          />
        </div>
        <div className="tree-node">
          <TimerNode
            position={tree.dict["O"].payload.offset}
            character="O"
            className="node"
            ref={tree.dict["O"].ref}
          />
        </div>
      </div>
      <div className="tree-row five">
        <div className="tree-node">
          <TimerNode
            position={tree.dict["H"].payload.offset}
            character="H"
            className="node"
            ref={tree.dict["H"].ref}
          />
        </div>
        <div className="tree-node">
          <TimerNode
            position={tree.dict["V"].payload.offset}
            character="V"
            className="node"
            ref={tree.dict["V"].ref}
          />
        </div>
        <div className="tree-node">
          <TimerNode
            position={tree.dict["F"].payload.offset}
            character="F"
            className="node"
            ref={tree.dict["F"].ref}
          />
        </div>
        <div className="tree-node">
          <TimerNode
            position={tree.dict["_1"].payload.offset}
            character=""
            className="node"
            ref={tree.dict["_1"].ref}
          />
        </div>
        <div className="tree-node">
          <TimerNode
            position={tree.dict["L"].payload.offset}
            character="L"
            className="node"
            ref={tree.dict["L"].ref}
          />
        </div>
        <div className="tree-node">
          <TimerNode
            position={tree.dict["_2"].payload.offset}
            character=""
            className="node"
            ref={tree.dict["_2"].ref}
          />
        </div>
        <div className="tree-node">
          <TimerNode
            position={tree.dict["P"].payload.offset}
            character="P"
            className="node"
            ref={tree.dict["P"].ref}
          />
        </div>
        <div className="tree-node">
          <TimerNode
            position={tree.dict["J"].payload.offset}
            character="J"
            className="node"
            ref={tree.dict["J"].ref}
          />
        </div>
        <div className="tree-node">
          <TimerNode
            position={tree.dict["B"].payload.offset}
            character="B"
            className="node"
            ref={tree.dict["B"].ref}
          />
        </div>
        <div className="tree-node">
          <TimerNode
            position={tree.dict["X"].payload.offset}
            character="X"
            className="node"
            ref={tree.dict["X"].ref}
          />
        </div>
        <div className="tree-node">
          <TimerNode
            position={tree.dict["C"].payload.offset}
            character="C"
            className="node"
            ref={tree.dict["C"].ref}
          />
        </div>
        <div className="tree-node">
          <TimerNode
            position={tree.dict["Y"].payload.offset}
            character="Y"
            className="node"
            ref={tree.dict["Y"].ref}
          />
        </div>
        <div className="tree-node">
          <TimerNode
            position={tree.dict["Z"].payload.offset}
            character="Z"
            className="node"
            ref={tree.dict["Z"].ref}
          />
        </div>
        <div className="tree-node">
          <TimerNode
            position={tree.dict["Q"].payload.offset}
            character="Q"
            className="node"
            ref={tree.dict["Q"].ref}
          />
        </div>
        <div className="tree-node">
          <TimerNode
            position={tree.dict["_3"].payload.offset}
            character=""
            className="node"
            ref={tree.dict["_3"].ref}
          />
        </div>
        <div className="tree-node">
          <TimerNode
            position={tree.dict["_4"].payload.offset}
            character=""
            className="node"
            ref={tree.dict["_4"].ref}
          />
        </div>
      </div>
      <div className="tree-row six">
        <div className="tree-node">
          <TimerNode
            position={tree.dict["5"].payload.offset}
            character="5"
            className="node"
            ref={tree.dict["5"].ref}
          />
        </div>
        <div className="tree-node">
          <TimerNode
            position={tree.dict["4"].payload.offset}
            character="4"
            className="node"
            ref={tree.dict["4"].ref}
          />
        </div>
        <div className="tree-node">
          <TimerNode
            position={tree.dict["_5"].payload.offset}
            character=""
            className="node"
            ref={tree.dict["_5"].ref}
          />
        </div>
        <div className="tree-node">
          <TimerNode
            position={tree.dict["3"].payload.offset}
            character="3"
            className="node"
            ref={tree.dict["3"].ref}
          />
        </div>
        <div className="tree-node">
          <TimerNode
            position={tree.dict["_6"].payload.offset}
            character=""
            className="node"
            ref={tree.dict["_6"].ref}
          />
        </div>
        <div className="tree-node">
          <TimerNode
            position={tree.dict["_7"].payload.offset}
            character=""
            className="node"
            ref={tree.dict["_7"].ref}
          />
        </div>
        <div className="tree-node">
          <TimerNode
            position={tree.dict["_8"].payload.offset}
            character=""
            className="node"
            ref={tree.dict["_8"].ref}
          />
        </div>
        <div className="tree-node">
          <TimerNode
            position={tree.dict["2"].payload.offset}
            character="2"
            className="node"
            ref={tree.dict["2"].ref}
          />
        </div>
        <div className="tree-node">
          <TimerNode
            position={tree.dict["_9"].payload.offset}
            character=""
            className="node"
            ref={tree.dict["_9"].ref}
          />
        </div>
        <div className="tree-node">
          <TimerNode
            position={tree.dict["_10"].payload.offset}
            character=""
            className="node"
            ref={tree.dict["_10"].ref}
          />
        </div>
        <div className="tree-node">
          <TimerNode
            position={tree.dict["plus"].payload.offset}
            character="+"
            className="node"
            ref={tree.dict["plus"].ref}
          />
        </div>
        <div className="tree-node">
          <TimerNode
            position={tree.dict["_11"].payload.offset}
            character=""
            className="node"
            ref={tree.dict["_11"].ref}
          />
        </div>
        <div className="tree-node">
          <TimerNode
            position={tree.dict["_12"].payload.offset}
            character=""
            className="node"
            ref={tree.dict["_12"].ref}
          />
        </div>
        <div className="tree-node">
          <TimerNode
            position={tree.dict["_13"].payload.offset}
            character=""
            className="node"
            ref={tree.dict["_13"].ref}
          />
        </div>
        <div className="tree-node">
          <TimerNode
            position={tree.dict["_14"].payload.offset}
            character=""
            className="node"
            ref={tree.dict["_14"].ref}
          />
        </div>
        <div className="tree-node">
          <TimerNode
            position={tree.dict["1"].payload.offset}
            character="1"
            className="node"
            ref={tree.dict["1"].ref}
          />
        </div>
        <div className="tree-node">
          <TimerNode
            position={tree.dict["6"].payload.offset}
            character="6"
            className="node"
            ref={tree.dict["6"].ref}
          />
        </div>
        <div className="tree-node">
          <TimerNode
            position={tree.dict["equal"].payload.offset}
            character="="
            className="node"
            ref={tree.dict["equal"].ref}
          />
        </div>
        <div className="tree-node">
          <TimerNode
            position={tree.dict["stroke"].payload.offset}
            character="/"
            className="node"
            ref={tree.dict["stroke"].ref}
          />
        </div>
        <div className="tree-node">
          <TimerNode
            position={tree.dict["_15"].payload.offset}
            character=""
            className="node"
            ref={tree.dict["_15"].ref}
          />
        </div>
        <div className="tree-node">
          <TimerNode
            position={tree.dict["_16"].payload.offset}
            character=""
            className="node"
            ref={tree.dict["_16"].ref}
          />
        </div>
        <div className="tree-node">
          <TimerNode
            position={tree.dict["_17"].payload.offset}
            character=""
            className="node"
            ref={tree.dict["_17"].ref}
          />
        </div>
        <div className="tree-node">
          <TimerNode
            position={tree.dict["_18"].payload.offset}
            character=""
            className="node"
            ref={tree.dict["_18"].ref}
          />
        </div>
        <div className="tree-node">
          <TimerNode
            position={tree.dict["_19"].payload.offset}
            character=""
            className="node"
            ref={tree.dict["_19"].ref}
          />
        </div>
        <div className="tree-node">
          <TimerNode
            position={tree.dict["7"].payload.offset}
            character="7"
            className="node"
            ref={tree.dict["7"].ref}
          />
        </div>
        <div className="tree-node">
          <TimerNode
            position={tree.dict["_20"].payload.offset}
            character=""
            className="node"
            ref={tree.dict["_20"].ref}
          />
        </div>
        <div className="tree-node">
          <TimerNode
            position={tree.dict["_21"].payload.offset}
            character=""
            className="node"
            ref={tree.dict["_21"].ref}
          />
        </div>
        <div className="tree-node">
          <TimerNode
            position={tree.dict["_22"].payload.offset}
            character=""
            className="node"
            ref={tree.dict["_22"].ref}
          />
        </div>
        <div className="tree-node">
          <TimerNode
            position={tree.dict["8"].payload.offset}
            character="8"
            className="node"
            ref={tree.dict["8"].ref}
          />
        </div>
        <div className="tree-node">
          <TimerNode
            position={tree.dict["_23"].payload.offset}
            character=""
            className="node"
            ref={tree.dict["_23"].ref}
          />
        </div>
        <div className="tree-node">
          <TimerNode
            position={tree.dict["9"].payload.offset}
            character="9"
            className="node"
            ref={tree.dict["9"].ref}
          />
        </div>
        <div className="tree-node">
          <TimerNode
            position={tree.dict["0"].payload.offset}
            character="0"
            className="node"
            ref={tree.dict["0"].ref}
          />
        </div>
      </div>
      <div className="message">{message}</div>
      <Line from={tree.dict["root"].ref} to={tree.dict["E"].ref} />
      <Line from={tree.dict["root"].ref} to={tree.dict["T"].ref} dash />

      <Line from={tree.dict["E"].ref} to={tree.dict["I"].ref} />
      <Line from={tree.dict["E"].ref} to={tree.dict["A"].ref} dash />
      <Line from={tree.dict["I"].ref} to={tree.dict["S"].ref} />
      <Line from={tree.dict["I"].ref} to={tree.dict["U"].ref} dash />
      <Line from={tree.dict["A"].ref} to={tree.dict["R"].ref} />
      <Line from={tree.dict["A"].ref} to={tree.dict["W"].ref} dash />
      <Line from={tree.dict["S"].ref} to={tree.dict["H"].ref} />
      <Line from={tree.dict["S"].ref} to={tree.dict["V"].ref} dash />
      <Line from={tree.dict["U"].ref} to={tree.dict["F"].ref} />
      <Line from={tree.dict["U"].ref} to={tree.dict["_1"].ref} dash />
      <Line from={tree.dict["R"].ref} to={tree.dict["L"].ref} />
      <Line from={tree.dict["R"].ref} to={tree.dict["_2"].ref} dash />
      <Line from={tree.dict["W"].ref} to={tree.dict["P"].ref} />
      <Line from={tree.dict["W"].ref} to={tree.dict["J"].ref} dash />

      <Line from={tree.dict["T"].ref} to={tree.dict["N"].ref} />
      <Line from={tree.dict["T"].ref} to={tree.dict["M"].ref} dash />
      <Line from={tree.dict["N"].ref} to={tree.dict["D"].ref} />
      <Line from={tree.dict["N"].ref} to={tree.dict["K"].ref} dash />
      <Line from={tree.dict["M"].ref} to={tree.dict["G"].ref} />
      <Line from={tree.dict["M"].ref} to={tree.dict["O"].ref} dash />
      <Line from={tree.dict["D"].ref} to={tree.dict["B"].ref} />
      <Line from={tree.dict["D"].ref} to={tree.dict["X"].ref} dash />
      <Line from={tree.dict["K"].ref} to={tree.dict["C"].ref} />
      <Line from={tree.dict["K"].ref} to={tree.dict["Y"].ref} dash />
      <Line from={tree.dict["G"].ref} to={tree.dict["Z"].ref} />
      <Line from={tree.dict["G"].ref} to={tree.dict["Q"].ref} dash />
      <Line from={tree.dict["O"].ref} to={tree.dict["_3"].ref} />
      <Line from={tree.dict["O"].ref} to={tree.dict["_4"].ref} dash />

      <Line from={tree.dict["H"].ref} to={tree.dict["5"].ref} />
      <Line from={tree.dict["H"].ref} to={tree.dict["4"].ref} dash />
      <Line from={tree.dict["V"].ref} to={tree.dict["_5"].ref} />
      <Line from={tree.dict["V"].ref} to={tree.dict["3"].ref} dash />
      <Line from={tree.dict["F"].ref} to={tree.dict["_6"].ref} />
      <Line from={tree.dict["F"].ref} to={tree.dict["_7"].ref} dash />
      <Line from={tree.dict["_1"].ref} to={tree.dict["_8"].ref} />
      <Line from={tree.dict["_1"].ref} to={tree.dict["2"].ref} dash />
      <Line from={tree.dict["L"].ref} to={tree.dict["_9"].ref} />
      <Line from={tree.dict["L"].ref} to={tree.dict["_10"].ref} dash />
      <Line from={tree.dict["_2"].ref} to={tree.dict["plus"].ref} />
      <Line from={tree.dict["_2"].ref} to={tree.dict["_11"].ref} dash />
      <Line from={tree.dict["P"].ref} to={tree.dict["_12"].ref} />
      <Line from={tree.dict["P"].ref} to={tree.dict["_13"].ref} dash />
      <Line from={tree.dict["J"].ref} to={tree.dict["_14"].ref} />
      <Line from={tree.dict["J"].ref} to={tree.dict["1"].ref} dash />

      <Line from={tree.dict["B"].ref} to={tree.dict["6"].ref} />
      <Line from={tree.dict["B"].ref} to={tree.dict["equal"].ref} dash />
      <Line from={tree.dict["X"].ref} to={tree.dict["stroke"].ref} />
      <Line from={tree.dict["X"].ref} to={tree.dict["_15"].ref} dash />
      <Line from={tree.dict["C"].ref} to={tree.dict["_16"].ref} />
      <Line from={tree.dict["C"].ref} to={tree.dict["_17"].ref} dash />
      <Line from={tree.dict["Y"].ref} to={tree.dict["_18"].ref} />
      <Line from={tree.dict["Y"].ref} to={tree.dict["_19"].ref} dash />
      <Line from={tree.dict["Z"].ref} to={tree.dict["7"].ref} />
      <Line from={tree.dict["Z"].ref} to={tree.dict["_20"].ref} dash />
      <Line from={tree.dict["Q"].ref} to={tree.dict["_21"].ref} />
      <Line from={tree.dict["Q"].ref} to={tree.dict["_22"].ref} dash />
      <Line from={tree.dict["_3"].ref} to={tree.dict["8"].ref} />
      <Line from={tree.dict["_3"].ref} to={tree.dict["_23"].ref} dash />
      <Line from={tree.dict["_4"].ref} to={tree.dict["9"].ref} />
      <Line from={tree.dict["_4"].ref} to={tree.dict["0"].ref} dash />
    </div>
  );
};

export default MorseCodeVisualizer;
