export const getAccessToken = () => {
  return localStorage.getItem("access_token");
};

export const RefreshToken = () => {
  return localStorage.getItem("refresh_token");
};
