import { useState } from "react";
import Sidebar, { Icon } from "./Sidebar";
import "./Dashboard.css";   // reutiliza layout, tarjetas y tabla
import "./movimientos.css";

const MOVIMIENTOS = [
  { descripcion: "Mercado semanal", categoria: "Alimentación", fecha: "14 nov 2026", cuenta: "Cuenta de ahorros", valor: -380000 },
  { descripcion: "Transporte", categoria: "Transporte", fecha: "13 nov 2026", cuenta: "Efectivo", valor: -120000 },
  { descripcion: "Entretenimiento", categoria: "Ocio", fecha: "12 nov 2026", cuenta: "Tarjeta débito", valor: -150000 },
  { descripcion: "Servicios públicos", categoria: "Servicios", fecha: "10 nov 2026", cuenta: "Cuenta de ahorros", valor: -200000 },
  { descripcion: "Mercado", categoria: "Alimentación", fecha: "07 nov 2026", cuenta: "Tarjeta débito", valor: -220000 },
  { descripcion: "Transporte", categoria: "Transporte", fecha: "04 nov 2026", cuenta: "Efectivo", valor: -180000 },
  { descripcion: "Salario", categoria: "Ingresos", fecha: "01 nov 2026", cuenta: "Cuenta de nómina", valor: 3500000 },
];

const CATEGORIAS = ["Alimentación", "Transporte", "Ocio", "Servicios", "Ingresos"];
const TIPOS = [
  { id: "todos", label: "Todos" },
  { id: "ingresos", label: "Ingresos" },
  { id: "gastos", label: "Gastos" },
];

const formatoCOP = (n) => "$" + Math.abs(n).toLocaleString("es-CO");

export default function Movimientos({ onNavigate, movimientos = [] }) {
  const [busqueda, setBusqueda] = useState("");
  const [tipo, setTipo] = useState("todos");
  const [categoria, setCategoria] = useState("todas");
  const [periodo, setPeriodo] = useState("mes");

  const filtrados = [...movimientos, ...MOVIMIENTOS].filter((m) => {
    const coincideTexto = m.descripcion.toLowerCase().includes(busqueda.toLowerCase());
    const coincideTipo =
      tipo === "todos" || (tipo === "ingresos" ? m.valor > 0 : m.valor < 0);
    const coincideCategoria = categoria === "todas" || m.categoria === categoria;
    return coincideTexto && coincideTipo && coincideCategoria;
  });

  const ingresos = filtrados.filter((m) => m.valor > 0).reduce((t, m) => t + m.valor, 0);
  const gastos = filtrados.filter((m) => m.valor < 0).reduce((t, m) => t + Math.abs(m.valor), 0);
  const balance = ingresos - gastos;

  const resumen = [
    { titulo: "Total de ingresos", valor: ingresos, nota: "Entradas de dinero", color: "green" },
    { titulo: "Total de gastos", valor: gastos, nota: "Salidas de dinero", color: "red" },
    { titulo: "Balance", valor: balance, nota: "Ingresos menos gastos", color: balance >= 0 ? "green" : "red" },
  ];

  return (
    <div className="db-layout">
      <Sidebar activo="movimientos" onNavigate={onNavigate} />

      <main className="db-main">
        <header className="db-header">
          <div>
            <h1 className="db-title">Movimientos</h1>
            <p className="db-subtitle">Consulta y administra tus ingresos y gastos</p>
          </div>
          <div className="db-header-actions">
            <button className="db-icon-btn" aria-label="Notificaciones"><Icon name="bell" /></button>
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

        {/* Resumen */}
        <section className="mv-stats">
          {resumen.map((r) => (
            <div key={r.titulo} className="db-card db-stat">
              <p className="db-stat-title">{r.titulo}</p>
              <p className={`db-stat-value ${r.color}`}>
                {formatoCOP(r.valor)} <span>COP</span>
              </p>
              <p className="db-stat-note">{r.nota}</p>
            </div>
          ))}
        </section>

        {/* Filtros */}
        <section className="db-card mv-filters">
          <div className="mv-field">
            <label>Descripción</label>
            <div className="mv-search">
              <Icon name="search" size={16} />
              <input
                type="text"
                placeholder="Buscar por descripción"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
          </div>

          <div className="mv-field">
            <label>Tipo de movimiento</label>
            <div className="mv-segment">
              {TIPOS.map((t) => (
                <button
                  key={t.id}
                  className={tipo === t.id ? "is-active" : ""}
                  onClick={() => setTipo(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mv-field">
            <label>Categoría</label>
            <select className="mv-select" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
              <option value="todas">Todas las categorías</option>
              {CATEGORIAS.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="mv-field">
            <label>Período</label>
            <div className="mv-period">
              <Icon name="calendar" size={16} />
              <select value={periodo} onChange={(e) => setPeriodo(e.target.value)}>
                <option value="mes">Este mes</option>
                <option value="anterior">Mes anterior</option>
                <option value="anio">Este año</option>
              </select>
            </div>
          </div>
        </section>

        {/* Tabla */}
        <section className="db-card db-table-card">
          <div className="db-table-head">
            <h3 className="db-panel-title">Todos los movimientos</h3>
            <span className="mv-count">{filtrados.length} movimientos · noviembre de 2026</span>
          </div>

          <div className="db-table-scroll">
            <table className="db-table">
              <thead>
                <tr>
                  <th>Descripción</th>
                  <th>Categoría</th>
                  <th>Fecha</th>
                  <th>Cuenta</th>
                  <th>Tipo</th>
                  <th className="right">Valor</th>
                </tr>
              </thead>
              <tbody>
                {filtrados.map((m, indice) => (
                  <tr key={m.id || `${m.descripcion}-${m.fecha}-${indice}`}>
                    <td className="strong">{m.descripcion}</td>
                    <td className="muted">{m.categoria}</td>
                    <td className="muted">{m.fecha}</td>
                    <td className="muted">{m.cuenta}</td>
                    <td className={`amount ${m.valor < 0 ? "red" : "green"}`}>
                      {m.valor < 0 ? "Gasto" : "Ingreso"}
                    </td>
                    <td className={`right amount ${m.valor < 0 ? "red" : "green"}`}>
                      {m.valor < 0 ? "−" : "+"}{formatoCOP(m.valor)} COP
                    </td>
                  </tr>
                ))}
                {filtrados.length === 0 && (
                  <tr><td colSpan="6" className="muted mv-empty">No hay movimientos para mostrar.</td></tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mv-footer">
            <span>Mostrando {filtrados.length ? `1-${filtrados.length}` : "0"} de {filtrados.length} movimientos</span>
            <strong className={balance >= 0 ? "green" : "red"}>
              Balance del período: {balance >= 0 ? "+" : "−"}{formatoCOP(balance)} COP
            </strong>
          </div>
        </section>
      </main>
    </div>
  );
}