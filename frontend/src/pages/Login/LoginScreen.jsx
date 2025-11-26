import { useState } from 'react';
import styles from './LoginScreen.module.css';

// 1. Definimos um usuário "correto" para simular o banco de dados
const MOCK_CREDENTIALS = {
  email: 'admin@gmail.com',
  password: '123456'
};

const LoginScreen = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 2. Validação simples de campos vazios
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    // 3. Validação das Credenciais
    if (email === MOCK_CREDENTIALS.email && password === MOCK_CREDENTIALS.password) {
      const userName = email.split('@')[0];
      const formattedName = userName.charAt(0).toUpperCase() + userName.slice(1);
      
      onLogin(formattedName);
    } else {
      // Login Falha
      setError('E-mail ou senha incorretos.');
    }
  };

  // JSX do componente de tela de login
  return (
    <div className={styles.loginScreen}>
      <div className={styles.loginCard}>
        <div className={styles.header}>
          <div className={styles.icon}>📦</div>
          <h1 className={styles.title}>Acesso ao Sistema</h1>
          <p className={styles.subtitle}>Entre com suas credenciais</p>
        </div>
        
        {error && <div className={styles.errorMessage}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">E-mail</label>
            <input 
              type="text" 
              className="form-input" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Senha</label>
            <input 
              type="password" 
              className="form-input" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="btn-primary">Entrar</button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;