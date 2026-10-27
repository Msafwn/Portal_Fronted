import { apiSlice } from './apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
    getMe: builder.query({
      query: () => '/auth/me',
      providesTags: ['User'],
    }),
    updateProfile: builder.mutation({
      query: (profileData) => ({
        url: '/auth/profile',
        method: 'PUT',
        body: profileData,
      }),
      invalidatesTags: ['User'],
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
    getCandidateProfile: builder.query({
      query: () => '/candidate/profile',
      providesTags: ['User'],
    }),
    updateCandidateProfile: builder.mutation({
      query: (profileData) => ({
        url: '/candidate/profile',
        method: 'PUT',
        body: profileData,
      }),
      invalidatesTags: ['User'],
    }),
    addEducation: builder.mutation({
      query: (eduData) => ({
        url: '/candidate/education',
        method: 'POST',
        body: eduData,
      }),
      invalidatesTags: ['User'],
    }),
    deleteEducation: builder.mutation({
      query: (id) => ({
        url: `/candidate/education/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
    addExperience: builder.mutation({
      query: (expData) => ({
        url: '/candidate/experience',
        method: 'POST',
        body: expData,
      }),
      invalidatesTags: ['User'],
    }),
    deleteExperience: builder.mutation({
      query: (id) => ({
        url: `/candidate/experience/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
    updateCandidateSkills: builder.mutation({
      query: (skillsData) => ({
        url: '/candidate/skills',
        method: 'PUT',
        body: skillsData,
      }),
      invalidatesTags: ['User'],
    }),
    updateCandidateResume: builder.mutation({
      query: (resumeData) => ({
        url: '/candidate/resume',
        method: 'POST',
        body: resumeData,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetMeQuery,
  useUpdateProfileMutation,
  useLogoutUserMutation,
  useGetCandidateProfileQuery,
  useUpdateCandidateProfileMutation,
  useAddEducationMutation,
  useDeleteEducationMutation,
  useAddExperienceMutation,
  useDeleteExperienceMutation,
  useUpdateCandidateSkillsMutation,
  useUpdateCandidateResumeMutation,
} = authApiSlice;
