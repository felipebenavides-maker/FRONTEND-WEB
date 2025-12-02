import React, { useState } from "react";
import { registerService } from "../services";
import { RegisterPayload } from "../types";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState<RegisterPayload>({
    email: "",
    username: "",
    password: "",
  });

  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const change = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await registerService(form);
      setMsg(res.data.message);
      setTimeout(() => navigate("/login"), 1000);
    } catch (error: any) {
      setErr(error?.response?.data?.message || "Error al registrarse");
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={submit}>
        <label>Correo</label>
        <input name="email" required onChange={change} />

        <label>Username</label>
        <input name="username" required onChange={change} />

        <label>Contraseña</label>
        <input name="password" type="password" required onChange={change} />

        <button>Crear cuenta</button>

        <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>

        {msg && <p style={{ color: "green" }}>{msg}</p>}
        {err && <p style={{ color: "red" }}>{err}</p>}
      </form>
    </div>
  );
}
