import { useControls, button } from "leva";
import { useContext } from "react";
import { DataContext } from "./Provider";

export default function () {
  const { dispatch } = useContext(DataContext);
  useControls({
    releaseAngle: { value: 45, min: 0, max: 90, label: "release angle" },
    radPerSec: { value: 20.0, label: "max rad x sec" },
    diameter: { value: 0.2 },
    plot: button((get) => {
      dispatch({
        type: "added",
        params: [get("diameter"), get("radPerSec"), get("releaseAngle")],
      });
    }),
  });
}
