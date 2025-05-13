import { Button, Form, Input } from "antd";
import Tabletodo, { TodoItem } from "./antdesigntable";
import { posttodoitem, updateTodoitem } from "../api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const FormComponents: React.FC = () => {
  const [formdata, setformdata] = useState<TodoItem>({
    todoName: "",
    todoDescription: "",
    id: null,
    todoStatus: false,
  });

  const query = useQueryClient();

  const handlechange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setformdata((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const { mutateAsync: addtodoitem } = useMutation({
    mutationFn: posttodoitem,
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["todos"] });
      setformdata({
        todoName: "",
        todoDescription: "",
        id: null,
        todoStatus: false,
      });
    },
  });

  const { mutateAsync: updatetodoform } = useMutation({
    mutationFn: updateTodoitem,
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["todos"] });
      setformdata({
        todoName: "",
        todoDescription: "",
        id: null,
        todoStatus: false,
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
          <div className="flex justify-center gap-16 py-10 items-center">
            <Form layout="inline" className="flex items-center">
              <Form.Item>
                <div className="rounded-xl shadow-md p-4">
                  <Input
                    placeholder="Todo Name"
                    variant="borderless"
                    value={formdata.todoName}
                    onChange={handlechange}
                    name="todoName"
                  />
                </div>
              </Form.Item>

              <Form.Item>
                <div className="rounded-xl shadow-md p-4">
                  <Input
                    placeholder="Todo Description"
                    variant="borderless"
                    value={formdata.todoDescription}
                    onChange={handlechange}
                    name="todoDescription"
                  />
                </div>
              </Form.Item>

              <Form.Item>
                <div className="rounded-full border border-[#6E33FF] inset-shadow-sm/20  hover:bg-[#6E33FF]! cursor-pointer p-1 text-sm text-[#6E33FF]">
                  <Button
                    className=" text-[#6E33FF]! hover:text-white!  "
                    htmlType="submit"
                    type="link"
                    onClick={() => {
                      if (formdata.todoName || formdata.todoDescription) {
                        addtodoitem(formdata);
                      }
                    }}
                  >
                    Add Todo
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </div>

          <div className="flex justify-center"></div>
        </div>
      </div>
      {/* table coponents */}
      <Tabletodo setformdata={setformdata} formdata={formdata} />
    </>
  );
};

export default FormComponents;
