import { readDb, writeDb } from "../database/db";
import { OtpRecord } from "@smart-bharat/shared";

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
