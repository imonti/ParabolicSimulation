import { useControls, button, folder } from "leva";
import { useContext } from "react";
import { DataContext } from "./Provider";

export default function () {
  const { dispatch } = useContext(DataContext);
  const controlOptions = {
    releaseAngle: { value: 45, min: 0, max: 90, label: "release angle (ra)" },
    radPerSec: { value: 20.0, label: "max rad x sec (rxs)" },
    diameter: { value: 0.2, label: "diameter (d)" },
    plot: button((get) => {
      dispatch({
        type: "added",
        params: [get("diameter"), get("radPerSec"), get("releaseAngle")],
      });
    }),
  };
  useControls(controlOptions);
  return <></>;
}
