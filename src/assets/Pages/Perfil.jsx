import { useState } from "react";
import Sidebar, { Icon } from "./Sidebar";
import "./Dashboard.css";
import "./perfil.css";

const USUARIO = { nombre: "Esteban Ramirez", correo: "esteban@email.com" };

const MONEDAS = [
  { value: "COP", label: "Peso colombiano (COP)" },
  { value: "USD", label: "Dólar estadounidense (USD)" },
  { value: "EUR", label: "Euro (EUR)" },
];

/* Selector de dos opciones reutilizable */
function Segmentado({ opciones, valor, onChange }) {
  return (
    <div className="pf-segment">
      {opciones.map((o) => (
        <button
          key={o.id}
          type="button"
          className={valor === o.id ? "is-active" : ""}
          onClick={() => onChange(o.id)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/* Fila: texto a la izquierda, control a la derecha */
function Fila({ titulo, descripcion, children }) {
  return (
    <div className="pf-row">
      <div>
        {titulo && <p className="pf-row-title">{titulo}</p>}
        <p className="pf-row-desc">{descripcion}</p>
      </div>
      {children}
    </div>
  );
}

export default function Perfil({ onNavigate, onLogout }) {
  const [tema, setTema] = useState("claro");
  const [moneda, setMoneda] = useState("COP");
  const [notificaciones, setNotificaciones] = useState("on");

  const iniciales = USUARIO.nombre
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="db-layout">
      <Sidebar activo="config" onNavigate={onNavigate} />

      <main className="db-main">
        <header className="db-header">
          <div>
            <h1 className="db-title">Mi perfil</h1>
            <p className="db-subtitle">Administra tu información y preferencias</p>
          </div>
          <div className="db-header-actions">
            <button className="db-icon-btn" aria-label="Notificaciones"><Icon name="bell" /></button>
            <button className="db-avatar" aria-label="Perfil"><Icon name="user" size={20} /></button>
          </div>
        </header>

        <div className="pf-stack">
          {/* Información personal */}
          <section className="db-card pf-card">
            <h3 className="pf-card-title">Información personal</h3>
            <div className="pf-user">
              <div className="pf-user-info">
                <div className="pf-avatar">{iniciales}</div>
                <div>
                  <p className="pf-name">{USUARIO.nombre}</p>
                  <p className="pf-email">{USUARIO.correo}</p>
                </div>
              </div>
              <button className="pf-btn">Editar perfil</button>
            </div>
          </section>

          {/* Preferencias */}
          <section className="db-card pf-card">
            <h3 className="pf-card-title">Preferencias</h3>

            <Fila titulo="Apariencia" descripcion="Elige cómo se ve MonTrack.">
              <Segmentado
                valor={tema}
                onChange={setTema}
                opciones={[
                  { id: "claro", label: "Modo claro" },
                  { id: "oscuro", label: "Modo oscuro" },
                ]}
              />
            </Fila>

            <Fila titulo="Moneda principal" descripcion="Moneda para mostrar tus saldos y movimientos.">
              <select className="pf-select" value={moneda} onChange={(e) => setMoneda(e.target.value)}>
                {MONEDAS.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
              </select>
            </Fila>

            <Fila titulo="Notificaciones" descripcion="Recibe avisos sobre tus movimientos y presupuestos.">
              <Segmentado
                valor={notificaciones}
                onChange={setNotificaciones}
                opciones={[
                  { id: "on", label: "Activadas" },
                  { id: "off", label: "Desactivadas" },
                ]}
              />
            </Fila>
          </section>

          {/* Seguridad */}
          <section className="db-card pf-card">
            <h3 className="pf-card-title">Seguridad</h3>

            <Fila titulo="Contraseña" descripcion="Actualiza la contraseña de tu cuenta.">
              <button className="pf-btn">Cambiar contraseña</button>
            </Fila>

            <Fila descripcion="Finaliza tu sesión en MonTrack.">
              <button className="pf-btn" onClick={onLogout}>Cerrar sesión</button>
            </Fila>
          </section>
        </div>
      </main>
    </div>
  );
}