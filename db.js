import mysql from "mysql"

export const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Arealtem0503#',
  database: 'blog',
})