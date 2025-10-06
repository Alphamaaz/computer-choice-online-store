import React, { useEffect, useState } from "react";
import api from "../API/apiService";

// Inline styles (simple, responsive)
const styles = {
  container: {
    padding: 20,
    fontFamily: "Inter, system-ui, Arial",
    background: "#f8fafc",
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  title: { margin: 0 },
  card: {
    background: "#fff",
    borderRadius: 10,
    padding: 18,
    boxShadow: "0 6px 18px rgba(2,6,23,0.06)",
    marginBottom: 20,
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 12,
  },
  input: {
    padding: 10,
    borderRadius: 8,
    border: "1px solid #e5e7eb",
    width: "100%",
    boxSizing: "border-box",
  },
  textarea: {
    padding: 10,
    borderRadius: 8,
    border: "1px solid #e5e7eb",
    minHeight: 90,
    width: "100%",
    boxSizing: "border-box",
  },
  btnPrimary: {
    background: "#111827",
    color: "#fff",
    padding: "10px 14px",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
  },
  btnDanger: {
    background: "#dc2626",
    color: "#fff",
    padding: "8px 12px",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
  },
  actionsRow: { display: "flex", gap: 8, alignItems: "center" },
  table: { width: "100%", borderCollapse: "collapse", marginTop: 8 },
  th: {
    textAlign: "left",
    padding: "12px 8px",
    borderBottom: "1px solid #e6eef6",
    background: "#f1f5f9",
  },
  td: {
    padding: "12px 8px",
    borderBottom: "1px solid #f3f4f6",
    verticalAlign: "middle",
  },
  imgThumb: { width: 70, height: 70, objectFit: "cover", borderRadius: 8 },
  smallMuted: { fontSize: 12, color: "#6b7280" },
};

const defaultForm = {
  name: "",
  model: "",
  price: "",
  specification: "",
  category: "",
  brand: "",
  instock: 0,
  description: "",
  memory: "",
  type: "",
  productImage: null,
};

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(defaultForm);
  const [preview, setPreview] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data.data || []);
    } catch (err) {
      console.error(
        "fetchProducts error:",
        err?.response || err.message || err
      );
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Debug helper to log FormData
  const logFormData = (fd) => {
    console.group("FormData contents");
    for (let pair of fd.entries()) {
      if (pair[1] instanceof File) {
        console.log(pair[0], `File: ${pair[1].name} (${pair[1].size} bytes)`);
      } else {
        console.log(pair[0], pair[1]);
      }
    }
    console.groupEnd();
  };

  // handle input change
  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    if (name === "productImage") {
      const file = files && files[0] ? files[0] : null;
      setForm((f) => ({ ...f, productImage: file }));
      if (file) setPreview(URL.createObjectURL(file));
    } else {
      setForm((f) => ({
        ...f,
        [name]: type === "number" ? (value === "" ? "" : Number(value)) : value,
      }));
    }
  };

  // submit form
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log("Submitting product - form state:", form);

      const formData = new FormData();
      formData.append("name", form.name || "");
      formData.append("model", form.model || "");
      formData.append("price", String(form.price || 0));
      formData.append("specification", form.specification || "");
      formData.append("category", form.category || "");
      formData.append("brand", form.brand || "");
      formData.append("instock", String(form.instock || 0));
      formData.append("description", form.description || "");
      formData.append("memory", form.memory || "");
      formData.append("type", form.type || "");

      if (form.productImage) {
        formData.append("productImage", form.productImage);
      }

      // log FormData entries
      logFormData(formData);

      let res;
      if (editingId) {
        res = await api.put(`/products/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        res = await api.post("/products", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      console.log("Backend response:", res.data);

      // reset
      setForm(defaultForm);
      setPreview(null);
      setEditingId(null);
      await fetchProducts();
    } catch (err) {
      console.error("submitForm error:", err?.response || err.message || err);
    } finally {
      setLoading(false);
    }
  };

  // delete flow
  const doDelete = async (id) => {
    try {
      setConfirmLoading(true);
      const res = await api.delete(`/products/${id}`);
      console.log("Delete response:", res.data);
      setConfirmDeleteId(null);
      await fetchProducts();
    } catch (err) {
      console.error("delete error:", err?.response || err.message || err);
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleEdit = (p) => {
    setEditingId(p._id);
    setForm({
      name: p.name || "",
      model: p.model || "",
      price: p.price || "",
      specification: p.specification || "",
      category: p.category || "",
      brand: p.brand || "",
      instock: p.instock || 0,
      description: p.description || "",
      memory: p.memory || "",
      type: p.type || "",
      productImage: null,
    });
    setPreview(
      p.productImage ? `http://localhost:5000${p.productImage}` : null
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Admin Dashboard</h2>
        <div style={styles.actionsRow}>
          <span style={styles.smallMuted}>Products: {products.length}</span>
          <button
            style={{ ...styles.btnPrimary, marginLeft: 12 }}
            onClick={() => {
              setEditingId(null);
              setForm(defaultForm);
              setPreview(null);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            New Product
          </button>
        </div>
      </div>

      <div style={styles.card}>
        <h3 style={{ marginTop: 0 }}>
          {editingId ? "Edit Product" : "Add Product"}
        </h3>
        <form onSubmit={submitForm}>
          <div style={styles.formGrid}>
            <input
              name="name"
              placeholder="Product name"
              value={form.name}
              onChange={handleChange}
              style={styles.input}
              required
            />
            <input
              name="model"
              placeholder="Model"
              value={form.model}
              onChange={handleChange}
              style={styles.input}
            />
            <input
              name="price"
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              style={styles.input}
              required
            />
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="">Select type</option>
              <option value="laptop">Laptop</option>
              <option value="desktop">Desktop</option>
              <option value="server">Charger</option>
              <option value="tablet">SSD</option>
              <option value="phone">Ram</option>
            </select>
            <input
              name="brand"
              placeholder="Brand"
              value={form.brand}
              onChange={handleChange}
              style={styles.input}
            />
            <input
              name="category"
              placeholder="Category"
              value={form.category}
              onChange={handleChange}
              style={styles.input}
            />
            <input
              name="memory"
              placeholder="Memory (e.g. 8GB)"
              value={form.memory}
              onChange={handleChange}
              style={styles.input}
            />
            <input
              name="instock"
              type="number"
              placeholder="In stock"
              value={form.instock}
              onChange={handleChange}
              style={styles.input}
            />

            <div style={{ gridColumn: "1 / -1" }}>
              <label style={{ display: "block", marginBottom: 6 }}>
                Specification
              </label>
              <textarea
                name="specification"
                placeholder="Specification"
                value={form.specification}
                onChange={handleChange}
                style={styles.textarea}
              />
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <label style={{ display: "block", marginBottom: 6 }}>
                Description
              </label>
              <textarea
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                style={styles.textarea}
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: 6 }}>
                Product image
              </label>
              <input
                name="productImage"
                type="file"
                accept="image/*"
                onChange={handleChange}
              />
              {preview && (
                <img
                  src={preview}
                  alt="preview"
                  style={{ marginTop: 8, ...styles.imgThumb }}
                />
              )}
            </div>
          </div>

          <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
            <button type="submit" style={styles.btnPrimary} disabled={loading}>
              {loading
                ? "Saving..."
                : editingId
                ? "Update Product"
                : "Create Product"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setForm(defaultForm);
                  setPreview(null);
                }}
                style={{ padding: 10, borderRadius: 8 }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div style={styles.card}>
        <h3 style={{ marginTop: 0 }}>Products</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Model</th>
              <th style={styles.th}>Type</th>
              <th style={styles.th}>Brand</th>
              <th style={styles.th}>Category</th>
              <th style={styles.th}>Memory</th>
              <th style={styles.th}>Price</th>
              <th style={styles.th}>Stock</th>
              <th style={styles.th}>Image</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td style={styles.td}>{p.name}</td>
                <td style={styles.td}>{p.model}</td>
                <td style={styles.td}>{p.type}</td>
                <td style={styles.td}>{p.brand}</td>
                <td style={styles.td}>{p.category}</td>
                <td style={styles.td}>{p.memory}</td>
                <td style={styles.td}>${p.price}</td>
                <td style={styles.td}>{p.instock}</td>
                <td style={styles.td}>
                  {p.productImage ? (
                    <img
                      src={`http://localhost:5000${p.productImage}`}
                      alt={p.name}
                      style={styles.imgThumb}
                    />
                  ) : (
                    <span style={{ color: "#9ca3af" }}>No image</span>
                  )}
                </td>
                <td style={styles.td}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      onClick={() => handleEdit(p)}
                      style={{ padding: 8, borderRadius: 8 }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setConfirmDeleteId(p._id)}
                      style={styles.btnDanger}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirmation modal */}
      {confirmDeleteId && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.45)",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: 20,
              borderRadius: 8,
              width: 360,
            }}
          >
            <h4 style={{ marginTop: 0 }}>Confirm delete</h4>
            <p>Are you sure you want to delete this product?</p>
            <div
              style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}
            >
              <button
                onClick={() => setConfirmDeleteId(null)}
                disabled={confirmLoading}
                style={{ padding: 8, borderRadius: 8 }}
              >
                Cancel
              </button>
              <button
                onClick={() => doDelete(confirmDeleteId)}
                disabled={confirmLoading}
                style={styles.btnDanger}
              >
                {confirmLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
