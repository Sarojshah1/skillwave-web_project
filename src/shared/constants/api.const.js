
export const ENDPOINTS = {
  AUTH:{
    LOGIN: "/user/login",
    REGISTER: "/user/register",
  },
  USER: {
    PROFILE: "/user/profile",
    CHANGE_PASSWORD:"/user/change-password",
    UPDATE_DETAILS:"/user/update-details",
    UPDATE_PROFILE_PICTURE:"/user/update-profile-picture",
    UPDATE_PASSWORD_BY_EMAIL:"/user/update-password-by-email",
    SEARCH_HISTORY:"/user/search-history",
  },
  OTP:{
    SEND_OTP:"/otp"
  },
  CATEGORY:{
    GET_CATEGORY:"/category"
  },
  COURCES:{
    GET_COURSES:"/courses/pagination",
    GET_COURSE_BY_ID:"/courses/:id",
    GET_COURSE_BY_CATEGORY:"/courses/category/:categoryId",
    
  },
  POST: {
    CREATE_GET_POST: "/post",
    GET_POST_BY_ID: "/post/:id",
    LIKE_POST: "/post/:id/like",
    ADD_GET_COMMENT: "/post/:id/comments",
    DELETE_COMMENT: "/post/comment/delete/:id",
    REPLIES:"/post/:postId/comments/:commentId/replies"
  },

};
