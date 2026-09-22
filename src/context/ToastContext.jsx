import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';

const ToastContext = React.createContext(null);

let toastIdCounter = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef({});

  const dismiss = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id));
    clearTimeout(timers.current[id]);
    delete timers.current[id];
  }, []);

  const push = useCallback(({ type = 'info', title, message }) => {
    const id = ++toastIdCounter;
    setToasts((t) => [...t, { id, type, title, message }]);
    timers.current[id] = setTimeout(() => dismiss(id), 4600);
  }, [dismiss]);

  const clone = { toast: useCallback((title, message, type = 'info') => push({ type, title, message }), [push]), dismiss };

  useEffect(() => () => Object.values(timers.current).forEach(clearTimeout), []);

  return (
    <ToastContext.Provider value={clone}>
      {children}
      <div className="toast-region" aria-live="polite" role="status">
        {toasts.map((t) => (
          <div key={t.id} className={`toast toast--${t.type}`} onClick={() => dismiss(t.id)} role="alert">
            <div className="toast__icon" aria-hidden="true">
              {t.type === 'success' ? '✓' : t.type === 'error' ? '!' : t.type === 'pending' ? '•••' : 'ℹ'}
            </div>
            <div className="toast__body">
              <div className="toast__title">{t.title}</div>
              {t.message && <div className="toast__message">{t.message}</div>}
            </div>
            <button type="button" className="toast__close" aria-label="Dismiss" onClick={(e) => { e.stopPropagation(); dismiss(t.id); }}>
              ×
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}