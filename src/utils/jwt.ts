import jwt from 'jsonwebtoken';

const jwt_secret = process.env.JWT_SECRET;

if(!jwt_secret){
    throw new Error("FATAL: JWT_SECRET is not defined in .env")
}

export const generateToken = (userId: string) => {
 const payload = {id: userId}
 return jwt.sign(payload, jwt_secret, {expiresIn: '1h'})
};
