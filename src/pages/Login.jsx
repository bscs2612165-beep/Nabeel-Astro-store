import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { useToast } from '../context/ToastContext';
import { isValidEmail } from '../utils/format';

export default function Login() {
  const { user, login } = useStore();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const mode = params.get('mode') === 'signup' ? 'signup' : 'login';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!isValidEmail(email)) errs.email = 'Enter a valid email or username.';
    if (password.length < 4) errs.password = 'Password must be at least 4 characters.';
    setErrors(errs);
    if (Object.keys(errs).length) { toast('Check your details', 'Some fields need attention.', 'error'); return; }

    login(email.trim());
    toast('Welcome back', 'This is a demo — no real authentication.', 'success');
    navigate('/account');
  };

  if (user) {
    return (
      <div className="section"><div className="container auth">
        <div className="panel">
          <h2 className="panel__title">Already signed in</h2>
          <p className="panel__sub">You can head to the dashboard or log out.</p>
          <div className="row"><button type="button" className="btn btn--primary grow" onClick={() => navigate('/account')}>Go to dashboard</button></div>
        </div>
      </div></div>
    );
  }

  return (
    <div className="section"><div className="container">
      <div className="auth">
        <div className="auth__title">{mode === 'login' ? 'Welcome back' : 'Create account'}</div>
        <p className="auth__sub">{mode === 'login' ? 'Log in to your Nabeel Astro Store account.' : 'Set up your account dashboard.'}</p>

        <div className="panel">
          <form onSubmit={submit} noValidate>
            <div className="form-grid">
              <div className="field">
                <label className="field__label" htmlFor="email">Email / username</label>
                <input id="email" className={`input${errors.email ? ' invalid' : ''}`} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" />
                {errors.email && <span className="field__error">{errors.email}</span>}
              </div>
              <div className="field">
                <label className="field__label" htmlFor="password">Password</label>
                <input id="password" type="password" className={`input${errors.password ? ' invalid' : ''}`} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" autoComplete="current-password" />
                {errors.password && <span className="field__error">{errors.password}</span>}
              </div>
              <button type="submit" className="btn btn--primary btn--lg btn--block">
                {mode === 'login' ? 'Login' : 'Create account'}
              </button>
            </div>
          </form>

          <div className="auth__alt">
            {mode === 'login' ? (
              <>
                <a href="#" onClick={(e) => { e.preventDefault(); toast('Reset link', 'A demo reset link would be sent.', 'info'); }}>Forgot password?</a>
                &nbsp;·&nbsp;
                <a href="#signup" onClick={(e) => { e.preventDefault(); navigate('/login?mode=signup'); }}>Create account</a>
              </>
            ) : (
              <a href="#login" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>Already have an account? Log in</a>
            )}
          </div>
        </div>
        <p className="auth__note">Demo login only — no real authentication is used in this build.</p>
      </div>
    </div></div>
  );
}