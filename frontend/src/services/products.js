import api from "./api";

export const getProducts = () => api.get("/produto/listar");

export const addProduct = (data) =>
  api.post("/produto/cadastrar", {
    nomeProduto: data.name,
    quantidade: data.quantity,
    quantidadeMinima: data.min,
  });

export const updateProduct = (data) =>
  api.put("/produto/editar/", {
    id: data.id,
    nomeProduto: data.name,
    quantidade: data.quantity,
    quantidadeMinima: data.min,
  });

export const deleteProduct = (id) =>
  api.delete(`/produto/excluir/${id}`);
