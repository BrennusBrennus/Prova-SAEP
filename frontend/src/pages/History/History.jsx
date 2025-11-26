import React, { useState } from 'react';
import styles from './History.module.css';

const History = ({ history }) => {
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHistory = history.filter(item => {
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesSearch = 
      item.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.responsible?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleString('pt-BR');
  };

  return (
    <div className="content-card">
      <div className="page-header">
        <h1 className="page-title">Histórico de Movimentações</h1>
      </div>

      <div className={styles.filterBar}>
        <div style={{flex: 1}}>
          <input 
            type="text" 
            className="form-input" 
            placeholder="Buscar por produto ou responsável..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <select 
            className="form-input" 
            value={filterType} 
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">Todos os tipos</option>
            <option value="entry">Entradas</option>
            <option value="exit">Saídas</option>
          </select>
        </div>
      </div>

      <div className={styles.tableContainer}>
        {filteredHistory.length === 0 ? (
          <div className={styles.emptyState}>
            <p>Nenhum registro encontrado.</p>
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Data</th>
                <th>Tipo</th>
                <th>Produto</th>
                <th>Qtd</th>
                <th>Responsável</th>
                <th>Motivo</th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory.map(log => (
                <tr key={log.id}>
                  <td>{formatDate(log.date)}</td>
                  <td>
                    <span className={`${styles.badge} ${log.type === 'entry' ? styles.entry : styles.exit}`}>
                      {log.type === 'entry' ? 'Entrada' : 'Saída'}
                    </span>
                  </td>
                  <td>{log.productName}</td>
                  <td>{log.amount}</td>
                  <td>{log.responsible}</td>
                  <td style={{color: '#718096', fontSize: '0.9em'}}>{log.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default History;