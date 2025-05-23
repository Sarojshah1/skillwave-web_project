const TOKEN_KEY = "skillwave_token";
const ROLE_KEY = "role";
const USERID_KEY = "userid";

export const storageService = {
  setAuthData: ({ token, role, id }) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(ROLE_KEY, role);
    localStorage.setItem(USERID_KEY, id);
  },

  getToken: () => localStorage.getItem(TOKEN_KEY),
  getRole: () => localStorage.getItem(ROLE_KEY),
  getUserId: () => localStorage.getItem(USERID_KEY),

  clearAuthData: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ROLE_KEY);
    localStorage.removeItem(USERID_KEY);
  },
};