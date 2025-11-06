import React from 'react';
import { Boxes, AlertTriangle, DollarSign } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, trend, color }) => (
  <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
    <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${color}`}>
      <Icon className="h-6 w-6" />
    </div>
    <div>
      <div className="text-sm text-gray-600">{label}</div>
      <div className="text-xl font-semibold">{value}</div>
      {trend && <div className="text-xs text-gray-500">{trend}</div>}
    </div>
  </div>
);

const StatsCards = ({ items }) => {
  const totalItems = items.length;
  const lowStockCount = items.filter(i => i.minStock && i.stock <= i.minStock).length;
  const totalValue = items.reduce((sum, i) => sum + (i.price || 0) * (i.stock || 0), 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatCard icon={Boxes} label="Total Barang" value={totalItems} color="bg-amber-600/10 text-amber-700" />
      <StatCard icon={AlertTriangle} label="Stok Menipis" value={lowStockCount} color="bg-red-600/10 text-red-700" />
      <StatCard icon={DollarSign} label="Nilai Persediaan" value={`Rp ${totalValue.toLocaleString('id-ID')}`} color="bg-green-600/10 text-green-700" />
    </div>
  );
};

export default StatsCards;
