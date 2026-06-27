import "reflect-metadata";
import "dotenv/config"; // Load .env before any other imports that use process.env
import { buildApp } from "./app.js";
import { initializeDatabase } from "./config/data-source.js";
import { createContainer } from "./inversify/container.js";

const PORT = Number(process.env.PORT) || 3000;

async function start() {
  const dataSource = await initializeDatabase();
  const container = createContainer(dataSource);

  const app = await buildApp(container);

  try {
    await app.listen({ port: PORT, host: "0.0.0.0" });
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Swagger docs at http://localhost:${PORT}/docs`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();
