
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { FilePdf, Printer, Send } from 'lucide-react';

type InvoiceGeneratorProps = {
  onClose: () => void;
  requestId?: number;
  requestType: 'service' | 'car' | 'test-drive';
};

const InvoiceGenerator = ({ onClose, requestId = 0, requestType }: InvoiceGeneratorProps) => {
  const [invoiceData, setInvoiceData] = useState({
    customerName: '',
    customerEmail: '',
    items: [{ description: '', quantity: 1, price: 0 }],
    notes: '',
    paymentMethod: 'credit-card',
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  // Calculate totals
  const subtotal = invoiceData.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  const tax = subtotal * 0.0875; // 8.75% tax rate
  const total = subtotal + tax;

  const handleItemChange = (index: number, field: string, value: string | number) => {
    const newItems = [...invoiceData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setInvoiceData({ ...invoiceData, items: newItems });
  };

  const addItem = () => {
    setInvoiceData({
      ...invoiceData,
      items: [...invoiceData.items, { description: '', quantity: 1, price: 0 }]
    });
  };

  const removeItem = (index: number) => {
    const newItems = [...invoiceData.items];
    newItems.splice(index, 1);
    setInvoiceData({ ...invoiceData, items: newItems });
  };

  const generateInvoice = () => {
    setIsGenerating(true);
    
    // Simulate invoice generation
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "Invoice Generated",
        description: `Invoice for ${requestType} request #${requestId} has been generated.`,
      });
      onClose();
    }, 1500);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Generate Invoice</CardTitle>
        <CardDescription>
          Create an invoice for {requestType.replace('-', ' ')} request #{requestId}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="customerName">Customer Name</Label>
            <Input 
              id="customerName" 
              value={invoiceData.customerName}
              onChange={(e) => setInvoiceData({ ...invoiceData, customerName: e.target.value })}
              placeholder="Enter customer name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="customerEmail">Customer Email</Label>
            <Input 
              id="customerEmail" 
              value={invoiceData.customerEmail}
              onChange={(e) => setInvoiceData({ ...invoiceData, customerEmail: e.target.value })}
              type="email"
              placeholder="Enter customer email"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Invoice Items</h3>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={addItem}
            >
              Add Item
            </Button>
          </div>
          
          <div className="space-y-4">
            {invoiceData.items.map((item, index) => (
              <div key={index} className="grid grid-cols-12 gap-2 items-end">
                <div className="col-span-6">
                  <Label htmlFor={`item-${index}-desc`} className="text-xs">Description</Label>
                  <Input 
                    id={`item-${index}-desc`} 
                    value={item.description}
                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                    placeholder="Item description"
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor={`item-${index}-qty`} className="text-xs">Qty</Label>
                  <Input 
                    id={`item-${index}-qty`} 
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
                  />
                </div>
                <div className="col-span-3">
                  <Label htmlFor={`item-${index}-price`} className="text-xs">Price</Label>
                  <Input 
                    id={`item-${index}-price`} 
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.price}
                    onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value))}
                    placeholder="0.00"
                  />
                </div>
                <div className="col-span-1">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => removeItem(index)}
                    disabled={invoiceData.items.length === 1}
                    className="h-10"
                  >
                    ×
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="notes">Notes</Label>
            <Input 
              id="notes" 
              value={invoiceData.notes}
              onChange={(e) => setInvoiceData({ ...invoiceData, notes: e.target.value })}
              placeholder="Additional notes or payment instructions"
            />
          </div>
          
          <div>
            <Label htmlFor="paymentMethod">Payment Method</Label>
            <Select 
              value={invoiceData.paymentMethod}
              onValueChange={(value) => setInvoiceData({ ...invoiceData, paymentMethod: value })}
            >
              <SelectTrigger id="paymentMethod">
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="credit-card">Credit Card</SelectItem>
                <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                <SelectItem value="paypal">PayPal</SelectItem>
                <SelectItem value="check">Check</SelectItem>
                <SelectItem value="cash">Cash</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tax (8.75%):</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-medium">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline">
            <Send className="mr-2 h-4 w-4" />
            Email
          </Button>
          <Button onClick={generateInvoice} disabled={isGenerating}>
            <FilePdf className="mr-2 h-4 w-4" />
            {isGenerating ? "Generating..." : "Generate PDF"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default InvoiceGenerator;
