import { useState, useEffect, useRef } from "react"

const defaultTiles = [
  { id: 11, title: "RP Einkauf", description: "", group: "Intern", favorite: false, url: "https://rp.sharepoint.com/sites/Einkauf", color: "#1a1a1a", size: "medium", newTab: true, icon: "🛒", showUrl: false },
  { id: 10, title: "RP Intranet", description: "", group: "Intern", favorite: false, url: "https://intranet.rheinischepostmediengruppe.de/home", color: "#1a1a1a", size: "medium", newTab: true, icon: "🏢", showUrl: false },
  { id: 9, title: "Langdock", description: "", group: "Tools", favorite: false, url: "https://app.langdock.com/chat", color: "#6b7280", size: "medium", newTab: true, icon: "🤖", showUrl: false },
  { id: 1, title: "Google", description: "", group: "Tools", favorite: false, url: "https://google.com", color: "#9ca3af", size: "medium", newTab: true, icon: "🔍", showUrl: false },
  { id: 4, title: "RP Online", description: "", group: "News", favorite: false, url: "https://rp-online.de", color: "#F5C800", size: "medium", newTab: true, icon: "📰", showUrl: false },
  { id: 7, title: "Jira", description: "", group: "Tools", favorite: false, url: "https://promgm.atlassian.net/jira/software/c/projects/S4HANA/boards/1522", color: "#0A66C2", size: "medium", newTab: true, icon: "jira", showUrl: false },
  { id: 6, title: "Ariba", description: "", group: "Intern", favorite: false, url: "https://s1-eu.ariba.com", color: "#0078D4", size: "medium", newTab: true, icon: "ariba", showUrl: false },
  { id: 8, title: "RP E-Paper", description: "", group: "News", favorite: false, url: "https://epaper.rp-online.de", color: "#e6b800", size: "medium", newTab: true, icon: "📄", showUrl: false },
  { id: 5, title: "SAP Test", description: "", group: "Intern", favorite: false, url: "https://my424364.s4hana.cloud.sap/ui#Shell-home", color: "#1D4ED8", size: "medium", newTab: true, icon: "🔷", showUrl: false },
]

const colorPresets = ["#4285F4","#E30613","#24292e","#0A66C2","#1DA1F2","#F5C800","#34A853","#7C3AED","#EC4899","#1a1a1a","#10B981","#6366F1","#0EA5E9","#D946EF","#84CC16"]

const RP_YELLOW = "#F5C800"
const RP_BLACK = "#1a1a1a"
const RP_DARK = "#111111"

const glassStyle = {
  dark: {
    card: "rgba(255,255,255,0.06)",
    cardBorder: "rgba(255,255,255,0.10)",
    cardShadow: "0 8px 32px rgba(0,0,0,0.50), inset 0 1px 0 rgba(255,255,255,0.10)",
    header: "rgba(17,17,17,0.92)",
    headerBorder: `${RP_YELLOW}55`,
    modal: "rgba(18,18,18,0.92)",
    modalBorder: `${RP_YELLOW}33`,
    panel: "rgba(20,20,20,0.90)",
    panelBorder: `${RP_YELLOW}28`,
    input: "rgba(255,255,255,0.07)",
    inputBorder: "rgba(255,255,255,0.15)",
    btn: "rgba(245,200,0,0.13)",
    btnBorder: "rgba(245,200,0,0.30)",
    btnHover: "rgba(245,200,0,0.22)",
  },
  light: {
    card: "rgba(255,255,255,0.75)",
    cardBorder: "rgba(255,255,255,0.95)",
    cardShadow: "0 4px 24px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.98)",
    header: "rgba(255,255,255,0.95)",
    headerBorder: `${RP_YELLOW}99`,
    modal: "rgba(255,255,255,0.97)",
    modalBorder: `${RP_YELLOW}55`,
    panel: "rgba(255,255,255,0.95)",
    panelBorder: `${RP_YELLOW}44`,
    input: "rgba(0,0,0,0.05)",
    inputBorder: "rgba(0,0,0,0.12)",
    btn: "rgba(26,26,26,0.07)",
    btnBorder: "rgba(26,26,26,0.22)",
    btnHover: "rgba(26,26,26,0.13)",
  }
}

const themes = {
  dark: {
    bg: "bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950",
    header: "border-b",
    input: "text-white",
    btn: "text-gray-200",
    footer: "text-gray-600",
    modal: "",
    label: "text-gray-400",
    modalInput: "text-white",
    logoText: "#ffffff",
    appName: "#e2e8f0",
    version: "#6b7280",
    divider: "border-yellow-900",
    text: "text-white",
    subtext: "text-gray-400",
    panelBg: "",
    themeActiveBg: "bg-blue-600 text-white",
    themeInactiveBg: "text-gray-200",
    emptyText: "text-gray-500",
  },
  light: {
    bg: "bg-gradient-to-br from-yellow-50 via-white to-gray-50",
    header: "border-b",
    input: "text-gray-900",
    btn: "text-gray-800",
    footer: "text-gray-400",
    modal: "",
    label: "text-gray-600",
    modalInput: "text-gray-900",
    logoText: "#111111",
    appName: "#1a1a1a",
    version: "#9ca3af",
    divider: "border-yellow-300",
    text: "text-gray-900",
    subtext: "text-gray-500",
    panelBg: "",
    themeActiveBg: "bg-blue-600 text-white",
    themeInactiveBg: "text-gray-800",
    emptyText: "text-gray-400",
  },
}

function TileIcon({ icon, isDark }) {
  if (icon && icon.startsWith("https://")) return <img src={icon} alt="icon" className="mb-2 drop-shadow-lg" style={{ width: 40, height: 40, objectFit: 'contain' }} onError={e => { e.target.style.display='none' }} />
  if (icon === "jira") return (
    <svg viewBox="0 0 32 32" className="mb-2 drop-shadow-lg" style={{ width: 40, height: 40 }}>
      <defs><linearGradient id="jiraGrad" x1="100%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#2684FF" /><stop offset="100%" stopColor="#0052CC" /></linearGradient></defs>
      <path d="M15.98 0.16L8.1 8.04 3.9 3.84a1.3 1.3 0 00-1.84 0L.16 5.74a1.3 1.3 0 000 1.84l7.02 7.02-7.02 7.02a1.3 1.3 0 000 1.84l1.9 1.9a1.3 1.3 0 001.84 0l4.2-4.2 7.88 7.88a1.3 1.3 0 001.84 0l1.9-1.9a1.3 1.3 0 000-1.84L11.7 17.28l4.28-4.28 7.88-7.88a1.3 1.3 0 000-1.84L21.96.16a1.3 1.3 0 00-1.84 0z" fill="url(#jiraGrad)" transform="translate(4,4) scale(0.9)" />
    </svg>
  )
  if (icon === "ariba") return (
    <svg viewBox="0 0 120 40" className="mb-2 drop-shadow-lg" style={{ width: 80, height: 27 }}>
      <text x="0" y="32" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="38" fill={isDark ? "#ffffff" : "#00B7F0"}>ariba</text>
    </svg>
  )
  return <span className="text-4xl mb-2 drop-shadow-lg">{icon}</span>
}

