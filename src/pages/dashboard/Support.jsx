import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, MessageCircle, Tag, Clock, CheckCircle, AlertTriangle, Paperclip, Send } from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';

const initialTickets = [
  {
    id: 'TCK-1001',
    subject: 'Website downtime issue',
    department: 'Technical',
    priority: 'High',
    status: 'Open',
    createdAt: '2025-08-10 09:30',
    lastUpdate: '2025-08-10 10:15'
  },
  {
    id: 'TCK-1002',
    subject: 'Invoice clarification',
    department: 'Billing',
    priority: 'Medium',
    status: 'Answered',
    createdAt: '2025-08-11 14:05',
    lastUpdate: '2025-08-11 15:20'
  },
  {
    id: 'TCK-1003',
    subject: 'Upgrade plan inquiry',
    department: 'Sales',
    priority: 'Low',
    status: 'Closed',
    createdAt: '2025-08-09 11:00',
    lastUpdate: '2025-08-09 12:10'
  }
];

const statusBadge = (status) => {
  const base = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
  switch (status) {
    case 'Open':
      return `${base} text-yellow-700 bg-yellow-100 dark:bg-yellow-900/20`;
    case 'Answered':
      return `${base} text-blue-700 bg-blue-100 dark:bg-blue-900/20`;
    case 'Closed':
      return `${base} text-green-700 bg-green-100 dark:bg-green-900/20`;
    default:
      return `${base} text-gray-600 bg-gray-100 dark:bg-gray-900/20`;
  }
};

export default function Support() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [tickets, setTickets] = useState(initialTickets);
  const [subject, setSubject] = useState('');
  const [department, setDepartment] = useState('Technical');
  const [priority, setPriority] = useState('Medium');
  const [message, setMessage] = useState('');
  const { showToast } = useToast();

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  const handleCreateTicket = (e) => {
    e.preventDefault();
    const newTicket = {
      id: `TCK-${Math.floor(1000 + Math.random()*9000)}`,
      subject,
      department,
      priority,
      status: 'Open',
      createdAt: new Date().toLocaleString(),
      lastUpdate: new Date().toLocaleString(),
    };
    setTickets([newTicket, ...tickets]);
    setSubject('');
    setDepartment('Technical');
    setPriority('Medium');
    setMessage('');
    showToast({ title: 'Ticket created', description: 'Your support ticket has been created.', type: 'success' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading support...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <DashboardSidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between flex-wrap">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Support Tickets</h1>
              <p className="text-gray-600 dark:text-gray-400">Create and manage your support tickets</p>
            </div>
          </div>
        </header>

        <main className="flex-1 min-w-0 p-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Create Ticket */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="card p-6 lg:col-span-1">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Create New Ticket</h2>
              <form onSubmit={handleCreateTicket} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                  <input value={subject} onChange={(e)=>setSubject(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Department</label>
                    <select value={department} onChange={(e)=>setDepartment(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                      <option>Technical</option>
                      <option>Billing</option>
                      <option>Sales</option>
                      <option>General</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Priority</label>
                    <select value={priority} onChange={(e)=>setPriority(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                  <textarea value={message} onChange={(e)=>setMessage(e.target.value)} rows={6} required className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
                </div>
                <button type="submit" className="btn-primary w-full sm:w-auto flex items-center justify-center">
                  <Send className="w-4 h-4 mr-2" /> Submit Ticket
                </button>
              </form>
            </motion.div>

            {/* Tickets List */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="card p-6 lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Your Tickets</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Ticket</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Department</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Priority</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Updated</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {tickets.map((t) => (
                      <tr key={t.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900 dark:text-white">{t.subject}</div>
                          <div className="text-sm text-gray-500">{t.id} • {t.createdAt}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{t.department}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{t.priority}</td>
                        <td className="px-6 py-4 whitespace-nowrap"><span className={statusBadge(t.status)}>{t.status}</span></td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{t.lastUpdate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
