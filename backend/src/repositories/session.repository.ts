import { readDb, writeDb } from "../database/db";
import { SessionRecord } from "@smart-bharat/shared";

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
