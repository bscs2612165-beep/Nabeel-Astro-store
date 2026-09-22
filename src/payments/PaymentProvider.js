// ============================================================
// PAYMENT ARCHITECTURE (checkout-ready, integration-pending)
// ============================================================
// This storefront is a browser-only SPA today. Payments are NOT
// processed in the browser, and the UI NEVER claims a payment was
// successful on its own. An order is always created as
// "Order Created" -> "Payment Pending" and only the owner marks it
// "Payment Confirmed" after verifying the actual payment.
//
// SECURITY RULE:
//   Never place secret keys / merchant passwords / private tokens
//   in public HTML/CSS/JS. Every secret below must live ONLY in
//   backend/server-side environment variables (see .env.example).
//   The browser never sees a secret — it only sees a public key
//   (e.g. STRIPE_PUBLISHABLE_KEY) at most.
//
// INTEGRATION PATH:
//   Each method lists `requires` — the exact credentials a real
//   gateway needs. When a backend is added, wire `createPayment`
//   to call your server endpoint (server talks to the gateway with
//   the secrets), then confirm the order only after the gateway's
//   callback/webhook verifies the payment.
// ============================================================

// mode:
//   'manual'  -> offline flow: customer pays directly (wallet/bank) and the
//                owner verifies manually. No gateway credentials exist yet.
//   'gateway' -> online flow: hosted payment page via a real gateway once a
//                backend is connected. Currently returns a pending state.
const METHODS = [
  // ---------- Pakistan ----------
  {
    id: 'easypaisa',
    name: 'EasyPaisa',
    region: 'Pakistan',
    status: 'Manual',
    note: 'Mobile wallet & bank transfer',
    tag: 'Wallet',
    mode: 'manual',
    isMock: true,
    integrationReady: false,
    requires: [
      { key: 'EASYPAISA_MERCHANT_ID', label: 'EasyPaisa Merchant ID', secret: false },
      { key: 'EASYPAISA_API_USERNAME', label: 'EasyPaisa API username', secret: false },
      { key: 'EASYPAISA_API_PASSWORD', label: 'EasyPaisa API password', secret: true },
      { key: 'EASYPAISA_CALLBACK_URL', label: 'Payment callback URL (server route)', secret: false },
      { key: 'EASYPAISA_WEBHOOK_SECRET', label: 'IPN/webhook signing secret', secret: true }
    ]
  },
  {
    id: 'jazzcash',
    name: 'JazzCash',
    region: 'Pakistan',
    status: 'Manual',
    note: 'Mobile wallet & bank transfer',
    tag: 'Wallet',
    mode: 'manual',
    isMock: true,
    integrationReady: false,
    requires: [
      { key: 'JAZZCASH_MERCHANT_ID', label: 'JazzCash Merchant ID', secret: false },
      { key: 'JAZZCASH_SALT', label: 'JazzCash Secure Hash / Salt key', secret: true },
      { key: 'JAZZCASH_API_USERNAME', label: 'JazzCash API username', secret: false },
      { key: 'JAZZCASH_API_PASSWORD', label: 'JazzCash API password', secret: true },
      { key: 'JAZZCASH_CALLBACK_URL', label: 'Payment callback URL (server route)', secret: false },
      { key: 'JAZZCASH_WEBHOOK_SECRET', label: 'IPN/webhook signing secret', secret: true }
    ]
  },
  // ---------- Philippines ----------
  {
    id: 'gcash',
    name: 'GCash',
    region: 'Philippines',
    status: 'Manual',
    note: 'Mobile wallet',
    tag: 'Wallet',
    mode: 'manual',
    isMock: true,
    integrationReady: false,
    requires: [
      { key: 'GCASH_MERCHANT_ID', label: 'GCash merchant / aggregator ID', secret: false },
      { key: 'GCASH_API_SECRET', label: 'GCash API secret key', secret: true },
      { key: 'GCASH_CALLBACK_URL', label: 'Payment callback URL (server route)', secret: false },
      { key: 'GCASH_WEBHOOK_SECRET', label: 'Webhook signing secret', secret: true }
    ]
  },
  {
    id: 'maya',
    name: 'Maya',
    region: 'Philippines',
    status: 'Manual',
    note: 'Mobile wallet',
    tag: 'Wallet',
    mode: 'manual',
    isMock: true,
    integrationReady: false,
    requires: [
      { key: 'MAYA_MERCHANT_ID', label: 'Maya merchant ID', secret: false },
      { key: 'MAYA_API_SECRET', label: 'Maya API secret key', secret: true },
      { key: 'MAYA_CALLBACK_URL', label: 'Payment callback URL (server route)', secret: false },
      { key: 'MAYA_WEBHOOK_SECRET', label: 'Webhook signing secret', secret: true }
    ]
  },
  {
    id: 'gotyme',
    name: 'GoTyme',
    region: 'Philippines',
    status: 'Manual',
    note: 'Digital bank',
    tag: 'Bank',
    mode: 'manual',
    isMock: true,
    integrationReady: false,
    requires: [
      { key: 'GOTYME_MERCHANT_ID', label: 'GoTyme merchant / aggregator ID', secret: false },
      { key: 'GOTYME_API_SECRET', label: 'GoTyme API secret key', secret: true },
      { key: 'GOTYME_CALLBACK_URL', label: 'Payment callback URL (server route)', secret: false },
      { key: 'GOTYME_WEBHOOK_SECRET', label: 'Webhook signing secret', secret: true }
    ]
  },
  {
    id: 'qrph',
    name: 'QR Ph',
    region: 'Philippines',
    status: 'Manual',
    note: 'National QR code',
    tag: 'QR',
    mode: 'manual',
    isMock: true,
    integrationReady: false,
    requires: [
      { key: 'QRPH_MERCHANT_ID', label: 'QR Ph / InstaPay merchant ID', secret: false },
      { key: 'QRPH_API_SECRET', label: 'QR Ph API secret key', secret: true },
      { key: 'QRPH_CALLBACK_URL', label: 'Payment callback URL (server route)', secret: false },
      { key: 'QRPH_WEBHOOK_SECRET', label: 'Webhook signing secret', secret: true }
    ]
  },
  // ---------- International ----------
  {
    id: 'stripe',
    name: 'Stripe',
    region: 'International',
    status: 'Online',
    note: 'Cards & wallets worldwide',
    tag: 'Card',
    mode: 'gateway',
    isMock: true,
    integrationReady: false,
    // Only the publishable key is ever safe to expose client-side.
    requires: [
      { key: 'STRIPE_PUBLISHABLE_KEY', label: 'Stripe publishable key (public — safe in frontend)', secret: false },
      { key: 'STRIPE_SECRET_KEY', label: 'Stripe secret key (server only)', secret: true },
      { key: 'STRIPE_WEBHOOK_SECRET', label: 'Stripe webhook signing secret (server only)', secret: true },
      { key: 'STRIPE_SUCCESS_URL', label: 'Success return URL', secret: false },
      { key: 'STRIPE_CANCEL_URL', label: 'Cancel return URL', secret: false }
    ]
  }
];

