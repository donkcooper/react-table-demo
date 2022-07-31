import "./App.css";
import { DataTable } from "./components/DataTable";

function App() {
  return (
    <div className="App">
      <DataTable isSorted={true} />
    </div>
  );
}

export default App;
