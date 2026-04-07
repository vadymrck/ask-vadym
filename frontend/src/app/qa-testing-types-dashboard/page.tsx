"use client";

import { useEffect } from "react";
import Header from "@/components/Header";

export default function QATestingTypesDashboardPage() {
  useEffect(() => {
    const tooltip = document.getElementById("tooltip");
    const tipLabel = document.getElementById("tooltip-label");
    const tipBody = document.getElementById("tooltip-body");
    if (!tooltip || !tipLabel || !tipBody) return;

    let hideTimer: ReturnType<typeof setTimeout> | null = null;

    function showTileTooltip(tile: Element, e: MouseEvent) {
      if (hideTimer) clearTimeout(hideTimer);

      const infoEl = tile.querySelector("[data-tip-type=\"info\"]") as HTMLElement | null;
      const aiEl = tile.querySelector("[data-tip-type=\"ai\"]") as HTMLElement | null;
      const tileName = (tile.querySelector(".tile-name") as HTMLElement | null)?.textContent?.trim() || "Testing Type";
      const infoText = infoEl?.dataset.tip || "";
      const aiText = aiEl?.dataset.tip || "";

      tipLabel!.textContent = tileName;
      tipBody!.innerHTML = "";

      if (infoText) {
        const descTitle = document.createElement("div");
        descTitle.className = "tooltip-section-title";
        descTitle.textContent = "Description";
        tipBody!.appendChild(descTitle);

        const descText = document.createElement("span");
        descText.className = "tooltip-text";
        descText.textContent = infoText;
        tipBody!.appendChild(descText);
      }

      if (aiText) {
        if (infoText) {
          const separator = document.createElement("div");
          separator.className = "tooltip-separator";
          tipBody!.appendChild(separator);
        }

        const aiTitle = document.createElement("div");
        aiTitle.className = "tooltip-section-title";
        aiTitle.textContent = "AI Impact";
        tipBody!.appendChild(aiTitle);

        const items = aiText.split("\n").filter(Boolean);
        const ul = document.createElement("ul");
        ul.className = "tooltip-ai-list";
        items.forEach((item) => {
          const li = document.createElement("li");
          li.textContent = item.replace(/^•\s*/, "");
          ul.appendChild(li);
        });
        tipBody!.appendChild(ul);
      }

      tooltip!.classList.add("visible");
      positionTooltip(e);
    }

    function positionTooltip(e: MouseEvent) {
      const pad = 16;
      const tw = tooltip!.offsetWidth;
      const th = tooltip!.offsetHeight;
      let x = e.clientX + pad;
      let y = e.clientY + pad;
      if (x + tw + pad > window.innerWidth) x = e.clientX - tw - pad;
      if (y + th + pad > window.innerHeight) y = e.clientY - th - pad;
      tooltip!.style.left = x + "px";
      tooltip!.style.top = y + "px";
    }

    function hideTooltip() {
      hideTimer = setTimeout(() => tooltip!.classList.remove("visible"), 200);
    }

    function fitDashboardToViewport() {
      const page = document.getElementById("dashboard-page");
      if (!page) return;
      if (window.innerWidth <= 900) {
        page.style.transform = "none";
        return;
      }
      page.style.transform = "scale(1)";
      const pad = 16;
      const availableWidth = window.innerWidth - pad;
      const availableHeight = window.innerHeight - pad;
      const scaleX = availableWidth / page.offsetWidth;
      const scaleY = availableHeight / page.offsetHeight;
      const rawScale = Math.min(scaleX, scaleY, 1);
      const minScale = 0.88;
      const scale = rawScale < 1 ? Math.max(rawScale, minScale) : 1;
      page.style.transform = `scale(${scale})`;
    }

    const tiles = document.querySelectorAll(".tile");
    const handlers: Array<{ tile: Element; enter: (e: Event) => void; move: (e: Event) => void; leave: () => void; click: (e: Event) => void }> = [];

    tiles.forEach((tile) => {
      const enter = (e: Event) => showTileTooltip(tile, e as MouseEvent);
      const move = (e: Event) => positionTooltip(e as MouseEvent);
      const leave = () => hideTooltip();
      const click = (e: Event) => {
        e.stopPropagation();
        tooltip!.classList.contains("visible")
          ? tooltip!.classList.remove("visible")
          : showTileTooltip(tile, e as MouseEvent);
      };
      tile.addEventListener("mouseenter", enter);
      tile.addEventListener("mousemove", move);
      tile.addEventListener("mouseleave", leave);
      tile.addEventListener("click", click);
      handlers.push({ tile, enter, move, leave, click });
    });

    const docClick = () => tooltip!.classList.remove("visible");
    document.addEventListener("click", docClick);
    window.addEventListener("resize", fitDashboardToViewport);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(fitDashboardToViewport);
    }
    fitDashboardToViewport();

    return () => {
      handlers.forEach(({ tile, enter, move, leave, click }) => {
        tile.removeEventListener("mouseenter", enter);
        tile.removeEventListener("mousemove", move);
        tile.removeEventListener("mouseleave", leave);
        tile.removeEventListener("click", click);
      });
      document.removeEventListener("click", docClick);
      window.removeEventListener("resize", fitDashboardToViewport);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#f0f4f8]">
      <Header currentPage="blog" />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        :root {
          --bg:           #f0f4f8;
          --surface:      #ffffff;
          --border:       #dde3ec;
          --navy:         #1a2b4a;
          --blue:         #2563eb;
          --blue-light:   #eff4ff;
          --green:        #16a34a;
          --green-light:  #f0fdf4;
          --purple:       #7c3aed;
          --purple-light: #f5f3ff;
          --orange:       #ea580c;
          --orange-light: #fff7ed;
          --text-primary:   #0f172a;
          --text-secondary: #475569;
          --text-muted:     #94a3b8;
          --ai-color:     #e55b2f;
          --radius:       8px;
          --shadow:       0 1px 3px rgba(0,0,0,.07), 0 3px 10px rgba(0,0,0,.05);
        }

        .viewport-fit {
          width: 100%;
          padding: 4px;
          display: flex;
          justify-content: center;
          align-items: flex-start;
        }

        .page {
          width: 1280px;
          max-width: 1280px;
          margin: 0 auto;
          padding: 20px 24px 22px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          transform-origin: top center;
          will-change: transform;
        }

        .page-title { margin-bottom: 4px; }
        .page-title h1 { font-size: 20px; font-weight: 800; letter-spacing: -0.3px; color: var(--text-primary); margin-bottom: 2px; }
        .page-title p { font-size: 12px; color: var(--text-secondary); }

        .section {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .section-accent {
          width: 12px;
          height: 12px;
          border-radius: 3px;
          flex-shrink: 0;
        }
        .section-title {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: .8px;
        }
        .section-line {
          flex: 1;
          height: 1px;
          background: var(--border);
        }

        .section--blue  .section-accent { background: var(--blue); }
        .section--blue  .section-title  { color: var(--blue); }
        .section--green .section-accent { background: var(--green); }
        .section--green .section-title  { color: var(--green); }
        .section--purple .section-accent { background: var(--purple); }
        .section--purple .section-title  { color: var(--purple); }
        .section--orange .section-accent { background: var(--orange); }
        .section--orange .section-title  { color: var(--orange); }

        .dashboard-layout {
          display: grid;
          grid-template-columns: 360px minmax(0, 1fr);
          gap: 10px;
          align-items: start;
        }

        .left-stack {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .right-column {
          min-width: 0;
        }

        .left-stack .section,
        .right-column .section {
          min-width: 0;
        }

        .subgroup-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 2px;
        }
        .subgroup-label {
          font-size: 9.5px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: .8px;
          color: var(--text-muted);
          white-space: nowrap;
        }
        .subgroup-line {
          flex: 1;
          height: 1px;
          background: #edf0f5;
        }

        .tile-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .tile {
          background: var(--surface);
          border: 1px solid #e6ebf2;
          border-radius: var(--radius);
          box-shadow: 0 1px 2px rgba(0,0,0,.05);
          padding: 8px 10px 18px;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 154px;
          min-height: 48px;
          transition: box-shadow .15s, border-color .15s;
        }
        .tile:hover {
          box-shadow: 0 2px 6px rgba(0,0,0,.08);
          border-color: #cbd5e1;
        }

        .tile::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          border-radius: var(--radius) var(--radius) 0 0;
        }
        .section--blue   .tile::before { background: var(--blue); }
        .section--green  .tile::before { background: var(--green); }
        .section--purple .tile::before { background: var(--purple); }
        .section--orange .tile::before { background: var(--orange); }

        .nf-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
          gap: 8px;
          margin-top: 2px;
        }

        .nf-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-width: 0;
          background: #ffffff;
          border: 1px solid #e6ebf2;
          border-radius: 10px;
          padding: 6px;
          position: relative;
          overflow: hidden;
        }

        .nf-group::before { content: none; }

        .nf-group .tile-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 6px;
        }

        .nf-group .tile {
          width: auto;
          min-height: 48px;
          border-color: #e6ebf2;
          box-shadow: 0 1px 2px rgba(0,0,0,.05);
        }

        .nf-group .subgroup-row {
          margin-top: 0;
          gap: 6px;
        }

        .nf-group .subgroup-label {
          color: var(--text-secondary);
          background: #fff;
          border: 1px solid #d9e2ec;
          border-radius: 999px;
          padding: 2px 7px;
          letter-spacing: .6px;
        }

        .nf-group .subgroup-line {
          height: 2px;
          border-radius: 999px;
          background: linear-gradient(90deg, #dbe4ee, transparent);
        }

        .tile-name {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-primary);
          line-height: 1.3;
          padding-right: 18px;
          word-break: break-word;
        }

        .tile-footer {
          display: none;
        }

        .ai-badge {
          position: absolute;
          bottom: 4px;
          right: 6px;
          font-size: 8px;
          font-weight: 600;
          color: #94a3b8;
          white-space: nowrap;
          line-height: 1;
        }

        .info-btn {
          position: absolute;
          top: 5px;
          right: 5px;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: 1px solid #cbd5e1;
          color: #64748b;
          background: #f8fafc;
          font-size: 9px;
          font-style: italic;
          font-family: Georgia, serif;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: color .12s, border-color .12s, background .12s;
          line-height: 1;
          z-index: 1;
        }
        .info-btn:hover {
          border-color: #94a3b8;
          background: #f1f5f9;
        }

        .tooltip {
          display: none;
          position: fixed;
          z-index: 9999;
          background: var(--navy);
          color: #e2e8f0;
          border-radius: 9px;
          border: 1px solid rgba(148, 163, 184, .25);
          padding: 11px 14px;
          font-size: 11.5px;
          line-height: 1.65;
          max-width: 320px;
          box-shadow: 0 6px 24px rgba(0,0,0,.22);
          pointer-events: none;
        }
        .tooltip.visible { display: block; }
        .tooltip-label {
          font-size: 9.5px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: .7px;
          color: #94a3b8;
          margin-bottom: 8px;
          padding-bottom: 5px;
          border-bottom: 1px solid rgba(148, 163, 184, .35);
        }
        .tooltip-text { color: #e2e8f0; }
        .tooltip-section-title {
          font-size: 9px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: .6px;
          color: #94a3b8;
          margin: 6px 0 4px;
        }
        .tooltip-section-title:first-child { margin-top: 0; }
        .tooltip-separator {
          height: 1px;
          background: rgba(148, 163, 184, .35);
          margin: 8px 0 6px;
        }
        .tooltip-ai-list {
          list-style: none;
          padding: 0; margin: 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .tooltip-ai-list li::before { content: "• "; color: var(--ai-color); }


        @media (max-width: 1360px) {
          .dashboard-layout { grid-template-columns: 340px minmax(0, 1fr); }
          .nf-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        }

        @media (max-width: 1100px) {
          .dashboard-layout { grid-template-columns: 1fr; gap: 8px; }
          .left-stack { gap: 8px; }
          .nf-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }

        @media (max-width: 900px) {
          .viewport-fit { width: 100%; padding: 0; display: block; }
          .page { width: 100%; max-width: none; padding: 10px 10px 12px; transform: none !important; }
          .dashboard-layout { grid-template-columns: 1fr; gap: 6px; }
          .left-stack { gap: 6px; }
          .nf-grid { grid-template-columns: 1fr; gap: 6px; }
          .nf-group .tile-grid { grid-template-columns: 1fr; }
          .tile { width: 100%; min-height: 60px; padding: 8px 9px 7px; }
          .tile-name { font-size: 11px; line-height: 1.3; }
        }
      `}</style>

      <div className="viewport-fit">
        <div className="page" id="dashboard-page">

          {/* Title */}
          <div className="page-title">
            <h1>QA Testing Types &amp; AI Impact</h1>
            <p>Functional · Non-functional · Structural · Change-related</p>
          </div>

          <div className="dashboard-layout">
            <div className="left-stack">

              {/* Functional Testing */}
              <div className="section section--blue">
                <div className="section-header">
                  <div className="section-accent"></div>
                  <div className="section-title">Functional Testing</div>
                  <div className="section-line"></div>
                </div>
                <div className="tile-grid">

                  <div className="tile">
                    <span className="info-btn" data-tip-type="info" data-tip-label="Requirement / Feature Testing" data-tip="Verifies that implemented features meet specified requirements.">i</span>
                    <div className="tile-name">Requirement / Feature Testing</div>
                    <div className="tile-footer">
                      <span className="ai-badge" data-tip-type="ai" data-tip-label="AI Impact" data-tip="• Validate outputs using criteria (accuracy, relevance, no hallucination); expected results are not fixed.">AI &bull;&bull;&bull;</span>
                    </div>
                  </div>

                  <div className="tile">
                    <span className="info-btn" data-tip-type="info" data-tip-label="Use-Case Testing" data-tip="Validates system behavior against real user scenarios and interactions.">i</span>
                    <div className="tile-name">Use-Case Testing</div>
                    <div className="tile-footer">
                      <span className="ai-badge" data-tip-type="ai" data-tip-label="AI Impact" data-tip="• Include diverse prompt scenarios (ambiguous, incomplete, real-world phrasing).">AI &bull;&bull;&bull;</span>
                    </div>
                  </div>

                  <div className="tile">
                    <span className="info-btn" data-tip-type="info" data-tip-label="Workflow Testing" data-tip="Ensures that multi-step business processes work correctly from start to finish.">i</span>
                    <div className="tile-name">Workflow Testing</div>
                    <div className="tile-footer">
                      <span className="ai-badge" data-tip-type="ai" data-tip-label="AI Impact" data-tip="• Validate human-AI interaction flows, including fallback, retries, and decision points.">AI &bull;&bull;</span>
                    </div>
                  </div>

                  <div className="tile">
                    <span className="info-btn" data-tip-type="info" data-tip-label="State Transition Testing" data-tip="Checks that the system behaves correctly when moving between different states.">i</span>
                    <div className="tile-name">State Transition Testing</div>
                    <div className="tile-footer">
                      <span className="ai-badge" data-tip-type="ai" data-tip-label="AI Impact" data-tip="• Validate transitions triggered by confidence thresholds, retries, and fallback logic.">AI &bull;&bull;</span>
                    </div>
                  </div>

                  <div className="tile">
                    <span className="info-btn" data-tip-type="info" data-tip-label="Negative / Error Handling Testing" data-tip="Confirms that the system handles invalid inputs and failure scenarios gracefully.">i</span>
                    <div className="tile-name">Negative / Error Handling Testing</div>
                    <div className="tile-footer">
                      <span className="ai-badge" data-tip-type="ai" data-tip-label="AI Impact" data-tip="• Include adversarial prompts, prompt injection, unsafe inputs, and harmful outputs.">AI &bull;&bull;&bull;</span>
                    </div>
                  </div>

                  <div className="tile">
                    <span className="info-btn" data-tip-type="info" data-tip-label="End-to-End Testing" data-tip="Validates complete user journeys across integrated systems in a production-like environment.">i</span>
                    <div className="tile-name">End-to-End (E2E) Testing</div>
                    <div className="tile-footer">
                      <span className="ai-badge" data-tip-type="ai" data-tip-label="AI Impact" data-tip="• Validate full flows with AI in the loop, accounting for response variability and non-determinism.">AI &bull;&bull;&bull;</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Structural Testing */}
              <div className="section section--purple">
                <div className="section-header">
                  <div className="section-accent"></div>
                  <div className="section-title">Structural Testing</div>
                  <div className="section-line"></div>
                </div>
                <div className="tile-grid">

                  <div className="tile">
                    <span className="info-btn" data-tip-type="info" data-tip-label="Statement Coverage" data-tip="Measures whether all executable statements in the code have been tested.">i</span>
                    <div className="tile-name">Statement Coverage</div>
                    <div className="tile-footer"></div>
                  </div>

                  <div className="tile">
                    <span className="info-btn" data-tip-type="info" data-tip-label="Branch / Decision Coverage" data-tip="Verifies that all possible decision outcomes are executed.">i</span>
                    <div className="tile-name">Branch / Decision Coverage</div>
                    <div className="tile-footer">
                      <span className="ai-badge" data-tip-type="ai" data-tip-label="AI Impact" data-tip="• Validate decisions influenced by AI outputs, confidence, and fallback logic.">AI &bull;&bull;</span>
                    </div>
                  </div>

                  <div className="tile">
                    <span className="info-btn" data-tip-type="info" data-tip-label="Condition Coverage" data-tip="Ensures each boolean condition in a decision is evaluated as both true and false.">i</span>
                    <div className="tile-name">Condition Coverage</div>
                    <div className="tile-footer"></div>
                  </div>

                  <div className="tile">
                    <span className="info-btn" data-tip-type="info" data-tip-label="Path Coverage" data-tip="Validates execution of all possible paths through the code logic.">i</span>
                    <div className="tile-name">Path Coverage</div>
                    <div className="tile-footer">
                      <span className="ai-badge" data-tip-type="ai" data-tip-label="AI Impact" data-tip="• Validate paths involving AI success, failure, retries, and fallbacks.">AI &bull;&bull;</span>
                    </div>
                  </div>

                  <div className="tile">
                    <span className="info-btn" data-tip-type="info" data-tip-label="Data-Flow Testing" data-tip="Checks the correct usage and lifecycle of data variables within the code.">i</span>
                    <div className="tile-name">Data-Flow Testing</div>
                    <div className="tile-footer">
                      <span className="ai-badge" data-tip-type="ai" data-tip-label="AI Impact" data-tip="• Validate data flow between prompts, model inputs/outputs, and downstream systems.">AI &bull;&bull;</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Change-Related Testing */}
              <div className="section section--orange">
                <div className="section-header">
                  <div className="section-accent"></div>
                  <div className="section-title">Change-Related Testing</div>
                  <div className="section-line"></div>
                </div>
                <div className="tile-grid">

                  <div className="tile">
                    <span className="info-btn" data-tip-type="info" data-tip-label="Retesting / Confirmation Testing" data-tip="Verifies that a previously identified defect has been fixed successfully.">i</span>
                    <div className="tile-name">Retesting / Confirmation Testing</div>
                    <div className="tile-footer"></div>
                  </div>

                  <div className="tile">
                    <span className="info-btn" data-tip-type="info" data-tip-label="Regression Testing" data-tip="Ensures that recent changes have not introduced new defects in existing functionality.">i</span>
                    <div className="tile-name">Regression Testing</div>
                    <div className="tile-footer">
                      <span className="ai-badge" data-tip-type="ai" data-tip-label="AI Impact" data-tip="• Compare outputs against baselines while accounting for acceptable variability.">AI &bull;&bull;&bull;</span>
                    </div>
                  </div>

                </div>
              </div>

            </div>{/* /left-stack */}

            <div className="right-column">
            {/* Non-Functional Testing */}
            <div className="section section--green">
              <div className="section-header">
                <div className="section-accent"></div>
                <div className="section-title">Non-Functional Testing</div>
                <div className="section-line"></div>
              </div>

              <div className="nf-grid">

                {/* Performance */}
                <div className="nf-group">
                  <div className="subgroup-row"><div className="subgroup-label">Performance</div><div className="subgroup-line"></div></div>
                  <div className="tile-grid">
                    <div className="tile"><span className="info-btn" data-tip-type="info" data-tip-label="Performance Testing" data-tip="Evaluates system responsiveness, speed, and stability under defined conditions.">i</span><div className="tile-name">Performance Testing</div><div className="tile-footer"><span className="ai-badge" data-tip-type="ai" data-tip-label="AI Impact" data-tip="• Include model latency, response variability, and inference time.">AI &bull;&bull;</span></div></div>
                    <div className="tile"><span className="info-btn" data-tip-type="info" data-tip-label="Load Testing" data-tip="Assesses system behavior under expected user or transaction load.">i</span><div className="tile-name">Load Testing</div><div className="tile-footer"><span className="ai-badge" data-tip-type="ai" data-tip-label="AI Impact" data-tip="• Include concurrent AI requests, API rate limits, and queuing behavior.">AI &bull;&bull;</span></div></div>
                    <div className="tile"><span className="info-btn" data-tip-type="info" data-tip-label="Stress Testing" data-tip="Determines system limits by applying load beyond normal operating capacity.">i</span><div className="tile-name">Stress Testing</div><div className="tile-footer"></div></div>
                    <div className="tile"><span className="info-btn" data-tip-type="info" data-tip-label="Spike Testing" data-tip="Evaluates system response to sudden and extreme increases in load.">i</span><div className="tile-name">Spike Testing</div><div className="tile-footer"></div></div>
                    <div className="tile"><span className="info-btn" data-tip-type="info" data-tip-label="Endurance / Soak Testing" data-tip="Verifies system stability and performance over an extended period under load.">i</span><div className="tile-name">Endurance / Soak Testing</div><div className="tile-footer"><span className="ai-badge" data-tip-type="ai" data-tip-label="AI Impact" data-tip="• Detect degradation over time (memory leaks, caching issues, model instability).">AI &bull;&bull;</span></div></div>
                    <div className="tile"><span className="info-btn" data-tip-type="info" data-tip-label="Scalability Testing" data-tip="Assesses the system's ability to handle increased load by scaling resources.">i</span><div className="tile-name">Scalability Testing</div><div className="tile-footer"><span className="ai-badge" data-tip-type="ai" data-tip-label="AI Impact" data-tip="• Validate scaling of AI services, model endpoints, and infrastructure.">AI &bull;&bull;</span></div></div>
                  </div>
                </div>

                {/* Security */}
                <div className="nf-group">
                  <div className="subgroup-row"><div className="subgroup-label">Security</div><div className="subgroup-line"></div></div>
                  <div className="tile-grid">
                    <div className="tile"><span className="info-btn" data-tip-type="info" data-tip-label="Security Testing" data-tip="Identifies vulnerabilities and helps ensure protection against unauthorized access.">i</span><div className="tile-name">Security Testing</div><div className="tile-footer"><span className="ai-badge" data-tip-type="ai" data-tip-label="AI Impact" data-tip="• Include prompt injection, data leakage, unsafe outputs, and model misuse.">AI &bull;&bull;&bull;</span></div></div>
                    <div className="tile"><span className="info-btn" data-tip-type="info" data-tip-label="Penetration Testing" data-tip="Simulates real-world attacks to evaluate system defenses.">i</span><div className="tile-name">Penetration Testing</div><div className="tile-footer"><span className="ai-badge" data-tip-type="ai" data-tip-label="AI Impact" data-tip="• Simulate attacks via crafted prompts and adversarial inputs.">AI &bull;&bull;&bull;</span></div></div>
                    <div className="tile"><span className="info-btn" data-tip-type="info" data-tip-label="Vulnerability Testing" data-tip="Detects known security weaknesses in the system.">i</span><div className="tile-name">Vulnerability Testing</div><div className="tile-footer"></div></div>
                    <div className="tile"><span className="info-btn" data-tip-type="info" data-tip-label="Authentication / Authorization Testing" data-tip="Verifies correct enforcement of identity verification and access control.">i</span><div className="tile-name">Auth / Authorization Testing</div><div className="tile-footer"></div></div>
                  </div>
                </div>

                {/* Usability */}
                <div className="nf-group">
                  <div className="subgroup-row"><div className="subgroup-label">Usability</div><div className="subgroup-line"></div></div>
                  <div className="tile-grid">
                    <div className="tile"><span className="info-btn" data-tip-type="info" data-tip-label="Usability Testing" data-tip="Evaluates how easy and intuitive the system is for end users.">i</span><div className="tile-name">Usability Testing</div><div className="tile-footer"><span className="ai-badge" data-tip-type="ai" data-tip-label="AI Impact" data-tip="• Evaluate clarity, usefulness, tone, and trustworthiness of AI outputs.">AI &bull;&bull;&bull;</span></div></div>
                    <div className="tile"><span className="info-btn" data-tip-type="info" data-tip-label="Accessibility Testing" data-tip="Ensures the system is usable by people with disabilities according to accessibility standards.">i</span><div className="tile-name">Accessibility Testing</div><div className="tile-footer"></div></div>
                  </div>
                </div>

                {/* Reliability */}
                <div className="nf-group">
                  <div className="subgroup-row"><div className="subgroup-label">Reliability</div><div className="subgroup-line"></div></div>
                  <div className="tile-grid">
                    <div className="tile"><span className="info-btn" data-tip-type="info" data-tip-label="Reliability Testing" data-tip="Evaluates the system's ability to perform consistently over time.">i</span><div className="tile-name">Reliability Testing</div><div className="tile-footer"><span className="ai-badge" data-tip-type="ai" data-tip-label="AI Impact" data-tip="• Validate output consistency, detect drift, and monitor stability.">AI &bull;&bull;&bull;</span></div></div>
                    <div className="tile"><span className="info-btn" data-tip-type="info" data-tip-label="Recoverability Testing" data-tip="Verifies the system's ability to recover after failures or crashes.">i</span><div className="tile-name">Recoverability Testing</div><div className="tile-footer"><span className="ai-badge" data-tip-type="ai" data-tip-label="AI Impact" data-tip="• Validate fallback strategies when AI fails or returns invalid output.">AI &bull;&bull;</span></div></div>
                  </div>
                </div>

                {/* Compatibility */}
                <div className="nf-group">
                  <div className="subgroup-row"><div className="subgroup-label">Compatibility</div><div className="subgroup-line"></div></div>
                  <div className="tile-grid">
                    <div className="tile"><span className="info-btn" data-tip-type="info" data-tip-label="Compatibility Testing" data-tip="Verifies system behavior across different environments, devices, and browsers.">i</span><div className="tile-name">Compatibility Testing</div><div className="tile-footer"></div></div>
                    <div className="tile"><span className="info-btn" data-tip-type="info" data-tip-label="Portability Testing" data-tip="Assesses how easily the system can be moved across environments or platforms.">i</span><div className="tile-name">Portability Testing</div><div className="tile-footer"></div></div>
                    <div className="tile"><span className="info-btn" data-tip-type="info" data-tip-label="Interoperability Testing" data-tip="Ensures the system can correctly interact with other systems or components.">i</span><div className="tile-name">Interoperability Testing</div><div className="tile-footer"><span className="ai-badge" data-tip-type="ai" data-tip-label="AI Impact" data-tip="• Validate integration with external AI services, APIs, and tools.">AI &bull;&bull;</span></div></div>
                  </div>
                </div>

                {/* Environment */}
                <div className="nf-group">
                  <div className="subgroup-row"><div className="subgroup-label">Environment</div><div className="subgroup-line"></div></div>
                  <div className="tile-grid">
                    <div className="tile"><span className="info-btn" data-tip-type="info" data-tip-label="Installation Testing" data-tip="Confirms that the system can be installed correctly in target environments.">i</span><div className="tile-name">Installation Testing</div><div className="tile-footer"></div></div>
                    <div className="tile"><span className="info-btn" data-tip-type="info" data-tip-label="Configuration Testing" data-tip="Validates system behavior under different configuration settings.">i</span><div className="tile-name">Configuration Testing</div><div className="tile-footer"><span className="ai-badge" data-tip-type="ai" data-tip-label="AI Impact" data-tip="• Validate behavior across model versions, parameters, and prompt configurations.">AI &bull;&bull;&bull;</span></div></div>
                    <div className="tile"><span className="info-btn" data-tip-type="info" data-tip-label="Upgrade Testing" data-tip="Ensures that updates or new versions do not break existing functionality or data.">i</span><div className="tile-name">Upgrade Testing</div><div className="tile-footer"><span className="ai-badge" data-tip-type="ai" data-tip-label="AI Impact" data-tip="• Validate impact of model/version changes on output behavior and quality.">AI &bull;&bull;&bull;</span></div></div>
                  </div>
                </div>

                {/* Localization */}
                <div className="nf-group">
                  <div className="subgroup-row"><div className="subgroup-label">Localization</div><div className="subgroup-line"></div></div>
                  <div className="tile-grid">
                    <div className="tile"><span className="info-btn" data-tip-type="info" data-tip-label="Localization Testing" data-tip="Verifies correct adaptation of the system for a specific language or region.">i</span><div className="tile-name">Localization Testing</div><div className="tile-footer"><span className="ai-badge" data-tip-type="ai" data-tip-label="AI Impact" data-tip="• Validate multilingual output quality, tone, and cultural correctness.">AI &bull;&bull;&bull;</span></div></div>
                    <div className="tile"><span className="info-btn" data-tip-type="info" data-tip-label="Internationalization Testing" data-tip="Ensures the system supports multiple languages and regional formats.">i</span><div className="tile-name">i18n Testing</div><div className="tile-footer"></div></div>
                  </div>
                </div>

                {/* Compliance */}
                <div className="nf-group">
                  <div className="subgroup-row"><div className="subgroup-label">Compliance</div><div className="subgroup-line"></div></div>
                  <div className="tile-grid">
                    <div className="tile"><span className="info-btn" data-tip-type="info" data-tip-label="Compliance Testing" data-tip="Checks adherence to legal, regulatory, or industry standards.">i</span><div className="tile-name">Compliance Testing</div><div className="tile-footer"><span className="ai-badge" data-tip-type="ai" data-tip-label="AI Impact" data-tip="• Validate GDPR, data privacy, AI regulations, and auditability.">AI &bull;&bull;&bull;</span></div></div>
                    <div className="tile"><span className="info-btn" data-tip-type="info" data-tip-label="Maintainability Testing" data-tip="Evaluates how easily the system can be modified, updated, or debugged.">i</span><div className="tile-name">Maintainability Testing</div><div className="tile-footer"><span className="ai-badge" data-tip-type="ai" data-tip-label="AI Impact" data-tip="• Validate maintainability of prompts, models, and AI-related logic.">AI &bull;&bull;</span></div></div>
                  </div>
                </div>

              </div>{/* /nf-grid */}

            </div>{/* /non-functional */}
            </div>{/* /right-column */}

          </div>{/* /dashboard-layout */}


</div>{/* /page */}
      </div>{/* /viewport-fit */}

      {/* Tooltip */}
      <div className="tooltip" id="tooltip">
        <div className="tooltip-label" id="tooltip-label"></div>
        <div id="tooltip-body"></div>
      </div>

    </div>
  );
}
