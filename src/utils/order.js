import { storageGet, storageSet } from './storage';
import { formatDateTime } from './format';
import { getPaymentMethod } from '../payments/PaymentProvider';

// Order model + local mock persistence for Stage 1.
// Structure is backend-ready (backend can replace the storage layer).

export const ORDER_STATUSES = [
  'Order Created',
  'Payment Pending',
  'Payment Confirmed',
  'Processing',
  'Completed'
];

export function generateOrderId() {
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  const time = Date.now().toString().slice(-4);
  return `NAS-${time}${rand}`;
}

export function buildOrder({ product, game, playerInfo, email, quantity = 1, paymentMethod, unitPrice, discountAmount = 0, promo }) {
  const subTotal = unitPrice * quantity;
  const total = Math.max(0, subTotal - discountAmount);
  return {
    orderId: generateOrderId(),
    game: game.id,
    gameName: game.name,
    product: product ? { id: product.id, name: product.name, qtyLabel: product.qtyLabel, description: product.description } : null,
    playerInfo,
    email,
    quantity,
    paymentMethod,
    paymentMethodName: getPaymentMethod(paymentMethod)?.name || paymentMethod,
    subTotal,
    discount: discountAmount,
    total,
    promo: promo ? promo.code : null,
    currency: 'PKR',
    status: 'Order Created',
    createdAt: new Date().toISOString()
  };
}

export function saveOrder(order) {
  const orders = storageGet(KEY_ORDERS) || [];
  orders.unshift(order);
  storageSet(KEY_ORDERS, orders);
  return order;
}

export async function lookupOrder(orderId) {
  // Simulates a network/backend lookup with a short delay.
  await new Promise((r) => setTimeout(r, 900));
  const orders = storageGet(KEY_ORDERS) || [];
  const found = orders.find((o) => o.orderId.toLowerCase() === String(orderId || '').trim().toLowerCase());
  if (!found) return { ok: false };
  return { ok: true, order: { ...found, createdAtLabel: formatDateTime(found.createdAt) } };
}

export const getOrders = () => storageGet(KEY_ORDERS) || [];