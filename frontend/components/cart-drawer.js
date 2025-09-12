import { useCart } from "@/hooks/use-cart"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CartDrawer({ onClose }) {
  const { cart, removeFromCart, clearCart, updateQuantity, totalItems, totalPrice } = useCart()

  return (
    <div className="fixed top-0 right-0 w-full max-w-md h-full bg-white shadow-lg z-50 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-xl font-bold">Your Cart</h2>
        <Button variant="ghost" onClick={onClose}>Close</Button>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {cart.length === 0 ? (
          <div className="text-center text-muted-foreground">Your cart is empty.</div>
        ) : (
          cart.map((item) => (
            <Card key={item.id} className="mb-4">
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-primary">{item.price}</span>
                    <Button size="sm" variant="outline" onClick={() => removeFromCart(item.id)}>
                      Remove
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Qty:</span>
                    <input
                      type="number"
                      min={1}
                      className="border rounded px-2 py-1 w-20"
                      value={item.quantity || 1}
                      onChange={(e)=>updateQuantity(item.id, Number(e.target.value))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
      <div className="p-4 border-t flex justify-between items-center">
        <div className="text-sm">
          <div>Total Items: <span className="font-medium">{totalItems}</span></div>
          <div>Total: <span className="font-semibold">₹{Math.round(totalPrice).toLocaleString('en-IN')}</span></div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={clearCart} disabled={cart.length === 0}>Clear Cart</Button>
          <Button disabled={cart.length === 0}>Checkout</Button>
        </div>
      </div>
    </div>
  )
}
