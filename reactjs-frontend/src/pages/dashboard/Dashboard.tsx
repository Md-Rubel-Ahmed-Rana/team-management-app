import { useState } from "react";
import Sidebar from "./Sidebar";
import ProfilePage from "../Profile/ProfilePage";
import MyTeams from "./MyTeams";
import PaymentPage from "./PaymentPage";
import JoinedTeams from "./JoinedTeams";
import PendingInvitation from "./PendingInvitation";

const Dashboard = () => {
  const [activeView, setActiveView] = useState("profile");
  return (
    <div className="flex h-screen gap-4">
      <Sidebar setActiveView={setActiveView} activeView={activeView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto ">
          {activeView === "my-teams" && <MyTeams />}
          {activeView === "joined-teams" && <JoinedTeams />}
          {activeView === "invitations" && <PendingInvitation />}
          {activeView === "profile" && <ProfilePage />}
          {activeView === "payments" && <PaymentPage />}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;