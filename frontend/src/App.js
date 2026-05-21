import { useState, useRef, useEffect } from "react";

const ACCENT = "#2563EB";
const ACCENT_GLOW = "#1D4ED8";
const DARK_BG = "#050810";
const CARD_BG = "#0A0F1E";
const CARD_BORDER = "#1a2540";
const SURFACE = "#0F1629";
const TEXT_PRIMARY = "#E8EDF8";
const TEXT_MUTED = "#6B7A9F";
const TEXT_DIM = "#3D4F72";

const styles = {
  app: {
    minHeight: "100vh",
    background: DARK_BG,
    color: TEXT_PRIMARY,
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    display: "flex",
    flexDirection: "column",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 2rem",
    height: "60px",
    borderBottom: `1px solid ${CARD_BORDER}`,
    background: "rgba(5,8,16,0.95)",
    backdropFilter: "blur(12px)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontWeight: 700,
    fontSize: "17px",
    letterSpacing: "-0.3px",
  },
  logoIcon: {
    width: "30px",
    height: "30px",
    background: `linear-gradient(135deg, ${ACCENT}, #60A5FA)`,
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    fontWeight: 800,
    color: "#fff",
  },
  navBadge: {
    background: "rgba(37,99,235,0.15)",
    border: "1px solid rgba(37,99,235,0.35)",
    color: "#60A5FA",
    borderRadius: "6px",
    padding: "3px 10px",
    fontSize: "11px",
    fontWeight: 600,
    letterSpacing: "0.5px",
    textTransform: "uppercase",
  },
  main: {
    display: "flex",
    flex: 1,
    overflow: "hidden",
    height: "calc(100vh - 60px)",
  },
  sidebar: {
    width: "260px",
    minWidth: "260px",
    background: CARD_BG,
    borderRight: `1px solid ${CARD_BORDER}`,
    display: "flex",
    flexDirection: "column",
    padding: "1.25rem 1rem",
    gap: "0.75rem",
    overflowY: "auto",
  },
  sidebarSection: {
    fontSize: "10px",
    fontWeight: 700,
    color: TEXT_DIM,
    letterSpacing: "1.2px",
    textTransform: "uppercase",
    padding: "0.25rem 0.5rem",
    marginTop: "0.5rem",
  },
  docItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "8px 10px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.15s",
    border: "1px solid transparent",
  },
  docItemActive: {
    background: "rgba(37,99,235,0.12)",
    border: "1px solid rgba(37,99,235,0.3)",
  },
  docIcon: {
    width: "30px",
    height: "36px",
    background: "rgba(37,99,235,0.1)",
    border: "1px solid rgba(37,99,235,0.2)",
    borderRadius: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "10px",
    color: "#60A5FA",
    fontWeight: 700,
    flexShrink: 0,
  },
  docName: {
    fontSize: "12.5px",
    fontWeight: 500,
    color: TEXT_PRIMARY,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  docMeta: {
    fontSize: "10.5px",
    color: TEXT_MUTED,
    marginTop: "1px",
  },
  uploadBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: "9px",
    borderRadius: "8px",
    border: `1px dashed ${CARD_BORDER}`,
    background: "transparent",
    color: TEXT_MUTED,
    fontSize: "12.5px",
    cursor: "pointer",
    transition: "all 0.2s",
    width: "100%",
    marginTop: "0.25rem",
  },
  content: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  uploadZone: {
    margin: "1.5rem 2rem",
    border: `2px dashed rgba(37,99,235,0.3)`,
    borderRadius: "14px",
    padding: "2.5rem 2rem",
    textAlign: "center",
    background: "rgba(37,99,235,0.04)",
    cursor: "pointer",
    transition: "all 0.2s",
    position: "relative",
    overflow: "hidden",
  },
  uploadZoneActive: {
    border: `2px dashed ${ACCENT}`,
    background: "rgba(37,99,235,0.1)",
  },
  chatArea: {
    flex: 1,
    overflowY: "auto",
    padding: "1rem 2rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  inputRow: {
    padding: "1rem 2rem 1.5rem",
    borderTop: `1px solid ${CARD_BORDER}`,
    display: "flex",
    gap: "10px",
    alignItems: "flex-end",
    background: "rgba(5,8,16,0.8)",
    backdropFilter: "blur(8px)",
  },
  textarea: {
    flex: 1,
    background: SURFACE,
    border: `1px solid ${CARD_BORDER}`,
    borderRadius: "10px",
    color: TEXT_PRIMARY,
    fontSize: "14px",
    padding: "12px 14px",
    resize: "none",
    outline: "none",
    fontFamily: "inherit",
    lineHeight: 1.5,
    maxHeight: "120px",
    transition: "border-color 0.2s",
  },
  sendBtn: {
    width: "42px",
    height: "42px",
    borderRadius: "10px",
    background: ACCENT,
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    transition: "all 0.15s",
    color: "#fff",
    fontSize: "16px",
  },
  msgUser: {
    alignSelf: "flex-end",
    background: ACCENT,
    color: "#fff",
    borderRadius: "14px 14px 4px 14px",
    padding: "10px 15px",
    maxWidth: "72%",
    fontSize: "14px",
    lineHeight: 1.55,
    fontWeight: 400,
  },
  msgAI: {
    alignSelf: "flex-start",
    maxWidth: "85%",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  msgAIBubble: {
    background: SURFACE,
    border: `1px solid ${CARD_BORDER}`,
    borderRadius: "4px 14px 14px 14px",
    padding: "12px 15px",
    fontSize: "14px",
    lineHeight: 1.65,
    color: TEXT_PRIMARY,
  },
  citationRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
    paddingLeft: "2px",
  },
  citation: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    background: "rgba(37,99,235,0.08)",
    border: "1px solid rgba(37,99,235,0.2)",
    borderRadius: "6px",
    padding: "4px 9px",
    fontSize: "11.5px",
    color: "#60A5FA",
    fontWeight: 500,
    cursor: "pointer",
  },
  thinkingDot: {
    display: "inline-block",
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: ACCENT,
    animation: "pulse 1.4s ease-in-out infinite",
  },
  chip: {
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    background: SURFACE,
    border: `1px solid ${CARD_BORDER}`,
    borderRadius: "20px",
    padding: "5px 12px",
    fontSize: "12px",
    color: TEXT_MUTED,
    cursor: "pointer",
    transition: "all 0.15s",
    fontWeight: 500,
  },
  statusBar: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "6px 14px",
    background: "rgba(5,240,180,0.05)",
    border: "1px solid rgba(5,240,180,0.15)",
    borderRadius: "8px",
    fontSize: "12px",
    color: "#34D399",
    margin: "0 2rem",
    marginBottom: "0.5rem",
  },
  dot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#34D399",
    animation: "pulse 2s infinite",
  },
  progressBar: {
    height: "3px",
    background: "rgba(37,99,235,0.15)",
    borderRadius: "2px",
    overflow: "hidden",
    marginTop: "10px",
  },
  progressFill: {
    height: "100%",
    background: `linear-gradient(90deg, ${ACCENT}, #60A5FA)`,
    borderRadius: "2px",
    transition: "width 0.4s ease",
  },
  sampleQChip: {
    background: SURFACE,
    border: `1px solid ${CARD_BORDER}`,
    borderRadius: "8px",
    padding: "7px 13px",
    fontSize: "12.5px",
    color: TEXT_MUTED,
    cursor: "pointer",
    transition: "all 0.15s",
    textAlign: "left",
  },
  rightPanel: {
    width: "280px",
    minWidth: "280px",
    borderLeft: `1px solid ${CARD_BORDER}`,
    background: CARD_BG,
    overflowY: "auto",
    padding: "1.25rem 1rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  panelTitle: {
    fontSize: "10px",
    fontWeight: 700,
    color: TEXT_DIM,
    letterSpacing: "1.2px",
    textTransform: "uppercase",
    padding: "0 0.25rem",
  },
  chunkCard: {
    background: SURFACE,
    border: `1px solid ${CARD_BORDER}`,
    borderRadius: "10px",
    padding: "10px 12px",
    fontSize: "12px",
    lineHeight: 1.6,
    color: TEXT_MUTED,
  },
  chunkHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "6px",
  },
  chunkTag: {
    background: "rgba(37,99,235,0.1)",
    border: "1px solid rgba(37,99,235,0.2)",
    borderRadius: "5px",
    padding: "2px 7px",
    fontSize: "10px",
    color: "#60A5FA",
    fontWeight: 600,
  },
  relevanceBar: {
    height: "2px",
    background: "rgba(37,99,235,0.1)",
    borderRadius: "1px",
    marginTop: "8px",
    overflow: "hidden",
  },
};

