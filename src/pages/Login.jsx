import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const BACKEND_URL = 'https://hireprep-backend-px4h.onrender.com';

function Login() {
  const [mode, setMode] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Page khulte hi backend ko "wake up" karne ke liye ek silent request bhejo
  useEffect(() => {
    fetch(`${BACKEND_URL}/api/auth/login`, { method: 'GET' }).catch(() => {});
  }, []);

  const handleSubmit = async () => {
    setMessage('');
    if (!username || !password) {
      setMessage('Username aur password dono bharo');
      return;
    }

    setLoading(true);
    setMessage('Connecting to server, please wait...');

    try {
      const endpoint = mode === 'login' ? 'login' : 'signup';
      const res = await fetch(`${BACKEND_URL}/api/auth/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || 'Kuch galat ho gaya');
        setLoading(false);
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username);
      navigate('/home');
    } catch (err) {
      setMessage('Server start ho raha hai, thoda wait karke dobara try karo.');
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-image-side">
        <img src="/images/login-bg.jpg" alt="Interview" />
      </div>
      <div className="login-form-side">
        <div className="login-card">
          <div className="login-card-header">LOG IN / SIGN UP</div>
          <div className="login-card-body">
            <label>USERNAME</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
            />

            <label>PASSWORD</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />

            {message && <p className="login-message">{message}</p>}

            <button
              className="login-continue-btn"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'PLEASE WAIT...' : 'CONTINUE'}
            </button>

            <p className="login-toggle-text">
              {mode === 'login' ? (
                <>New here? <span onClick={() => !loading && setMode('signup')}>Sign up</span></>
              ) : (
                <>Already have an account? <span onClick={() => !loading && setMode('login')}>Log in</span></>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;