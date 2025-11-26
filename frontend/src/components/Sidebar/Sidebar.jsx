import React from 'react';
import styles from './Sidebar.module.css';

const Sidebar = ({ user, currentPage, setPage, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'products', icon: '📦', label: 'Produtos' },
    { id: 'movements', icon: '🔄', label: 'Movimentações' },
    { id: 'history', icon: '📋', label: 'Histórico' },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <h2 className={styles.title}>Sistema de Almoxarifado</h2>
        <p className={styles.user}>👤 <span>{user}</span></p>
      </div>
      <nav>
        <ul className={styles.navMenu}>
          {menuItems.map((item) => (
            <li className={styles.navItem} key={item.id}>
              <button 
                // Lógica condicional para aplicar a classe .active do módulo
                className={`${styles.navButton} ${currentPage === item.id ? styles.active : ''}`}
                onClick={() => setPage(item.id)}
              >
                <span className={styles.navIcon}>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <button className={styles.btnLogout} onClick={onLogout}>🚪 Sair</button>
    </aside>
  );
};

export default Sidebar;