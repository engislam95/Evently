import React from "react";
import { Table, Space, Avatar } from "antd";
import type { TableProps } from "antd/es/table";
import {
  EditOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  RightOutlined,
} from "@ant-design/icons";

import "../pages/layout/styles.css";

interface DataType {
  key: React.Key;
  id: string;
  title: string;
  from: string;
  till: string;
  date: string;
  Venue: string;
  cover_image: string;
}

interface TableTypes {
  data: DataType[];
  editSession: (id: string) => void;
}

const { Column } = Table;

const TableView = ({ data, editSession }: TableTypes) => {
  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const url =
    "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg";

  return (
    <Table
      className="tableView"
      dataSource={data}
      onChange={onChange}
      pagination={{ pageSize: 10 }}
      scroll={{ y: 400 }}
    >
      <Column
        width={600}
        title="Session Name"
        dataIndex="title"
        key="title"
        sorter={(a: any, b: any) => a.title.length - b.title.length}
        render={(_: any, record: DataType) => (
          <>
            <Avatar
              shape="square"
              size={50}
              src={record.cover_image ? record.cover_image : url}
              style={{ marginRight: "1rem" }}
            />
            {record.title}
          </>
        )}
      />
      <Column
        title="Date"
        dataIndex="date"
        key="date"
        render={(_: any, record: DataType) => (
          <>
            <CalendarOutlined />
            {record.date}
          </>
        )}
      />
      <Column
        title="Time"
        dataIndex="from"
        key="from"
        render={(_: any, record: DataType) => (
          <>
            <ClockCircleOutlined />
            {record.from} - {record.till}
          </>
        )}
      />
      <Column
        title="Venue"
        dataIndex="venue"
        key="venue"
        render={(venue: any) => <>{venue?.name}</>}
      />
      <Column
        width={100}
        title=""
        key="action"
        render={(_: any, record: DataType) => (
          <Space size="small" className="spaceActions">
            <EditOutlined onClick={() => editSession(record.id)} />
            <RightOutlined />
          </Space>
        )}
      />
    </Table>
  );
};

export default TableView;
