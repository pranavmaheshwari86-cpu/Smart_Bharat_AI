import { readDb, writeDb } from "../database/db";
import { PasswordResetRecord } from "@smart-bharat/shared";

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
