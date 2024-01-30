import apiSlice from "../api/apiSlice";

const teamApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTeam: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/team/create",
        body: data,
      }),
      invalidatesTags: ["team"] as any,
    }),
    myTeams: builder.query({
      query: (id) => ({
        url: `/team/my-teams/${id}`,
      }),
      providesTags: ["team"] as any,
    }),
    joinedTeams: builder.query({
      query: (id) => ({
        url: `/team/joined-teams/${id}`,
      }),
      providesTags: ["team"] as any,
    }),
    getActiveMembers: builder.query({
      query: (id) => ({
        url: `/team/active-members/${id}`,
      }),
      providesTags: ["team"] as any,
    }),
    singleTeam: builder.query({
      query: (id) => ({
        url: `/team/${id}`,
      }),
      providesTags: ["team"] as any,
    }),
    getTeams: builder.query({
      query: (id) => ({
        url: `/api/team/my-team?admin=${id}`,
      }),
      providesTags: ["team"] as any,
    }),
  }),
});

export const {
  useCreateTeamMutation,
  useGetTeamsQuery,
  useMyTeamsQuery,
  useSingleTeamQuery,
  useJoinedTeamsQuery,
  useGetActiveMembersQuery,
} = teamApi;