// src/components/AdminTeamDashboard.js
import React, { useState } from "react";
import { useLoggedInUserQuery } from "../../features/user/userApi";
import { useMyTeamsQuery } from "../../features/team/teamApi";
import { ITeam } from "../../interfaces/team.interface";
import TeamDetails from "./TeamDetails";
import CreateTeamModal from "../teams/teamCreation/CreateTeam";

const MyTeams = () => {
  const { data: userData } = useLoggedInUserQuery({});
  const user = userData?.data;
  const { data: teamData } = useMyTeamsQuery(user?._id);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col  gap-5 p-4">
      <div className="mt-4">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Create New Team
        </button>
        {teamData?.data?.length <= 0 && (
          <h4 className="text-xl font-semibold mt-4">
            You haven't create team yet.
          </h4>
        )}
      </div>
      {teamData?.data?.map((team: ITeam) => (
        <TeamDetails key={team._id} team={team} />
      ))}

      {isOpen && <CreateTeamModal isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
};

export default MyTeams;