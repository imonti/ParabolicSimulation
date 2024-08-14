import { createContext, useReducer } from "react";
import plotParabola from "./PlotParabola";

export const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [sets, dispatch] = useReducer(dataReducer, [
    plotParabola([0.2, 20, 20]),
    plotParabola([0.2, 20, 25]),
  ]);

  return (
    <DataContext.Provider value={{ sets, dispatch }}>
      {children}
    </DataContext.Provider>
  );
}

function dataReducer(sets, action) {
  switch (action.type) {
    case "added": {
      const plot = plotParabola(action.params);
      return [
        ...sets,
        {
          id: action.id,
          ...plot,
        },
      ];
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
