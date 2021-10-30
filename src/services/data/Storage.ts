
export default class Storage {
  static AccessToken: string = "user-a-token";
  static RefreshToken: string = "user-r-token";

  static getAccessToken(){
    const accessToken = localStorage.getItem(this.AccessToken);
    return { accessToken };
  }
  static setAccessToken(value: string){
    localStorage.setItem(this.AccessToken,value)
  }
  static clearAccessToken(){
    localStorage.removeItem(this.AccessToken);
  }
  static getRefreshToken(){
    const refToken = localStorage.getItem(this.RefreshToken);
    return { refToken };
  }
  static setRefreshToken(value: string){
    localStorage.setItem(this.RefreshToken,value)
  }
  static clearRefreshToken(){
    localStorage.removeItem(this.RefreshToken);
  }
}