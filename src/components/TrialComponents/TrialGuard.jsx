import { Navigate } from "react-router-dom";

export default function TrialGuard({ children }) {
  const trialActive = localStorage.getItem("trial_active");
  const trialExpires = localStorage.getItem("trial_expires");

  // Se nunca iniciou trial → deixa passar (home)
  if (!trialActive || !trialExpires) {
    return children;
  }

  const now = Date.now();
  const expiresAt = parseInt(trialExpires);

  // Trial expirou → bloqueia tudo
  if (now >= expiresAt) {
    return <Navigate to="/cta" replace />;
  }

  // Trial válido → deixa acessar
  return children;
}
