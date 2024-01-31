import apiSlice from "../api/apiSlice";
import Cookies from "js-cookie";

const invitationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendInvitation: builder.mutation({
      query: ({ teamId, memberId }) => ({
        headers: {
          authorization: Cookies.get("tmAccessToken"),
        },
        method: "POST",
        url: `/invitation/send/${teamId}/${memberId}`,
      }),
      invalidatesTags: ["team", "invitation"] as any,
    }),
    acceptInvitation: builder.mutation({
      query: ({ teamId, memberId }) => ({
        headers: {
          authorization: Cookies.get("tmAccessToken"),
        },
        method: "POST",
        url: `/invitation/accept/${teamId}/${memberId}`,
      }),
      invalidatesTags: ["team", "invitation"] as any,
    }),
    rejectInvitation: builder.mutation({
      query: ({ teamId, memberId }) => ({
        headers: {
          authorization: Cookies.get("tmAccessToken"),
        },
        method: "POST",
        url: `/invitation/reject/${teamId}/${memberId}`,
      }),
      invalidatesTags: ["team", "invitation"] as any,
    }),
    pendingInvitations: builder.query({
      query: (memberId) => ({
        headers: {
          authorization: Cookies.get("tmAccessToken"),
        },
        url: `/invitation/pending/${memberId}`,
      }),
      providesTags: ["team", "invitation"] as any,
    }),
  }),
});

export const {
  useSendInvitationMutation,
  useAcceptInvitationMutation,
  useRejectInvitationMutation,
  usePendingInvitationsQuery,
} = invitationApi;
