import { useState } from "react";
import Login from "./assets/Pages/LoginPage.jsx";
import Dashboard from "./assets/Pages/Dashboard.jsx";
import Movimientos from "./assets/Pages/movimientosPage.jsx";
import NuevoMovimiento from "./assets/Pages/NuevoMovimiento.jsx";
import Cuentas from "./assets/Pages/CuentasPage.jsx";
import Presupuestos from "./assets/Pages/presupuesto.jsx";
import Perfil from "./assets/Pages/Perfil.jsx";
import DemoVideo from "./assets/Pages/DemoVideo.jsx";


const PAGINAS = ["dashboard", "movimientos", "nuevo-movimiento", "cuentas", "presupuestos", "metas", "estadisticas", "configuracion","demo-video"];

export default function App() {
  const [sesionIniciada, setSesionIniciada] = useState(false);
  const [pagina, setPagina] = useState("dashboard");
  const [movimientos, setMovimientos] = useState([]);

  function irA(destino) {
    if (PAGINAS.includes(destino)) {
      setPagina(destino);
    }
  }

  function agregarMovimiento(movimiento) {
    setMovimientos((actuales) => [movimiento, ...actuales]);
    irA("movimientos");
  }

  if (!sesionIniciada) {
    return <Login onLogin={() => setSesionIniciada(true)} />;
  }

  if (pagina === "nuevo-movimiento") {
    return <NuevoMovimiento onNavigate={irA} onSave={agregarMovimiento} />;
  }

  if (pagina === "movimientos") {
    return <Movimientos onNavigate={irA} movimientos={movimientos} />;
  }

  if (pagina === "cuentas") {
    return <Cuentas onNavigate={irA} />;
  }

  if (pagina === "presupuestos") {
    return <Presupuestos onNavigate={irA} />;
  }
  if (pagina === "configuracion") {
    return <Perfil onNavigate={irA} onLogout={() => setSesionIniciada(true)} />;
  }
  if (pagina === "demo-video") {
    return <DemoVideo />;
  }

  return <Dashboard onNavigate={irA} movimientos={movimientos} />;

}
