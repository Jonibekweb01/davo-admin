import axios from "axios";

const API = axios.create({
  baseURL: "https://davo-backend.onrender.com/api/v1",
});

export const medicineAPI = {
  getAll: () => API.get("/medicines"),
  create: (data: any) => API.post("/medicines", data),
  update: (id: string, data: any) => API.patch("/medicines/" + id, data),
  delete: (id: string) => API.delete("/medicines/" + id),
};

export const pharmacyAPI = {
  getAll: () => API.get("/pharmacies"),
  create: (data: any) => API.post("/pharmacies", data),
  update: (id: string, data: any) => API.patch("/pharmacies/" + id, data),
  delete: (id: string) => API.delete("/pharmacies/" + id),
};
