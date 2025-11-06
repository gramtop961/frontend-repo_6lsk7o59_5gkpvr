import React, { useState, useEffect } from 'react';

const defaultItem = {
  name: '',
  category: 'Biji Kopi',
  stock: '',
  unit: 'kg',
  minStock: '',
  price: ''
};

const InventoryForm = ({ onSave, onClose, editing }) => {
  const [item, setItem] = useState(defaultItem);

  useEffect(() => {
    if (editing) setItem(editing);
  }, [editing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!item.name || !item.stock) return;
    onSave({
      ...item,
      id: editing?.id || crypto.randomUUID(),
      stock: Number(item.stock),
      minStock: item.minStock ? Number(item.minStock) : 0,
      price: item.price ? Number(item.price) : 0
    });
    onClose();
    setItem(defaultItem);
  };

  return (
    <div className="fixed inset-0 z-30 bg-black/30 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-semibold">{editing ? 'Edit Barang' : 'Tambah Barang'}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="text-sm text-gray-600">Nama Barang</label>
            <input name="name" value={item.name} onChange={handleChange} className="mt-1 w-full rounded-lg border-gray-200 focus:border-amber-500 focus:ring-amber-500" placeholder="Contoh: Arabica Blend" />
          </div>

          <div>
            <label className="text-sm text-gray-600">Kategori</label>
            <select name="category" value={item.category} onChange={handleChange} className="mt-1 w-full rounded-lg border-gray-200 focus:border-amber-500 focus:ring-amber-500">
              <option>Biji Kopi</option>
              <option>Susu</option>
              <option>Syrup</option>
              <option>Peralatan</option>
              <option>Lainnya</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-600">Satuan</label>
            <select name="unit" value={item.unit} onChange={handleChange} className="mt-1 w-full rounded-lg border-gray-200 focus:border-amber-500 focus:ring-amber-500">
              <option>kg</option>
              <option>gram</option>
              <option>liter</option>
              <option>ml</option>
              <option>pcs</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-600">Stok</label>
            <input type="number" name="stock" value={item.stock} onChange={handleChange} className="mt-1 w-full rounded-lg border-gray-200 focus:border-amber-500 focus:ring-amber-500" />
          </div>

          <div>
            <label className="text-sm text-gray-600">Stok Minimum</label>
            <input type="number" name="minStock" value={item.minStock} onChange={handleChange} className="mt-1 w-full rounded-lg border-gray-200 focus:border-amber-500 focus:ring-amber-500" />
          </div>

          <div className="sm:col-span-2">
            <label className="text-sm text-gray-600">Harga (opsional)</label>
            <input type="number" name="price" value={item.price} onChange={handleChange} className="mt-1 w-full rounded-lg border-gray-200 focus:border-amber-500 focus:ring-amber-500" />
          </div>

          <div className="sm:col-span-2 mt-2 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50">Batal</button>
            <button type="submit" className="px-4 py-2 rounded-lg bg-amber-600 text-white hover:bg-amber-700">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InventoryForm;
