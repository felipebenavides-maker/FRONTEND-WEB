import React from "react";
import { Link } from "react-router-dom";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <nav style={{ padding: 12, borderBottom: "1px solid #ddd" }}>
        <Link to="/">Inicio</Link> |{" "}
        <Link to="/dashboard">Dashboard</Link> |{" "}
        <Link to="/sales">Ventas</Link> |{" "}
        <Link to="/login">Login</Link>
      </nav>

      <main style={{ padding: 20 }}>{children}</main>
    </div>
  );
}
