import { useState } from "react";
import "./login.css";



function Logo() {
  return (
    <div className="logo">
      <svg width="24" height="22" viewBox="0 0 24 22" fill="none">
        <path
          d="M2 20V3.5C2 2.7 2.7 2 3.5 2c.5 0 1 .3 1.3.7L12 12l7.2-9.3c.3-.4.8-.7 1.3-.7.8 0 1.5.7 1.5 1.5V20"
          stroke="#16a34a"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>Montrack</span>
    </div>
  );
}

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
    // Aquí va tu lógica de autenticación
  };

  return (
    <div className="page">
      <header className="header">
        <Logo />
      </header>

      <main className="main">
        <div className="card">
          <h1 className="title">Bienvenido a Montrack</h1>
          <p className="subtitle">Ingresa tus datos para continuar.</p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="email">Correo electrónico</label>
              <input
                id="email"
                type="email"
                placeholder="tu@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <div className="field">
              <label htmlFor="password">Contraseña</label>
              <div className="password-wrapper">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Introduce tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="toggle-btn"
                  onClick={() => setShowPassword((s) => !s)}
                >
                  {showPassword ? "Ocultar" : "Mostrar"}
                </button>
              </div>
            </div>

            <div className="row">
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <span>Recordarme</span>
              </label>
              <a href="#" className="link">¿Olvidaste tu contraseña?</a>
            </div>

            <button type="submit" className="submit-btn">
              Iniciar sesión
            </button>
          </form>

          <p className="signup">
            ¿No tienes una cuenta?{" "}
            <a href="#" className="link link-strong">Crear una cuenta</a>
          </p>
        </div>
      </main>

      <footer className="footer">© 2026 Montrack</footer>
    </div>
  );
}