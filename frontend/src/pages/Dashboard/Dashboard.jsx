import React from 'react';
import styles from './Dashboard.module.css';

const Dashboard = ({ products, movements }) => {
  const totalProducts = products.length;
  // Exemplo: estoque abaixo de 5 é crítico
  const criticalProducts = products.filter(p => p.quantity <= p.min).length;
  const todayMovements = movements.filter(m => new Date(m.date).toDateString() === new Date().toDateString()).length;

  return (
    <div className="content-card">
      <div className="page-header">
        <h1 className="page-title">Painel de Controle</h1>
      </div>
      
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Total de Produtos</div>
          <p className={styles.statValue}>{totalProducts}</p>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Produtos Críticos</div>
          <p className={styles.statValue}>{criticalProducts}</p>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Movimentações Hoje</div>
          <p className={styles.statValue}>{todayMovements}</p>
        </div>
      </div>

      <div className="alert-section">
        <h2 className={styles.sectionTitle}>Produtos Abaixo do Estoque Mínimo</h2>
        <div className={styles.alertList}>
          {products.filter(p => p.quantity <= 5).length === 0 ? (
            <p style={{padding: '1rem', color: '#742a2a'}}>Tudo certo! Nenhum alerta.</p>
          ) : (
             products.filter(p => p.quantity <= 5).map(p => (
              <div key={p.id} className={styles.alertItem}>
                <div className="alert-info">
                  <div className={styles.alertName}>{p.name}</div>
                  <div className="alert-details" style={{fontSize: '0.85rem'}}>Qtd Atual: <b>{p.quantity}</b></div>
                </div>
                <div className={styles.alertBadge}>Crítico</div>
              </div>
             ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;