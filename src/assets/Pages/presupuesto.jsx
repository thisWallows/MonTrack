import { useState } from "react";
import Sidebar, { Icon } from "./Sidebar";
import "./Dashboard.css";
import "./presupuestos.css";

const PRESUPUESTOS = [
  { id: 1, categoria: "Alimentación", gastado: 350000, limite: 500000 },
  { id: 2, categoria: "Transporte", gastado: 150000, limite: 300000 },
  { id: 3, categoria: "Entretenimiento", gastado: 200000, limite: 250000 },
  { id: 4, categoria: "Vivienda", gastado: 550000, limite: 600000 },
];

const formatoCOP = (n) => "$" + n.toLocaleString("es-CO");

/* Define color y texto según el porcentaje usado */
function estado(porcentaje) {
  if (porcentaje >= 90) return { clase: "red", texto: "Próximo al límite" };
  if (porcentaje >= 75) return { clase: "orange", texto: "Próximo al límite" };
  return { clase: "green", texto: "Dentro del presupuesto" };
}

export default function Presupuestos({ onNavigate }) {
  const [periodo, setPeriodo] = useState("mes");

  const totalLimite = PRESUPUESTOS.reduce((t, p) => t + p.limite, 0);
  const totalGastado = PRESUPUESTOS.reduce((t, p) => t + p.gastado, 0);

  return (
    <div className="db-layout">
      <Sidebar activo="presupuestos" onNavigate={onNavigate} />

      <main className="db-main">
        <header className="db-header">
          <div>
            <h1 className="db-title">Presupuestos</h1>
            <p className="db-subtitle">Controla y organiza tus gastos mensuales</p>
          </div>
          <div className="db-header-actions">
            <button className="pb-new-btn">+ Nuevo presupuesto</button>
            <button className="db-icon-btn" aria-label="Notificaciones"><Icon name="bell" /></button>
            <button className="db-avatar" aria-label="Perfil"><Icon name="user" size={20} /></button>
          </div>
        </header>

        {/* Resumen */}
        <section className="pb-stats">
          <div className="db-card db-stat">
            <p className="db-stat-title">Presupuesto total</p>
            <p className="db-stat-value green">{formatoCOP(totalLimite)} <span>COP</span></p>
            <p className="db-stat-note">Límite mensual asignado</p>
          </div>
          <div className="db-card db-stat">
            <p className="db-stat-title">Total gastado</p>
            <p className="db-stat-value">{formatoCOP(totalGastado)} <span>COP</span></p>
            <p className="db-stat-note">Gastos acumulados del mes</p>
          </div>
        </section>

        {/* Presupuestos por categoría */}
        <section className="db-card pb-panel">
          <div className="pb-panel-head">
            <div>
              <h3 className="db-panel-title">Presupuestos por categoría</h3>
              <p className="db-panel-sub">Gastado / presupuesto mensual · COP</p>
            </div>
            <select className="db-select" value={periodo} onChange={(e) => setPeriodo(e.target.value)}>
              <option value="mes">Este mes</option>
              <option value="anterior">Mes anterior</option>
              <option value="anio">Este año</option>
            </select>
          </div>

          <ul className="pb-list">
            {PRESUPUESTOS.map((p) => {
              const porcentaje = Math.round((p.gastado / p.limite) * 100);
              const { clase, texto } = estado(porcentaje);
              return (
                <li key={p.id} className="pb-item">
                  <div className="pb-row">
                    <span className="pb-name">{p.categoria}</span>
                    <span className="pb-amounts">
                      <strong>{formatoCOP(p.gastado)}</strong> / {formatoCOP(p.limite)}
                    </span>
                  </div>

                  <div className="pb-bar">
                    <div
                      className={`pb-bar-fill ${clase}`}
                      style={{ width: `${Math.min(porcentaje, 100)}%` }}
                    />
                  </div>

                  <div className="pb-row">
                    <span className={`pb-status ${clase}`}>{texto}</span>
                    <span className={`pb-status ${clase}`}>{porcentaje}%</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </main>
    </div>
  );
}