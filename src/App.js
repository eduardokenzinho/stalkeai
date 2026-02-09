import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Feed from "./pages/Feed";
import Direct from "./pages/Direct";
import Chat1 from "./pages/Chat1";
import Chat2 from "./pages/Chat2";
import Chat3 from "./pages/Chat3";
import Chat4 from "./pages/Chat4";
import Chat5 from "./pages/Chat5";
import Cta from "./pages/Cta";
import TrialGuard from "./components/TrialComponents/TrialGuard";
import "./index.css";

function PageViewTracker() {
  const location = useLocation();
  useEffect(() => {
    // Meta Pixel removed
  }, [location.pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <PageViewTracker />
      <Routes>
        {/* HOME SEM BLOQUEIO */}
        <Route path="/" element={<Home />} />

        {/* ROTAS PROTEGIDAS PELO TRIAL */}
        <Route
          path="/feed"
          element={
            <TrialGuard>
              <Feed />
            </TrialGuard>
          }
        />

        <Route
          path="/direct"
          element={
            <TrialGuard>
              <Direct />
            </TrialGuard>
          }
        />

        <Route
          path="/chat1"
          element={
            <TrialGuard>
              <Chat1 />
            </TrialGuard>
          }
        />

        <Route
          path="/chat2"
          element={
            <TrialGuard>
              <Chat2 />
            </TrialGuard>
          }
        />

        <Route
          path="/chat3"
          element={
            <TrialGuard>
              <Chat3 />
            </TrialGuard>
          }
        />

        <Route
          path="/chat4"
          element={
            <TrialGuard>
              <Chat4 />
            </TrialGuard>
          }
        />

        <Route
          path="/chat5"
          element={
            <TrialGuard>
              <Chat5 />
            </TrialGuard>
          }
        />

        {/* CTA SEM BLOQUEIO (DESTINO FINAL) */}
        <Route path="/cta" element={<Cta />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
