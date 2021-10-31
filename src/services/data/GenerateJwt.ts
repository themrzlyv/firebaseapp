import jwt from 'jsonwebtoken';


export default class GenerateJwt {
  static accessToken(user: any){
    const token = jwt.sign(user,(process.env.REACT_APP_ACCESS_TOKEN_SECRET as string), { expiresIn: '10m'})
    return { token };
  }
  static refreshToken(user: any){
    const token = jwt.sign(user,(process.env.REACT_APP_REFRESH_TOKEN_SECRET as string), { expiresIn: '10m'})
    return { token }
  }
}