const MOCK_DOCS = [
  { id: 1, name: "NVIDIA_10K_2024.pdf", pages: 128, date: "Mar 2024", active: true },
  { id: 2, name: "Apple_Annual_2023.pdf", pages: 88, date: "Oct 2023", active: false },
  { id: 3, name: "Tesla_Q4_Earnings.pdf", pages: 34, date: "Jan 2024", active: false },
];

const MOCK_QA = [
  {
    q: "What are NVIDIA's primary business risks?",
    a: "NVIDIA identifies several critical business risks in their 10-K filing. The most significant include: (1) heavy dependence on a limited number of customers and concentration risk in the data center segment, (2) supply chain vulnerabilities tied to TSMC manufacturing, (3) intense competition from AMD, Intel, and emerging AI chip startups, and (4) export control regulations that restrict sales to certain markets, particularly China, which represented approximately 17% of revenue.",
    citations: [
      { page: "Page 42", section: "Risk Factors" },
      { page: "Page 47", section: "Competition" },
      { page: "Page 51", section: "Export Controls" },
    ],
    chunks: [
      {
        tag: "Page 42",
        text: "Our revenue is concentrated among a small number of customers, and any loss of a significant customer could adversely affect our business...",
        relevance: 94,
      },
      {
        tag: "Page 47",
        text: "We face intense competition in the GPU, data center, and AI chip markets from companies including AMD, Intel, Google, and Amazon...",
        relevance: 88,
      },
      {
        tag: "Page 51",
        text: "Export control regulations imposed by the U.S. government restrict our ability to sell certain products to customers in China and other regions...",
        relevance: 79,
      },
    ],
  },
];