let gl = glassStyle.dark

function TileForm({ tile, setTile, onSave, onCancel, saveLabel, th, allGroups }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={onCancel}>
      <div className="rounded-2xl p-6 w-full max-w-md shadow-2xl" style={{ background: gl.modal, backdropFilter: 'blur(32px) saturate(1.8)', WebkitBackdropFilter: 'blur(32px) saturate(1.8)', border: `1px solid ${gl.modalBorder}` }} onClick={e => e.stopPropagation()}>
        <h3 className={`text-xl font-bold mb-5 ${th.text}`}>{saveLabel === "Speichern" ? "Kachel bearbeiten" : "Neue Kachel"}</h3>
        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-1 ${th.label}`}>Titel</label>
            <input className={`w-full rounded-lg px-4 py-2.5 border focus:border-yellow-400 focus:outline-none ${th.modalInput}`} style={{ background: gl.input, borderColor: gl.inputBorder }} value={tile.title} onChange={e => setTile({ ...tile, title: e.target.value })} placeholder="Mein Link" />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1 ${th.label}`}>URL</label>
            <input className={`w-full rounded-lg px-4 py-2.5 border focus:border-yellow-400 focus:outline-none ${th.modalInput}`} style={{ background: gl.input, borderColor: gl.inputBorder }} value={tile.url} onChange={e => setTile({ ...tile, url: e.target.value })} placeholder="https://example.com" />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1 ${th.label}`}>Icon / Emoji</label>
            <div className="flex gap-2">
              <input className={`flex-1 rounded-xl px-4 py-2.5 focus:outline-none ${th.modalInput}`} style={{ background: gl.input, border: `1px solid ${gl.inputBorder}` }} value={tile.icon} onChange={e => setTile({ ...tile, icon: e.target.value })} placeholder="🔗" />
              <button className={`px-3 py-2 rounded-lg text-sm border transition-colors ${th.btn}`} style={{ background: gl.btn, borderColor: gl.btnBorder }} title="Favicon automatisch laden" onClick={() => {
                try {
                  const url = tile.url.startsWith('http') ? tile.url : 'https://' + tile.url
                  const domain = new URL(url).hostname
                  setTile({ ...tile, icon: `https://www.google.com/s2/favicons?domain=${domain}&sz=64` })
                } catch { alert('Bitte zuerst eine gültige URL eingeben.') }
              }}>🌐 Favicon</button>
            </div>
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${th.label}`}>Farbe</label>
            <div className="flex flex-wrap gap-2">
              {colorPresets.map(c => (
                <button key={c} className={`w-8 h-8 rounded-full border-2 transition-transform ${tile.color === c ? "border-white scale-110" : "border-transparent"}`} style={{ backgroundColor: c }} onClick={() => setTile({ ...tile, color: c })} />
              ))}
            </div>
            <input type="color" className="mt-2 w-12 h-8 rounded cursor-pointer bg-transparent" value={tile.color} onChange={e => setTile({ ...tile, color: e.target.value })} />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${th.label}`}>Größe</label>
            <div className="flex gap-2">
              {["small", "medium", "large"].map(s => (
                <button key={s} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${tile.size === s ? "bg-yellow-400 text-black" : th.themeInactiveBg}`} style={tile.size !== s ? { background: gl.btn, border: `1px solid ${gl.btnBorder}` } : {}} onClick={() => setTile({ ...tile, size: s })}>
                  {s === "small" ? "Klein" : s === "medium" ? "Mittel" : "Groß"}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1 ${th.label}`}>Gruppe <span className="font-normal opacity-60">(optional)</span></label>
            <input className={`w-full rounded-lg px-4 py-2.5 border focus:border-yellow-400 focus:outline-none ${th.modalInput}`} style={{ background: gl.input, borderColor: gl.inputBorder }} value={tile.group || ""} onChange={e => setTile({ ...tile, group: e.target.value })} placeholder="z.B. Intern, Tools, News…" list="group-suggestions" />
            <datalist id="group-suggestions">{allGroups.map(g => <option key={g} value={g} />)}</datalist>
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1 ${th.label}`}>Beschreibung <span className="font-normal opacity-60">(optional)</span></label>
            <input className={`w-full rounded-lg px-4 py-2.5 border focus:border-yellow-400 focus:outline-none ${th.modalInput}`} style={{ background: gl.input, borderColor: gl.inputBorder }} value={tile.description || ""} onChange={e => setTile({ ...tile, description: e.target.value })} placeholder="Kurze Notiz…" />
          </div>
          <label className="flex items-center gap-3 py-2 cursor-pointer select-none">
            <div className={`w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${tile.showUrl ? 'bg-yellow-400 border-yellow-400' : 'border-gray-400 bg-transparent'}`} onClick={() => setTile({ ...tile, showUrl: !tile.showUrl })}>
              {tile.showUrl && <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
            </div>
            <span className={`text-sm font-medium ${th.text}`}>URL anzeigen</span>
          </label>
          <label className="flex items-center gap-3 py-2 cursor-pointer select-none">
            <div className={`w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${tile.newTab ? 'bg-yellow-400 border-yellow-400' : 'border-gray-400 bg-transparent'}`} onClick={() => setTile({ ...tile, newTab: !tile.newTab })}>
              {tile.newTab && <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
            </div>
            <span className={`text-sm font-medium ${th.text}`}>In neuem Tab öffnen</span>
          </label>
        </div>
        <div className="flex gap-3 mt-6">
          <button className="flex-1 text-black font-semibold py-2.5 rounded-lg transition-colors" style={{ background: RP_YELLOW }} onClick={onSave}>{saveLabel}</button>
          <button className={`flex-1 font-medium py-2.5 rounded-xl transition-colors ${th.btn}`} style={{ background: gl.btn, border: `1px solid ${gl.btnBorder}` }} onClick={onCancel}>Abbrechen</button>
        </div>
      </div>
    </div>
  )
}

function UrlTooltip({ tile, isDark, th }) {
  const domain = (() => { try { return new URL(tile.url).hostname } catch { return "" } })()
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=32`
  return (
    <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 rounded-2xl p-3 pointer-events-none" style={{ background: gl.modal, backdropFilter: 'blur(24px) saturate(1.8)', WebkitBackdropFilter: 'blur(24px) saturate(1.8)', border: `1px solid ${gl.modalBorder}`, boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
      <div className="flex items-center gap-2 mb-1.5">
        <img src={faviconUrl} alt="" className="w-4 h-4 flex-shrink-0" onError={e => e.target.style.display='none'} />
        <span className={`font-semibold text-sm truncate ${th.text}`}>{tile.title}</span>
      </div>
      {tile.description && <p className={`text-xs mb-1 ${th.label}`}>{tile.description}</p>}
      <p className={`text-xs truncate ${th.subtext}`}>{tile.url.replace(/https?:\/\//, '').replace(/\/$/, '')}</p>
      <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0" style={{ borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: `6px solid ${isDark ? '#2a2a2a' : '#e5e7eb'}` }} />
    </div>
  )
}

function DraggableTile({ tile, index, moveTile, isDark, sizeClasses, showSettings, setEditingTile, deleteTile, toggleFavorite, updateTileColor, duplicateTile, toggleHiddenTile, th, showUrlTooltip }) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const hoverTimer = useRef(null)

  const dragStart = (e) => { e.dataTransfer.setData("tileIndex", index); setIsDragging(true) }
  const dragEnd = () => setIsDragging(false)
  const dragOver = (e) => { e.preventDefault(); setIsDragOver(true) }
  const dragLeave = () => setIsDragOver(false)
  const drop = (e) => {
    e.preventDefault(); setIsDragOver(false)
    const from = parseInt(e.dataTransfer.getData("tileIndex"))
    if (from !== index) moveTile(from, index)
  }

  return (
    <a
      href={showSettings ? undefined : tile.url}
      target={tile.newTab ? "_blank" : "_self"}
      rel="noopener noreferrer"
      draggable
      onDragStart={dragStart}
      onDragEnd={dragEnd}
      onDragOver={dragOver}
      onDragLeave={dragLeave}
      onDrop={drop}
      onClick={e => { if (showSettings) e.preventDefault() }}
      onMouseEnter={() => { if (!showSettings && showUrlTooltip) { hoverTimer.current = setTimeout(() => setShowTooltip(true), 500) } }}
      onMouseLeave={() => { clearTimeout(hoverTimer.current); setShowTooltip(false) }}
      className={`${sizeClasses[tile.size]} relative group rounded-2xl overflow-visible flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 cursor-grab active:cursor-grabbing ${isDragging ? 'opacity-40 scale-95' : ''} ${isDragOver ? 'scale-105 ring-2 ring-yellow-400 ring-opacity-60' : ''} ${tile.hidden ? 'opacity-40' : ''}`}
      style={{
        background: isDark
          ? `linear-gradient(135deg, ${tile.color}77, ${tile.color}33), rgba(255,255,255,0.06)`
          : `linear-gradient(135deg, ${tile.color}18, ${tile.color}08), rgba(255,255,255,0.72)`,
        border: `1px solid ${isDark ? tile.color + '55' : tile.color + '44'}`,
        boxShadow: isDark
          ? `0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.12), 0 0 0 1px ${tile.color}22`
          : `0 4px 24px ${tile.color}14, inset 0 1px 0 rgba(255,255,255,0.98)`,
        backdropFilter: 'blur(16px) saturate(1.6)',
        WebkitBackdropFilter: 'blur(16px) saturate(1.6)',
      }}
    >
      <div className="absolute inset-0 rounded-2xl transition-all duration-200" style={{ background: 'rgba(255,255,255,0)' }} onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.07)'} onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,0)'} />
      {showTooltip && !showSettings && <UrlTooltip tile={tile} isDark={isDark} th={th} />}
      <TileIcon icon={tile.icon} isDark={isDark} />
      <span className="font-semibold text-sm tracking-wide" style={{ color: isDark ? "#fff" : "#111" }}>{tile.title}</span>
      {tile.description && <span className="text-xs mt-1 px-3 text-center opacity-70" style={{ color: isDark ? "rgba(255,255,255,0.6)" : "#444" }}>{tile.description}</span>}
      {tile.showUrl && <span className="text-xs mt-1 truncate max-w-full px-4" style={{ color: isDark ? "rgba(255,255,255,0.45)" : "#666" }}>{tile.url.replace(/https?:\/\//, "").replace(/\/$/, "")}</span>}
      {showSettings && (
        <div className="absolute inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center gap-1.5 z-10 p-2 rounded-2xl">
          <span className="text-white text-xs font-semibold text-center truncate max-w-full opacity-80 mb-1">{tile.title}</span>
          <div className="flex gap-1.5 flex-wrap justify-center">
            <button className={`p-2 rounded-lg text-sm transition-colors ${tile.favorite ? 'bg-yellow-400 text-black' : 'bg-white bg-opacity-20 hover:bg-opacity-40 text-white'}`} onClick={e => { e.preventDefault(); toggleFavorite(tile.id) }} title={tile.favorite ? 'Favorit entfernen' : 'Als Favorit'}>⭐</button>
            <label className="bg-white bg-opacity-20 hover:bg-opacity-40 text-white p-2 rounded-lg text-sm cursor-pointer flex items-center justify-center relative" title="Farbe" onClick={e => e.stopPropagation()}>🎨<input type="color" className="w-0 h-0 opacity-0 absolute" value={tile.color} onChange={e => updateTileColor(tile.id, e.target.value)} /></label>
            <button className="bg-white bg-opacity-20 hover:bg-opacity-40 text-white p-2 rounded-lg text-sm" onClick={e => { e.preventDefault(); setEditingTile({ ...tile }) }}>✏️</button>
            <button className="bg-white bg-opacity-20 hover:bg-opacity-40 text-white p-2 rounded-lg text-sm" title="Duplizieren" onClick={e => { e.preventDefault(); duplicateTile(tile) }}>⧉</button>
            <button className={`p-2 rounded-lg text-sm transition-colors ${tile.hidden ? 'bg-gray-500 bg-opacity-80 text-white' : 'bg-white bg-opacity-20 hover:bg-opacity-40 text-white'}`} title={tile.hidden ? 'Einblenden' : 'Ausblenden'} onClick={e => { e.preventDefault(); toggleHiddenTile(tile.id) }}>{tile.hidden ? '🙈' : '👁️'}</button>
            <button className="bg-red-600 bg-opacity-80 hover:bg-opacity-100 text-white p-2 rounded-lg text-sm" onClick={e => { e.preventDefault(); deleteTile(tile.id) }}>🗑️</button>
          </div>
        </div>
      )}
      {tile.favorite && <span className="absolute top-2 left-2 text-sm">⭐</span>}
      {tile.newTab && <span className="absolute top-2 right-2 text-xs" style={{ color: isDark ? "rgba(255,255,255,0.35)" : "#999" }}>↗</span>}
    </a>
  )
}

function EasterEgg() {
  const icons = Array.from({ length: 60 }, (_, i) => ({
    id: i, left: Math.random() * 100, delay: Math.random() * 2, duration: 3 + Math.random() * 3, size: 16 + Math.random() * 32, rotation: Math.random() * 360,
  }))
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {icons.map(icon => (
        <div key={icon.id} style={{ position: 'absolute', left: `${icon.left}%`, top: '-60px', fontSize: `${icon.size}px`, animation: `fall ${icon.duration}s ${icon.delay}s linear forwards`, transform: `rotate(${icon.rotation}deg)` }}>📰</div>
      ))}
      <style>{`@keyframes fall { 0% { transform: translateY(0) rotate(0deg); opacity: 1; } 100% { transform: translateY(110vh) rotate(720deg); opacity: 0.7; } }`}</style>
    </div>
  )
}

function BackgroundModal({ th, onClose }) {
  const [gradStart, setGradStart] = useState(() => localStorage.getItem("rp-bg-grad-start") || "#111111")
  const [gradEnd, setGradEnd] = useState(() => localStorage.getItem("rp-bg-grad-end") || "#1a1a1a")
  const [bgUrlInput, setBgUrlInput] = useState(() => localStorage.getItem("rp-bg-url") || "")

  const apply = () => {
    localStorage.setItem("rp-bg-grad-start", gradStart)
    localStorage.setItem("rp-bg-grad-end", gradEnd)
    localStorage.setItem("rp-bg-url", bgUrlInput)
    window.dispatchEvent(new Event("rp-bg-changed"))
    onClose()
  }
  const reset = () => {
    localStorage.removeItem("rp-bg-grad-start"); localStorage.removeItem("rp-bg-grad-end"); localStorage.removeItem("rp-bg-url")
    setBgUrlInput(""); setGradStart("#111111"); setGradEnd("#1a1a1a")
    window.dispatchEvent(new Event("rp-bg-changed")); onClose()
  }
  const preview = bgUrlInput ? { backgroundImage: `url(${bgUrlInput})`, backgroundSize: 'cover', backgroundPosition: 'center' } : { background: `linear-gradient(135deg, ${gradStart}, ${gradEnd})` }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="rounded-2xl p-6 w-full max-w-md shadow-2xl" style={{ background: gl.modal, backdropFilter: 'blur(32px)', WebkitBackdropFilter: 'blur(32px)', border: `1px solid ${gl.modalBorder}` }} onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h3 className={`text-lg font-bold ${th.text}`}>🎨 Hintergrund anpassen</h3>
          <button className={`p-1.5 rounded-lg ${th.btn}`} style={{ background: gl.btn, border: `1px solid ${gl.btnBorder}` }} onClick={onClose}>✕</button>
        </div>
        <div className="w-full h-20 rounded-xl mb-5" style={{ ...preview, border: `1px solid ${gl.modalBorder}` }} />
        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${th.label}`}>Gradient-Farben</label>
            <div className="flex gap-3 items-center">
              <div className="flex flex-col items-center gap-1"><span className={`text-xs ${th.label}`}>Start</span><input type="color" className="w-12 h-10 rounded cursor-pointer bg-transparent border-0" value={gradStart} onChange={e => { setGradStart(e.target.value); setBgUrlInput("") }} /></div>
              <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${gradStart}, ${gradEnd})` }} />
              <div className="flex flex-col items-center gap-1"><span className={`text-xs ${th.label}`}>Ende</span><input type="color" className="w-12 h-10 rounded cursor-pointer bg-transparent border-0" value={gradEnd} onChange={e => { setGradEnd(e.target.value); setBgUrlInput("") }} /></div>
            </div>
          </div>
          <div className={`border-t pt-4 ${th.divider}`}>
            <label className={`block text-sm font-medium mb-2 ${th.label}`}>Hintergrundbild (URL)</label>
            <input className={`w-full rounded-lg px-4 py-2.5 text-sm focus:outline-none ${th.modalInput}`} style={{ background: gl.input, border: `1px solid ${gl.inputBorder}` }} placeholder="https://example.com/bild.jpg" value={bgUrlInput} onChange={e => setBgUrlInput(e.target.value)} />
            <p className={`text-xs mt-1 ${th.label}`}>Bild hat Vorrang vor Gradient-Farben</p>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button className="flex-1 font-semibold py-2.5 rounded-lg transition-colors text-black" style={{ background: RP_YELLOW }} onClick={apply}>Übernehmen</button>
          <button className={`px-4 font-medium py-2.5 rounded-lg transition-colors ${th.btn}`} style={{ background: gl.btn, border: `1px solid ${gl.btnBorder}` }} onClick={reset}>Zurücksetzen</button>
          <button className={`px-4 font-medium py-2.5 rounded-lg transition-colors ${th.btn}`} style={{ background: gl.btn, border: `1px solid ${gl.btnBorder}` }} onClick={onClose}>Abbrechen</button>
        </div>
      </div>
    </div>
  )
}

