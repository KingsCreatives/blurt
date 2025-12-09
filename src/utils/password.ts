import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

export const hashPassword = async (password: string) => {
    return await bcrypt.hash(password,SALT_ROUNDS)
};


export const comparePassword = async(plainPassword: string, hashedPassword: string) => {
    return bcrypt.compare(plainPassword, hashedPassword)
}
