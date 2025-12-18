import {neon} from '@neondatabase/serverless';

 const sql = neon(`${process.env.DATABASE_URL}`);
 console.log("Connecting to database with URL:", sql);

 export default sql;