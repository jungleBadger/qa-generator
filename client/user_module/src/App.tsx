import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import MyStudyContent from "./pages/MyStudyContent";
import StudyContent from "./pages/StudyContent";

function App() {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-200 h-full">
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/criar" element={<Create />} />
          <Route path="/meus-estudos" element={<MyStudyContent />} />
          <Route path="*" element={<div>Not found</div>} />
          <Route path="/estudo/:id" element={<StudyContent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