export const PAYMENT_METHODS = METHODS;

export const getPaymentMethod = (id) => METHODS.find((m) => m.id === id);

export const getPaymentRequirements = (id) => getPaymentMethod(id)?.requires || [];

// Methods grouped by region, in display order.
export function groupPaymentMethods() {
  const order = ['Pakistan', 'International', 'Philippines'];
  const groups = {};
  METHODS.forEach((m) => {
    const key = m.region || 'Other';
    (groups[key] = groups[key] || []).push(m);
  });
  return order.filter((r) => groups[r]).map((r) => ({ region: r, methods: groups[r] }));
}

// Stable payment provider interface — every provider exposes the same contract
// so a real backend can be swapped in later without a redesign.
class BaseProvider {
  getLabel() { throw new Error('Not implemented'); }

  // Creates a payment "intent". Until a backend exists this simulates the
  // hand-off and ALWAYS returns a pending state — it never marks anything paid.
  async createPayment({ orderId, amount, currency }) {
    await new Promise((r) => setTimeout(r, 500));
    return {
      ok: true,
      provider: this.getLabel(),
      orderId,
      amount,
      currency,
      requiresAction: true,
      status: 'pending',
      // Real gateways would return a hosted checkout URL / redirect here.
      checkoutUrl: null
    };
  }

  // Verifies a payment. Always returns 'pending' until the gateway's webhook
  // or the owner confirms it. Never fabricates a confirmation.
  async verifyPayment(payload) {
    await new Promise((r) => setTimeout(r, 400));
    return { status: 'pending', ref: payload.ref || null };
  }
}

class EasyPaisaProvider extends BaseProvider {
  getLabel() { return 'EasyPaisa'; }
}

class JazzCashProvider extends BaseProvider {
  getLabel() { return 'JazzCash'; }
}

class GcashProvider extends BaseProvider {
  getLabel() { return 'GCash'; }
}

class MayaProvider extends BaseProvider {
  getLabel() { return 'Maya'; }
}

class GoTymeProvider extends BaseProvider {
  getLabel() { return 'GoTyme'; }
}

class QrPhProvider extends BaseProvider {
  getLabel() { return 'QR Ph'; }
}

class StripeProvider extends BaseProvider {
  getLabel() { return 'Stripe'; }
}

export const paymentProviders = {
  easypaisa: new EasyPaisaProvider(),
  jazzcash: new JazzCashProvider(),
  gcash: new GcashProvider(),
  maya: new MayaProvider(),
  gotyme: new GoTymeProvider(),
  qrph: new QrPhProvider(),
  stripe: new StripeProvider()
};

export function createPaymentIntent(providerId, payload) {
  const provider = paymentProviders[providerId] || paymentProviders.easypaisa;
  return provider.createPayment(payload);
}