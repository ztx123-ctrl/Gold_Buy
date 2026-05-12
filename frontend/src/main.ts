import "./styles/base.css";
import "./components";
import { router } from "./router";
import { renderLanding } from "./pages/LandingPage";
import { renderDashboard } from "./pages/DashboardPage";
import { renderPredictions } from "./pages/PredictionsPage";
import { renderRecords } from "./pages/RecordsPage";
import { renderInsights } from "./pages/InsightsPage";
import { renderSettings } from "./pages/SettingsPage";
import { renderChat } from "./pages/ChatPage";
import { initTheme } from "./theme";

initTheme();

router
  .on("/app/predictions", renderPredictions)
  .on("/app/records", renderRecords)
  .on("/app/insights", renderInsights)
  .on("/app/settings", renderSettings)
  .on("/app/chat", renderChat)
  .on("/app", renderDashboard)
  .on("/", renderLanding)
  .setFallback(renderLanding);

const mount = document.getElementById("app");
if (mount) {
  router.bind(mount);
}
