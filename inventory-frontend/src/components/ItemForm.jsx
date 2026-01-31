import { useState } from "react";

export default function ItemForm({
  onSubmit,
  initialData = { name: "", quantity: 0 },
  submitLabel,
}) {
  const [name, setName] = useState(initialData.name);
  const [quantity, setQuantity] = useState(initialData.quantity);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, quantity });
    setName("");
    setQuantity(0);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Item Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: "8px", marginRight: "10px" }}
        required
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        style={{ padding: "8px", marginRight: "10px", width: "100px" }}
        min={0}
        required
      />
      <button type="submit" style={{ padding: "8px 12px" }}>
        {submitLabel}
      </button>
    </form>
  );
}
