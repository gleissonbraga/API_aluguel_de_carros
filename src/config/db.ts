import { Pool } from "pg"

const pool = new Pool({
    host: process.env.DB_HOST || "localhost", 
    user: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "senha_do_postgres", 
    database: process.env.DB_NAME || "DB_aluguel_de_carros",
    port: 5432, // Porta do banco

  });