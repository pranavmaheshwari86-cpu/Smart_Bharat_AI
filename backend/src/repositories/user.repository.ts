import { readDb, writeDb } from "../database/db";
import { UserRecord } from "@smart-bharat/shared";

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
