import fs from "fs";
import path from "path";
import os from "os";
import { UserRecord, SessionRecord, OtpRecord, PasswordResetRecord, AuditLogRecord } from "@smart-bharat/shared";

interface DatabaseSchema {
  users: UserRecord[];
  sessions: SessionRecord[];
  otps: OtpRecord[];
  password_resets: PasswordResetRecord[];
  audit_logs: AuditLogRecord[];
}

function getDbFilePath(): { dbDir: string; dbFile: string } {
  // Check if running in Vercel or production serverless read-only environment
  const isServerless =
    process.env.VERCEL === "1" ||
    process.env.VERCEL === "true" ||
    process.env.AWS_LAMBDA_FUNCTION_NAME !== undefined ||
    process.env.NODE_ENV === "production";

  if (isServerless) {
    const tmpDir = os.tmpdir();
    return { dbDir: tmpDir, dbFile: path.join(tmpDir, "smart_bharat_db.json") };
  }

  if (process.env.DATABASE_PATH) {
    const fullPath = path.isAbsolute(process.env.DATABASE_PATH)
      ? process.env.DATABASE_PATH
      : path.join(process.cwd(), process.env.DATABASE_PATH);
    return { dbDir: path.dirname(fullPath), dbFile: fullPath };
  }

  const localDir = path.join(__dirname, "../../../data");
  return { dbDir: localDir, dbFile: path.join(localDir, "smart_bharat_db.json") };
}

function initialSchema(): DatabaseSchema {
  return {
    users: [],
    sessions: [],
    otps: [],
    password_resets: [],
    audit_logs: [],
  };
}

export function ensureDbExists(): void {
  const { dbDir, dbFile } = getDbFilePath();
  try {
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }
    if (!fs.existsSync(dbFile)) {
      // Seed initial data if available in project
      const seedCandidates = [
        path.join(process.cwd(), "data/smart_bharat_db.json"),
        path.join(__dirname, "../../../data/smart_bharat_db.json"),
        path.join(__dirname, "../../data/smart_bharat_db.json"),
      ];
      let seedContent = JSON.stringify(initialSchema(), null, 2);
      for (const candidate of seedCandidates) {
        if (fs.existsSync(candidate)) {
          try {
            seedContent = fs.readFileSync(candidate, "utf-8");
            break;
          } catch (_) {}
        }
      }
      fs.writeFileSync(dbFile, seedContent, "utf-8");
    }
  } catch (err) {
    console.error("Error ensuring DB exists:", err);
  }
}

export function readDb(): DatabaseSchema {
  ensureDbExists();
  const { dbFile } = getDbFilePath();
  try {
    if (fs.existsSync(dbFile)) {
      const raw = fs.readFileSync(dbFile, "utf-8");
      return JSON.parse(raw) as DatabaseSchema;
    }
  } catch (err) {
    console.error("Error reading db file, re-initializing:", err);
  }
  const schema = initialSchema();
  writeDb(schema);
  return schema;
}

export function writeDb(data: DatabaseSchema): void {
  ensureDbExists();
  const { dbFile } = getDbFilePath();
  try {
    const tempPath = `${dbFile}.tmp.${Date.now()}`;
    fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), "utf-8");
    fs.renameSync(tempPath, dbFile);
  } catch (err) {
    console.error("Error writing to db file:", err);
  }
}
