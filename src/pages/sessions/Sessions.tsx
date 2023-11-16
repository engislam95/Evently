import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Spin, Modal, Form } from "antd";
import {
  HomeOutlined,
  CalendarOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import "./Session.styles.css";
import TableView from "../../components/TableView";
import { axiosInstance } from "../../config/axios";
import SessionForm from "../../components/SessionForm";
import type { UploadFile } from "antd/es/upload/interface";
import "../layout/styles.css";
import { changeDateFormat } from "../../utils/changeDateFormat";

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

const Sessions = () => {
  const [dataSource, setDataSource] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState<UploadFile>({} as UploadFile);
  const [form] = Form.useForm();
  const [formData, setFormData] = useState<any>({
    title: "",
    subtitle: "",
    cover_image: null,
    date: null,
    from: null,
    till: null,
    description: "",
    speaker_ids: [],
    moderator_ids: [],
  });

  useEffect(() => {
    axiosInstance
      .get("get-sessions?event_id=19&offset=0&limit=60")
      .then((response) => {
        response.data.sessions.map(
          (session: DataType) => (session.key = session.id)
        );
        setDataSource(
          response.data.sessions.filter((session: any) => session.title != "")
        );
      });
  }, []);

  const handleAddSession = () => {
    setFormData({});
    setFile({} as UploadFile);
    setIsModalOpen(true);
    form.resetFields();
  };

  const handleEditSession = async (id: string) => {
    axiosInstance.get(`session-details/${id}?event_id=19`).then((response) => {
      const newDate = changeDateFormat(response.data.date);
      const formDataSchema = {
        title: response.data.title,
        subtitle: response.data.subtitle,
        cover_image: response.data.cover_image,
        date: newDate,
        from: response.data.from,
        till: response.data.till,
        description: response.data.description,
        speaker_ids: response.data.speakers,
        moderator_ids: response.data.moderators,
      };
      setFormData(formDataSchema);
      setFile({} as UploadFile);
    });

    setIsModalOpen(true);
  };

  const handleSaveSession = () => {
    axiosInstance.post("create-sessions", { ...formData, event_id: 19 });
    handleCloseModal();
    form.resetFields();
  };

  const handleCloseModal = () => {
    setFormData({});
    setFile({} as UploadFile);
    setIsModalOpen(false);
  };

  const BreadcrumbItems = [
    {
      href: "",
      title: <HomeOutlined />,
    },
    {
      title: (
        <>
          <CalendarOutlined />
          <span> {!isModalOpen ? "All Sessions" : "New Session"} </span>
        </>
      ),
    },
  ];

  return (
    <div className="sessions">
      <div className="session_header">
        <Breadcrumb items={BreadcrumbItems} />
        {!isModalOpen ? (
          <Button
            icon={<PlusOutlined />}
            size="large"
            shape="default"
            onClick={handleAddSession}
          >
            New Session
          </Button>
        ) : (
          <div>
            <Button
              size="large"
              shape="default"
              type="primary"
              style={{ borderRadius: 0 }}
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
            <Button
              size="large"
              shape="default"
              onClick={handleSaveSession}
              style={{ borderRadius: 0 }}
            >
              Save
            </Button>
          </div>
        )}
      </div>
      {!isModalOpen && (
        <div className="session_table">
          {dataSource.length < 1 ? (
            <Spin />
          ) : (
            <TableView data={dataSource} editSession={handleEditSession} />
          )}
        </div>
      )}

      <Modal
        title=""
        open={isModalOpen}
        footer={null}
        width={800}
        style={{ top: "2rem" }}
      >
        <SessionForm
          form={form}
          formData={formData}
          setFormData={setFormData}
          setFile={setFile}
          file={file}
        />
      </Modal>
    </div>
  );
};

export default Sessions;
