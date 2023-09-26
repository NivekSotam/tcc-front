import axios from "axios";
import LocalStorageHelper from "./helpers/localstorage-helper";

axios.defaults.baseURL = "localhost:3000";

axios.interceptors.request.use((request) => {
  request.headers.token = LocalStorageHelper.getToken();
  return request;
});
