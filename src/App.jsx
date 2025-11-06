import React, { useMemo, useState } from 'react';
import Header from './components/Header';
import StatsCards from './components/StatsCards';
import InventoryTable from './components/InventoryTable';
import InventoryForm from './components/InventoryForm';
import AdjustStockModal from './components/AdjustStockModal';

function App() {
  const [items, setItems] = useState([
    { id: '1', name: 'Arabica Blend', category: 'Biji Kopi', stock: 12, unit: 'kg', minStock: 5, price: 150000 },
    { id: '2', name: 'Susu UHT', category: 'Susu', stock: 18, unit: 'liter', minStock: 10, price: 18000 },
    { id: '3', name: 'Vanilla Syrup', category: 'Syrup', stock: 6, unit: 'bottle', minStock: 4, price: 75000 },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [adjustItem, setAdjustItem] = useState(null);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('Semua');

  const filtered = useMemo(() => {
    return items.filter(i => {
      const matchQ = i.name.toLowerCase().includes(query.toLowerCase());
      const matchC = filter === 'Semua' ? true : i.category === filter;
      return matchQ && matchC;
    });
  }, [items, query, filter]);

  const handleSave = (item) => {
    setItems((prev) => {
      const exist = prev.some(p => p.id === item.id);
      if (exist) return prev.map(p => (p.id === item.id ? item : p));
      return [item, ...prev];
    });
  };

  const handleDelete = (item) => {
    if (!confirm(`Hapus ${item.name}?`)) return;
    setItems((prev) => prev.filter(p => p.id !== item.id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <Header onAdd={() => { setEditing(null); setShowForm(true); }} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        <StatsCards items={items} />

        <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div className="flex-1 flex gap-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari barang..."
              className="w-full sm:max-w-xs rounded-lg border-gray-200 focus:border-amber-500 focus:ring-amber-500"
            />
            <select value={filter} onChange={(e) => setFilter(e.target.value)} className="rounded-lg border-gray-200 focus:border-amber-500 focus:ring-amber-500">
              <option>Semua</option>
              <option>Biji Kopi</option>
              <option>Susu</option>
              <option>Syrup</option>
              <option>Peralatan</option>
              <option>Lainnya</option>
            </select>
          </div>
          <div className="text-xs text-gray-500">{filtered.length} barang ditampilkan</div>
        </div>

        <InventoryTable
          items={filtered}
          onEdit={(item) => { setEditing(item); setShowForm(true); }}
          onDelete={handleDelete}
          onAdjust={(item) => setAdjustItem(item)}
        />
      </main>

      {showForm && (
        <InventoryForm
          editing={editing}
          onSave={handleSave}
          onClose={() => setShowForm(false)}
        />
      )}

      {adjustItem && (
        <AdjustStockModal
          item={adjustItem}
          onSave={handleSave}
          onClose={() => setAdjustItem(null)}
        />
      )}

      <footer className="text-center text-xs text-gray-500 py-8">© {new Date().getFullYear()} Grah Coffee — Manajemen Persediaan</footer>
    </div>
  );
}

export default App;
