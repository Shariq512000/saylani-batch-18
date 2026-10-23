import { useContext, useState } from 'react';
import { apiRequest } from '../api';
import { GlobalContext } from '../context/Context';
import api from '../component/api';

function AuthPage() {
    let { state, dispatch } = useContext(GlobalContext);
    const [mode, setMode] = useState('login');
    const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [notice, setNotice] = useState('');
    const [busy, setBusy] = useState(false);

    function changeMode(nextMode) {
        setMode(nextMode);
        setError('');
        setNotice('');
    }

    async function submit(event) {
        event.preventDefault();
        setError('');
        setNotice('');
        setBusy(true);
        try {
            if (mode === 'signup') {
                const result = await api.post('/api/v1/signup', form);
                setNotice(result.message || 'Your account is ready. Sign in to continue.');
                setMode('login');
            } else {
                const apiRes = await api.post(`/login`,
                    { "email": form.email, "password": form.password, });
                dispatch({ type: "USER_LOGIN", user: apiRes.data.user });
            }
        } catch (requestError) {
            setError(requestError.message);
        } finally {
            setBusy(false);
        }
    }

    return (
        <main className="auth-page">
            <section className="auth-aside" aria-label="Chat welcome">
                <div className="brand-lockup"><span className="brand-mark">c</span><span>closer</span></div>
                <div className="aside-copy">
                    <span className="eyebrow">YOUR PEOPLE, RIGHT HERE</span>
                    <h1>Good conversations<br />start close.</h1>
                    <p>A little space for the people you want to hear from.</p>
                </div>
                <div className="aside-note"><span className="note-dot" /> Just you and your people</div>
                <div className="orbit orbit-one" /><div className="orbit orbit-two" />
            </section>

            <section className="auth-main">
                <div className="auth-mobile-brand"><span className="brand-mark">c</span><span>closer</span></div>
                <div className="auth-box">
                    <div className="auth-heading">
                        <span className="eyebrow">{mode === 'login' ? 'WELCOME BACK' : 'A FRESH START'}</span>
                        <h2>{mode === 'login' ? 'Sign in' : 'Create your account'}</h2>
                        <p>{mode === 'login' ? 'Pick up where your conversations left off.' : 'Make an account and find your people.'}</p>
                    </div>

                    <div className="auth-tabs" role="tablist" aria-label="Account access">
                        <button type="button" role="tab" aria-selected={mode === 'login'} className={mode === 'login' ? 'active' : ''} onClick={() => changeMode('login')}>Sign in</button>
                        <button type="button" role="tab" aria-selected={mode === 'signup'} className={mode === 'signup' ? 'active' : ''} onClick={() => changeMode('signup')}>Create account</button>
                    </div>

                    <form className="auth-form" onSubmit={submit}>
                        {mode === 'signup' && <div className="name-fields">
                            <label>First name<input autoComplete="given-name" value={form.firstName} onChange={(event) => setForm({ ...form, firstName: event.target.value })} required /></label>
                            <label>Last name<input autoComplete="family-name" value={form.lastName} onChange={(event) => setForm({ ...form, lastName: event.target.value })} required /></label>
                        </div>}
                        <label>Email address<input type="email" autoComplete="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="you@example.com" required /></label>
                        <label>Password<input type="password" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} placeholder="At least 8 characters" required /></label>
                        {error && <p className="form-message error-message" role="alert">{error}</p>}
                        {notice && <p className="form-message success-message" role="status">{notice}</p>}
                        <button className="primary-button auth-submit" type="submit" disabled={busy}>
                            {busy ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Create account'}
                            {!busy && <span aria-hidden="true">→</span>}
                        </button>
                    </form>
                    <p className="auth-footnote">By continuing, you agree to keep the conversation kind.</p>
                </div>
                <div className="auth-copyright">CLOSER · A SMALLER, NICER CORNER OF THE INTERNET</div>
            </section>
        </main>
    );
}

export default AuthPage;