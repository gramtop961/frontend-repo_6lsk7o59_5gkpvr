import React from 'react';
import { Coffee, Plus } from 'lucide-react';

const Header = ({ onAdd }) => {
  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-amber-600/10 text-amber-700 flex items-center justify-center">
            <Coffee className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Grah Coffee</h1>
            <p className="text-xs text-gray-500">Pengelolaan Stok & Barang</p>
          </div>
        </div>
        <button
          onClick={onAdd}
          className="inline-flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-lg shadow hover:bg-amber-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Tambah Barang</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
