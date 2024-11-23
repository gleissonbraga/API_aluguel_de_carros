import { Pool } from "pg"
import dotenv from 'dotenv'
dotenv.config()

export const client = new Pool({
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME
  });

export async function db_connect(){
    await client.connect()
}

export async function db_endConnection(){
  await client.end()
}

export async function db_query(query: string) {
  const res = await client.query(query)
  return res
}

export async function db_query_params(query: string, values: any[]) {
  const results = await client.query(query, values)
  return results
}