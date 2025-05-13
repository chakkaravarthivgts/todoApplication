import { Table, Space, Tag, Button, Modal, Input } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deletetodoitem,
  getTodoList,
  updatestatus,
  updateTodoitem,
} from "../api/api";
import Column from "antd/es/table/Column";
import { Dispatch, SetStateAction, useState } from "react";

//type script type decalaration
//data sourse
export interface TodoItem {
  id: null | number;
  todoName: string;
  todoDescription: string;
  todoStatus: boolean;
}

//props type
interface TableTodoProps {
  setformdata: (record: TodoItem) => void;
  formdata: TodoItem;
}

//button to popup

const Tabletodo: React.FC<TableTodoProps> = ({ setformdata, formdata }) => {
  const {
    data: data,
    isLoading,
    isError,
  } = useQuery<TodoItem[]>({ queryKey: ["todos"], queryFn: getTodoList });

  const [isModalOpen, setIsModalOpen] = useState(false); // state to manage popup
  const [value, setvalue] = useState<TodoItem>({
    id: null,
    todoName: "",
    todoDescription: "",
    todoStatus: false,
  }); // data

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const { mutateAsync: updatetodoform } = useMutation({
    mutationFn: updateTodoitem,
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["todos"] });
      setvalue({
        todoName: "",
        todoDescription: "",
        id: null,
        todoStatus: false,
      });
      handleOk();
    },
  });

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const query = useQueryClient();

  const { mutateAsync: deleteitem } = useMutation({
    mutationFn: deletetodoitem,
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const { mutateAsync: changestatus } = useMutation({
    mutationFn: updatestatus,
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  if (isLoading) {
    return (
      <h1 className="flex flex-col items-center justify-center">Loading ...</h1>
    );
  }

  return (
    <>
      <div className="p-4 max-w-3xl mx-auto">
        <Table
          className="rounded-xl shadow-xl/20"
          dataSource={data}
          rowKey={"id"}
          pagination={{ position: ["bottomCenter"], defaultPageSize: 10 }}
        >
          <Column<TodoItem>
            title="Todo No"
            dataIndex="id"
            className="text-center"
          />
          <Column<TodoItem>
            title="Todo Name"
            dataIndex="todoName"
            className="text-center"
            align="center"
          />
          <Column<TodoItem>
            title="Todo Description"
            dataIndex="todoDescription"
            className="text-center"
            align="center"
          />
          <Column<TodoItem>
            className=""
            title="Todo Status"
            dataIndex="todostatus"
            align="center"
            render={(_, rec: TodoItem) => {
              {
                return rec.todoStatus ? (
                  <Tag
                    className="cursor-pointer"
                    color="green"
                    onClick={() => changestatus({ ...rec, todoStatus: false })}
                  >
                    Done
                  </Tag>
                ) : (
                  <Tag
                    className="cursor-pointer"
                    color="red"
                    onClick={() => changestatus({ ...rec, todoStatus: true })}
                  >
                    Not Done
                  </Tag>
                );
              }
            }}
          />
          <Column<TodoItem>
            className=""
            title="Action"
            render={(_, record: TodoItem) => (
              <Space size="middle" className="text-[#6E33FF]!">
                <a
                  className="text-[#6E33FF]! text-center"
                  onClick={() => {
                    showModal();
                    setvalue(record);
                  }}
                >
                  Update
                </a>
                <a
                  className="text-[#6E33FF]!"
                  onClick={() => deleteitem(record.id)}
                >
                  Delete
                </a>
              </Space>
            )}
            align="center"
          />
        </Table>
        <Popup
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
          value={value}
          updatetodoform={updatetodoform}
          setvalue={setvalue}
        />
      </div>
    </>
  );
};

export default Tabletodo;

interface PopupProps {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  value: TodoItem;
  updatetodoform: (todo: TodoItem) => Promise<any>;
  setvalue: Dispatch<SetStateAction<TodoItem>>;
}

const Popup: React.FC<PopupProps> = ({
  isModalOpen,
  handleOk,
  handleCancel,
  value,
  updatetodoform,
  setvalue,
}) => {
  const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setvalue((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  console.log(value);
  return (
    <Modal
      title="Task Edit"
      open={isModalOpen}
      onOk={() => updatetodoform(value)}
      onCancel={handleCancel}
      bodyProps={{ padding: "16px" }}
    >
      <div className="p-4 flex gap-4 flex-col">
        <Input
          value={value.todoName}
          placeholder="Todo Name"
          className="p-4"
          name="todoName"
          onChange={handlechange}
        />
        <Input
          value={value.todoDescription}
          placeholder="Todo Description"
          name="todoDescription"
          onChange={handlechange}
        />
      </div>
    </Modal>
  );
};
