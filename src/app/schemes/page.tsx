"use client";

import React, { useEffect } from "react";
import styles from "./schemes.module.css";
import {
  Home,
  Sparkles,
  Briefcase,
  FileText,
  BarChart,
  Settings,
  HelpCircle,
  Bell,
  User,
  ArrowRight,
  Star,
  File,
  Target,
  UploadCloud,
  ChevronRight,
  Check,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

export default function SchemesDashboard() {
  useEffect(() => {
    function fitStage() {
      const stage = document.getElementById("stage");
      const viewport = document.getElementById("viewport");
      if (stage && viewport) {
        const scale = Math.min(window.innerWidth / 1600, 1);
        stage.style.transform = `scale(${scale})`;
        viewport.style.height = stage.offsetHeight * scale + 48 + "px";
      }
    }
    window.addEventListener("resize", fitStage);
    fitStage();
    setTimeout(fitStage, 50);

    return () => window.removeEventListener("resize", fitStage);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.viewport} id="viewport">
        <div className={styles.stage} id="stage">
          <div className={`${styles.glow} ${styles.glowLavender}`}></div>
          <div className={`${styles.glow} ${styles.glowPink}`}></div>
          <div className={`${styles.glow} ${styles.glowBlue}`}></div>

          <div className={styles.page}>
            {/* ===================== SIDEBAR ===================== */}
            <aside className={`${styles.sidebar} ${styles.glass}`}>
              <div className={styles.logo}>
                <div className={styles.logoSymbol}>C</div>
                <div className={styles.logoText}>Civic AI</div>
              </div>

              <nav className={styles.navList}>
                <button className={styles.navItem}>
                  <Home /> Home
                </button>
                <button className={styles.navItem}>
                  <Sparkles /> AI Insights
                </button>
                <button className={`${styles.navItem} ${styles.active}`}>
                  <Briefcase /> Schemes
                </button>
                <button className={styles.navItem}>
                  <FileText /> Applications
                </button>
                <button className={styles.navItem}>
                  <BarChart /> Analytics
                </button>
              </nav>

              <div className={styles.sidebarFooter}>
                <button className={styles.navItem}>
                  <Settings /> Settings
                </button>
                <button className={styles.navItem}>
                  <HelpCircle /> Help
                </button>
              </div>
            </aside>

            {/* ===================== RIGHT SIDE ===================== */}
            <div className={styles.mainCol}>
              {/* ---------- Top Navbar ---------- */}
              <header className={styles.topnav}>
                <div className={styles.topnavLinks}>
                  <Link href="/" className={`${styles.topnavLink} ${styles.active}`}>
                    Dashboard
                  </Link>
                  <Link href="/schemes" className={styles.topnavLink}>
                    Schemes
                  </Link>
                  <Link href="/complaints" className={styles.topnavLink}>
                    Complaints
                  </Link>
                  <Link href="#" className={styles.topnavLink}>
                    Support
                  </Link>
                </div>
                <div className={styles.topnavRight}>
                  <button className={styles.iconBtn} aria-label="Notifications">
                    <Bell />
                    <span className={styles.notifDot}></span>
                  </button>
                  <div className={styles.avatar}>
                    <User />
                  </div>
                </div>
              </header>

              {/* ---------- Main Dashboard ---------- */}
              <main className={styles.dashboard}>
                {/* LEFT COLUMN */}
                <div className={styles.colLeft}>
                  {/* Hero Card */}
                  <section className={`${styles.hero} ${styles.glass}`}>
                    <div className={styles.heroLeft}>
                      <div className={styles.heroHeadingRow}>
                        <h1 className={styles.heroHeading}>
                          AI Insights: PM Kisan Samman Nidhi
                        </h1>
                        <span className={`${styles.badge} ${styles.badgeGreen}`}>
                          High Match
                        </span>
                        <span className={`${styles.badge} ${styles.badgeOrange}`}>
                          Requires 1 Doc
                        </span>
                      </div>
                      <p className={styles.heroDesc}>
                        Based on your recent land record update, you are now eligible
                        for the PM Kisan scheme. The AI has pre-filled <b>80%</b> of
                        your application using verified digital locker data.
                      </p>
                      <button className={styles.ctaBtn}>
                        Review Application
                        <ArrowRight />
                      </button>
                    </div>

                    <div className={styles.heroRight}>
                      <div className={styles.heroMesh}></div>
                      <div className={styles.docStack}>
                        <div className={`${styles.docLayer} ${styles.docLayerL2}`}></div>
                        <div className={`${styles.docLayer} ${styles.docLayerL1}`}></div>
                        <div className={styles.docFront}>
                          <div className={`${styles.docLine} ${styles.docLineW1}`}></div>
                          <div className={`${styles.docLine} ${styles.docLineW2}`}></div>
                          <div className={`${styles.docLine} ${styles.docLineW3}`}></div>
                        </div>
                        <div className={styles.docBadge}>
                          <Star fill="currentColor" />
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Quick Actions */}
                  <section>
                    <h2 className={styles.sectionHeading}>Quick Actions</h2>
                    <div className={styles.quickActionsGrid}>
                      <div className={`${styles.actionCard} ${styles.glass}`}>
                        <div className={styles.actionIcon}>
                          <File />
                        </div>
                        <div className={styles.actionBottom}>
                          <div>
                            <div className={styles.actionTitle}>Apply for Scheme</div>
                            <div className={styles.actionSub}>Browse 42+ options</div>
                          </div>
                          <div className={styles.arrowCircle}>
                            <ChevronRight />
                          </div>
                        </div>
                      </div>

                      <div className={`${styles.actionCard} ${styles.glass}`}>
                        <div className={styles.actionIcon}>
                          <Target />
                        </div>
                        <div className={styles.actionBottom}>
                          <div>
                            <div className={styles.actionTitle}>Track Complaint</div>
                            <div className={styles.actionSub}>2 active issues</div>
                          </div>
                          <div className={styles.arrowCircle}>
                            <ChevronRight />
                          </div>
                        </div>
                      </div>

                      <div className={`${styles.actionCard} ${styles.glass}`}>
                        <div className={styles.actionIcon}>
                          <UploadCloud />
                        </div>
                        <div className={styles.actionBottom}>
                          <div>
                            <div className={styles.actionTitle}>Upload Documents</div>
                            <div className={styles.actionSub}>DigiLocker Sync</div>
                          </div>
                          <div className={styles.arrowCircle}>
                            <ChevronRight />
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Recent Activity */}
                  <section className={`${styles.activityCard} ${styles.glass}`}>
                    <h2 className={styles.sectionHeading} style={{ marginBottom: 0 }}>
                      Recent Activity
                    </h2>

                    <div className={styles.activityList}>
                      <div className={styles.activityItem}>
                        <div className={`${styles.activityDot} ${styles.activityDotGreen}`}>
                          <Check />
                        </div>
                        <div className={styles.activityBody}>
                          <div>
                            <div className={styles.activityTitle}>
                              Application Approved: Subsidized Solar
                            </div>
                            <div className={styles.activityTime}>
                              Timestamp at 11:33 PM
                            </div>
                          </div>
                          <span className={styles.activityPill}>Approved</span>
                        </div>
                      </div>

                      <div className={styles.activityItem}>
                        <div className={`${styles.activityDot} ${styles.activityDotBlue}`}>
                          <FileText />
                        </div>
                        <div className={styles.activityBody}>
                          <div>
                            <div className={styles.activityTitle}>
                              Document Synced from DigiLocker
                            </div>
                            <div className={styles.activityTime}>
                              Timestamp at 10:45 PM
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={styles.activityDivider}></div>
                    <Link href="#" className={styles.activityFooter}>
                      View All Activity <ArrowRight />
                    </Link>
                  </section>
                </div>

                {/* RIGHT COLUMN */}
                <div className={styles.colRight}>
                  <div className={`${styles.statCard} ${styles.glass}`}>
                    <div className={`${styles.statWave} ${styles.statWaveA}`}></div>
                    <div className={styles.statTop}>
                      <div className={styles.statTitle}>Active Applications</div>
                      <div className={styles.statIcon}>
                        <File />
                      </div>
                    </div>
                    <div className={styles.statNumber}>03</div>
                  </div>

                  <div className={`${styles.statCard} ${styles.glass}`}>
                    <div className={`${styles.statWave} ${styles.statWaveB}`}></div>
                    <div className={styles.statTop}>
                      <div className={styles.statTitle}>Resolved Issues</div>
                      <div className={styles.statIcon}>
                        <CheckCircle />
                      </div>
                    </div>
                    <div className={styles.statNumber}>12</div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
