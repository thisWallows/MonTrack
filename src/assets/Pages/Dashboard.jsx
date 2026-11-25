import { useState } from "react";
import Sidebar, { Icon } from "./Sidebar";
import "./Dashboard.css";

/* ---------- Datos de ejemplo ---------- */
const RESUMEN = [
  { titulo: "Saldo total", valor: 4850000, nota: "Disponible en tus cuentas", color: "" },
  { titulo: "Ingresos del mes", valor: 3500000, nota: "Entradas de dinero", color: "green" },
  { titulo: "Gastos del mes", valor: 1250000, nota: "Salidas de dinero", color: "red" },
  { titulo: "Ahorro del mes", valor: 2250000, nota: "Ingresos menos gastos", color: "green" },
];

const MESES = ["Jun", "Jul", "Ago", "Sep", "Oct", "Nov"];
const INGRESOS = [2.6, 2.9, 2.7, 3.2, 3.1, 3.5];
const GASTOS = [1.6, 1.9, 1.5, 1.8, 1.4, 1.3];

const CATEGORIAS = [
  { nombre: "Mercado", porcentaje: 40, color: "#111827" },
  { nombre: "Transporte", porcentaje: 20, color: "#6B7280" },
  { nombre: "Hogar", porcentaje: 20, color: "#9CA3AF" },
  { nombre: "Entretenimiento", porcentaje: 20, color: "#D1D5DB" },
];

const MOVIMIENTOS = [
  { descripcion: "Mercado semanal", categoria: "Alimentación", fecha: "14 nov 2026", cuenta: "Cuenta de ahorros", valor: -180000 },
  { descripcion: "Transporte", categoria: "Transporte", fecha: "13 nov 2026", cuenta: "Efectivo", valor: -45000 },
  { descripcion: "Entretenimiento", categoria: "Ocio", fecha: "12 nov 2026", cuenta: "Tarjeta débito", valor: -85000 },
  { descripcion: "Salario", categoria: "Ingresos", fecha: "01 nov 2026", cuenta: "Cuenta de nómina", valor: 3500000 },
];

/* Convierte 4850000 en "$4.850.000" */
const formatoCOP = (n) => "$" + Math.abs(n).toLocaleString("es-CO");

/* ---------- Gráfica de líneas ---------- */
function GraficaLineas() {
  const x = (i) => 40 + i * 108;
  const y = (v) => 150 - v * 32;
  const puntos = (datos) => datos.map((v, i) => `${x(i)},${y(v)}`).join(" ");

  return (
    <svg viewBox="0 0 600 180" className="db-chart">
      {[0, 1, 2, 3, 4].map((n) => (
        <g key={n}>
          <line x1="40" x2="580" y1={y(n)} y2={y(n)} className="db-grid-line" />
          <text x="22" y={y(n) + 4} className="db-chart-label">{n}</text>
        </g>
      ))}

      {MESES.map((m, i) => (
        <text key={m} x={x(i)} y="175" textAnchor="middle" className="db-chart-label">{m}</text>
      ))}

      <polyline points={puntos(INGRESOS)} className="db-line db-line-green" />
      <polyline points={puntos(GASTOS)} className="db-line db-line-red" />

      {INGRESOS.map((v, i) => <circle key={"i" + i} cx={x(i)} cy={y(v)} r="3.5" className="db-dot-green" />)}
      {GASTOS.map((v, i) => <circle key={"g" + i} cx={x(i)} cy={y(v)} r="3.5" className="db-dot-red" />)}
    </svg>
  );
}

/* ---------- Dona de categorías ---------- */
function Dona() {
  const partes = CATEGORIAS.map((categoria, indice) => {
    const inicio = CATEGORIAS
      .slice(0, indice)
      .reduce((total, item) => total + item.porcentaje, 0);
    const fin = inicio + categoria.porcentaje;
    return `${categoria.color} ${inicio}% ${fin}%`;
  });

  return (
    <div className="db-donut" style={{ background: `conic-gradient(${partes.join(", ")})` }}>
      <div className="db-donut-hole">
        <span className="db-donut-label">Gastos</span>
        <span className="db-donut-value">100 %</span>
      </div>
    </div>
  );
}

