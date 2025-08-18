import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertTriangle, Info } from 'lucide-react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const idCounterRef = useRef(0);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(({ title, description, type = 'success', duration = 3000 } = {}) => {
    const id = ++idCounterRef.current;
    const toast = { id, title, description, type };
    setToasts((prev) => [toast, ...prev]);
    if (duration > 0) {
      setTimeout(() => removeToast(id), duration);
    }
    return id;
  }, [removeToast]);

  const value = useMemo(() => ({ showToast, removeToast }), [showToast, removeToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {/* Toast container */}
      <div className="fixed z-[1000] top-4 right-4 w-[92vw] max-w-sm sm:max-w-md sm:w-full space-y-2">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div key={t.id} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
              <div className="p-4 flex items-start gap-3">
                <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center ${
                  t.type === 'success' ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                  : t.type === 'error' ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                  : 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                }`}>
                  {t.type === 'success' ? <CheckCircle className="w-4 h-4" /> : t.type === 'error' ? <AlertTriangle className="w-4 h-4" /> : <Info className="w-4 h-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  {t.title && <div className="font-medium text-gray-900 dark:text-white">{t.title}</div>}
                  {t.description && <div className="text-sm text-gray-600 dark:text-gray-400 break-words">{t.description}</div>}
                </div>
                <button onClick={() => removeToast(t.id)} className="text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">✕</button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return ctx;
};


