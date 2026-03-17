import type { Metadata } from "next";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "QA Metrics Dashboard | Ask Vadym",
  description:
    "QA Metrics Dashboard by Vadym Marochok — system quality, delivery performance, and AI development impact metrics.",
  openGraph: {
    title: "QA Metrics Dashboard | Ask Vadym",
    description:
      "QA Metrics Dashboard by Vadym Marochok — system quality, delivery performance, and AI development impact metrics.",
    type: "website",
  },
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#f0f4f8]">
      <Header currentPage="blog" />

      <style>{`
        .db-page {
          max-width: 1280px;
          margin: 0 auto;
          padding: 28px 32px 64px;
          font-family: 'Inter', system-ui, sans-serif;
        }

        /* ── Design tokens ── */
        .db-page {
          --db-surface:    #ffffff;
          --db-border:     #dde3ec;
          --db-navy:       #1a2b4a;
          --db-blue:       #2563eb;
          --db-blue-light: #eff4ff;
          --db-teal:       #0891b2;
          --db-teal-light: #ecfeff;
          --db-green:      #16a34a;
          --db-green-light:#f0fdf4;
          --db-amber:      #d97706;
          --db-amber-light:#fffbeb;
          --db-red:        #dc2626;
          --db-red-light:  #fef2f2;
          --db-purple:     #7c3aed;
          --db-purple-light:#f5f3ff;
          --db-text-primary:   #0f172a;
          --db-text-secondary: #475569;
          --db-text-muted:     #94a3b8;
          --db-ai-color:   #e55b2f;
          --db-human-color:#1e40af;
          --db-radius:     10px;
          --db-shadow:     0 1px 4px rgba(0,0,0,.07), 0 4px 16px rgba(0,0,0,.06);
          --db-bg:         #f0f4f8;
          color: var(--db-text-primary);
        }

        /* ── Page title ── */
        .db-page-title {
          margin-bottom: 20px;
        }
        .db-page-title h1 {
          font-size: 22px;
          font-weight: 800;
          letter-spacing: -0.3px;
          color: var(--db-text-primary);
          margin-bottom: 2px;
        }
        .db-page-title p {
          font-size: 13px;
          color: var(--db-text-secondary);
        }

        /* ── Section titles ── */
        .db-section-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }
        .db-section-title {
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: .8px;
          color: var(--db-text-secondary);
          white-space: nowrap;
        }
        .db-section-line {
          flex: 1;
          height: 1px;
          background: var(--db-border);
        }

        /* ── KPI grid ── */
        .db-kpi-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 10px;
          margin-bottom: 10px;
        }

        .db-kpi-card {
          background: var(--db-surface);
          border: 1px solid var(--db-border);
          border-radius: var(--db-radius);
          padding: 14px 16px 12px;
          box-shadow: var(--db-shadow);
          position: relative;
        }
        .db-kpi-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          border-radius: var(--db-radius) var(--db-radius) 0 0;
        }
        .db-kpi-card.green::before  { background: var(--db-green); }
        .db-kpi-card.blue::before   { background: var(--db-blue); }
        .db-kpi-card.teal::before   { background: var(--db-teal); }
        .db-kpi-card.amber::before  { background: var(--db-amber); }
        .db-kpi-card.purple::before { background: var(--db-purple); }
        .db-kpi-card.red::before    { background: var(--db-red); }

        .db-kpi-category {
          font-size: 9.5px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: .7px;
          margin-bottom: 6px;
        }
        .db-kpi-card.green  .db-kpi-category { color: var(--db-green); }
        .db-kpi-card.blue   .db-kpi-category { color: var(--db-blue); }
        .db-kpi-card.teal   .db-kpi-category { color: var(--db-teal); }
        .db-kpi-card.amber  .db-kpi-category { color: var(--db-amber); }
        .db-kpi-card.purple .db-kpi-category { color: var(--db-purple); }
        .db-kpi-card.red    .db-kpi-category { color: var(--db-red); }

        .db-kpi-label {
          font-size: 12px;
          font-weight: 600;
          color: var(--db-text-primary);
          line-height: 1.3;
          margin-bottom: 8px;
          min-height: 30px;
        }
        .db-kpi-value {
          font-size: 26px;
          font-weight: 800;
          line-height: 1;
          letter-spacing: -0.5px;
        }
        .db-kpi-card.green  .db-kpi-value { color: var(--db-green); }
        .db-kpi-card.blue   .db-kpi-value { color: var(--db-blue); }
        .db-kpi-card.teal   .db-kpi-value { color: var(--db-teal); }
        .db-kpi-card.amber  .db-kpi-value { color: var(--db-amber); }
        .db-kpi-card.purple .db-kpi-value { color: var(--db-purple); }
        .db-kpi-card.red    .db-kpi-value { color: var(--db-red); }

        .db-kpi-unit {
          font-size: 12px;
          font-weight: 500;
          color: var(--db-text-muted);
          margin-left: 2px;
        }
        .db-kpi-hint {
          font-size: 10.5px;
          color: var(--db-text-muted);
          margin-top: 5px;
          line-height: 1.4;
        }
        .db-kpi-badge {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          font-size: 10px;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 20px;
          margin-top: 5px;
        }
        .badge-good   { background: var(--db-green-light);  color: var(--db-green); }
        .badge-warn   { background: var(--db-amber-light);  color: var(--db-amber); }
        .badge-info   { background: var(--db-blue-light);   color: var(--db-blue); }
        .badge-teal   { background: var(--db-teal-light);   color: var(--db-teal); }
        .badge-purple { background: var(--db-purple-light); color: var(--db-purple); }

        /* ── Tooltip ── */
        .db-info-icon {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 20px;
          height: 20px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-style: normal;
          color: var(--db-text-secondary);
          cursor: help;
          border-radius: 50%;
          border: 1.5px solid var(--db-border);
          background: var(--db-bg);
          line-height: 1;
          z-index: 1;
          transition: color 0.15s, border-color 0.15s;
          flex-shrink: 0;
        }
        .db-info-icon:hover {
          color: var(--db-blue);
          border-color: var(--db-blue);
        }
        .db-info-icon::after {
          content: attr(data-tooltip);
          position: absolute;
          top: calc(100% + 6px);
          right: 0;
          width: 220px;
          background: var(--db-navy);
          color: #e2e8f0;
          font-size: 11px;
          font-weight: 400;
          line-height: 1.5;
          padding: 8px 10px;
          border-radius: 6px;
          z-index: 200;
          opacity: 0;
          pointer-events: none;
          transform: translateY(-4px);
          transition: opacity 0.15s, transform 0.15s;
          white-space: normal;
          text-transform: none;
          letter-spacing: 0;
        }
        .db-info-icon:hover::after {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── DORA strip ── */
        .db-dora-strip {
          background: linear-gradient(135deg, #1a2b4a 0%, #2563eb 100%);
          border-radius: var(--db-radius);
          padding: 10px 20px;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
        }
        .db-dora-strip-label {
          font-size: 11px;
          font-weight: 700;
          color: #cbd5e1;
          text-transform: uppercase;
          letter-spacing: .7px;
          white-space: nowrap;
        }
        .db-dora-divider {
          width: 1px; height: 20px;
          background: rgba(255,255,255,.2);
        }
        .db-dora-metrics {
          display: flex;
          gap: 24px;
          flex: 1;
        }
        .db-dora-metric {
          display: flex;
          flex-direction: column;
          gap: 1px;
        }
        .db-dora-metric-name {
          font-size: 10px;
          color: #94a3b8;
          font-weight: 500;
        }
        .db-dora-metric-value {
          font-size: 16px;
          font-weight: 800;
          color: #fff;
        }
        .db-dora-metric-unit {
          font-size: 10px;
          color: #94a3b8;
          font-weight: 400;
        }
        .db-dora-rating {
          margin-left: auto;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .db-dora-rating-label {
          font-size: 11px;
          color: #94a3b8;
        }
        .db-dora-rating-badge {
          background: #d97706;
          color: #fff;
          font-size: 11px;
          font-weight: 700;
          padding: 3px 12px;
          border-radius: 20px;
          letter-spacing: .3px;
        }

        /* ── AI comparison ── */
        .db-ai-section { margin-top: 18px; }
        .db-ai-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
        }
        .db-ai-card {
          background: var(--db-surface);
          border: 1px solid var(--db-border);
          border-radius: var(--db-radius);
          padding: 16px;
          box-shadow: var(--db-shadow);
          position: relative;
        }
        .db-ai-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--db-ai-color), var(--db-human-color));
          border-radius: var(--db-radius) var(--db-radius) 0 0;
        }
        .db-ai-card-label {
          font-size: 12px;
          font-weight: 700;
          color: var(--db-text-primary);
          line-height: 1.3;
          margin-bottom: 12px;
          min-height: 32px;
        }
        .db-ai-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 7px;
        }
        .db-ai-row-label {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: .5px;
          width: 44px;
          flex-shrink: 0;
        }
        .db-ai-row-label.ai    { color: var(--db-ai-color); }
        .db-ai-row-label.human { color: var(--db-human-color); }

        .db-bar-track {
          flex: 1;
          height: 8px;
          background: var(--db-bg);
          border-radius: 20px;
          overflow: hidden;
        }
        .db-bar-fill {
          height: 100%;
          border-radius: 20px;
        }
        .db-bar-fill.ai    { background: var(--db-ai-color); }
        .db-bar-fill.human { background: var(--db-human-color); }

        .db-bar-value {
          font-size: 13px;
          font-weight: 800;
          width: 40px;
          text-align: right;
          flex-shrink: 0;
        }
        .db-bar-value.ai    { color: var(--db-ai-color); }
        .db-bar-value.human { color: var(--db-human-color); }

        .db-ai-delta {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-top: 8px;
          font-size: 10.5px;
          color: var(--db-text-muted);
        }
        .db-delta-pill {
          font-size: 10px;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 20px;
          background: #fef2f2;
          color: var(--db-red);
        }

        /* ── Footer legend ── */
        .db-footer {
          margin-top: 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .db-legend {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .db-legend-item {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 11px;
          color: var(--db-text-secondary);
          font-weight: 500;
        }
        .db-legend-dot {
          width: 10px; height: 10px;
          border-radius: 50%;
        }
        .db-legend-pill {
          font-size: 10px;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 20px;
        }
        .db-legend-pill.good { background: var(--db-green-light); color: var(--db-green); }
        .db-legend-pill.warn { background: var(--db-amber-light); color: var(--db-amber); }
        .db-footer-note {
          font-size: 10.5px;
          color: var(--db-text-muted);
        }
      `}</style>

      <main className="db-page">

        {/* Page title */}
        <div className="db-page-title">
          <h1>QA Metrics Dashboard</h1>
          <p>System quality · Delivery performance · AI development impact</p>
        </div>

        {/* DORA strip */}
        <div className="db-dora-strip">
          <span className="db-dora-strip-label">DORA Metrics</span>
          <div className="db-dora-divider" />
          <div className="db-dora-metrics">
            <div className="db-dora-metric">
              <span className="db-dora-metric-name">Lead Time to Production</span>
              <span className="db-dora-metric-value">5.5 <span className="db-dora-metric-unit">days avg</span></span>
            </div>
            <div className="db-dora-metric">
              <span className="db-dora-metric-name">Deployment Frequency</span>
              <span className="db-dora-metric-value">2.1 <span className="db-dora-metric-unit">× / week</span></span>
            </div>
            <div className="db-dora-metric">
              <span className="db-dora-metric-name">Change Failure Rate</span>
              <span className="db-dora-metric-value">12.5 <span className="db-dora-metric-unit">%</span></span>
            </div>
            <div className="db-dora-metric">
              <span className="db-dora-metric-name">MTTR</span>
              <span className="db-dora-metric-value">2.5 <span className="db-dora-metric-unit">hrs avg</span></span>
            </div>
          </div>
          <div className="db-dora-rating">
            <span className="db-dora-rating-label">Performance band</span>
            <span className="db-dora-rating-badge">Medium</span>
          </div>
        </div>

        {/* Section 1: Core QA */}
        <div className="db-section-header">
          <span className="db-section-title">Core QA Metrics — Overall System Health</span>
          <div className="db-section-line" />
        </div>

        {/* Row 1 */}
        <div className="db-kpi-grid">
          <div className="db-kpi-card red">
            <span className="db-info-icon" data-tooltip="% of defects discovered in production vs. all defects found. Measures how effectively testing catches issues before release.">ⓘ</span>
            <div className="db-kpi-category">Production Risk</div>
            <div className="db-kpi-label">Defect Escape Rate</div>
            <div className="db-kpi-value">11.4<span className="db-kpi-unit">%</span></div>
            <div className="db-kpi-hint">% of defects found in production</div>
            <span className="db-kpi-badge badge-warn">⚠ Needs improvement</span>
          </div>

          <div className="db-kpi-card amber">
            <span className="db-info-icon" data-tooltip="Number of critical P0/P1 production incidents in the period. Shows the direct business impact of quality failures reaching users.">ⓘ</span>
            <div className="db-kpi-category">Production Risk</div>
            <div className="db-kpi-label">Critical Defect Leakage</div>
            <div className="db-kpi-value">4<span className="db-kpi-unit"> P0/P1</span></div>
            <div className="db-kpi-hint">Critical production incidents this month</div>
            <span className="db-kpi-badge badge-warn">⚠ Monitor</span>
          </div>

          <div className="db-kpi-card blue">
            <span className="db-info-icon" data-tooltip="Time to complete the full automated regression suite before a release. Indicates how quickly QA can validate release readiness and unblock deployment.">ⓘ</span>
            <div className="db-kpi-category">Delivery Speed</div>
            <div className="db-kpi-label">Regression Execution Time</div>
            <div className="db-kpi-value">36<span className="db-kpi-unit"> min</span></div>
            <div className="db-kpi-hint">Full regression suite run time</div>
            <span className="db-kpi-badge badge-warn">⚠ Optimize</span>
          </div>

          <div className="db-kpi-card green">
            <span className="db-info-icon" data-tooltip="% of automated tests that fail intermittently without a real product defect. High flakiness erodes trust in the test suite and slows CI feedback loops.">ⓘ</span>
            <div className="db-kpi-category">Test Automation</div>
            <div className="db-kpi-label">Test Flakiness Rate</div>
            <div className="db-kpi-value">9.2<span className="db-kpi-unit">%</span></div>
            <div className="db-kpi-hint">% of randomly failing tests</div>
            <span className="db-kpi-badge badge-warn">⚠ High flakiness</span>
          </div>

          <div className="db-kpi-card green">
            <span className="db-info-icon" data-tooltip="% of key business workflows covered by automated tests. Ensures the most important user journeys are protected and won't silently break on release.">ⓘ</span>
            <div className="db-kpi-category">Test Automation</div>
            <div className="db-kpi-label">Critical Flow Coverage</div>
            <div className="db-kpi-value">71<span className="db-kpi-unit">%</span></div>
            <div className="db-kpi-hint">Key business workflows automated</div>
            <span className="db-kpi-badge badge-warn">⚠ Coverage gap</span>
          </div>
        </div>

        {/* Row 2 */}
        <div className="db-kpi-grid" style={{ marginBottom: "18px" }}>
          <div className="db-kpi-card teal">
            <span className="db-info-icon" data-tooltip="Average time between an incident occurring and it being detected. Measures the effectiveness of monitoring and observability tooling.">ⓘ</span>
            <div className="db-kpi-category">Reliability</div>
            <div className="db-kpi-label">Mean Time to Detect (MTTD)</div>
            <div className="db-kpi-value">24<span className="db-kpi-unit"> min</span></div>
            <div className="db-kpi-hint">Avg time from incident to detection</div>
            <span className="db-kpi-badge badge-warn">⚠ Improve monitoring</span>
          </div>

          <div className="db-kpi-card teal">
            <span className="db-info-icon" data-tooltip="Average time from detecting an incident to restoring normal system operation. Also a DORA metric — measures how quickly the team recovers from production failures.">ⓘ</span>
            <div className="db-kpi-category">Reliability</div>
            <div className="db-kpi-label">Mean Time to Resolve (MTTR)</div>
            <div className="db-kpi-value">2.5<span className="db-kpi-unit"> hrs</span></div>
            <div className="db-kpi-hint">Avg time from detection to resolution</div>
            <span className="db-kpi-badge badge-warn">⚠ Monitor</span>
          </div>

          <div className="db-kpi-card blue">
            <span className="db-info-icon" data-tooltip="Average time from code commit to production deployment. A core DORA metric — measures how quickly changes move through the development and testing pipeline.">ⓘ</span>
            <div className="db-kpi-category">Delivery Speed</div>
            <div className="db-kpi-label">Lead Time to Production</div>
            <div className="db-kpi-value">5.5<span className="db-kpi-unit"> d</span></div>
            <div className="db-kpi-hint">Avg commit → production deploy</div>
            <span className="db-kpi-badge badge-info">Medium band</span>
          </div>

          <div className="db-kpi-card blue">
            <span className="db-info-icon" data-tooltip="How often the team deploys to production. A core DORA metric — higher frequency signals a healthy, low-risk delivery process with small incremental changes.">ⓘ</span>
            <div className="db-kpi-category">Delivery Speed</div>
            <div className="db-kpi-label">Deployment Frequency</div>
            <div className="db-kpi-value">2.1<span className="db-kpi-unit">×/wk</span></div>
            <div className="db-kpi-hint">Deployments to production per week</div>
            <span className="db-kpi-badge badge-info">Medium band</span>
          </div>

          <div className="db-kpi-card amber">
            <span className="db-info-icon" data-tooltip="% of deployments that result in incidents, rollbacks, or hotfixes. A core DORA metric — indicates how safe and stable the release process is.">ⓘ</span>
            <div className="db-kpi-category">Production Risk</div>
            <div className="db-kpi-label">Change Failure Rate</div>
            <div className="db-kpi-value">12.5<span className="db-kpi-unit">%</span></div>
            <div className="db-kpi-hint">Deploys causing incidents or rollbacks</div>
            <span className="db-kpi-badge badge-warn">⚠ Review</span>
          </div>
        </div>

        {/* Section 2: AI Quality */}
        <div className="db-ai-section">
          <div className="db-section-header">
            <span className="db-section-title">AI-Driven Development Quality Metrics — AI vs. Human Baseline</span>
            <div className="db-section-line" />
          </div>

          <div className="db-ai-grid">
            <div className="db-ai-card">
              <span className="db-info-icon" data-tooltip="% of deployments from AI-generated changes that cause incidents or rollbacks vs. human-authored changes. Shows whether AI increases production risk.">ⓘ</span>
              <div className="db-ai-card-label">AI Change Failure Rate</div>
              <div className="db-ai-row">
                <span className="db-ai-row-label ai">AI</span>
                <div className="db-bar-track"><div className="db-bar-fill ai" style={{ width: "72%" }} /></div>
                <span className="db-bar-value ai">18%</span>
              </div>
              <div className="db-ai-row">
                <span className="db-ai-row-label human">Human</span>
                <div className="db-bar-track"><div className="db-bar-fill human" style={{ width: "36%" }} /></div>
                <span className="db-bar-value human">9%</span>
              </div>
              <div className="db-ai-delta">
                <span className="db-delta-pill">+9pp</span>
                <span>Blended avg = 12.5% overall CFR</span>
              </div>
            </div>

            <div className="db-ai-card">
              <span className="db-info-icon" data-tooltip="% of defects from AI-generated changes found in production rather than during testing. Indicates whether QA catches AI issues as effectively as human-authored work.">ⓘ</span>
              <div className="db-ai-card-label">AI Defect Escape Rate</div>
              <div className="db-ai-row">
                <span className="db-ai-row-label ai">AI</span>
                <div className="db-bar-track"><div className="db-bar-fill ai" style={{ width: "75%" }} /></div>
                <span className="db-bar-value ai">15%</span>
              </div>
              <div className="db-ai-row">
                <span className="db-ai-row-label human">Human</span>
                <div className="db-bar-track"><div className="db-bar-fill human" style={{ width: "45%" }} /></div>
                <span className="db-bar-value human">9%</span>
              </div>
              <div className="db-ai-delta">
                <span className="db-delta-pill">+6pp</span>
                <span>Blended avg = 11.4% overall escape rate</span>
              </div>
            </div>

            <div className="db-ai-card">
              <span className="db-info-icon" data-tooltip="% of AI-generated pull requests that fail automated tests in CI, vs. human PRs. Shows how often AI-produced code violates expected system behavior.">ⓘ</span>
              <div className="db-ai-card-label">AI Test Failure Rate (CI)</div>
              <div className="db-ai-row">
                <span className="db-ai-row-label ai">AI</span>
                <div className="db-bar-track"><div className="db-bar-fill ai" style={{ width: "80%" }} /></div>
                <span className="db-bar-value ai">32%</span>
              </div>
              <div className="db-ai-row">
                <span className="db-ai-row-label human">Human</span>
                <div className="db-bar-track"><div className="db-bar-fill human" style={{ width: "45%" }} /></div>
                <span className="db-bar-value human">18%</span>
              </div>
              <div className="db-ai-delta">
                <span className="db-delta-pill">+14pp</span>
                <span>AI PRs break CI 1.8× more often</span>
              </div>
            </div>

            <div className="db-ai-card">
              <span className="db-info-icon" data-tooltip="Regression defects per 100 changes, AI vs. human. Measures whether AI-generated modifications break existing functionality more frequently.">ⓘ</span>
              <div className="db-ai-card-label">AI Regression Defect Rate</div>
              <div className="db-ai-row">
                <span className="db-ai-row-label ai">AI</span>
                <div className="db-bar-track"><div className="db-bar-fill ai" style={{ width: "90%" }} /></div>
                <span className="db-bar-value ai">9</span>
              </div>
              <div className="db-ai-row">
                <span className="db-ai-row-label human">Human</span>
                <div className="db-bar-track"><div className="db-bar-fill human" style={{ width: "50%" }} /></div>
                <span className="db-bar-value human">5</span>
              </div>
              <div className="db-ai-delta">
                <span className="db-delta-pill">+4</span>
                <span>Regressions per 100 changes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer legend */}
        <div className="db-footer">
          <div className="db-legend">
            <span className="db-legend-item">
              <span className="db-legend-dot" style={{ background: "#e55b2f" }} />
              AI-generated changes
            </span>
            <span className="db-legend-item">
              <span className="db-legend-dot" style={{ background: "#1e40af" }} />
              Human baseline
            </span>
            <span className="db-legend-item">
              <span className="db-legend-pill good">✓ Within target</span>
            </span>
            <span className="db-legend-item">
              <span className="db-legend-pill warn">⚠ Monitor / review</span>
            </span>
          </div>
          <div className="db-footer-note">Generated · March 2026</div>
        </div>

      </main>
    </div>
  );
}