/* ---------- Página ---------- */
export default function Dashboard({ onNavigate, movimientos = [] }) {
  const [periodo, setPeriodo] = useState("mes");
  const movimientosRecientes = [...movimientos, ...MOVIMIENTOS];

  return (
    <div className="db-layout">
      {/* Menú lateral compartido */}
      <Sidebar activo="dashboard" onNavigate={onNavigate} />

      {/* Contenido principal */}
      <main className="db-main">
        <header className="db-header">
          <div>
            <h1 className="db-title">Dashboard</h1>
            <p className="db-subtitle">¡Hola! Bienvenido a tu resumen financiero</p>
          </div>

          <div className="db-header-actions">
            <select className="db-select" value={periodo} onChange={(e) => setPeriodo(e.target.value)}>
              <option value="mes">Este mes</option>
              <option value="anterior">Mes anterior</option>
              <option value="anio">Este año</option>
            </select>
            <button className="db-icon-btn" aria-label="Notificaciones">
              <Icon name="bell" />
            </button>
            <button className="db-avatar" aria-label="Perfil" onClick={() => onNavigate("configuracion")}>
              <Icon name="user" size={20} />
            </button>
          </div>
        </header>

        <div className="db-section-head">
          <h2 className="db-section-title">Resumen del mes</h2>
          <button type="button" className="db-primary-btn" onClick={() => onNavigate("nuevo-movimiento")}>
            + Nuevo movimiento
          </button>
        </div>

        {/* Tarjetas de resumen */}
        <section className="db-stats">
          {RESUMEN.map((r) => (
            <div key={r.titulo} className="db-card db-stat">
              <p className="db-stat-title">{r.titulo}</p>
              <p className={`db-stat-value ${r.color}`}>
                {formatoCOP(r.valor)} <span>COP</span>
              </p>
              <p className="db-stat-note">{r.nota}</p>
            </div>
          ))}
        </section>

        {/* Gráficas */}
        <section className="db-charts">
          <div className="db-card db-panel">
            <div className="db-panel-head">
              <div>
                <h3 className="db-panel-title">Ingresos y gastos</h3>
                <p className="db-panel-sub">Últimos seis meses · millones de COP</p>
              </div>
              <div className="db-legend">
                <span><i className="db-legend-line green" /> Ingresos</span>
                <span><i className="db-legend-line red" /> Gastos</span>
              </div>
            </div>
            <GraficaLineas />
          </div>

          <div className="db-card db-panel">
            <h3 className="db-panel-title">Gastos por categoría</h3>
            <p className="db-panel-sub">Este mes · total $1.250.000 COP</p>
            <div className="db-donut-wrap">
              <Dona />
              <ul className="db-cat-list">
                {CATEGORIAS.map((c) => (
                  <li key={c.nombre}>
                    <span className="db-cat-name">
                      <i style={{ background: c.color }} />
                      {c.nombre}
                    </span>
                    <strong>{c.porcentaje} %</strong>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Tabla de movimientos */}
        <section className="db-card db-table-card">
          <div className="db-table-head">
            <h3 className="db-panel-title">Movimientos recientes</h3>
            <a
              href="#"
              className="db-link"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("movimientos");
              }}
            >
              Ver todos los movimientos →
            </a>
          </div>

          <div className="db-table-scroll">
            <table className="db-table">
              <thead>
                <tr>
                  <th>Descripción</th>
                  <th>Categoría</th>
                  <th>Fecha</th>
                  <th>Cuenta</th>
                  <th className="right">Valor</th>
                </tr>
              </thead>
              <tbody>
                {movimientosRecientes.map((m, indice) => (
                  <tr key={m.id || `${m.descripcion}-${m.fecha}-${indice}`}>
                    <td className="strong">{m.descripcion}</td>
                    <td className="muted">{m.categoria}</td>
                    <td className="muted">{m.fecha}</td>
                    <td className="muted">{m.cuenta}</td>
                    <td className={`right amount ${m.valor < 0 ? "red" : "green"}`}>
                      {m.valor < 0 ? "−" : "+"}{formatoCOP(m.valor)} COP
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}