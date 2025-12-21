
import React, { useState } from 'react';
import { MenuItem, Category, LanguageCode } from '../types';
import { ADMIN_USER, ADMIN_PASS } from '../constants';
import { syncDataWithCloud } from '../services/firebaseService';
// Added missing RefreshCw import
import { Plus, Edit2, Save, X, Image as ImageIcon, Eye, EyeOff, List, Utensils, CloudUpload, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';

interface Props {
  menuItems: MenuItem[];
  categories: Category[];
  onUpdateItems: (items: MenuItem[]) => void;
  onUpdateCategories: (categories: Category[]) => void;
  onExit: () => void;
}

const emptyItem: MenuItem = {
  id: '',
  categoryIds: [],
  name: { th: '', en: '', ru: '', zh: '' },
  description: { th: '', en: '', ru: '', zh: '' },
  price: 0,
  image: '',
  isSpicy: false,
  isHidden: false,
};

export const AdminDashboard: React.FC<Props> = ({ 
  menuItems, 
  categories, 
  onUpdateItems, 
  onUpdateCategories,
  onExit 
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const [activeTab, setActiveTab] = useState<'dishes' | 'categories'>('dishes');
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState({ th: '', en: '', ru: '', zh: '' });

  if (!isAuthenticated) {
    const handleLogin = (e: React.FormEvent) => {
      e.preventDefault();
      if (username === ADMIN_USER && password === ADMIN_PASS) {
        setIsAuthenticated(true);
      } else {
        alert("Invalid Credentials");
      }
    };

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Admin Access</h2>
          <div className="space-y-4">
            <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} className="w-full p-3 border rounded-lg outline-none" />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-3 border rounded-lg outline-none" />
            <button type="submit" className="w-full bg-orange-600 text-white p-3 rounded-lg font-bold hover:bg-orange-700 transition-colors">Login</button>
            <button type="button" onClick={onExit} className="w-full text-gray-500 text-sm hover:underline">Return to Menu</button>
          </div>
        </form>
      </div>
    );
  }

  const handleGlobalSync = async () => {
    setIsSyncing(true);
    setSyncStatus('idle');
    const success = await syncDataWithCloud(menuItems, categories);
    setIsSyncing(false);
    setSyncStatus(success ? 'success' : 'error');
    if (success) {
      setTimeout(() => setSyncStatus('idle'), 3000);
    }
  };

  const handleSaveItem = (item: MenuItem) => {
    if (isAddingNew) {
      const newItem = { ...item, id: `manual-${Date.now()}` };
      onUpdateItems([...menuItems, newItem]);
    } else {
      onUpdateItems(menuItems.map(i => i.id === item.id ? item : i));
    }
    setEditingItem(null);
    setIsAddingNew(false);
  };

  const handleToggleHide = (id: string) => {
    onUpdateItems(menuItems.map(i => i.id === id ? { ...i, isHidden: !i.isHidden } : i));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingItem) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingItem({ ...editingItem, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleCategory = (catId: string) => {
    if (!editingItem) return;
    const current = editingItem.categoryIds || [];
    const updated = current.includes(catId) 
      ? current.filter(id => id !== catId)
      : [...current, catId];
    setEditingItem({ ...editingItem, categoryIds: updated });
  };

  if (editingItem) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="p-6 border-b flex justify-between items-center bg-gray-800 text-white">
            <h2 className="text-xl font-bold">{isAddingNew ? 'Add New Dish' : 'Edit Dish'}</h2>
            <button onClick={() => setEditingItem(null)} className="p-2 hover:bg-gray-700 rounded-full"><X size={24} /></button>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex gap-4 items-start">
               <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden border">
                 {editingItem.image ? <img src={editingItem.image} className="w-full h-full object-cover" alt="Preview" /> : <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>}
               </div>
               <div>
                 <label className="block bg-orange-100 text-orange-700 px-4 py-2 rounded-lg cursor-pointer hover:bg-orange-200 transition-colors font-medium">
                   <ImageIcon className="inline mr-2" size={18} /> Upload Photo
                   <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                 </label>
               </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="label">Price (THB)</label><input type="number" value={editingItem.price} onChange={e => setEditingItem({...editingItem, price: Number(e.target.value)})} className="input-field" /></div>
              <div className="flex items-center pt-6 gap-2"><input type="checkbox" id="spicy" checked={editingItem.isSpicy} onChange={e => setEditingItem({...editingItem, isSpicy: e.target.checked})} className="w-5 h-5 text-orange-600 rounded" /><label htmlFor="spicy" className="font-medium text-gray-700">Spicy 🌶</label></div>
            </div>
            <div>
              <label className="label mb-2 block">Categories</label>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button key={cat.id} onClick={() => toggleCategory(cat.id)} className={`px-3 py-1 rounded-full text-sm border ${editingItem.categoryIds?.includes(cat.id) ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-gray-600 border-gray-300'}`}>{cat.name.en}</button>
                ))}
              </div>
            </div>
            <div className="space-y-4 border-t pt-4">
               {(['th', 'en', 'ru', 'zh'] as LanguageCode[]).map(lang => (
                 <div key={lang} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-3 rounded-lg">
                    <div><span className="text-xs font-bold uppercase text-gray-400 block mb-1">Name ({lang})</span><input value={editingItem.name[lang]} onChange={e => setEditingItem({ ...editingItem, name: { ...editingItem.name, [lang]: e.target.value } })} className="input-field" /></div>
                    <div><span className="text-xs font-bold uppercase text-gray-400 block mb-1">Desc ({lang})</span><textarea value={editingItem.description[lang]} onChange={e => setEditingItem({ ...editingItem, description: { ...editingItem.description, [lang]: e.target.value } })} className="input-field h-10 py-2" /></div>
                 </div>
               ))}
            </div>
            <button onClick={() => handleSaveItem(editingItem)} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all"><Save size={20} /> Apply Changes</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow px-6 py-4 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
            <div className="flex gap-4 mt-2">
              <button onClick={() => setActiveTab('dishes')} className={`text-sm font-bold flex items-center gap-2 ${activeTab === 'dishes' ? 'text-orange-600 underline' : 'text-gray-500'}`}><Utensils size={16} /> Menu Items</button>
              <button onClick={() => setActiveTab('categories')} className={`text-sm font-bold flex items-center gap-2 ${activeTab === 'categories' ? 'text-orange-600 underline' : 'text-gray-500'}`}><List size={16} /> Categories</button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={handleGlobalSync} 
              disabled={isSyncing}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all ${
                syncStatus === 'success' ? 'bg-green-500 text-white' : 
                syncStatus === 'error' ? 'bg-red-500 text-white' : 
                'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isSyncing ? <RefreshCw className="animate-spin" size={18} /> : 
               syncStatus === 'success' ? <CheckCircle size={18} /> :
               syncStatus === 'error' ? <AlertCircle size={18} /> :
               <CloudUpload size={18} />}
              {isSyncing ? 'Syncing...' : syncStatus === 'success' ? 'Updated!' : syncStatus === 'error' ? 'Failed' : 'Publish Changes'}
            </button>
            <button onClick={() => { handleGlobalSync(); onExit(); }} className="text-gray-500 hover:text-gray-800">Exit</button>
            {activeTab === 'dishes' && (
              <button onClick={() => { setEditingItem({ ...emptyItem }); setIsAddingNew(true); }} className="bg-orange-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-orange-700"><Plus size={18} /> Add Dish</button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6 flex-grow w-full">
        {activeTab === 'dishes' && (
          <div className="grid grid-cols-1 gap-4">
            {menuItems.map(item => (
              <div key={item.id} className={`bg-white p-4 rounded-lg shadow-sm border flex items-center gap-4 ${item.isHidden ? 'opacity-60 bg-gray-100' : ''}`}>
                <div className="w-16 h-16 bg-gray-200 rounded-md overflow-hidden shrink-0"><img src={item.image} className="w-full h-full object-cover" alt={item.name.en} /></div>
                <div className="flex-1">
                  <div className="flex items-center gap-2"><h3 className="font-bold text-gray-800">{item.name.en}</h3>{item.isHidden && <span className="text-[10px] bg-gray-500 text-white px-2 py-0.5 rounded">HIDDEN</span>}</div>
                  <p className="text-xs text-gray-500 line-clamp-1">{item.name.th} | ฿{item.price}</p>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={() => handleToggleHide(item.id)} className={`p-2 rounded-full ${item.isHidden ? 'text-gray-400' : 'text-green-600 hover:bg-green-50'}`}>{item.isHidden ? <EyeOff size={20} /> : <Eye size={20} />}</button>
                    <button onClick={() => { setEditingItem({ ...item }); setIsAddingNew(false); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"><Edit2 size={20} /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <style>{`
        .label { display: block; font-size: 0.875rem; font-weight: 600; color: #374151; margin-bottom: 0.25rem; }
        .input-field { width: 100%; border: 1px solid #d1d5db; border-radius: 0.5rem; padding: 0.5rem; font-size: 0.875rem; outline: none; transition: all 0.15s; }
        .input-field:focus { border-color: #f97316; box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.2); }
      `}</style>
    </div>
  );
};
