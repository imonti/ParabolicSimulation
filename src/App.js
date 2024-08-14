import "./styles.css";
import LinePlot from "./LinePlot";
import { DataProvider } from "./Provider";

export default function App() {
  return (
    <div>
      <DataProvider>
        <LinePlot />
      </DataProvider>
    </div>
  );
}
