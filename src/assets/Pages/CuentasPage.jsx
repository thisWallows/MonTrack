import Sidebar, { Icon } from "./Sidebar";
import "./Dashboard.css";
import "./cuentas.css";

const CUENTAS = [
  { id: 1, nombre: "Bancolombia", saldo: 4500000 },
];

const formatoCOP = (n) => "$" + n.toLocaleString("es-CO");

export default function Cuentas({ onNavigate }) {
  const total = CUENTAS.reduce((suma, c) => suma + c.saldo, 0);

  return (
    <div className="db-layout">
      <Sidebar activo="cuentas" onNavigate={onNavigate} />

      <main className="db-main">
        <header className="db-header">
          <div>
            <h1 className="db-title">Mis cuentas</h1>
            <p className="db-subtitle">
              Total cuentas {CUENTAS.length} <span className="ct-sep">|</span>{" "}
              <strong className="ct-total">Total: {formatoCOP(total)}</strong>
            </p>
          </div>
          <div className="db-header-actions">
            <button className="db-icon-btn" aria-label="Notificaciones"><Icon name="bell" /></button>
            <button className="db-avatar" aria-label="Perfil"><Icon name="user" size={20} /></button>
          </div>
        </header>

        {/* Saldo total */}
        <section className="ct-summary">
          <div className="ct-summary-icon"><Icon name="wallet" size={22} /></div>
          <div>
            <p className="ct-summary-label">Saldo total</p>
            <p className="ct-summary-value">{formatoCOP(total)} <span>COP</span></p>
          </div>
        </section>

        {/* Cuentas */}
        <h2 className="db-section-title ct-title">Cuentas registradas</h2>
        <section className="ct-grid">
          {CUENTAS.map((c) => (
            <article key={c.id} className="db-card ct-card">
              <div className="ct-card-head">
                <span>{c.nombre}</span>
                <Icon name="bank" size={20} />
              </div>
              <p className="ct-card-value">{formatoCOP(c.saldo)} <span>COP</span></p>
              <p className="ct-card-note">Disponible</p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}