import "./styles.css";
import LinePlot from "./LinePlot";
import { DataProvider } from "./Provider";
import UI from "./UI";

export default function App() {
  return (
    <>
      <DataProvider>
        <LinePlot />
        <UI />
      </DataProvider>
    </>
  );
}
