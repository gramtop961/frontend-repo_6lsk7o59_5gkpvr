import React from 'react';
import { Pencil, Trash2, PackageOpen, AlertTriangle } from 'lucide-react';

const colorClasses = {
  gray: 'bg-gray-100 text-gray-700',
  amber: 'bg-amber-100 text-amber-700',
  blue: 'bg-blue-100 text-blue-700',
  green: 'bg-green-100 text-green-700',
};

const Badge = ({ children, color = 'gray' }) => (
  <span className={`px-2 py-1 rounded-md text-xs font-medium ${colorClasses[color] || colorClasses.gray}`}>{children}</span>
);

const InventoryTable = ({ items, onEdit, onDelete, onAdjust }) => {
  const lowStock = (item) => item.minStock && item.stock <= item.minStock;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Barang</th>
              <th className="text-left px-4 py-3 font-medium">Kategori</th>
              <th className="text-left px-4 py-3 font-medium">Stok</th>
              <th className="text-left px-4 py-3 font-medium">Harga</th>
              <th className="text-right px-4 py-3 font-medium">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-gray-500">
                  Belum ada data barang.
                </td>
              </tr>
            )}
            {items.map((item) => (
              <tr key={item.id} className="border-t border-gray-50 hover:bg-amber-50/30">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-amber-600/10 text-amber-700 flex items-center justify-center">
                      <PackageOpen className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-medium">{item.name}</div>
                      {lowStock(item) && (
                        <div className="text-xs text-amber-700 flex items-center gap-1 mt-0.5">
                          <AlertTriangle className="h-3 w-3" /> Stok menipis
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Badge color="amber">{item.category}</Badge>
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium">{item.stock} {item.unit}</div>
                  {item.minStock ? (
                    <div className="text-xs text-gray-500">Min: {item.minStock} {item.unit}</div>
                  ) : null}
                </td>
                <td className="px-4 py-3">
                  {item.price ? (
                    <div className="font-medium">Rp {item.price.toLocaleString('id-ID')}</div>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => onEdit(item)} className="px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 inline-flex items-center gap-1 text-gray-700">
                      <Pencil className="h-4 w-4" /> Edit
                    </button>
                    <button onClick={() => onDelete(item)} className="px-3 py-1.5 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 inline-flex items-center gap-1 text-red-700">
                      <Trash2 className="h-4 w-4" /> Hapus
                    </button>
                    <button onClick={() => onAdjust(item)} className="px-3 py-1.5 rounded-lg bg-amber-600 text-white hover:bg-amber-700">Penyesuaian</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryTable;
