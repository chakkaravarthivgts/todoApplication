import { useEffect, useState } from "react";
import "./App.css";
import {
  deletetodoitem,
  getTodoList,
  posttodoitem,
  updatestatus,
  updateTodoitem,
} from "./api/api";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
} from "@tanstack/react-query";
import Tabletodo from "./components/antdesigntable";
import FormComponents from "./components/formcomponent";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        {/* <FormTodo /> */}
        <FormComponents />
      </div>
    </>
  );
}

export default App;

const FormTodo = () => {
  const [formdata, setformdata] = useState({
    todoName: "",
    todoDescription: "",
  });

  const query = useQueryClient();

  const handlechange = (e) => {
    const { name, value } = e.target;
    setformdata((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const handlesubmit = () => {
    const postitem = async (formdata) => {
      let res = await posttodoitem(formdata);
      console.log("res form submit", res);
    };

    postitem(formdata);
  };

  //react-query - post

  const { mutateAsync: addtodoitem } = useMutation({
    mutationFn: posttodoitem,
    onSuccess: () => {
      query.invalidateQueries(["todos"]);
      setformdata({
        todoName: "",
        todoDescription: "",
      });
    },
  });

  const { mutateAsync: updatetodoform } = useMutation({
    mutationFn: updateTodoitem,
    onSuccess: () => {
      query.invalidateQueries(["todos"]);
      setformdata({
        todoName: "",
        todoDescription: "",
        id: null,
      });
    },
  });

  return (
    <>
      <div className="px-10">
        <div className="flex flex-col justify-center align-center p-4 border-b-3 border-gray-300">
          <div className="flex justify-center">
            <label className="text-lg/8 font-bold text-[#6E33FF] font-mono">
              Form to Add Todos
            </label>
          </div>
          <div className="flex justify-center gap-16 py-10">
            <input
              className=" rounded-xl p-4 shadow-xl/20"
              placeholder="Todo Name "
              name="todoName"
              value={formdata.todoName}
              onChange={handlechange}
            />
            <input
              placeholder="Todo Description"
              className=" rounded-xl p-4 shadow-xl/20"
              name="todoDescription"
              value={formdata.todoDescription}
              onChange={handlechange}
            />

            {formdata.id ? (
              <button
                type="button"
                className="rounded-full border-1 border-[#6E33FF]  px-4 text-sm text-[#6E33FF] inset-shadow-sm/20 hover:bg-[#6E33FF] hover:text-white cursor-pointer"
                onClick={() => updatetodoform({ formdata })}
              >
                Update
              </button>
            ) : (
              <button
                type="button"
                className="rounded-full border-1 border-[#6E33FF]  px-4 text-sm text-[#6E33FF] inset-shadow-sm/20 hover:bg-[#6E33FF] hover:text-white cursor-pointer"
                onClick={() => {
                  if (formdata.todoName || formdata.todoDescription) {
                    addtodoitem({ formdata });
                  }
                }}
              >
                Add Todo
              </button>
            )}
          </div>
          <div className="flex justify-center"></div>
        </div>
      </div>
      {/* <TodoList setformdata={setformdata} formdata={formdata} /> */}
      <Tabletodo setformdata={setformdata} formdata={formdata} />
    </>
  );
};

const TodoList = ({ setformdata, formdata }) => {
  // const [todolist, settodolist] = useState([]);

  const query = useQueryClient();

  const {
    data: todolist,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["todos"], queryFn: getTodoList });

  const { mutateAsync: deleteitem } = useMutation({
    mutationFn: deletetodoitem,
    onSuccess: () => {
      query.invalidateQueries(["todos"]);
    },
  });

  const { mutateAsync: changestatus } = useMutation({
    mutationFn: updatestatus,
    onSuccess: () => {
      query.invalidateQueries(["todos"]);
    },
  });

  // useEffect(() => {
  //   let fetchdata = async () => {
  //     let data = await getTodoList();
  //     if (data) {
  //       settodolist(data);
  //       console.log(data);
  //     }
  //   };

  //   fetchdata();
  // }, []);
  if (isLoading) {
    return (
      <h1 className="flex items-center justify-center text-bold">
        Loading ...
      </h1>
    );
  }

  return (
    <div className="flex flex-wrap p-4">
      {todolist?.map((list) => {
        return (
          <ul
            key={list.id}
            className="flex flex-col items-center p-6 m-5 rounded-xl shadow-lg/20 w-60 h-60 bg-gradient-to-b from-[#f4f0fc] to-white"
          >
            <li className="test-md capitalize p-2 mb-2 font-bold text-center">
              {list.todoName}
            </li>
            <li className="capitalize p-2 text-center">
              {list.todoDescription}
            </li>
            <li className="pt-2">
              {list.todoStatus ? (
                <button
                  onClick={() => {
                    changestatus({ ...list, todoStatus: false });
                  }}
                  className="rounded-xl  p-2  px-4 text-sm text-[#02d93b] cursor-pointer  shadow-xl/40 shadow-green-500/50"
                >
                  Done
                </button>
              ) : (
                <button
                  onClick={() => {
                    changestatus({ ...list, todoStatus: true });
                  }}
                  className="rounded-xl p-2 px-4 p-1 text-sm text-[#fc3a44] cursor-pointer shadow-xl/30 shadow-red-500/50"
                >
                  Not Done
                </button>
              )}
            </li>
            <div className="flex gap-2 m-4">
              <li className="">
                <button
                  onClick={() => {
                    setformdata({ ...list }), console.log(formdata);
                  }}
                  className="rounded-xl shadow-sm p-2 px-4 text-sm text-[#6E33FF] cursor-pointer"
                >
                  Update
                </button>
              </li>
              <li className="">
                <button
                  onClick={() => deleteitem(list.id)}
                  className="rounded-xl shadow-sm p-2 px-4 text-sm text-[#6E33FF] cursor-pointer "
                >
                  Delete
                </button>
              </li>
            </div>
          </ul>
        );
      })}
    </div>
  );
};
