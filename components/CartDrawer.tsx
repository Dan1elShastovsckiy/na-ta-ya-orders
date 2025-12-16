import React from 'react';
import { CartItem, LanguageCode } from '../types';
import { UI_LABELS } from '../constants';
import { X, Trash2, Send, ShoppingBag } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  lang: LanguageCode;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<Props> = ({ isOpen, onClose, cart, lang, onRemove, onCheckout }) => {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={`fixed inset-y-0 right-0 max-w-sm w-full bg-white z-50 shadow-2xl transform transition-transform duration-300 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center bg-gray-50">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            {UI_LABELS.cart[lang]}
            <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full">
              {cart.length}
            </span>
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <ShoppingBag size={48} className="mb-4 opacity-20" />
              <p>Your cart is empty</p>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="flex gap-3 bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                <img src={item.image} alt="" className="w-16 h-16 rounded-md object-cover bg-gray-100" />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className={`font-semibold text-gray-800 line-clamp-2 ${lang === 'th' ? 'font-thai' : ''}`}>
                      {item.name[lang]}
                    </h3>
                    <button onClick={() => onRemove(item.id)} className="text-gray-400 hover:text-red-500">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                     ฿{item.price} x {item.quantity}
                  </div>
                  {item.notes && (
                    <p className="text-xs text-orange-600 mt-1 bg-orange-50 p-1 rounded">
                      "{item.notes}"
                    </p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-4 border-t bg-gray-50 space-y-4">
            <div className="flex justify-between items-center text-lg font-bold text-gray-900">
              <span>{UI_LABELS.total[lang]}</span>
              <span>฿{total}</span>
            </div>
            <button 
              onClick={onCheckout}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-green-200 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Send size={20} />
              {UI_LABELS.checkout[lang]}
            </button>
          </div>
        )}
      </div>
    </>
  );
};