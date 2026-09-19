import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [mode, setMode] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setMessage('');
    if (!username || !password) {
      setMessage('Username aur password dono bharo');
      return;
    }
    try {
      const endpoint = mode === 'login' ? 'login' : 'signup';
      const res = await fetch(`http://localhost:5000/api/auth/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || 'Kuch galat ho gaya');
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username);
      navigate('/home');
    } catch (err) {
      setMessage('Backend se connect nahi ho paya. Backend server chal raha hai check karo.');
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
            />

            <label>PASSWORD</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {message && <p className="login-message">{message}</p>}

            <button className="login-continue-btn" onClick={handleSubmit}>
              CONTINUE
            </button>

            <p className="login-toggle-text">
              {mode === 'login' ? (
                <>New here? <span onClick={() => setMode('signup')}>Sign up</span></>
              ) : (
                <>Already have an account? <span onClick={() => setMode('login')}>Log in</span></>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;