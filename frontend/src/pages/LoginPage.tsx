import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.css';

interface LoginFormData {
  email: string;
  password: string;
}

interface ApiResponse {
  message: string;
  token: string;
  user: {
    id: string;
    email: string;
    createdAt: string;
  };
}

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) {
      setError('');
    }
  };

  const validateForm = (): boolean => {
    if (!formData.email) {
      setError('L\'email est requis');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Format d\'email invalide');
      return false;
    }
    if (!formData.password) {
      setError('Le mot de passe est requis');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post<ApiResponse>(
        `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/auth/login`,
        formData
      );

      // Store token in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Redirect to dashboard (for now, just show success)
      alert('Connexion réussie!');
    } catch (err: any) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError('Une erreur s\'est produite. Veuillez réessayer.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAccount = () => {
    // For now, just show an alert. In a real app, navigate to registration page
    alert('Redirection vers la page d\'inscription...');
  };

  return (
    <div className="login-container">
      <div className="login-form-section">
        <div className="login-form">
          <h1 className="login-title">Bienvenue, connecte-toi !</h1>
          
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="Ton email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
                disabled={isLoading}
              />
            </div>
            
            <div className="input-group">
              <input
                type="password"
                name="password"
                placeholder="Ton mot de passe"
                value={formData.password}
                onChange={handleInputChange}
                className="form-input"
                disabled={isLoading}
              />
            </div>
            
            <button 
              type="submit" 
              className="login-button"
              disabled={isLoading}
            >
              {isLoading ? 'Connexion...' : 'Connexion'}
            </button>
          </form>
          
          <button 
            type="button" 
            className="create-account-link"
            onClick={handleCreateAccount}
            disabled={isLoading}
          >
            Ou crée-toi un compte
          </button>
        </div>
      </div>
      
      <div className="logo-section">
        <div className="logo-container">
          <div className="logo-icon">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M10 70V35L40 10L70 35V70H50V50H30V70H10Z" 
                fill="#FF5722" 
                stroke="#FF5722" 
                strokeWidth="2"
              />
              <rect x="35" y="55" width="10" height="15" fill="#FF5722"/>
            </svg>
          </div>
          <h2 className="logo-text">HomeFinder</h2>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;