const SAMPLE_QUESTIONS = [
  "What were NVIDIA's total revenues in FY2024?",
  "Summarize the key risks in the Risk Factors section",
  "What is NVIDIA's data center revenue growth?",
  "Describe NVIDIA's competitive landscape",
];

function ThinkingBubble() {
  return (
    <div style={styles.msgAI}>
      <div style={{ ...styles.msgAIBubble, display: "flex", alignItems: "center", gap: "6px" }}>
        <span style={styles.thinkingDot} />
        <span style={{ ...styles.thinkingDot, animationDelay: "0.2s" }} />
        <span style={{ ...styles.thinkingDot, animationDelay: "0.4s" }} />
      </div>
    </div>
  );
}

function UploadModal({ onClose, onUpload }) {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");
  const inputRef = useRef();

  const handleFile = (file) => {
    if (!file) return;
    setUploading(true);
    setStatus("Parsing document...");
    setProgress(20);
    setTimeout(() => { setStatus("Chunking text..."); setProgress(50); }, 900);
    setTimeout(() => { setStatus("Generating embeddings..."); setProgress(75); }, 1800);
    setTimeout(() => { setStatus("Indexing into vector DB..."); setProgress(92); }, 2600);
    setTimeout(() => {
      setProgress(100);
      setStatus("Document indexed successfully ✓");
      setTimeout(() => { onUpload(file.name); onClose(); }, 700);
    }, 3300);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file?.type === "application/pdf") handleFile(file);
  };

  return (
    <div
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(6px)", display: "flex", alignItems: "center",
        justifyContent: "center", zIndex: 200,
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div style={{
        background: CARD_BG, border: `1px solid ${CARD_BORDER}`,
        borderRadius: "16px", padding: "2rem", width: "440px", maxWidth: "90vw",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <span style={{ fontWeight: 700, fontSize: "16px" }}>Upload Document</span>
          <button onClick={onClose} style={{ background: "none", border: "none", color: TEXT_MUTED, cursor: "pointer", fontSize: "20px", lineHeight: 1 }}>×</button>
        </div>

        {!uploading ? (
          <>
            <div
              style={{ ...styles.uploadZone, ...(dragging ? styles.uploadZoneActive : {}) }}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={onDrop}
              onClick={() => inputRef.current.click()}
            >
              <div style={{ fontSize: "32px", marginBottom: "10px" }}>📄</div>
              <div style={{ fontWeight: 600, marginBottom: "6px" }}>Drop PDF here or click to browse</div>
              <div style={{ fontSize: "12px", color: TEXT_MUTED }}>Annual reports · SEC filings · Earnings PDFs</div>
            </div>
            <input ref={inputRef} type="file" accept=".pdf" style={{ display: "none" }}
              onChange={(e) => handleFile(e.target.files[0])} />
          </>
        ) : (
          <div style={{ padding: "1rem 0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>📄</div>
              <div>
                <div style={{ fontWeight: 500, fontSize: "13px" }}>Processing document...</div>
                <div style={{ fontSize: "12px", color: "#60A5FA", marginTop: "2px" }}>{status}</div>
              </div>
            </div>
            <div style={styles.progressBar}>
              <div style={{ ...styles.progressFill, width: `${progress}%` }} />
            </div>
            <div style={{ fontSize: "11px", color: TEXT_DIM, marginTop: "6px", textAlign: "right" }}>{progress}%</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [docs, setDocs] = useState(MOCK_DOCS);
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hello! I'm your Financial Intelligence assistant. I've indexed your documents and I'm ready to answer questions. Ask me anything about the uploaded filings.",
      citations: [],
      chunks: [],
    }
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [activeChunks, setActiveChunks] = useState([]);
  const chatRef = useRef();

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, thinking]);

  const sendMessage = (text) => {
    const q = text || input.trim();
    if (!q) return;
    setInput("");
    setMessages(m => [...m, { role: "user", text: q }]);
    setThinking(true);
    setActiveChunks([]);

    setTimeout(() => {
      setThinking(false);
      const mockAns = MOCK_QA[0];
      const aiMsg = {
        role: "ai",
        text: mockAns.a,
        citations: mockAns.citations,
        chunks: mockAns.chunks,
      };
      setMessages(m => [...m, aiMsg]);
      setActiveChunks(mockAns.chunks);
    }, 2200);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleUpload = (filename) => {
    const newDoc = {
      id: Date.now(),
      name: filename,
      pages: Math.floor(Math.random() * 80) + 30,
      date: "May 2024",
      active: false,
    };
    setDocs(d => [...d, newDoc]);
  };

  const activeDoc = docs.find(d => d.active) || docs[0];

  return (
    <div style={styles.app}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #1a2540; border-radius: 2px; }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .msg-enter { animation: fadeUp 0.25s ease forwards; }
        .doc-item:hover { background: rgba(37,99,235,0.07) !important; }
        .upload-btn:hover { border-color: rgba(37,99,235,0.4) !important; color: #60A5FA !important; background: rgba(37,99,235,0.05) !important; }
        .send-btn:hover { background: #1D4ED8 !important; transform: scale(1.05); }
        .send-btn:active { transform: scale(0.96); }
        .chip:hover { border-color: rgba(37,99,235,0.4) !important; color: #60A5FA !important; background: rgba(37,99,235,0.06) !important; }
        .sample-q:hover { border-color: rgba(37,99,235,0.35) !important; color: ${TEXT_PRIMARY} !important; background: rgba(37,99,235,0.07) !important; }
        .citation:hover { background: rgba(37,99,235,0.18) !important; }
      `}</style>

      {/* Navbar */}
      <nav style={styles.nav}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}>F</div>
          <span>FinRAG</span>
          <span style={{ color: TEXT_DIM, fontWeight: 300, fontSize: "15px" }}>Intelligence</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={styles.navBadge}>RAG Enabled</span>
          <div style={{
            width: "32px", height: "32px", borderRadius: "50%",
            background: "linear-gradient(135deg, #2563EB, #60A5FA)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "13px", fontWeight: 700, color: "#fff",
          }}>A</div>
        </div>
      </nav>

      <div style={styles.main}>
        {/* Left Sidebar */}
        <aside style={styles.sidebar}>
          <div style={styles.sidebarSection}>Documents</div>

          {docs.map((doc) => (
            <div
              key={doc.id}
              className="doc-item"
              style={{ ...styles.docItem, ...(doc.active ? styles.docItemActive : {}) }}
              onClick={() => setDocs(d => d.map(x => ({ ...x, active: x.id === doc.id })))}
            >
              <div style={styles.docIcon}>PDF</div>
              <div style={{ overflow: "hidden", flex: 1 }}>
                <div style={styles.docName}>{doc.name}</div>
                <div style={styles.docMeta}>{doc.pages} pages · {doc.date}</div>
              </div>
              {doc.active && (
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: ACCENT, flexShrink: 0 }} />
              )}
            </div>
          ))}

          <button
            className="upload-btn"
            style={styles.uploadBtn}
            onClick={() => setShowUpload(true)}
          >
            <span style={{ fontSize: "16px" }}>+</span> Upload PDF
          </button>

          <div style={{ marginTop: "auto", paddingTop: "1rem", borderTop: `1px solid ${CARD_BORDER}` }}>
            <div style={styles.sidebarSection}>System Status</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "8px" }}>
              {[
                { label: "Vector DB", status: "Active", color: "#34D399" },
                { label: "Embeddings", status: "Ready", color: "#34D399" },
                { label: "LLM API", status: "Online", color: "#34D399" },
              ].map((s) => (
                <div key={s.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 4px" }}>
                  <span style={{ fontSize: "12px", color: TEXT_MUTED }}>{s.label}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: s.color }} />
                    <span style={{ fontSize: "11px", color: s.color, fontWeight: 500 }}>{s.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div style={styles.content}>
          {/* Active doc status */}
          <div style={{ ...styles.statusBar, margin: "0.75rem 1.5rem 0" }}>
            <div style={styles.dot} />
            <span>Active: <strong style={{ color: "#6EE7B7" }}>{activeDoc?.name}</strong></span>
            <span style={{ marginLeft: "auto", color: TEXT_DIM, fontSize: "11px" }}>{activeDoc?.pages} pages indexed</span>
          </div>

          {/* Chat */}
          <div ref={chatRef} style={styles.chatArea}>
            {messages.map((msg, i) => (
              <div key={i} className="msg-enter">
                {msg.role === "user" ? (
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <div style={styles.msgUser}>{msg.text}</div>
                  </div>
                ) : (
                  <div style={styles.msgAI}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                      <div style={{
                        width: "24px", height: "24px", borderRadius: "6px",
                        background: "linear-gradient(135deg, #2563EB, #60A5FA)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "10px", fontWeight: 700, color: "#fff", flexShrink: 0,
                      }}>AI</div>
                      <span style={{ fontSize: "11.5px", color: TEXT_DIM, fontWeight: 500 }}>FinRAG Intelligence</span>
                    </div>
                    <div style={styles.msgAIBubble}>{msg.text}</div>
                    {msg.citations?.length > 0 && (
                      <div style={styles.citationRow}>
                        <span style={{ fontSize: "11px", color: TEXT_DIM, alignSelf: "center" }}>Sources:</span>
                        {msg.citations.map((c, ci) => (
                          <span
                            key={ci}
                            className="citation"
                            style={styles.citation}
                            onClick={() => setActiveChunks(msg.chunks || [])}
                          >
                            📄 {c.page} · {c.section}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
            {thinking && <ThinkingBubble />}

            {messages.length === 1 && (
              <div style={{ marginTop: "1rem" }}>
                <div style={{ fontSize: "12px", color: TEXT_DIM, marginBottom: "10px", paddingLeft: "2px" }}>Try asking:</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {SAMPLE_QUESTIONS.map((q, i) => (
                    <button
                      key={i}
                      className="sample-q"
                      style={styles.sampleQChip}
                      onClick={() => sendMessage(q)}
                    >
                      <span style={{ color: TEXT_DIM, marginRight: "8px" }}>↗</span>{q}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div style={styles.inputRow}>
            <textarea
              style={styles.textarea}
              placeholder="Ask a question about the financial documents..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
              }}
            />
            <button
              className="send-btn"
              style={{ ...styles.sendBtn, opacity: (!input.trim() || thinking) ? 0.5 : 1 }}
              onClick={() => sendMessage()}
              disabled={!input.trim() || thinking}
            >
              ↑
            </button>
          </div>
        </div>

        {/* Right Panel — Citations */}
        <aside style={styles.rightPanel}>
          <div style={styles.panelTitle}>Retrieved Chunks</div>

          {activeChunks.length === 0 ? (
            <div style={{ color: TEXT_DIM, fontSize: "12.5px", lineHeight: 1.7, padding: "0.25rem 0.25rem" }}>
              Source excerpts will appear here after you ask a question. Each chunk shows the exact document passage used to generate the answer.
            </div>
          ) : (
            activeChunks.map((chunk, i) => (
              <div key={i} style={styles.chunkCard} className="msg-enter">
                <div style={styles.chunkHeader}>
                  <span style={styles.chunkTag}>{chunk.tag}</span>
                  <span style={{ fontSize: "10px", color: "#60A5FA", fontWeight: 600 }}>{chunk.relevance}% match</span>
                </div>
                <div style={{ fontSize: "12px", color: TEXT_MUTED, lineHeight: 1.65 }}>"{chunk.text}"</div>
                <div style={styles.relevanceBar}>
                  <div style={{ height: "100%", width: `${chunk.relevance}%`, background: `linear-gradient(90deg, ${ACCENT}, #60A5FA)`, borderRadius: "1px", transition: "width 0.8s ease" }} />
                </div>
              </div>
            ))
          )}

          {activeChunks.length > 0 && (
            <div style={{ marginTop: "0.5rem" }}>
              <div style={styles.panelTitle}>Vector Similarity</div>
              <div style={{ background: SURFACE, border: `1px solid ${CARD_BORDER}`, borderRadius: "10px", padding: "10px 12px", marginTop: "8px" }}>
                <div style={{ fontSize: "11px", color: TEXT_DIM, marginBottom: "8px" }}>Embedding distance scores</div>
                {activeChunks.map((c, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                    <span style={{ fontSize: "10px", color: TEXT_DIM, width: "46px", flexShrink: 0 }}>{c.tag}</span>
                    <div style={{ flex: 1, height: "3px", background: "rgba(37,99,235,0.1)", borderRadius: "2px", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${c.relevance}%`, background: `linear-gradient(90deg, ${ACCENT}, #60A5FA)`, borderRadius: "2px" }} />
                    </div>
                    <span style={{ fontSize: "10px", color: "#60A5FA", width: "28px", textAlign: "right" }}>{c.relevance}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ marginTop: "auto", paddingTop: "1rem", borderTop: `1px solid ${CARD_BORDER}` }}>
            <div style={styles.panelTitle}>RAG Pipeline</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginTop: "8px" }}>
              {["Query → Embeddings", "Vector Search", "Chunk Retrieval", "LLM Generation"].map((step, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "5px 6px" }}>
                  <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", color: "#60A5FA", fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                  <span style={{ fontSize: "11.5px", color: TEXT_MUTED }}>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {showUpload && (
        <UploadModal onClose={() => setShowUpload(false)} onUpload={handleUpload} />
      )}
    </div>
  );
}