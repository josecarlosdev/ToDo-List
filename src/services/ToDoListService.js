import http from "../http-common";

const getAll = () => {
  return http.get("/todolist");
};

const get = id => {
  return http.get(`/todolist/${id}`);
};

const create = data => {
  return http.post("/todolist", data);
};

const update = (id, data) => {
  return http.put(`/todolist/${id}`, data);
};

const remove = id => {
  return http.delete(`/todolist/${id}`);
};

const removeAll = () => {
  return http.delete(`/todolist`);
};

const findBypending = pending => {
  return http.get(`/todolist?published=${pending}`);
};

const findBypublished = published => {
  return http.get(`/todolist?published=${published}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findBypending,
  findBypublished
};
