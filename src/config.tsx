import axios from "axios";
import LocalStorageHelper from "./helpers/localstorage-helper";

axios.defaults.baseURL = "http://localhost:3000/api";

axios.interceptors.request.use((request) => {
  request.headers.token = LocalStorageHelper.getToken();
  return request;
});
