import { useReducer, PointerEvent } from "react";

const START = "start";
const MOVING = "moving";
const FINISH = "finish";
const RESET = "reset";

interface DisplacementVector {
  deltaX: number;
  deltaY: number;
  startX: number;
  startY: number;
  //[propName: string]: number;
}

interface ReducerAction {
  type: typeof START | typeof MOVING | typeof FINISH | typeof RESET;
  [propName: string]: any;
}

interface PointerDown {
  pointerDown: boolean;
}

type DragState = DisplacementVector & PointerDown;

const initialState: DragState = {
  startX: 0,
  startY: 0,
  deltaX: 0,
  deltaY: 0,
  pointerDown: false,
};

const dragPosReducer = (
  state: DisplacementVector & PointerDown,
  action: ReducerAction
): DragState => {
  switch (action.type) {
    case START:
      return {
        ...state,
        startX: action.startX,
        startY: action.startY,
        pointerDown: true,
      } as DragState;
    case MOVING:
      return {
        ...state,
        deltaX: action.finishX - state.startX,
        deltaY: action.finishY - state.startY,
      };
    case FINISH:
      return initialState;
    case RESET:
    default:
      return state;
  }
};

interface DragDispatchObject {
  start: (e: PointerEvent) => void;
  moving: (e: PointerEvent) => void;
  finish: (f: (e?: PointerEvent) => void) => void;
  reset: () => void;
}

export const useDrag = (): [number, number, boolean, DragDispatchObject] => {
  const [dragState, dispatch] = useReducer(dragPosReducer, initialState);
  const dragDispatch = {
    start: (e: PointerEvent): void => {
      dispatch({
        type: START,
        startX: e.clientX,
        startY: e.clientY,
      });
    },
    moving: (e: PointerEvent): void => {
      dispatch({
        type: MOVING,
        finishX: e.clientX,
        finishY: e.clientY,
      });
    },
    finish: (finishHandler: (e?: PointerEvent) => void): void => {
      dispatch({
        type: FINISH,
      });
      finishHandler();
    },
    reset: () => dispatch({ type: RESET }),
  };

  return [
    dragState.deltaX,
    dragState.deltaY,
    dragState.pointerDown,
    dragDispatch,
  ];
};
