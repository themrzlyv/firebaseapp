import jwt from 'jsonwebtoken';
import GenerateJwt from './GenerateJwt';
import Storage from "./Storage";

export const checkToken = (): any => {
  const { refToken } = Storage.getRefreshToken();
  const { accessToken } = Storage.getAccessToken();

  if(accessToken){
    const controllAccessToken = jwt.verify(accessToken, (process.env.REACT_APP_ACCESS_TOKEN_SECRET as string), (err,user) => {
      if(err) return err.message;
      if(user){
        const { token } = GenerateJwt.refreshToken({id: user?.id});
        Storage.setRefreshToken(token);
        Storage.clearAccessToken();
        return  user.id;
      }
    })
    return controllAccessToken;
  }

  if(refToken){
    const controlRefreshToken = jwt.verify(refToken, (process.env.REACT_APP_REFRESH_TOKEN_SECRET as string), async (err,user) => {
      if(err) return err.message;
      if(user) {
        return  user.id;
      }
    })
    return controlRefreshToken;
  }
}

export const createUser = (user: any) => {
  const userDb = user?.data();
  return { id: userDb?.id, name: userDb?.name, email: userDb?.email, createdAt: userDb?.createdAt }
}