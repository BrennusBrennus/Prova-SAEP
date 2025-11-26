import { useState } from 'react';
import styles from './Products.module.css';

const Products = ({ products, onAddProduct, onEditProduct, onDeleteProduct }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Estado para controlar se é edição
  const [isEditing, setIsEditing] = useState(false);

  // Estado do formulário (unificado para criar e editar)
  const [formData, setFormData] = useState();

  // Função para abrir o modal em modo de CRIAÇÃO
  const handleOpenAdd = () => {
    setIsEditing(false);
    setFormData({ name: '', quantity: 0, min: 0 });
    setIsModalOpen(true);
  };

  // Função para abrir o modal em modo de EDIÇÃO
  const handleOpenEdit = (product) => {
    setIsEditing(true);
    setFormData({ ...product }); // Copia os dados do produto clicado para o form
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    
    if (isEditing) {
      // Chama a função de edição do App.js
      onEditProduct(formData);
    } else {
      // Chama a função de adição do App.js (cria novo ID)
      onAddProduct(formData);
    }

    setIsModalOpen(false);
    // Limpa o form (opcional, pois limpamos ao abrir)
    setFormData({ id: null, name: '', quantity: 0, min: 0 });
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="content-card">
      <div className="page-header">
        <h1 className="page-title">Gerenciamento de Produtos</h1>
      </div>
      
      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <input 
            type="text"
            className="form-input" 
            placeholder="Buscar produtos..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="btn-secondary" onClick={handleOpenAdd}>➕ Adicionar Produto</button>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Quantidade</th>
              <th>Estoque Mínimo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>
                  <span className={`${styles.badge} ${product.quantity > product.min ? styles.success : styles.danger}`}>
                    {product.quantity}
                  </span>
                </td>
                <td>
                    <span className={styles.initialStock}>{product.min}</span>
                </td>
                <td style={{ display: 'flex', gap: '0.5rem' }}>
                    <button 
                        className={`${styles.btnIcon} ${styles.edit}`} 
                        onClick={() => handleOpenEdit(product)}
                        title="Editar"
                    >
                        ✏️
                    </button>
                    <button 
                        className={`${styles.btnIcon} ${styles.delete}`} 
                        onClick={() => onDeleteProduct(product.id)}
                        title="Excluir"
                    >
                        🗑️
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL (Classes mantidas globais pois geralmente modais ficam na raiz ou em index.css) */}
      {isModalOpen && (
        <div className="modal-overlay active" style={{display: 'flex', position:'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1000, backgroundColor: "rgba(0, 0, 0, 0.5)", justifyContent: 'center', alignItems: 'center'}}>
          <div className="modal" style={{background: 'white', padding: '2rem', borderRadius: '16px', width: '90%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto'}}>
            <div className="modal-header" style={{display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem'}}>
              <h2 className="modal-title" style={{margin: 0}}>
                {isEditing ? 'Editar Produto' : 'Adicionar Produto'}
              </h2>
              <button className="btn-close" style={{background:'none', border:'none', fontSize:'1.5rem', cursor:'pointer'}} onClick={() => setIsModalOpen(false)}>✕</button>
            </div>
            
            <form onSubmit={handleSave}>
              <div className="form-group">
                <label className="form-label">Nome</label>
                <input 
                  className="form-input" 
                  required 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})} 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Quantidade (Estoque)</label>
                <input 
                  type="number" 
                  className="form-input" 
                  required 
                  min="0"
                  value={formData.quantity}
                  onChange={e => setFormData({...formData, quantity: Number(e.target.value)})} 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Estoque Mínimo</label>
                <input 
                  type="number" 
                  className="form-input" 
                  required 
                  min="0"
                  value={formData.min}
                  onChange={e => setFormData({...formData, min: Number(e.target.value)})} 
                />
              </div>
              
              <div style={{display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem'}}>
                <button type="button" style={{padding: '0.8rem 1.5rem', border: 'none', background: '#e2e8f0', borderRadius: '8px', cursor: 'pointer'}} onClick={() => setIsModalOpen(false)}>Cancelar</button>
                <button type="submit" className="btn-primary" style={{width: 'auto'}}>
                    {isEditing ? 'Salvar Alterações' : 'Criar Produto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;