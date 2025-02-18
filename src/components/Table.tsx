import React, { useEffect, useState } from "react";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";

type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];

interface DataType {
  key: number;
  title: string;
  body: string;
  id: number;
  userId: number;
}

const columns: TableColumnsType<DataType> = [
  { title: "Sarlavha", dataIndex: "title", key: "title" },
  { title: "Matn", dataIndex: "body", key: "body" },
  { title: "#id", dataIndex: "id", key: "id" },
  { title: "#UserId", dataIndex: "userId", key: "userId" },
];

const Apptable: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      setDataSource(data.map((post:DataType)=> ({...post, key:post.id})));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changeableRowKeys) => {
          setSelectedRowKeys(
            changeableRowKeys.filter((_, index) => index % 2 === 0)
          );
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys) => {
          setSelectedRowKeys(
            changeableRowKeys.filter((_, index) => index % 2 !== 0)
          );
        },
      },
    ],
  };

  return loading ? <h1>Loading</h1>: (
    <Table<DataType>
      pagination={{
        position: ["bottomLeft"],
        locale: { next_page: "Keyingi", prev_page: "Oldingi" },
      }}
      rowSelection={rowSelection}
      columns={columns}
      dataSource={dataSource}
    />
  );
};

export default Apptable;
