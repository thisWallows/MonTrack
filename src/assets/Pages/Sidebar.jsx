const ICONS = {
  dashboard: (<><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>),
  movimientos: (<><path d="M16 3l4 4-4 4" /><path d="M20 7H4" /><path d="M8 21l-4-4 4-4" /><path d="M4 17h16" /></>),
  cuentas: (<><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></>),
  presupuestos: (<><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 8h6" /><path d="M9 12h6" /><path d="M9 16h4" /></>),
  metas: (<><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></>),
  estadisticas: (<><path d="M3 3v18h18" /><path d="M8 17v-6" /><path d="M12 17V7" /><path d="M16 17v-4" /></>),
  config: (<><circle cx="12" cy="12" r="3" /><circle cx="12" cy="12" r="8" /></>),
  bell: (<><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></>),
  user: (<><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>),
  search: (<><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></>),
  calendar: (<><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4" /><path d="M8 2v4" /><path d="M3 10h18" /></>),
  plus: (<><path d="M12 5v14" /><path d="M5 12h14" /></>),
  down: (<><path d="M12 5v14" /><path d="M19 12l-7 7-7-7" /></>),
  back: (<><path d="M19 12H5" /><path d="M12 19l-7-7 7-7" /></>),
  card: (<><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /><path d="M6 15h4" /></>),
  check: (<path d="M5 12l5 5L20 7" />),
  wallet: (<><path d="M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0 0 4h14v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5" /><path d="M16 13h2" /></>),
  bank: (<><path d="M3 10l9-6 9 6" /><path d="M5 10v8" /><path d="M10 10v8" /><path d="M14 10v8" /><path d="M19 10v8" /><path d="M3 21h18" /></>),
  play: (<><circle cx="12" cy="12" r="9" /><path d="M10 8.5l5 3.5-5 3.5z" /></>),
};

export function Icon({ name, size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {ICONS[name]}
    </svg>
  );
}

const MENU = [
  { id: "dashboard", label: "Dashboard" },
  { id: "movimientos", label: "Movimientos" },
  { id: "cuentas", label: "Mis cuentas" },
  { id: "presupuestos", label: "Presupuestos" },
  { id: "metas", label: "Metas de ahorro" },
  { id: "estadisticas", label: "Estadísticas" },
  { id: "demo-video", label: "Demo" },

];

export default function Sidebar({ activo, onNavigate }) {
  return (
    <aside className="db-sidebar">
      <div className="db-brand">
        <div className="db-logo">
          <svg width="24" height="22" viewBox="0 0 24 22" fill="none">
            <path
              d="M2 20V3.5C2 2.7 2.7 2 3.5 2c.5 0 1 .3 1.3.7L12 12l7.2-9.3c.3-.4.8-.7 1.3-.7.8 0 1.5.7 1.5 1.5V20"
              stroke="#16a34a" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
            />
          </svg>
          <span>MonTrack</span>
        </div>
        <p className="db-brand-sub">FINANZAS PERSONALES</p>
      </div>

      <nav className="db-nav">
        {MENU.map((item) => (
          <button
            key={item.id}
            className={`db-nav-item ${activo === item.id ? "is-active" : ""}`}
            onClick={() => onNavigate(item.id)}
          >
            <Icon name={item.id} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="db-sidebar-bottom">
        <button
          className={`db-nav-item ${activo === "configuracion" ? "is-active" : ""}`}
          onClick={() => onNavigate("configuracion")}
        >
          <Icon name="config" />
          Configuración
        </button>
        <p className="db-copy">MonTrack · 2026</p>
      </div>
    </aside>
  );
}