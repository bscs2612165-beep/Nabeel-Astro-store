import { useState } from 'react';
import { FAQS } from '../data/faqs';
import { CONTACT } from '../config/site';
import { useToast } from '../context/ToastContext';
import { isValidEmail } from '../utils/format';

const CONTACTS = [
  { label: 'WhatsApp', value: CONTACT.whatsappDisplay, icon: '✆', type: 'link', href: CONTACT.whatsapp },
  { label: 'Facebook', value: CONTACT.facebookDisplay, icon: 'f', type: 'link', href: CONTACT.facebook },
  { label: 'Email', value: CONTACT.email, icon: '✉', type: 'link', href: `mailto:${CONTACT.email}` },
  { label: 'Phone', value: CONTACT.phone, icon: '☏', type: 'text' }
];

export default function Support() {
  const [open, setOpen] = useState(null);
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const send = (e) => {
    e.preventDefault();
    if (!isValidEmail(email) || message.trim().length < 3) {
      setError('Enter a valid email and a message.');
      return;
    }
    setError('');
    toast('Message received', 'A demo support request was captured. No backend is attached yet.', 'success');
    setName(''); setEmail(''); setMessage('');
  };

  return (
    <>
      <header className="page-head page-head--accent">
        <div className="container">
          <div className="sec-head__eyebrow">Help</div>
          <h1 className="page-head__title">Customer Support</h1>
          <p className="page-head__desc">Contact details are configurable placeholders. Hours: {CONTACT.support.hours}</p>
        </div>
      </header>

      <section className="section" style={{ paddingTop: 24 }}>
        <div className="container">
          <div id="contact" className="support-grid">
            {CONTACTS.map((c) => (
              <div className="contact-card" key={c.label}>
                <span className="contact-card__icon" aria-hidden="true">{c.icon}</span>
                <div>
                  <div className="contact-card__label">{c.label}</div>
                  {c.type === 'link' ? (
                    <a className="contact-card__value" href={c.href} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>{c.value}</a>
                  ) : (
                    <div className="contact-card__value">{c.value}</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid--2 mt-24">
            <div className="panel">
              <div className="panel__title">Contact support</div>
              <p className="panel__sub">{CONTACT.support.response}</p>
              <form onSubmit={send} noValidate>
                <div className="form-grid">
                  <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
                  <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" type="email" />
                  <textarea className="textarea" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="How can we help?" />
                  {error && <span className="field__error">{error}</span>}
                  <button type="submit" className="btn btn--primary btn--block">Send message</button>
                </div>
              </form>
            </div>

            <div className="panel">
              <div className="panel__title">Support hours</div>
              <div className="os__kv"><div className="os__k">Availability</div><div className="os__v">{CONTACT.support.hours}</div></div>
              <div className="os__kv"><div className="os__k">Response time</div><div className="os__v">{CONTACT.support.response}</div></div>
              <p className="field__hint mt-16">Attachments, billing questions and order issues are best sent through these channels.</p>
            </div>
          </div>

          <div className="mt-24" id="faq">
            <div className="sec-head"><div className="sec-head__eyebrow">FAQs</div><h2 className="sec-head__title">Frequently asked questions</h2></div>
            <div className="stack">
              {FAQS.map((f, i) => (
                <div className={`faq-item${open === i ? ' open' : ''}`} key={i}>
                  <button type="button" className="faq-item__q" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
                    {f.q} <span className="chevron" aria-hidden="true">⌄</span>
                  </button>
                  {open === i && <div className="faq-item__a">{f.a}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}