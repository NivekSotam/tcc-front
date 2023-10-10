import JwtDecode from "jwt-decode";

const LocalStorageHelper = {
  setToken(accessToken: any) {
    window.localStorage.setItem("USER_TOKEN", accessToken);
  },
  getToken() {
    return window.localStorage.getItem("USER_TOKEN");
  },
  removeToken() {
    window.localStorage.removeItem("USER_TOKEN");
  },
  isAuthenticated() {
    try {
      const token = LocalStorageHelper.getToken();

      if (!token) return false;

      const payload: any = JwtDecode(token);

      const expirationDate = new Date(payload.exp * 1000);
      const currentDate = new Date();

      return expirationDate > currentDate;
    } catch (error) {
      console.warn(error);
      return false;
    }
  },
};

export default LocalStorageHelper;
