import "./App.css";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TeamMember from "./pages/TeamMember";
import MyTeamDownline from "./pages/MyTeamDownline";
import Rewards from "./pages/Rewards";
import WithdrawHistory from "./pages/WithdrawHistory";
import RoyalityIncome from "./pages/RoyalityIncome";
import RoyalityHistory from "./pages/RoyalityHistory";
import NodeReward from "./pages/NodeReward";

function App() {
  return (
    <div className="App">
      <div className="main">
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/teammember" element={<TeamMember />} />
            <Route path="/myteamdownline" element={<MyTeamDownline />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/withdrawhistory" element={<WithdrawHistory />} />
            <Route path="/royalityincome" element={<RoyalityIncome />} />
            <Route path="/royalityhistory" element={<RoyalityHistory />} />
            <Route path="/nodereward" element={<NodeReward />} />
            <Route
              exact
              path="/iframe"
              element={
                <iframe
                  src="http://localhost:3000?0x6B63b63ce0c59D63a263B1B8cF9c52D912b9A608"
                  id="iframe_id"
                  style={{ height: "1000px", width: "100%" }}
                ></iframe>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
      <NotificationContainer />
    </div>
  );
}

export default App;
