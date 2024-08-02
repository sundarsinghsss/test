// src/components/App.js
import React, { useState, useEffect } from 'react';
import { getItems, createItem, updateItem, deleteItem } from './services/api';

const App = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [editItemId, setEditItemId] = useState(null);
  const [editItemName, setEditItemName] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await getItems();
    setItems(response.data);
  };

  const handleCreate = async () => {
    await createItem(newItem);
    setNewItem('');
    fetchItems();
  };

  const handleUpdate = async () => {
    await updateItem(editItemId, editItemName);
    setEditItemId(null);
    setEditItemName('');
    fetchItems();
  };

  const handleDelete = async (id) => {
    await deleteItem(id);
    fetchItems();
  };

  return (
    <div>
      <h1>CRUD App</h1>
      <div>
        <h2>Create Item</h2>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button onClick={handleCreate}>Create</button>
      </div>
      <div>
        <h2>Items</h2>
        <ul>
          {items.map(item => (
            <li key={item.id}>
              {editItemId === item.id ? (
                <div>
                  <input
                    type="text"
                    value={editItemName}
                    onChange={(e) => setEditItemName(e.target.value)}
                  />
                  <button onClick={handleUpdate}>Update</button>
                </div>
              ) : (
                <div>
                  {item.name}
                  <button onClick={() => {
                    setEditItemId(item.id);
                    setEditItemName(item.name);
                  }}>Edit</button>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
