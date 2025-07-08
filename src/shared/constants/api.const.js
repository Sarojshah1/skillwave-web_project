
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
    SEND_OTP:"/otp",
    VERIFY_OTP:"/verify",
  },
  CATEGORY:{
    GET_CATEGORY:"/category"
  },
  COURCES:{
    ADD_COURSE: "/courses",
    GET_COURSES:"/courses/pagination",
    GET_COURSE_BY_ID:"/courses/:id",
    GET_COURSE_BY_CATEGORY:"/courses/category/:categoryId",
    GET_CREATOR_COURSE: "/courses/creator",
    
  },
  LESSONS:{
    CREATE_LESSONS: "/lesson/lessons",

  },
  POST: {
    CREATE_GET_POST: "/post",
    GET_POST_BY_ID: "/post/:id",
    LIKE_POST: "/post/:id/like",
    ADD_GET_COMMENT: "/post/:id/comments",
    DELETE_COMMENT: "/post/comment/delete/:id",
    REPLIES:"/post/:postId/comments/:commentId/replies"
  },
  BLOG:{
    GET_POST_BLOGS: "/blog/blogs",
    GET_BLOG_BY_ID: "/blog/blogs/:id",
  },
  REVIEW:{
    POST_REVIEWS: "/review/reviews",
    GET_REVIEW_BY_COURSE_ID: "/review/reviews/course/:courseId",
    GET_REVIEW_BY_ID: "/review/:id",
    DELETE_REVIEW: "/review/delete/:id",
  },
  BLOG:{
    GET_OR_CREATE_BLOGS: "/blog/blogs",
    GET_BLOG_BY_ID: "/blog/blogs/:id",
    UPDATE_BLOG: "/blog/blogs/:id",
    DELETE_BLOG: "/blog/blogs/:id",
  },
  ENROLL:{
    GET_ENROLLED_COURSES: "/enroll/user",
  },
  GROUP_STUDY:{
    GET_ALL_GROUPS: "/groupstudy",
    GET_GROUP_BY_ID: "/groupstudy/:id",
    CREATE_GROUP: "/groupstudy/create",
    JOIN_GROUP: "/groupstudy/:groupId/addMember",
    GET_USER_GROUPS: "/groupstudy/user",

  },
  CHATS:{
    MESSGAE:"/chats",
    GET_CHAT_MESSAGE:"/chats/:context_id"
  },
  QUIZ:{
    CREATE_QUIZ:"/quiz/quizzes",
    GET_QUIZ_BY_ID:"/quiz/quizzes",
    GET_ALL_QUIZZES:"/quiz/quizzes",
    GET_QUIZZES_BY_COURSE_ID:"/quiz/quizzes/course",
    UPDATE_QUIZ:"/quiz/quizzes",
    DELETE_QUIZ:"/quiz/quizzes",
  },
  QUESTION:{
    CREATE_QUESTION:"/question/questions",
    BULK_INSERT_QUESTIONS:"/question/questions/bulk",
    GET_QUESTION_BY_ID:"/question/questions/:id",
    GET_ALL_QUESTIONS:"/question/questions",
    GET_QUESTIONS_BY_QUIZ_ID:"/question/questions/quiz",
    UPDATE_QUESTION:"/question/questions",
    DELETE_QUESTION:"/question/questions",
  },



};
