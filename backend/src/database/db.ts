import fs from "fs";
import path from "path";
import { UserRecord, SessionRecord, OtpRecord, PasswordResetRecord, AuditLogRecord } from "@smart-bharat/shared";

interface DatabaseSchema {
  users: UserRecord[];
  sessions: SessionRecord[];
  otps: OtpRecord[];
  password_resets: PasswordResetRecord[];
  audit_logs: AuditLogRecord[];
}

const DB_DIR = path.join(__dirname, "../../../data");
const DB_FILE = path.join(DB_DIR, "smart_bharat_db.json");

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
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(initialSchema(), null, 2), "utf-8");
  }
}

export function readDb(): DatabaseSchema {
  ensureDbExists();
  try {
    const raw = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(raw) as DatabaseSchema;
  } catch (err) {
    console.error("Error reading db file, re-initializing:", err);
    const schema = initialSchema();
    writeDb(schema);
    return schema;
  }
}

export function writeDb(data: DatabaseSchema): void {
  ensureDbExists();
  const tempPath = `${DB_FILE}.tmp.${Date.now()}`;
  fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), "utf-8");
  fs.renameSync(tempPath, DB_FILE);
}
