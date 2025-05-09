import axios from "axios";
import todoinstance from "./axiosInstance";

export {
  getTodoList,
  posttodoitem,
  deletetodoitem,
  updatestatus,
  updateTodoitem,
};

// function getTodoList() {
//   return axios
//     .get("https://6819b1b61ac115563505ccb2.mockapi.io/todo/tododetails")
//     .then((res) => res.data);
// }

const getTodoList = async () => {
  const response = await todoinstance.get("/");
  return response.data;
};

// function posttodoitem({ formdata }) {
//   console.log(formdata);
//   return axios
//     .post("https://6819b1b61ac115563505ccb2.mockapi.io/todo/tododetails", {
//       ...formdata,
//       todoStatus: false,
//       id: Date.now().toString(),
//     })
//     .then((res) => res.data);
// }

const posttodoitem = async ({ formdata }) => {
  const response = await todoinstance.post("/", {
    ...formdata,
    todoStatus: false,
    id: Date.now().toString(),
  });
  return response.data;
};

// function deletetodoitem(id) {
//   return axios
//     .delete(
//       `https://6819b1b61ac115563505ccb2.mockapi.io/todo/tododetails/${id}`
//     )
//     .then((res) => res.data);
// }
const deletetodoitem = async (id) => {
  let response = await todoinstance.delete(`/${id}`);
  return response.data;
};

// function updatestatus({ id, ...list }) {
//   return axios
//     .put(
//       `https://6819b1b61ac115563505ccb2.mockapi.io/todo/tododetails/${id}`,
//       list
//     )
//     .then((res) => res.data);
// }
const updatestatus = async ({ id, ...list }) => {
  let response = await todoinstance.put(`/${id}`, list);
  return response.data;
};

// function updateTodoitem({ formdata }) {
//   console.log(formdata);
//   return axios
//     .put(
//       `https://6819b1b61ac115563505ccb2.mockapi.io/todo/tododetails/${formdata.id}`,
//       {
//         ...formdata,
//       }
//     )
//     .then((res) => res.data);
// }

const updateTodoitem = async ({ formdata }) => {
  let response = await todoinstance.put(`/${formdata.id}`, {
    ...formdata,
  });

  return response.data;
};
