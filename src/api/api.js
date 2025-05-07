import axios from "axios";

function getTodoList() {
  return axios
    .get("https://6819b1b61ac115563505ccb2.mockapi.io/todo/tododetails")
    .then((res) => res.data);
}

function posttodoitem({ formdata }) {
  console.log(formdata);
  return axios
    .post("https://6819b1b61ac115563505ccb2.mockapi.io/todo/tododetails", {
      ...formdata,
      todoStatus: false,
      id: Date.now().toString(),
    })
    .then((res) => res.data);
}

function deletetodoitem(id) {
  return axios
    .delete(
      `https://6819b1b61ac115563505ccb2.mockapi.io/todo/tododetails/${id}`
    )
    .then((res) => res.data);
}

function updatestatus({ id, ...list }) {
  return axios
    .put(
      `https://6819b1b61ac115563505ccb2.mockapi.io/todo/tododetails/${id}`,
      list
    )
    .then((res) => res.data);
}

function updateTodoitem({ formdata }) {
  console.log(formdata);
  return axios
    .put(
      `https://6819b1b61ac115563505ccb2.mockapi.io/todo/tododetails/${formdata.id}`,
      {
        ...formdata,
      }
    )
    .then((res) => res.data);
}

export {
  getTodoList,
  posttodoitem,
  deletetodoitem,
  updatestatus,
  updateTodoitem,
};
