import api from "./api";

export const getMovements = () => api.get("/movimentacoes");
export const registerMovement = (data) => api.post("/movimentacoes", data);