const { spawn } = require("child_process");

console.log("🚀 Starting Smart Bharat AI Monorepo Dev Servers...\n");

const backend = spawn("npm", ["--prefix", "backend", "run", "dev"], {
  stdio: "inherit",
  shell: true,
});

const frontend = spawn("npm", ["--prefix", "frontend", "run", "dev"], {
  stdio: "inherit",
  shell: true,
});

function cleanup() {
  console.log("\n🛑 Stopping dev servers...");
  backend.kill();
  frontend.kill();
  process.exit();
}

process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);
process.on("exit", cleanup);
