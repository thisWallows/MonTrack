import { useState } from "react";
import Sidebar, { Icon } from "./Sidebar";
import "./Dashboard.css";        // layout, header y tarjetas
import "./nuevomovimiento.css";

const CATEGORIAS = ["Alimentación", "Transporte", "Ocio", "Servicios", "Hogar", "Ingresos"];
const CUENTAS = ["Cuenta de ahorros", "Cuenta de nómina", "Efectivo", "Tarjeta débito"];
const METODOS = ["Tarjeta de débito", "Tarjeta de crédito", "Efectivo", "Transferencia"];

export default function NuevoMovimiento({ onNavigate, onSave }) {
  const [tipo, setTipo] = useState("ingreso");
  const [descripcion, setDescripcion] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [categoria, setCategoria] = useState("Alimentación");
  const [cuenta, setCuenta] = useState(CUENTAS[0]);
  const [fecha, setFecha] = useState("2026-11-15");
  const [metodo, setMetodo] = useState("Tarjeta de débito");
  const [errores, setErrores] = useState({});

  const volver = () => onNavigate("movimientos");

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevosErrores = {};
    if (!descripcion.trim()) nuevosErrores.descripcion = "Escribe una descripción";
    if (!cantidad || !Number.isFinite(Number(cantidad)) || Number(cantidad) <= 0) {
      nuevosErrores.cantidad = "Ingresa un valor mayor a 0";
    }
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;

    const fechaMovimiento = new Date(`${fecha}T00:00:00`);
    onSave({
      id: `${Date.now()}-${descripcion.trim()}`,
      descripcion: descripcion.trim(),
      categoria,
      fecha: new Intl.DateTimeFormat("es-CO", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(fechaMovimiento).replace(".", ""),
      cuenta,
      valor: tipo === "gasto" ? -Number(cantidad) : Number(cantidad),
    });
  };

  return (
    <div className="db-layout">
      <Sidebar activo="movimientos" onNavigate={onNavigate} />

      <main className="db-main">
        <header className="db-header">
          <div>
            <h1 className="db-title">Nuevo movimiento</h1>
            <p className="db-subtitle">Registra un ingreso o gasto en tus finanzas</p>
          </div>
          <div className="db-header-actions">
            <button className="db-icon-btn" aria-label="Notificaciones"><Icon name="bell" /></button>
            <button className="db-avatar" aria-label="Perfil"><Icon name="user" size={20} /></button>
          </div>
        </header>

        <button type="button" className="nm-back" onClick={volver}>
          <Icon name="back" size={16} /> Volver a movimientos
        </button>

        <form className="db-card nm-card" onSubmit={handleSubmit} noValidate>
          {/* Tipo */}
          <div className="nm-field">
            <label>Tipo de movimiento</label>
            <div className="nm-type">
              <button
                type="button"
                className={`nm-type-btn ingreso ${tipo === "ingreso" ? "is-active" : ""}`}
                onClick={() => setTipo("ingreso")}
              >
                <Icon name="plus" size={16} /> Ingreso
              </button>
              <button
                type="button"
                className={`nm-type-btn gasto ${tipo === "gasto" ? "is-active" : ""}`}
                onClick={() => setTipo("gasto")}
              >
                <Icon name="down" size={16} /> Gasto
              </button>
            </div>
          </div>

          {/* Fila 1 */}
          <div className="nm-row">
            <div className="nm-field">
              <label htmlFor="descripcion">Descripción</label>
              <input
                id="descripcion"
                className={`nm-input ${errores.descripcion ? "has-error" : ""}`}
                type="text"
                placeholder="Ej. Salario, Mercado, Transporte"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
              {errores.descripcion && <span className="nm-error">{errores.descripcion}</span>}
            </div>

            <div className="nm-field">
              <label htmlFor="cantidad">Cantidad</label>
              <div className={`nm-input nm-money ${errores.cantidad ? "has-error" : ""}`}>
                <span>$</span>
                <input
                  id="cantidad"
                  type="number"
                  min="0"
                  placeholder="0,00"
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)}
                />
              </div>
              {errores.cantidad && <span className="nm-error">{errores.cantidad}</span>}
            </div>
          </div>

          {/* Fila 2 */}
          <div className="nm-row">
            <div className="nm-field">
              <label htmlFor="categoria">Categoría</label>
              <div className="nm-input nm-with-icon">
                <Icon name="search" size={16} />
                <select id="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                  {CATEGORIAS.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div className="nm-field">
              <label htmlFor="cuenta">Cuenta</label>
              <div className="nm-input nm-with-icon">
                <Icon name="cuentas" size={16} />
                <select id="cuenta" value={cuenta} onChange={(e) => setCuenta(e.target.value)}>
                  {CUENTAS.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Fila 3 */}
          <div className="nm-row">
            <div className="nm-field">
              <label htmlFor="fecha">Fecha</label>
              <div className="nm-input nm-with-icon">
                <Icon name="calendar" size={16} />
                <input id="fecha" type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
              </div>
            </div>

            <div className="nm-field">
              <label htmlFor="metodo">Método de pago</label>
              <div className="nm-input nm-with-icon">
                <Icon name="card" size={16} />
                <select id="metodo" value={metodo} onChange={(e) => setMetodo(e.target.value)}>
                  {METODOS.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Acciones */}
          <div className="nm-actions">
            <button type="button" className="nm-btn-cancel" onClick={volver}>Cancelar</button>
            <button type="submit" className="db-primary-btn nm-btn-save">
              <Icon name="check" size={16} /> Guardar movimiento
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}