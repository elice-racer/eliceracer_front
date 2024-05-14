import { paths } from "./path";

const logout = () => {
  localStorage.clear();
  window.location.href = paths.LOGIN;
};

export default logout;
