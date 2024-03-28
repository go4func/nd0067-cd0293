import dotevn from 'dotenv';

dotevn.config();

const config = {
  env: process.env.ENV,
  postgres: {
    host: process.env.POSTGRES_HOST,
    db: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  },
  crypto: {
    secretKey: process.env.BCRYPT_PASSWORD,
    saltRound: process.env.SALT_ROUND,
    jwtSecret: process.env.JWT_SECRET,
  },
};

export default config;
