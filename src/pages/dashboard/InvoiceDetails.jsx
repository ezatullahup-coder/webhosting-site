import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, ArrowLeft, CreditCard, Download, Printer, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import { useState, useEffect } from 'react';

const MOCK_INVOICES = [
  {
    id: 'INV-2025-001',
    service: 'Basic Hosting',
    date: '2025-08-13',
    dueDate: '2025-08-27',
    status: 'Paid',
    paymentMethod: 'Credit Card',
    paidDate: '2025-08-13',
    items: [
      { description: 'Basic Hosting - 1 Year', quantity: 1, unitPrice: 49.99 },
    ],
    notes: 'Thank you for your business.'
  },
  {
    id: 'INV-2025-002',
    service: 'Professional Hosting',
    date: '2025-08-15',
    dueDate: '2025-09-15',
    status: 'Unpaid',
    paymentMethod: null,
    paidDate: null,
    items: [
      { description: 'Professional Hosting - 1 Year', quantity: 1, unitPrice: 99.99 },
      { description: 'Daily Backups Add-on', quantity: 1, unitPrice: 9.99 },
    ],
    notes: 'Please make payment before the due date to avoid service interruption.'
  },
];

const statusBadge = (status) => {
  const base = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
  switch (status) {
    case 'Paid':
      return `${base} text-green-600 bg-green-100 dark:bg-green-900/20`;
    case 'Unpaid':
      return `${base} text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20`;
    case 'Overdue':
      return `${base} text-red-600 bg-red-100 dark:bg-red-900/20`;
    case 'Pending':
      return `${base} text-blue-600 bg-blue-100 dark:bg-blue-900/20`;
    default:
      return `${base} text-gray-600 bg-gray-100 dark:bg-gray-900/20`;
  }
};

const statusIcon = (status) => {
  switch (status) {
    case 'Paid':
      return <CheckCircle className="w-4 h-4"/>;
    case 'Overdue':
      return <AlertTriangle className="w-4 h-4"/>;
    default:
      return <Clock className="w-4 h-4"/>;
  }
};

export default function InvoiceDetails() {
  const { id } = useParams();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  const invoice = useMemo(() => MOCK_INVOICES.find(inv => inv.id === id) || MOCK_INVOICES[0], [id]);

  const subtotal = invoice.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const tax = Math.round(subtotal * 0.1 * 100) / 100; // 10% tax mock
  const total = Math.round((subtotal + tax) * 100) / 100;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading invoice...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <DashboardSidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center space-x-3">
              <Link to="/dashboard/invoices" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Invoice {invoice.id}</h1>
                <p className="text-gray-600 dark:text-gray-400">For {invoice.service}</p>
              </div>
            </div>
            <span className={statusBadge(invoice.status)}>
              {statusIcon(invoice.status)}
              <span className="ml-1">{invoice.status}</span>
            </span>
          </div>
        </header>

        <main className="flex-1 min-w-0 p-6">
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Invoice Summary */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="card p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Invoice Date</div>
                    <div className="font-medium text-gray-900 dark:text-white">{new Date(invoice.date).toDateString()}</div>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Due Date</div>
                  <div className="font-medium text-gray-900 dark:text-white">{new Date(invoice.dueDate).toDateString()}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Payment Method</div>
                  <div className="font-medium text-gray-900 dark:text-white">{invoice.paymentMethod || '—'}</div>
                </div>
              </div>
            </motion.div>

            {/* Line Items */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Qty</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Unit Price</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {invoice.items.map((item, idx) => {
                      const amount = Math.round(item.quantity * item.unitPrice * 100) / 100;
                      return (
                        <tr key={idx}>
                          <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{item.description}</td>
                          <td className="px-6 py-4 text-sm text-right text-gray-700 dark:text-gray-300">{item.quantity}</td>
                          <td className="px-6 py-4 text-sm text-right text-gray-700 dark:text-gray-300">${item.unitPrice.toFixed(2)}</td>
                          <td className="px-6 py-4 text-sm text-right font-medium text-gray-900 dark:text-white">${amount.toFixed(2)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between p-6 gap-6">
                <div className="max-w-md">
                  <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">Notes</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{invoice.notes}</p>
                </div>
                <div className="w-full md:w-80">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                      <span className="font-medium text-gray-900 dark:text-white">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Tax (10%)</span>
                      <span className="font-medium text-gray-900 dark:text-white">${tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                    <div className="flex items-center justify-between text-base">
                      <span className="font-semibold text-gray-900 dark:text-white">Total</span>
                      <span className="font-bold text-gray-900 dark:text-white">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }} className="card p-6">
              <div className="flex flex-col sm:flex-row gap-3 justify-between">
                <div className="flex gap-3">
                  <button onClick={() => showToast({ title: 'Download', description: `${invoice.id} PDF (mock)`, type: 'success' })} className="btn-outline flex items-center">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </button>
                  <button onClick={() => showToast({ title: 'Print', description: `${invoice.id} (mock)`, type: 'info' })} className="btn-secondary flex items-center">
                    <Printer className="w-4 h-4 mr-2" />
                    Print
                  </button>
                </div>
                {invoice.status !== 'Paid' && (
                  <button onClick={() => showToast({ title: 'Pay Now', description: `${invoice.id} (mock)`, type: 'info' })} className="btn-primary flex items-center">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Pay Now
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
