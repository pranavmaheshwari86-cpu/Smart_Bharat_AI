import app from "./app";
import { config } from "./config";
import { ensureDbExists } from "./database/db";

// Ensure SQLite database directory & schema file exist
ensureDbExists();

app.listen(config.port, () => {
  console.log(`\n==================================================`);
  console.log(`🚀 Smart Bharat AI Express Backend Server Active!`);
  console.log(`📡 Listening at: http://localhost:${config.port}`);
  console.log(`🔗 Allowed CORS Origin: ${config.frontendUrl}`);
  console.log(`==================================================\n`);
});
