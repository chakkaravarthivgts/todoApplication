import { Table, Space, Tag } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deletetodoitem, getTodoList, updatestatus } from "../api/api";
import Column from "antd/es/table/Column";

const Tabletodo = ({ setformdata }) => {
  const {
    data: dataSource,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["todos"], queryFn: getTodoList });

  const query = useQueryClient();

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
          dataSource={dataSource}
          rowKey={"id"}
          pagination={{ position: ["bottomcenter"] }}
        >
          <Column title="Todo No" dataIndex="id" className="text-center" />
          <Column
            title="Todo Name"
            dataIndex="todoName"
            className="text-center"
            align="center"
          />
          <Column
            title="Todo Description"
            dataIndex="todoDescription"
            className="text-center"
            align="center"
          />
          <Column
            className=""
            title="Todo Status"
            dataIndex="todostatus"
            align="center"
            render={(_, rec) => {
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
          <Column
            className=""
            title="Action"
            render={(_, record) => (
              <Space size="middle" className="text-[#6E33FF]!">
                <a
                  className="text-[#6E33FF]! text-center"
                  onClick={() => {
                    setformdata(record);
                    filteredDataSource(record.id);
                    console.log(record.id);
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
      </div>
    </>
  );
};

export default Tabletodo;
