import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { loginService } from "../services";
import { LoginPayload } from "../types";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState<LoginPayload>({ password: "" });
  const [error, setError] = useState("");

  const change = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await loginService(form);

      login(
        {
          username: res.data.username,
          email: res.data.email,
          admin: res.data.admin,
        },
        res.data.token
      );

      navigate("/dashboard");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Error al iniciar sesión");
    }
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <form onSubmit={submit}>
        <label>Email</label>
        <input name="email" onChange={change} />

        <label>o Username</label>
        <input name="username" onChange={change} />

        <label>Contraseña</label>
        <input name="password" type="password" required onChange={change} />

        <button>Entrar</button>

        <p>¿No tienes cuenta? <Link to="/register">Regístrate</Link></p>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}