export default function LinkDashboard() {
  const [themeMode, setThemeMode] = useState(() => localStorage.getItem("rp-theme") || "dark")
  const [isDark, setIsDark] = useState(true)
  const [showThemeMenu, setShowThemeMenu] = useState(false)
  const [showSettingsMenu, setShowSettingsMenu] = useState(false)
  const [showBgModal, setShowBgModal] = useState(false)

  const [bgStyle, setBgStyle] = useState(() => {
    const url = localStorage.getItem("rp-bg-url")
    const start = localStorage.getItem("rp-bg-grad-start")
    const end = localStorage.getItem("rp-bg-grad-end")
    if (url) return { backgroundImage: `url(${url})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }
    if (start && end) return { background: `linear-gradient(135deg, ${start}, ${end})` }
    return {}
  })

  useEffect(() => {
    const handler = () => {
      const url = localStorage.getItem("rp-bg-url")
      const start = localStorage.getItem("rp-bg-grad-start")
      const end = localStorage.getItem("rp-bg-grad-end")
      if (url) setBgStyle({ backgroundImage: `url(${url})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' })
      else if (start && end) setBgStyle({ background: `linear-gradient(135deg, ${start}, ${end})` })
      else setBgStyle({})
    }
    window.addEventListener("rp-bg-changed", handler)
    return () => window.removeEventListener("rp-bg-changed", handler)
  }, [])

  useEffect(() => {
    localStorage.setItem("rp-theme", themeMode)
    if (themeMode === "auto") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)")
      setIsDark(mq.matches)
      const handler = e => setIsDark(e.matches)
      mq.addEventListener("change", handler)
      return () => mq.removeEventListener("change", handler)
    } else {
      setIsDark(themeMode === "dark")
    }
  }, [themeMode])

  const th = isDark ? themes.dark : themes.light
  gl = isDark ? glassStyle.dark : glassStyle.light

  const [tiles, setTiles] = useState(() => {
    try { const saved = localStorage.getItem("rp-dashboard-tiles"); return saved ? JSON.parse(saved) : defaultTiles } catch { return defaultTiles }
  })
  useEffect(() => { localStorage.setItem("rp-dashboard-tiles", JSON.stringify(tiles)) }, [tiles])

  const [showSettings, setShowSettings] = useState(false)
  const [editingTile, setEditingTile] = useState(null)
  const [showAdd, setShowAdd] = useState(false)
  const [newTile, setNewTile] = useState({ title: "", url: "", color: "#4285F4", size: "medium", newTab: true, icon: "🔗", showUrl: false, description: "", group: "" })
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearch, setShowSearch] = useState(() => localStorage.getItem("rp-show-search") === "true")
  const [showGroups, setShowGroups] = useState(() => localStorage.getItem("rp-show-groups") === "true")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showHidden, setShowHidden] = useState(false)
  const [showFullscreenBtn, setShowFullscreenBtn] = useState(() => localStorage.getItem("rp-show-fullscreen") === "true")
  const [showUrlTooltip, setShowUrlTooltip] = useState(() => localStorage.getItem("rp-show-tooltip") === "true")
  const [sortMode, setSortMode] = useState(() => localStorage.getItem("rp-sort-mode") || "manual")
  const [listView, setListView] = useState(() => localStorage.getItem("rp-list-view") === "true")
  const [removingId, setRemovingId] = useState(null)
  const [addingId, setAddingId] = useState(null)
  const [confirmDeleteId, setConfirmDeleteId] = useState(null)
    const [showBackup, setShowBackup] = useState(false)
  const [showWartung, setShowWartung] = useState(false)
  const [logoClickCount, setLogoClickCount] = useState(0)
  const [easterEgg, setEasterEgg] = useState(false)
  const logoClickTimer = useRef(null)

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener("fullscreenchange", handler)
    return () => document.removeEventListener("fullscreenchange", handler)
  }, [])

  useEffect(() => { localStorage.setItem("rp-list-view", listView) }, [listView])
  useEffect(() => { localStorage.setItem("rp-show-search", showSearch) }, [showSearch])
  useEffect(() => { localStorage.setItem("rp-show-groups", showGroups) }, [showGroups])
  useEffect(() => { localStorage.setItem("rp-show-fullscreen", showFullscreenBtn) }, [showFullscreenBtn])
  useEffect(() => { localStorage.setItem("rp-show-tooltip", showUrlTooltip) }, [showUrlTooltip])
  useEffect(() => { localStorage.setItem("rp-sort-mode", sortMode) }, [sortMode])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {})
    else document.exitFullscreen().catch(() => {})
  }

  const toggleHiddenTile = (id) => setTiles(prev => prev.map(t => t.id === id ? { ...t, hidden: !t.hidden } : t))
  const toggleFavorite = (id) => setTiles(prev => prev.map(t => t.id === id ? { ...t, favorite: !t.favorite } : t))
  const updateTileColor = (id, color) => setTiles(prev => prev.map(t => t.id === id ? { ...t, color } : t))

  const duplicateTile = (tile) => {
    const copy = { ...tile, id: Date.now(), title: tile.title + ' (Kopie)' }
    const idx = tiles.findIndex(t => t.id === tile.id)
    const updated = [...tiles]; updated.splice(idx + 1, 0, copy)
    setTiles(updated); setAddingId(copy.id); setTimeout(() => setAddingId(null), 400)
  }

  const filteredTiles = tiles
    .filter(tile => tile.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(tile => showHidden || !tile.hidden)
    .sort((a, b) => {
      if (sortMode === 'name') return a.title.localeCompare(b.title, 'de')
      if (sortMode === 'group') return (a.group || '').localeCompare(b.group || '', 'de') || a.title.localeCompare(b.title, 'de')
      if (sortMode === 'color') return a.color.localeCompare(b.color)
      return (b.favorite ? 1 : 0) - (a.favorite ? 1 : 0)
    })

  const allGroups = [...new Set(tiles.map(t => t.group || "").filter(Boolean))]
  const groups = [...new Set(filteredTiles.map(t => t.group || ""))]
  const groupedTiles = groups.map(g => ({ group: g, tiles: filteredTiles.filter(t => (t.group || "") === g) }))
  const sizeClasses = { small: "col-span-1 h-32", medium: "col-span-1 h-40", large: "col-span-2 h-40" }

  const addTile = () => {
    if (!newTile.title || !newTile.url) return
    const url = newTile.url.startsWith("http") ? newTile.url : "https://" + newTile.url
    const id = Date.now()
    setTiles(prev => [...prev, { ...newTile, url, id }])
    setAddingId(id); setTimeout(() => setAddingId(null), 400)
    setNewTile({ title: "", url: "", color: "#4285F4", size: "medium", newTab: true, icon: "🔗", showUrl: false, description: "", group: "" })
    setShowAdd(false)
  }

  const updateTile = () => { if (!editingTile) return; setTiles(prev => prev.map(t => t.id === editingTile.id ? editingTile : t)); setEditingTile(null) }
  const deleteTile = (id) => setConfirmDeleteId(id)
  const confirmDelete = () => {
    const id = confirmDeleteId; setRemovingId(id); setConfirmDeleteId(null)
    setTimeout(() => { setTiles(prev => prev.filter(t => t.id !== id)); setRemovingId(null) }, 300)
  }
  const moveTile = (from, to) => { const updated = [...tiles]; const [moved] = updated.splice(from, 1); updated.splice(to, 0, moved); setTiles(updated) }
  const resetTiles = () => { if (window.confirm("Alle Kacheln auf Standard zurücksetzen?")) setTiles(defaultTiles) }
  const exportTiles = () => {
    const blob = new Blob([JSON.stringify(tiles, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = "rp-dashboard-kacheln.json"; a.click(); URL.revokeObjectURL(url)
  }
  const importTiles = (e) => {
    const file = e.target.files[0]; if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      try {
        const imported = JSON.parse(ev.target.result)
        if (Array.isArray(imported) && imported.length > 0) { if (window.confirm(`${imported.length} Kacheln importieren?`)) setTiles(imported) } else alert("Ungültige Datei.")
      } catch { alert("Fehler beim Lesen der Datei.") }
    }
    reader.readAsText(file); e.target.value = ""
  }

  const handleLogoClick = () => {
    clearTimeout(logoClickTimer.current)
    const newCount = logoClickCount + 1
    setLogoClickCount(newCount)
    if (newCount >= 5) {
      setLogoClickCount(0); setEasterEgg(true); setTimeout(() => setEasterEgg(false), 7000)
    } else {
      logoClickTimer.current = setTimeout(() => setLogoClickCount(0), 2000)
    }
  }

  const closeMenus = () => { setShowThemeMenu(false); setShowSettingsMenu(false) }

  const ThemeIcon = () => {
    if (themeMode === "auto") return <span>🖥️</span>
    if (themeMode === "dark") return <span>🌙</span>
    return <span>☀️</span>
  }



  const hasBgStyle = Object.keys(bgStyle).length > 0

  const settingItems = [
    { label: "Suchfeld anzeigen", icon: "🔍", val: showSearch, set: () => { setShowSearch(v => !v); setShowSettingsMenu(false) } },
    { label: "Listenansicht", icon: "📋", val: listView, set: () => { setListView(v => !v); setShowSettingsMenu(false) } },
    { label: "Gruppen anzeigen", icon: "🗂️", val: showGroups, set: () => { setShowGroups(v => !v); setShowSettingsMenu(false) } },
    { label: "Versteckte anzeigen", icon: "👁️", val: showHidden, set: () => { setShowHidden(v => !v); setShowSettingsMenu(false) } },
    { label: "Vollbild-Button", icon: "⛶", val: showFullscreenBtn, set: () => { setShowFullscreenBtn(v => !v); setShowSettingsMenu(false) } },
    { label: "URL-Vorschau beim Hover", icon: "🔎", val: showUrlTooltip, set: () => { setShowUrlTooltip(v => !v); setShowSettingsMenu(false) } },
  ]

  return (
    <div className={`min-h-screen ${hasBgStyle ? '' : th.bg} ${th.text} transition-colors duration-300`} style={hasBgStyle ? bgStyle : {}} onClick={closeMenus}>
      {easterEgg && <EasterEgg />}
      {showBgModal && <BackgroundModal th={th} onClose={() => setShowBgModal(false)} />}

      {/* Header */}
      <header className={`sticky top-0 z-40 ${th.header}`} style={{ background: gl.header, backdropFilter: 'blur(24px) saturate(1.8)', WebkitBackdropFilter: 'blur(24px) saturate(1.8)', borderBottom: `3px solid ${RP_YELLOW}` }}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex flex-col leading-none select-none cursor-pointer" onClick={e => { e.stopPropagation(); handleLogoClick() }}>
              <span style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontWeight: 900, fontSize: "1.35rem", letterSpacing: "-0.01em", color: th.logoText, lineHeight: 1.1 }}>Rheinische Rost</span>
              <div style={{ height: "4px", background: "#E8620A", borderRadius: "1px", marginTop: "3px" }} />
            </div>
            <div className={`ml-4 pl-4 border-l flex flex-col justify-center`} style={{ borderColor: `${RP_YELLOW}55` }}>
              <span style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontWeight: 400, fontSize: "0.95rem", letterSpacing: "0.04em", color: th.appName, lineHeight: 1.2 }}>Dashboard</span>
              <span style={{ fontSize: "0.65rem", letterSpacing: "0.08em", color: th.version, lineHeight: 1.2, marginTop: "1px" }}>Version 3.5</span>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-end">
            {showSearch && (
              <div className="relative">
                <input className={`text-sm rounded-xl pl-10 pr-4 py-2.5 w-48 focus:outline-none transition-all ${th.input}`} style={{ background: gl.input, border: `1px solid ${gl.inputBorder}` }} placeholder="Suchen…" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onClick={e => e.stopPropagation()} />
                <span className="absolute left-3 top-2.5 text-gray-500">🔍</span>
              </div>
            )}
            <button
              className={`p-2.5 rounded-xl transition-colors text-sm font-medium ${sortMode !== 'manual' ? 'text-black' : th.btn}`}
              style={sortMode !== 'manual' ? { background: RP_YELLOW } : { background: gl.btn, border: `1px solid ${gl.btnBorder}`, backdropFilter: 'blur(8px)' }}
              title="Sortierung wechseln"
              onClick={e => { e.stopPropagation(); const modes = ['manual','name','group','color']; setSortMode(modes[(modes.indexOf(sortMode)+1)%modes.length]) }}
            >
              {sortMode === 'manual' ? '⇅' : sortMode === 'name' ? 'A–Z' : sortMode === 'group' ? '🗂' : '🎨'}
            </button>
            {showFullscreenBtn && (
              <button
                className={`px-4 py-2.5 rounded-xl transition-colors text-sm font-medium`}
                style={isFullscreen ? { background: RP_YELLOW, color: '#000' } : { background: gl.btn, border: `1px solid ${gl.btnBorder}`, backdropFilter: 'blur(8px)', color: isDark ? '#fff' : '#111' }}
                onClick={e => { e.stopPropagation(); toggleFullscreen() }}
              >
                {isFullscreen ? 'Vollbild ✕' : 'Vollbild'}
              </button>
            )}
            <button
              className={`p-2.5 rounded-xl transition-colors text-sm`}
              style={showSettings ? { background: RP_YELLOW, color: '#000', border: `1px solid ${RP_YELLOW}` } : { background: gl.btn, border: `1px solid ${gl.btnBorder}`, backdropFilter: 'blur(8px)', color: isDark ? '#fff' : '#111' }}
              title="Bearbeitungsmodus"
              onClick={e => { e.stopPropagation(); setShowSettings(!showSettings); setShowSettingsMenu(false) }}
            >✏️</button>
            <button
              className="text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors flex items-center gap-2 shadow-lg text-black"
              style={{ background: RP_YELLOW }}
              onClick={e => { e.stopPropagation(); setShowAdd(true) }}
            >
              <span className="text-lg leading-none">+</span> Neue Kachel
            </button>

            {/* Theme */}
            <div className="relative" onClick={e => e.stopPropagation()}>
              <button className={`p-2.5 rounded-xl transition-colors ${th.btn}`} style={{ background: gl.btn, border: `1px solid ${gl.btnBorder}` }} onClick={() => { setShowThemeMenu(!showThemeMenu); setShowSettingsMenu(false) }}><ThemeIcon /></button>
              {showThemeMenu && (
                <div className="absolute right-0 mt-2 w-44 rounded-2xl overflow-hidden z-50" style={{ background: gl.panel, backdropFilter: 'blur(24px) saturate(1.8)', WebkitBackdropFilter: 'blur(24px) saturate(1.8)', border: `1px solid ${gl.panelBorder}`, boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
                  <div className="p-2 space-y-1">
                    {[{val:"auto",label:"Automatisch",icon:"🖥️"},{val:"dark",label:"Dunkel",icon:"🌙"},{val:"light",label:"Hell",icon:"☀️"}].map(opt => (
                      <button key={opt.val} className={`w-full text-left px-3 py-2 rounded-xl text-sm flex items-center gap-2 transition-colors`} style={themeMode === opt.val ? { background: RP_YELLOW, color: '#000', fontWeight: 600 } : { color: isDark ? '#e5e7eb' : '#1a1a1a' }} onClick={() => { setThemeMode(opt.val); setShowThemeMenu(false) }}>
                        <span>{opt.icon}</span> {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Settings */}
            <div className="relative" onClick={e => e.stopPropagation()}>
              <button className={`p-2.5 rounded-xl transition-colors ${th.btn}`} style={{ background: gl.btn, border: `1px solid ${gl.btnBorder}` }} onClick={() => { setShowSettingsMenu(!showSettingsMenu); setShowThemeMenu(false) }}>⚙️</button>
              {showSettingsMenu && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl overflow-hidden z-50" style={{ background: gl.panel, backdropFilter: 'blur(24px) saturate(1.8)', WebkitBackdropFilter: 'blur(24px) saturate(1.8)', border: `1px solid ${gl.panelBorder}`, boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
                  <div className="p-2 space-y-1">
                    {settingItems.map(item => (
                      <label key={item.label} className="w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors cursor-pointer" style={{ color: isDark ? '#e5e7eb' : '#1a1a1a' }} onClick={e => e.stopPropagation()}>
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors`} style={item.val ? { background: RP_YELLOW, borderColor: RP_YELLOW } : { background: 'transparent', borderColor: '#9ca3af' }} onClick={item.set}>
                          {item.val && <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                        </div>
                        <span>{item.icon}</span> {item.label}
                      </label>
                    ))}
                    <div className="my-1 border-t" style={{ borderColor: `${RP_YELLOW}33` }} />
                    <button className="w-full text-left px-3 py-2 rounded-xl text-sm flex items-center gap-2 transition-colors" style={{ color: isDark ? '#e5e7eb' : '#1a1a1a' }} onClick={() => { setShowBgModal(true); setShowSettingsMenu(false) }}>🎨 Hintergrund</button>
                    <div className="my-1 border-t" style={{ borderColor: `${RP_YELLOW}33` }} />
                    <button className="w-full text-left px-3 py-2 rounded-xl text-sm flex items-center gap-2 transition-colors" style={{ color: isDark ? '#e5e7eb' : '#1a1a1a' }} onClick={() => { setShowBackup(true); setShowSettingsMenu(false) }}>💾 Backup</button>

                    <div className="my-1 border-t" style={{ borderColor: `${RP_YELLOW}33` }} />
                    <button className="w-full text-left px-3 py-2 rounded-xl text-sm flex items-center gap-2 transition-colors" style={{ color: isDark ? '#e5e7eb' : '#1a1a1a' }} onClick={() => { setShowWartung(true); setShowSettingsMenu(false) }}>🛠️ Wartung</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {filteredTiles.length === 0 ? (
          <div className={`text-center py-24 ${th.emptyText}`}>
            <p className="text-5xl mb-4">📫</p>
            {searchQuery ? (<><p className="text-lg">Keine Treffer für "{searchQuery}"</p><button className="mt-4 text-sm" style={{ color: RP_YELLOW }} onClick={() => setSearchQuery("")}>✕ Suche zurücksetzen</button></>) : (<><p className="text-lg">Keine Kacheln gefunden.</p><button className="mt-4 text-sm" style={{ color: RP_YELLOW }} onClick={() => setShowAdd(true)}>Neue Kachel hinzufügen</button></>)}
          </div>
        ) : listView ? (
          <div className="space-y-6">
            {groupedTiles.map(({ group, tiles: gTiles }) => (
              <div key={group}>
                {group && <div className="flex items-center gap-3 mb-2"><span className={`text-xs font-bold uppercase tracking-widest`} style={{ color: RP_YELLOW }}>{group}</span><div className="flex-1 h-px" style={{ background: `${RP_YELLOW}44` }} /></div>}
                <div className="rounded-2xl overflow-hidden" style={{ background: gl.panel, border: `1px solid ${gl.panelBorder}`, backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}>
                  {gTiles.map((tile, idx) => (
                    <a key={tile.id} href={showSettings ? undefined : tile.url} target={tile.newTab ? "_blank" : "_self"} rel="noopener noreferrer" onClick={e => { if (showSettings) e.preventDefault() }}
                      className={`flex items-center gap-4 px-4 py-3 transition-colors hover:bg-yellow-400 hover:bg-opacity-10 ${tile.hidden ? 'opacity-40' : ''}`} style={idx !== 0 ? { borderTop: `1px solid ${RP_YELLOW}22` } : {}}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `linear-gradient(135deg, ${tile.color}, ${tile.color}cc)` }}>
                        {tile.icon && tile.icon.startsWith('https://') ? <img src={tile.icon} alt="icon" style={{ width: 24, height: 24, objectFit: 'contain' }} /> : tile.icon === 'ariba' ? <span style={{ fontSize: 11, fontWeight: 700, color: '#fff' }}>ariba</span> : tile.icon === 'jira' ? <span style={{ color: '#fff', fontSize: 16 }}>J</span> : <span style={{ fontSize: 20 }}>{tile.icon}</span>}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm flex items-center gap-1" style={{ color: isDark ? '#fff' : '#111' }}>{tile.favorite && <span className="text-xs">⭐</span>}{tile.title}{tile.newTab && <span className="text-xs opacity-40">↗</span>}</div>
                        <div className="text-xs truncate" style={{ color: isDark ? 'rgba(255,255,255,0.45)' : '#666' }}>{tile.url.replace(/https?:\/\//, '').replace(/\/$/, '')}</div>
                      </div>
                      {showSettings && (
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <button className={`p-1.5 rounded-lg text-sm`} style={tile.favorite ? { background: RP_YELLOW, color: '#000' } : { background: gl.btn, border: `1px solid ${gl.btnBorder}`, color: isDark ? '#fff' : '#111' }} onClick={e => { e.preventDefault(); toggleFavorite(tile.id) }}>⭐</button>
                          <button className="p-1.5 rounded-lg text-sm" style={{ background: gl.btn, border: `1px solid ${gl.btnBorder}`, color: isDark ? '#fff' : '#111' }} onClick={e => { e.preventDefault(); setEditingTile({ ...tile }) }}>✏️</button>
                          <button className={`p-1.5 rounded-lg text-sm`} style={tile.hidden ? { background: '#6b7280', color: '#fff' } : { background: gl.btn, border: `1px solid ${gl.btnBorder}`, color: isDark ? '#fff' : '#111' }} onClick={e => { e.preventDefault(); toggleHiddenTile(tile.id) }}>{tile.hidden ? '🙈' : '👁️'}</button>
                          <button className="p-1.5 rounded-lg text-sm bg-red-600 text-white" onClick={e => { e.preventDefault(); deleteTile(tile.id) }}>🗑️</button>
                        </div>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            {(showGroups ? groupedTiles : [{ group: "", tiles: filteredTiles }]).map(({ group, tiles: gTiles }) => (
              <div key={group}>
                {showGroups && group && (
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-bold uppercase tracking-widest" style={{ color: RP_YELLOW }}>{group}</span>
                    <div className="flex-1 h-px" style={{ background: `${RP_YELLOW}44` }} />
                  </div>
                )}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {gTiles.map((tile) => (
                    <div key={tile.id} style={{ transition: 'opacity 0.3s, transform 0.3s', opacity: removingId === tile.id || addingId === tile.id ? 0 : 1, transform: removingId === tile.id || addingId === tile.id ? 'scale(0.8)' : 'scale(1)' }}>
                      <DraggableTile tile={tile} index={filteredTiles.indexOf(tile)} moveTile={moveTile} isDark={isDark} sizeClasses={sizeClasses} showSettings={showSettings} setEditingTile={setEditingTile} deleteTile={deleteTile} toggleFavorite={toggleFavorite} updateTileColor={updateTileColor} duplicateTile={duplicateTile} toggleHiddenTile={toggleHiddenTile} th={th} showUrlTooltip={showUrlTooltip} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="text-center py-6 text-xs" style={{ color: isDark ? '#4b5563' : '#9ca3af' }}>
        
      </footer>

      {/* Modals */}
      {showAdd && <TileForm tile={newTile} setTile={setNewTile} onSave={addTile} onCancel={() => setShowAdd(false)} saveLabel="Hinzufügen" th={th} allGroups={allGroups} />}
      {editingTile && <TileForm tile={editingTile} setTile={setEditingTile} onSave={updateTile} onCancel={() => setEditingTile(null)} saveLabel="Speichern" th={th} allGroups={allGroups} />}

      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="rounded-2xl p-6 w-full max-w-sm shadow-2xl" style={{ background: gl.modal, backdropFilter: 'blur(32px)', WebkitBackdropFilter: 'blur(32px)', border: `1px solid ${gl.modalBorder}` }}>
            <h3 className={`text-lg font-bold mb-3 ${th.text}`}>Kachel löschen?</h3>
            <p className={`text-sm mb-5 ${th.label}`}>Diese Aktion kann nicht rückgängig gemacht werden.</p>
            <div className="flex gap-3">
              <button className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 rounded-lg" onClick={confirmDelete}>Löschen</button>
              <button className={`flex-1 font-medium py-2.5 rounded-lg ${th.btn}`} style={{ background: gl.btn, border: `1px solid ${gl.btnBorder}` }} onClick={() => setConfirmDeleteId(null)}>Abbrechen</button>
            </div>
          </div>
        </div>
      )}

      {false && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={() => setShowHelp(false)}>
          <div className="rounded-2xl p-6 w-full max-w-sm shadow-2xl overflow-y-auto" style={{ maxHeight: '70vh' }} style={{ background: gl.modal, backdropFilter: 'blur(32px)', WebkitBackdropFilter: 'blur(32px)', border: `1px solid ${gl.modalBorder}` }} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className={`text-lg font-bold ${th.text}`}>❓ Anleitung</h3>
              <button className={`p-1.5 rounded-lg ${th.btn}`} style={{ background: gl.btn, border: `1px solid ${gl.btnBorder}` }} onClick={() => setShowHelp(false)}>✕</button>
            </div>
            <div className="space-y-4">
              {helpItems.map(item => (
                <div key={item.title} className="flex gap-3">
                  <span className="text-xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <div className={`font-semibold text-sm ${th.text}`}>{item.title}</div>
                    <div className={`text-xs mt-0.5 leading-relaxed ${th.label}`}>{item.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showBackup && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={() => setShowBackup(false)}>
          <div className="rounded-2xl p-6 w-full max-w-sm shadow-2xl" style={{ background: gl.modal, backdropFilter: 'blur(32px)', WebkitBackdropFilter: 'blur(32px)', border: `1px solid ${gl.modalBorder}` }} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className={`text-lg font-bold ${th.text}`}>💾 Backup</h3>
              <button className={`p-1.5 rounded-lg ${th.btn}`} style={{ background: gl.btn, border: `1px solid ${gl.btnBorder}` }} onClick={() => setShowBackup(false)}>✕</button>
            </div>
            <div className="space-y-3">
              <button className="w-full font-semibold py-3 rounded-xl text-sm text-black" style={{ background: RP_YELLOW }} onClick={exportTiles}>⬇️ Kacheln exportieren (JSON)</button>
              <label className={`w-full font-medium py-3 rounded-xl text-sm text-center cursor-pointer block ${th.btn}`} style={{ background: gl.btn, border: `1px solid ${gl.btnBorder}` }}>
                ⬆️ Kacheln importieren (JSON)
                <input type="file" accept=".json" className="hidden" onChange={importTiles} />
              </label>
            </div>
          </div>
        </div>
      )}

      {showWartung && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={() => setShowWartung(false)}>
          <div className="rounded-2xl p-6 w-full max-w-sm shadow-2xl" style={{ background: gl.modal, backdropFilter: 'blur(32px)', WebkitBackdropFilter: 'blur(32px)', border: `1px solid ${gl.modalBorder}` }} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className={`text-lg font-bold ${th.text}`}>🛠️ Wartung</h3>
              <button className={`p-1.5 rounded-lg ${th.btn}`} style={{ background: gl.btn, border: `1px solid ${gl.btnBorder}` }} onClick={() => setShowWartung(false)}>✕</button>
            </div>
            <div className="space-y-3">
              <button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-xl text-sm" onClick={() => { resetTiles(); setShowWartung(false) }}>🔄 Kacheln zurücksetzen</button>
              <button className={`w-full font-medium py-3 rounded-xl text-sm ${th.btn}`} style={{ background: gl.btn, border: `1px solid ${gl.btnBorder}` }} onClick={() => setShowWartung(false)}>Abbrechen</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
