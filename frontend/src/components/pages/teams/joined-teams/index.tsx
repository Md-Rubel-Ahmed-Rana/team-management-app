import { useGetJoinedTeamsCardQuery } from "@/features/team";
import { useLoggedInUserQuery } from "@/features/user";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import TeamContainer from "../common/TeamContainer";

const JoinedTeams = () => {
  const { data: userData } = useLoggedInUserQuery({});
  const user = userData?.data;
  const { data: teamData, isLoading } = useGetJoinedTeamsCardQuery(user?.id);
  return (
    <section className="p-5">
      <div className="lg:flex justify-between">
        <div>
          <h1 className="lg:text-3xl font-bold">
            Management Your Teams Professionally
          </h1>
        </div>
        <div>
          <Link
            href={"/create-team"}
            className="flex items-center mt-3 lg:mt-0 gap-2  border px-5 py-2 rounded-md"
          >
            <FaPlus /> <small>Create a team</small>
          </Link>
        </div>
      </div>
      {isLoading ? (
        <div className="text-center mt-10 h-screen">
          <span className="text-lg lg:text-xl  bg-blue-500 px-5 py-3 text-white rounded-md font-semibold text-center">
            Loading joined teams...
          </span>
        </div>
      ) : (
        <TeamContainer teams={teamData?.data || []} />
      )}

      {teamData?.data?.length <= 0 && (
        <div className="text-lg lg:text-2xl font-semibold flex flex-col justify-center items-center gap-4 py-20">
          <h4>You haven&apos; have been joined any teams yet</h4>
          <p>Your joined teams will be displayed here</p>
        </div>
      )}
    </section>
  );
};

export default JoinedTeams;