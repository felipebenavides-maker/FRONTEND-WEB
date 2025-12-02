import React, { useEffect, useState } from "react";
import api from "../../../api/api";
import { Product } from "../types";

export default function Sales() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Product>({
    name: "",
    description: "",
    price: 0,
    category: "",
  });

  const [editId, setEditId] = useState<string | null>(null);

  const load = async () => {
    const res = await api.get("/api/v1/products");
    setProducts(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editId) {
      await api.put(`/api/v1/products/${editId}`, form);
    } else {
      await api.post("/api/v1/products", form);
    }

    setEditId(null);
    setForm({ name: "", description: "", price: 0, category: "" });
    load();
  };

  return (
    <div>
      <h2>Ventas</h2>

      <form onSubmit={submit}>
        <label>Nombre</label>
        <input name="name" value={form.name} onChange={change} />

        <label>Descripción</label>
        <textarea name="description" value={form.description} onChange={change} />

        <label>Precio</label>
        <input type="number" name="price" value={form.price} onChange={change} />

        <label>Categoría</label>
        <input name="category" value={form.category} onChange={change} />

        <button>{editId ? "Actualizar" : "Crear"}</button>
      </form>

      <h3>Productos</h3>

      <table>
        <tbody>
          {products.map((p) => (
            <tr key={p._id || p.id}>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>{p.category}</td>
              <td>
                <button onClick={() => { setEditId(p._id || p.id || null); setForm(p); }}>Editar</button>
                <button onClick={() => api.delete(`/api/v1/products/${p._id || p.id}`).then(load)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}
