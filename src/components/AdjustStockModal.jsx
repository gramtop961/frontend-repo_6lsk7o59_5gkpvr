import React, { useState } from 'react';

const AdjustStockModal = ({ item, onClose, onSave }) => {
  const [type, setType] = useState('increase');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  if (!item) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = Number(amount);
    if (!value) return;
    const newStock = type === 'increase' ? item.stock + value : Math.max(0, item.stock - value);
    onSave({ ...item, stock: newStock, lastNote: note });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-30 bg-black/30 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-semibold">Penyesuaian Stok</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <div className="text-sm text-gray-600">Barang</div>
            <div className="font-medium">{item.name}</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">Tipe</label>
              <select value={type} onChange={(e) => setType(e.target.value)} className="mt-1 w-full rounded-lg border-gray-200 focus:border-amber-500 focus:ring-amber-500">
                <option value="increase">Tambah</option>
                <option value="decrease">Kurangi</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-600">Jumlah</label>
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="mt-1 w-full rounded-lg border-gray-200 focus:border-amber-500 focus:ring-amber-500" />
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-600">Catatan</label>
            <input value={note} onChange={(e) => setNote(e.target.value)} className="mt-1 w-full rounded-lg border-gray-200 focus:border-amber-500 focus:ring-amber-500" placeholder="Contoh: restock supplier" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50">Batal</button>
            <button type="submit" className="px-4 py-2 rounded-lg bg-amber-600 text-white hover:bg-amber-700">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdjustStockModal;
