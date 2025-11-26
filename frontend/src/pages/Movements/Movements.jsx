import React, { useState } from 'react';
import styles from './Movements.module.css';

const Movements = ({ products, onRegisterMovement }) => {
  const [formData, setFormData] = useState({
    type: '',
    productId: '',
    amount: '',
    responsible: '',
    reason: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validação básica de estoque negativo na saída
    if (formData.type === 'exit') {
      const product = products.find(p => p.id === Number(formData.productId));
      if (product && product.quantity < Number(formData.amount)) {
        alert('Erro: Quantidade insuficiente em estoque!');
        return;
      }
    }

    onRegisterMovement(formData);
    // Limpar form
    setFormData({ type: '', productId: '', amount: '', responsible: '', reason: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="content-card">
      <div className="page-header">
        <h1 className="page-title">Registrar Movimentação</h1>
      </div>

      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.formRow}>
          <div className="form-group">
            <label className="form-label">Tipo de Movimentação</label>
            <select name="type" className="form-input" required value={formData.type} onChange={handleChange}>
              <option value="" disabled>Selecione...</option>
              <option value="entry">Entrada</option>
              <option value="exit">Saída </option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Produto</label>
            <select name="productId" className="form-input" required value={formData.productId} onChange={handleChange}>
              <option value="">Selecione um produto...</option>
              {products.map(p => (
                <option key={p.id} value={p.id}>{p.name} (Estoque: {p.quantity})</option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.formRow}>
          <div className="form-group">
            <label className="form-label">Quantidade</label>
            <input 
              type="number" 
              name="amount" 
              className="form-input" 
              min="1" 
              required 
              value={formData.amount} 
              onChange={handleChange} 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Responsável</label>
            <input 
              type="text" 
              name="responsible" 
              className="form-input" 
              required 
              value={formData.responsible} 
              onChange={handleChange} 
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Motivo / Observação</label>
          <input 
            type="text" 
            name="reason" 
            className="form-input" 
            placeholder="Ex: Compra, Venda, Devolução..." 
            value={formData.reason} 
            onChange={handleChange} 
          />
        </div>

        <button type="submit" className="btn-primary" style={{marginTop: '1rem'}}>
          Confirmar Movimentação
        </button>
      </form>
    </div>
  );
};

export default Movements;