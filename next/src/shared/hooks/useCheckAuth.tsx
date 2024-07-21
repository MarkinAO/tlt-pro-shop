export const useCheckAuth = () => {
  const token = sessionStorage.getItem("token");
  let user;
  let isAdmin;

  if (token) {
    user = JSON.parse(sessionStorage.getItem("user") || "");
    isAdmin = user.roles.includes(1);
  }

  return {
    isAuth: token ? true : false,
    user,
    isAdmin,
  };
};
