import { Navigate } from "react-router-dom";

export default function TrialGuard({ children }) {
  const trialActive = localStorage.getItem("trial_active") === "true";
  const trialExpiresRaw = localStorage.getItem("trial_expires");
  const trialExpires = trialExpiresRaw ? Number(trialExpiresRaw) : null;
  const now = Date.now();

  const trialExpired = !trialActive || (trialExpires !== null && Number.isFinite(trialExpires) && now >= trialExpires);
  if (trialExpired) {
    localStorage.removeItem("trial_active");
    localStorage.removeItem("trial_expires");
    localStorage.removeItem("trial_start");

    return <Navigate to="/" replace />;
  }

  return children;
}
