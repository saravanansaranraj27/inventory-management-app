import { useEffect, useState } from "react";
import { getItems, createItem, updateItem, deleteItem } from "./api/api";
import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";
import Login from "./components/Login";

function App() {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchItems = async () => {
    try {
      const res = await getItems();
      setItems(res.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) fetchItems();
  }, [isLoggedIn]);

  const handleAdd = async (item) => {
    await createItem(item);
    fetchItems();
  };

  const handleEdit = async (item) => {
    await updateItem(editingItem.id, item);
    setEditingItem(null);
    fetchItems();
  };

  const handleDelete = async (id) => {
    await deleteItem(id);
    fetchItems();
  };

  if (!isLoggedIn) {
    return <Login onLogin={setIsLoggedIn} />;
  }

  return (
    <div className="container">
      <h1>Inventory Management</h1>

      <ItemForm
        onSubmit={editingItem ? handleEdit : handleAdd}
        initialData={editingItem || { name: "", quantity: 0 }}
        submitLabel={editingItem ? "Update" : "Add"}
      />

      <ItemList items={items} onDelete={handleDelete} onEdit={setEditingItem} />
    </div>
  );
}

export default App;
