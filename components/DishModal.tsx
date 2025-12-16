import React from 'react';
import { MenuItem, LanguageCode } from '../types';
import { UI_LABELS } from '../constants';
import { X, Flame, ShoppingBag } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  dish: MenuItem | null;
  lang: LanguageCode;
  onAddToCart: (item: MenuItem, qty: number, notes: string) => void;
  isOrderingEnabled: boolean;
}

export const DishModal: React.FC<Props> = ({ isOpen, onClose, dish, lang, onAddToCart, isOrderingEnabled }) => {
  const [quantity, setQuantity] = React.useState(1);
  const [notes, setNotes] = React.useState('');

  React.useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      setNotes('');
    }
  }, [isOpen]);

  if (!isOpen || !dish) return null;

  const handleAdd = () => {
    onAddToCart(dish, quantity, notes);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur transition-colors"
        >
          <X size={20} />
        </button>

        {/* Image */}
        <div className="h-64 w-full bg-gray-200 relative shrink-0">
          <img 
            src={dish.image} 
            alt={dish.name[lang]} 
            className="w-full h-full object-cover"
          />
          {dish.isSpicy && (
            <div className="absolute bottom-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
              <Flame size={14} /> {UI_LABELS.spicy[lang]}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          <div className="flex justify-between items-start mb-2">
            <h2 className={`text-2xl font-bold text-gray-800 ${lang === 'th' ? 'font-thai' : ''}`}>
              {dish.name[lang]}
            </h2>
            <span className="text-xl font-bold text-orange-600 whitespace-nowrap">
              ฿{dish.price}
            </span>
          </div>

          <p className="text-gray-600 mb-6 leading-relaxed">
            {dish.description[lang]}
          </p>

          {isOrderingEnabled ? (
            <div className="space-y-4">
              {/* Notes */}
              <div>
                <label className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1 block">
                  Notes (Optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="No spicy, extra lime..."
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-orange-500 outline-none resize-none"
                  rows={2}
                />
              </div>

              {/* Quantity */}
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl">
                <span className="font-medium text-gray-700">Quantity</span>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center text-gray-600 hover:border-orange-500 hover:text-orange-500 transition-colors"
                  >
                    -
                  </button>
                  <span className="text-lg font-bold w-6 text-center">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center text-gray-600 hover:border-orange-500 hover:text-orange-500 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ) : (
             <div className="bg-blue-50 text-blue-800 text-sm p-4 rounded-xl text-center">
                Scan QR code at your table to order this item.
             </div>
          )}
        </div>

        {/* Footer */}
        {isOrderingEnabled && (
          <div className="p-4 border-t border-gray-100 bg-white">
            <button
              onClick={handleAdd}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-orange-200 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <ShoppingBag size={20} />
              {UI_LABELS.add[lang]} - ฿{dish.price * quantity}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};