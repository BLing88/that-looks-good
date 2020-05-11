import { useReducer, TouchEvent } from "react";

const START = "start";
const MOVING = "moving";
const FINISH = "finish";

interface DisplacementVector {
  deltaX: number;
  deltaY: number;
  [propName: string]: number;
}

interface ReducerAction {
  type: string;
  [propName: string]: any;
}

const initialDragVector: DisplacementVector = {
  startX: 0,
  startY: 0,
  deltaX: 0,
  deltaY: 0,
};

const dragPosReducer = (
  state: DisplacementVector,
  action: ReducerAction
): DisplacementVector => {
  switch (action.type) {
    case START:
      return {
        ...state,
        startX: action.startX,
        startY: action.startY,
      };
    case MOVING:
      return {
        ...state,
        deltaX: action.finishX - state.startX,
        deltaY: action.finishY - state.startY,
      };
    case FINISH:
      action.finish();
      return initialDragVector;
    default:
      return state;
  }
};

interface DragDispatchObject {
  start: (e: TouchEvent) => void;
  moving: (e: TouchEvent) => void;
  finish: (f: any) => void;
}

export const useDrag = (): [number, number, DragDispatchObject] => {
  const [dragState, dispatch] = useReducer(dragPosReducer, initialDragVector);
  const dragDispatch = {
    start: (e: TouchEvent): void => {
      dispatch({
        type: START,
        startX: e.touches[0].clientX,
        startY: e.touches[0].clientY,
      });
    },
    moving: (e: TouchEvent): void => {
      dispatch({
        type: MOVING,
        finishX: e.touches[0].clientX,
        finishY: e.touches[0].clientY,
      });
    },
    finish: (finishHandler: (e?: TouchEvent) => void): void => {
      dispatch({
        type: FINISH,
        finish: finishHandler,
      });
    },
  };

  return [dragState.deltaX, dragState.deltaY, dragDispatch];
};
