import { useState, useEffect } from 'react';
import styles from './App.module.css'; // Importa o layout principal

// Importação dos componentes
import LoginScreen from './pages/Login/LoginScreen';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './pages/Dashboard/Dashboard';
import Products from './pages/Products/Products';
import Movements from './pages/Movements/Movements';
import History from './pages/History/History';

// Services
import { getProducts, addProduct, deleteProduct, updateProduct } from "./services/products";
import { getMovements, registerMovement } from "./services/movements";

function App() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const [products, setProducts] = useState([]);
  const [movements, setMovements] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const prod = await getProducts();
        const mov = await getMovements();

        setProducts(prod.data);
        setMovements(mov.data);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
      }
    }

    fetchData();
  }, []);

  const handleAddProduct = async (product) => {
    try {
      await addProduct(product);
      console.log("Produto cadastrado com sucesso!");

      const updated = await getProducts();
      setProducts(updated.data);

    } catch (err) {
      console.error("Erro ao cadastrar produto", err);
    }
  };


  const handleEditProduct = async (updatedProduct) => {
    try {
      await updateProduct(updatedProduct);

      const updated = await getProducts();
      setProducts(updated.data);

    } catch (err) {
      console.error("Erro ao editar produto", err);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);

      const updated = await getProducts();
      setProducts(updated.data);

    } catch (err) {
      console.error("Erro ao excluir produto", err);
    }
  };


  // Função para processar Entrada/Saída
  const handleMovement = async (movementData) => {
    try {
      await registerMovement(movementData);

      const prod = await getProducts();
      const mov = await getMovements();

      setProducts(prod.data);
      setMovements(mov.data);

      alert("Movimentação registrada com sucesso!");

    } catch (err) {
      console.error("Erro ao registrar movimentação", err);
    }
  };

  const renderPage = () => {
    switch(currentPage) {
      case 'dashboard':
        return <Dashboard products={products} movements={movements} />;
      case 'products':
        return (
          <Products 
            products={products}
            onAddProduct={handleAddProduct}
            onEditProduct={handleEditProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        );
      case 'movements':
        return <Movements products={products} onRegisterMovement={handleMovement} />;
      case 'history':
        return <History history={movements} />;
      default:
        return <Dashboard products={products} movements={movements} />;
    }
  };

  if (!user) {
    return <LoginScreen onLogin={(username) => setUser(username)} />;
  }

  return (
    <div className={styles.appContainer}>
      <Sidebar 
        user={user} 
        currentPage={currentPage} 
        setPage={setCurrentPage}
        onLogout={() => setUser(null)}
      />
      <main className={styles.mainContent}>
        {renderPage()}
      </main>
    </div>
  );
}

export default App;