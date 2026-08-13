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

// User Repository
export class UserRepository {
  public findById(id: string): UserRecord | null {
    const db = readDb();
    return db.users.find((u) => u.id === id) || null;
  }

  public findByEmail(email: string): UserRecord | null {
    const db = readDb();
    const normalized = email.trim().toLowerCase();
    return db.users.find((u) => u.email.toLowerCase() === normalized) || null;
  }

  public findByPhone(phone: string): UserRecord | null {
    const db = readDb();
    const normalized = phone.replace(/\s+/g, "");
    return db.users.find((u) => u.phone_number.replace(/\s+/g, "") === normalized) || null;
  }

  public findByGoogleId(googleId: string): UserRecord | null {
    const db = readDb();
    return db.users.find((u) => u.google_id === googleId) || null;
  }

  public save(user: UserRecord): UserRecord {
    const db = readDb();
    const index = db.users.findIndex((u) => u.id === user.id);
    if (index >= 0) {
      db.users[index] = { ...user, updated_at: new Date().toISOString() };
    } else {
      db.users.push(user);
    }
    writeDb(db);
    return user;
  }

  public update(id: string, updates: Partial<UserRecord>): UserRecord | null {
    const db = readDb();
    const index = db.users.findIndex((u) => u.id === id);
    if (index < 0) return null;

    const existing = db.users[index];
    const updated: UserRecord = {
      ...existing,
      ...updates,
      updated_at: new Date().toISOString(),
    };
    db.users[index] = updated;
    writeDb(db);
    return updated;
  }
}

// Session Repository
export class SessionRepository {
  public save(session: SessionRecord): SessionRecord {
    const db = readDb();
    const index = db.sessions.findIndex((s) => s.id === session.id);
    if (index >= 0) {
      db.sessions[index] = session;
    } else {
      db.sessions.push(session);
    }
    writeDb(db);
    return session;
  }

  public findByRefreshToken(token: string): SessionRecord | null {
    const db = readDb();
    const session = db.sessions.find((s) => s.refresh_token === token);
    if (!session) return null;
    if (new Date(session.expires_at).getTime() < Date.now()) {
      this.delete(session.id);
      return null;
    }
    return session;
  }

  public delete(sessionId: string): void {
    const db = readDb();
    db.sessions = db.sessions.filter((s) => s.id !== sessionId);
    writeDb(db);
  }

  public deleteByUserId(userId: string): void {
    const db = readDb();
    db.sessions = db.sessions.filter((s) => s.user_id !== userId);
    writeDb(db);
  }
}

// OTP Repository
export class OtpRepository {
  public save(otp: OtpRecord): OtpRecord {
    const db = readDb();
    db.otps = db.otps.map((o) => {
      if (o.identifier === otp.identifier && o.purpose === otp.purpose && !o.verified) {
        return { ...o, verified: true };
      }
      return o;
    });
    db.otps.push(otp);
    writeDb(db);
    return otp;
  }

  public getLatest(identifier: string, purpose: OtpRecord["purpose"]): OtpRecord | null {
    const db = readDb();
    const matches = db.otps
      .filter((o) => o.identifier === identifier && o.purpose === purpose && !o.verified)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return matches[0] || null;
  }

  public update(otp: OtpRecord): void {
    const db = readDb();
    const idx = db.otps.findIndex((o) => o.id === otp.id);
    if (idx >= 0) {
      db.otps[idx] = otp;
      writeDb(db);
    }
  }
}

// Password Reset Repository
export class PasswordResetRepository {
  public save(reset: PasswordResetRecord): PasswordResetRecord {
    const db = readDb();
    db.password_resets = db.password_resets.map((r) =>
      r.user_id === reset.user_id ? { ...r, used: true } : r
    );
    db.password_resets.push(reset);
    writeDb(db);
    return reset;
  }

  public findByTokenHash(tokenHash: string): PasswordResetRecord | null {
    const db = readDb();
    const reset = db.password_resets.find((r) => r.token_hash === tokenHash && !r.used);
    if (!reset) return null;
    if (new Date(reset.expires_at).getTime() < Date.now()) {
      return null;
    }
    return reset;
  }

  public markUsed(id: string): void {
    const db = readDb();
    const idx = db.password_resets.findIndex((r) => r.id === id);
    if (idx >= 0) {
      db.password_resets[idx].used = true;
      writeDb(db);
    }
  }
}
