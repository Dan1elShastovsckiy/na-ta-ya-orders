import React, { useState, useEffect } from 'react';
import { 
  MenuItem, 
  CartItem, 
  LanguageCode, 
  Category 
} from './types';
import { 
  INITIAL_MENU_ITEMS, 
  INITIAL_CATEGORIES, 
  UI_LABELS, 
  TELEGRAM_BOT_TOKEN,
  TELEGRAM_CHAT_ID
} from './constants';
import { LanguageSelector } from './components/LanguageSelector';
import { DishModal } from './components/DishModal';
import { CartDrawer } from './components/CartDrawer';
import { AdminDashboard } from './components/AdminDashboard';
import { ShoppingBag, Loader2, Lock, QrCode } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<LanguageCode>('th');
  
  // Data State with LocalStorage Persistence
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem('nataya_menu_items');
    return saved ? JSON.parse(saved) : INITIAL_MENU_ITEMS;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('nataya_categories');
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  // Save to LocalStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('nataya_menu_items', JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem('nataya_categories', JSON.stringify(categories));
  }, [categories]);
  
  // UI State
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [isSendingOrder, setIsSendingOrder] = useState(false);
  
  // Mode State
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [tableNumber, setTableNumber] = useState<string | null>(null);
  const [isOrderingEnabled, setIsOrderingEnabled] = useState(false);

  // Parse URL Parameters for Routing
  useEffect(() => {
    const handleRouting = () => {
      const params = new URLSearchParams(window.location.search);
      const tableParam = params.get('table');
      const hash = window.location.hash;

      if (hash === '#admin') {
        setIsAdminMode(true);
        setTableNumber(null);
        setIsOrderingEnabled(false);
      } else if (tableParam) {
        setTableNumber(tableParam);
        setIsOrderingEnabled(true);
        setIsAdminMode(false);
      } else {
        // Public View Mode
        setTableNumber(null);
        setIsOrderingEnabled(false);
        setIsAdminMode(false);
      }
    };

    // Run on mount
    handleRouting();

    // Listen for hash changes (Admin toggle)
    window.addEventListener('hashchange', handleRouting);
    return () => window.removeEventListener('hashchange', handleRouting);
  }, []);

  const addToCart = (item: MenuItem, quantity: number, notes: string) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id && i.notes === notes);
      if (existing) {
        return prev.map(i => i.id === item.id && i.notes === notes 
          ? { ...i, quantity: i.quantity + quantity }
          : i
        );
      }
      return [...prev, { ...item, quantity, notes }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    setIsSendingOrder(true);

    const orderId = `#ORD-${Date.now().toString().slice(-6)}`;
    const date = new Date().toLocaleString('en-GB');
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Format items list for Telegram
    const itemsList = cart.map(item => 
      `▫️ ${item.quantity}x ${item.name.en} (${item.name.th})\n   ${item.notes ? `📝 Note: ${item.notes}` : ''}`
    ).join('\n');

    const message = `
🔔 <b>New Order Received!</b>
<b>ID:</b> ${orderId}
<b>Table:</b> ${tableNumber || 'N/A'}
<b>Time:</b> ${date}

<b>Order Details:</b>
${itemsList}

💰 <b>Total: ฿${total}</b>
    `.trim();

    try {
      const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: String(TELEGRAM_CHAT_ID),
          text: message,
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [
                { text: '👨‍🍳 In Progress', callback_data: `status_progress_${orderId}` },
                { text: '✅ Ready for Client', callback_data: `status_done_${orderId}` }
              ]
            ]
          }
        })
      });

      if (response.ok) {
        alert(UI_LABELS.order_sent[lang]);
        setCart([]);
        setIsCartOpen(false);
      } else {
        alert('Error sending order. Please call waiter.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Connection error. Please call waiter.');
    } finally {
      setIsSendingOrder(false);
    }
  };

  if (isAdminMode) {
    return (
      <AdminDashboard 
        menuItems={menuItems}
        categories={categories}
        onUpdateItems={setMenuItems}
        onUpdateCategories={setCategories}
        onExit={() => {
          window.location.hash = ''; // This triggers hashchange -> handleRouting -> sets AdminMode false
        }}
      />
    );
  }

  const filteredItems = menuItems.filter(item => {
    if (item.isHidden) return false;
    if (selectedCategory === 'all') return true;
    return item.categoryIds.includes(selectedCategory);
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* Sticky Header Group */}
      <div className="sticky top-0 z-30 bg-gray-50/95 backdrop-blur shadow-sm border-b border-gray-200">
        
        {/* Top Header */}
        <header className="px-4 py-3 flex justify-between items-center max-w-2xl mx-auto w-full">
          <div className="flex items-center gap-2">
            <div>
              <h1 className="text-xl font-bold text-gray-800 tracking-tight leading-none">
                Na-Ta-Ya Online menu
              </h1>
            </div>
            {!isOrderingEnabled && (
               <span className="bg-blue-100 text-blue-700 text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider">
                 View Only
               </span>
            )}
            {isOrderingEnabled && (
               <span className="bg-green-100 text-green-700 text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider">
                 Table {tableNumber}
               </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <LanguageSelector currentLang={lang} onChange={setLang} />
            
            {isOrderingEnabled && (
              <button 
                className="relative p-2 bg-white rounded-full shadow-sm border border-gray-200 hover:bg-orange-50 transition-colors"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingBag size={22} className="text-gray-700" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-bounce-in">
                    {cart.length}
                  </span>
                )}
              </button>
            )}
          </div>
        </header>

        {/* Categories Bar */}
        <div className="px-4 pb-2 max-w-2xl mx-auto w-full overflow-x-auto no-scrollbar">
          <div className="flex space-x-2 py-1">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === 'all' 
                  ? 'bg-gray-900 text-white shadow-md' 
                  : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              {lang === 'th' ? 'ทั้งหมด' : 'All'}
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat.id 
                    ? 'bg-gray-900 text-white shadow-md' 
                    : 'bg-white text-gray-600 border border-gray-200'
                }`}
              >
                {cat.name[lang]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="p-4 pt-6 max-w-2xl mx-auto">
        {!isOrderingEnabled && (
          <div className="mb-6 bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start gap-3">
             <QrCode className="text-blue-600 shrink-0 mt-1" />
             <div>
               <h3 className="font-bold text-blue-900 text-sm">Welcome to Na-Ta-Ya</h3>
               <p className="text-blue-700 text-sm mt-1">{UI_LABELS.view_only[lang]}</p>
             </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          {filteredItems.map(item => (
            <div 
              key={item.id} 
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden active:scale-95 transition-transform duration-200 cursor-pointer"
              onClick={() => setSelectedDish(item)}
            >
              <div className="aspect-square relative bg-gray-100">
                <img 
                  src={item.image} 
                  alt={item.name[lang]} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {item.isSpicy && (
                  <span className="absolute top-2 right-2 bg-red-500/90 text-white text-[10px] px-2 py-1 rounded-full backdrop-blur-sm">
                    🌶
                  </span>
                )}
              </div>
              <div className="p-3">
                <h3 className={`font-bold text-gray-800 text-sm mb-1 line-clamp-2 min-h-[2.5em] ${lang === 'th' ? 'font-thai' : ''}`}>
                  {item.name[lang]}
                </h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-orange-600 font-bold">฿{item.price}</span>
                  {isOrderingEnabled ? (
                    <button className="bg-orange-100 text-orange-600 p-1.5 rounded-full hover:bg-orange-200">
                      <PlusIcon />
                    </button>
                  ) : (
                    <span className="text-gray-300">
                      <ShoppingBag size={16} />
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Admin Toggle Footer */}
      <footer className="fixed bottom-0 w-full p-4 flex justify-center pointer-events-none">
         <button 
           onClick={() => {
              window.location.hash = 'admin';
              // Hash change triggers handleRouting hook
           }}
           className="opacity-10 hover:opacity-100 pointer-events-auto transition-opacity text-gray-400"
         >
           <Lock size={16} />
         </button>
      </footer>

      {/* Modals */}
      <DishModal 
        isOpen={!!selectedDish}
        onClose={() => setSelectedDish(null)}
        dish={selectedDish}
        lang={lang}
        onAddToCart={addToCart}
        isOrderingEnabled={isOrderingEnabled}
      />

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        lang={lang}
        onRemove={removeFromCart}
        onCheckout={handleCheckout}
      />
      
      {isSendingOrder && (
        <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl flex flex-col items-center shadow-2xl">
            <Loader2 className="animate-spin text-orange-500 mb-4" size={32} />
            <p className="font-bold text-gray-700">Sending Order...</p>
          </div>
        </div>
      )}

    </div>
  );
}

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);