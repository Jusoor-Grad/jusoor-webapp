import { jwtDecode } from "jwt-decode";

//TODO - Auth logic
class Authentication {
  constructor() {
    this.accessToken = localStorage.getItem("accessToken");
    try {
      this.accessToken = this.accessToken ? jwtDecode(this.accessToken) : null;
    } catch (e) {
      this.accessToken = null;
    }
  }
  validateToken = () => {
    if (localStorage.getItem("accessToken")) {
      const tokenExpiryDate = jwtDecode(
        localStorage.getItem("accessToken")
      ).exp;
      if (new Date(tokenExpiryDate * 1000).getTime() > new Date().getTime()) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
}
const auth = new Authentication();
export default auth;
