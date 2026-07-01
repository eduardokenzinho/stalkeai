import { Navigate } from "react-router-dom";

export default function TrialGuard({ children }) {
  const trialActive = localStorage.getItem("trial_active") === "true";
  const trialExpires = parseInt(localStorage.getItem("trial_expires"), 10);
  const now = Date.now();

  const trialExpired = !trialActive || !trialExpires || now >= trialExpires;
  if (trialExpired) {
    localStorage.removeItem("trial_active");
    localStorage.removeItem("trial_expires");
    localStorage.removeItem("trial_start");

    return <Navigate to="/" replace />;
  }

  return children;
}
