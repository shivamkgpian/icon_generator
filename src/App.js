import ImageGenerator from './component/ImageGenerator';
import './App.css';
import { Route, Routes } from "react-router-dom";


function App() {
  return (
    <Routes>
      <Route path="/" element={<ImageGenerator />} />

    </Routes>
  );
}

export default App;
