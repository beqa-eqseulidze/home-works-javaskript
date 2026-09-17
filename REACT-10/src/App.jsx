import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Step1 from './pages/Step1';
import Step2 from './pages/Step2';
import Step3 from './pages/Step3';

function App(){
  return(
    <Router>
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-4 flex flex-col md:flex-row w-full max-w-4xl">

          <Sidebar />

          <div className="flex-1 p-6 md:p-10 flex flex-col justify-between">
            <Routes>
              <Route path="/" element={<Navigate to="/step-1" replace />} />
              <Route path="/step-1" element={<Step1 />} />
              <Route path="/step-2" element={<Step2 />} />
              <Route path="/step-3" element={<Step3 />} />
            </Routes>
          </div>

        </div>
      </div>
    </Router>
  );
}

export default App;