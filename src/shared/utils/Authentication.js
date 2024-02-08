import jwtDecode from "jwt-decode";
import validation from "./validation";

//TODO - Auth logic
class Authentication {
  // constructor() {
  //     this.watchTowerAccessToken = localStorage.getItem("watchTowerAccessToken");
  //     this.towerAccessToken = localStorage.getItem("towerAccessToken");
  //     try {
  //         this.watchTowerAccessToken = this.watchTowerAccessToken ? jwtDecode(this.watchTowerAccessToken) : null;
  //         this.towerAccessToken = this.towerAccessToken ? jwtDecode(this.towerAccessToken) : null;
  //     } catch (e) {
  //         this.watchTowerAccessToken = null;
  //         this.towerAccessToken = null;
  //     }
  // }
  // validateToken = () => {
  //   if (
  //     localStorage.getItem("towerAccessToken") &&
  //     localStorage.getItem("watchTowerAccessToken")
  //   ) {
  //     const towerExpiryDate = jwtDecode(
  //       localStorage.getItem("towerAccessToken")
  //     ).exp;
  //     const watchTowerExpiryDate = jwtDecode(
  //       localStorage.getItem("watchTowerAccessToken")
  //     ).exp;
  //     if (
  //       new Date(towerExpiryDate * 1000).getTime() > new Date().getTime() &&
  //       new Date(watchTowerExpiryDate * 1000).getTime() > new Date().getTime()
  //     ) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   } else {
  //     return false;
  //   }
  // };
  // hasScope(availableScope, unavailableScope = null) {
  //   let towerAccessToken = localStorage.getItem("towerAccessToken");
  //   towerAccessToken = towerAccessToken ? jwtDecode(towerAccessToken) : null;
  //   if (validation.notEmpty(towerAccessToken)) {
  //     if (validation.notEmpty(availableScope)) {
  //       const scopes = towerAccessToken.scopes;
  //       let allow = false;
  //       allow = scopes.some((singleScope) =>
  //         availableScope.includes(singleScope)
  //       );
  //       if (unavailableScope) {
  //         const result = scopes.some((singleScope) =>
  //           unavailableScope.includes(singleScope)
  //         );
  //         if (result) {
  //           allow = false;
  //         }
  //       }
  //       if (allow) {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     } else {
  //       return false;
  //     }
  //   } else {
  //     return false;
  //   }
  // }
  // hasAllScopes(scopes) {
  //   let towerAccessToken = localStorage.getItem("towerAccessToken");
  //   towerAccessToken = towerAccessToken ? jwtDecode(towerAccessToken) : null;
  //   if (validation.notEmpty(towerAccessToken)) {
  //     if (validation.notEmpty(scopes)) {
  //       const userScopes = towerAccessToken.scopes;
  //       const allow = scopes.every((scope) => userScopes.includes(scope));
  //       if (allow) {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     } else {
  //       return false;
  //     }
  //   } else {
  //     return false;
  //   }
  // }
}
const auth = new Authentication();
export default auth;
