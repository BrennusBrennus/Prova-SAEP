import api from "./api";

export const login = (email, password) =>
  api.post("/usuario/logar", { email, password });
