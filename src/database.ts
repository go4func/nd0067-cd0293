import { Pool } from 'pg';
import config from './config';

const client = new Pool({
  host: config.postgres.host,
  database: config.postgres.db,
  user: config.postgres.user,
  password: config.postgres.password,
});

export default client;
