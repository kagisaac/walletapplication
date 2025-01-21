"use client";

import * as React from "react";

const TOAST_LIMIT = 3;
const TOAST_REMOVE_DELAY = 5000;

interface Toast {
  id: string;
  title: string;
  description: string;
}

type State = {
  toasts: Toast[];
};

type Action =
  | { type: "ADD_TOAST"; toast: Toast }
  | { type: "REMOVE_TOAST"; toastId: string };

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const addToRemoveQueue = (
  toastId: string,
  dispatch: React.Dispatch<Action>
) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case "REMOVE_TOAST":
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };

    default:
      return state;
  }
}

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

export function useToast() {
  const [state, dispatch] = React.useReducer(reducer, {
    toasts: [],
  });

  const toast = React.useCallback(
    ({ title, description }: { title: string; description: string }) => {
      const id = genId();

      const newToast: Toast = {
        id,
        title,
        description,
      };

      dispatch({ type: "ADD_TOAST", toast: newToast });
      addToRemoveQueue(id, dispatch);

      return {
        id,
        dismiss: () => dispatch({ type: "REMOVE_TOAST", toastId: id }),
      };
    },
    []
  );

  return {
    toasts: state.toasts,
    toast,
    dismiss: (toastId: string) => dispatch({ type: "REMOVE_TOAST", toastId }),
  };
}
