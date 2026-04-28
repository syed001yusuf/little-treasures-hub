import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { buildOrderMessage } from '@/lib/whatsapp';
import { Button } from '@/components/ui/button';

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, totalItems, totalPrice } = useCart();

  useEffect(() => {
    document.title = items.length === 0
      ? 'Cart | Select Baby World'
      : `Cart (${totalItems}) | Select Baby World`;
  }, [items.length, totalItems]);

  if (items.length === 0) {
    return (
      <div className="container py-20 text-center">
        <span className="text-7xl">🛒</span>
        <h2 className="font-heading text-2xl font-bold mt-4">Your cart is empty</h2>
        <p className="text-muted-foreground mt-2">Add some products to get started!</p>
        <Button asChild className="mt-6 rounded-xl"><Link to="/products">Start Shopping →</Link></Button>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="font-heading text-3xl font-bold mb-6">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
        {/* Items */}
        <div className="lg:col-span-3 space-y-4">
          {items.map(item => (
            <div key={item.id} className="flex items-center gap-3 sm:gap-4 bg-card rounded-2xl border p-3 sm:p-4">
              <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-xl bg-muted flex items-center justify-center shrink-0 overflow-hidden">
                {item.image_url ? <img src={item.image_url} alt={item.name} className="w-full h-full object-contain p-2" /> : <span className="text-3xl">🧸</span>}
              </div>
              <div className="flex-1 min-w-0">
                <Link to={`/products/${item.id}`} className="font-heading font-semibold text-sm hover:text-primary transition-colors line-clamp-1">{item.name}</Link>
                <p className="text-xs text-muted-foreground">{item.unit}</p>
                <p className="text-primary font-bold mt-1">₹{item.price.toLocaleString('en-IN')}</p>
              </div>
              <div className="flex items-center border rounded-xl">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 hover:bg-muted"><Minus className="h-3 w-3" /></button>
                <span className="px-3 py-1 text-sm font-medium">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 hover:bg-muted"><Plus className="h-3 w-3" /></button>
              </div>
              <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive p-2"><Trash2 className="h-4 w-4" /></button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-2">
          <div className="bg-card rounded-2xl border p-6 sticky top-20 space-y-4">
            <h3 className="font-heading text-lg font-bold">Order Summary</h3>
            <div className="flex justify-between text-sm"><span>Items</span><span>{totalItems}</span></div>
            <div className="flex justify-between font-bold text-lg"><span>Subtotal</span><span className="text-primary">₹{totalPrice.toLocaleString('en-IN')}</span></div>
            <p className="text-xs text-muted-foreground">Final price confirmed by store on WhatsApp</p>
            <Button
              asChild
              className="w-full rounded-xl text-base"
              size="lg"
              style={{ backgroundColor: '#25D366' }}
            >
              <a href={buildOrderMessage(items, totalPrice)} target="_blank" rel="noopener noreferrer">
                Place Order via WhatsApp
              </a>
            </Button>
            <Link to="/products" className="block text-center text-sm text-primary hover:underline">Continue Shopping</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
