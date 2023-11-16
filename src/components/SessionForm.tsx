import React, { useEffect, useState } from "react";
import { Button, Form, Input, DatePicker, TimePicker, Modal } from "antd";
import type { DatePickerProps } from "antd";
import AutocompleteSelect from "./AutocompleteSelect";
import ImageUploader from "./ImageUploader";
import { Avatar, List } from "antd";
import { DeleteFilled, PlusOutlined } from "@ant-design/icons";
import "../pages/layout/styles.css";
import { axiosInstance } from "../config/axios";
import dayjs from "dayjs";

const { TextArea } = Input;

const SessionForm = ({ formData, setFormData, form }: any) => {
  const [speackerList, setSpeakerLit] = useState([]);
  const [moderatorList, setModeratorList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formDataModal, setFormDataModal] = useState<any>({
    first_name: "",
    last_name: "",
    image: null,
    email: "",
  });

  console.log("formData", formData);

  useEffect(() => {
    if (formData.speakers || formData.moderators) {
      setSpeakerLit(formData.speakers);
      setModeratorList(formData.moderators);
    }
  }, [formData]);

  const onChangeDate: DatePickerProps["onChange"] = (date, dateString) => {
    setFormData({ ...formData, date: dateString });
  };

  const onChangeTime = (time: any, timeString: string, timeType: string) => {
    setFormData({ ...formData, [timeType]: timeString.split(" ")[0] });
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleInputModalChange = (e: any) => {
    const { name, value } = e.target;
    setFormDataModal({ ...formDataModal, [name]: value });
  };

  const handleSpeakerChange = (selectedSpeakers: any) => {
    setSpeakerLit(selectedSpeakers);
    const arrayOfIds = selectedSpeakers.map((speaker: any) => speaker.value);
    setFormData({ ...formData, speaker_ids: arrayOfIds });
  };

  const handleModeratorChange = (selectedModerators: any) => {
    setModeratorList(selectedModerators);
    const arrayOfIds = selectedModerators.map(
      (moderator: any) => moderator.value
    );
    setFormData({ ...formData, moderator_ids: arrayOfIds });
  };

  const handleAddUser = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    axiosInstance.post("create-users", { ...formDataModal, event_id: 19 });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Form form={form} layout="vertical" className="formModal">
      <Form.Item label="Session Title" required>
        <Input
          name="title"
          placeholder="Start Typing..."
          value={formData.title}
          onChange={handleInputChange}
        />
      </Form.Item>
      <Form.Item label="Session Subtitle" required>
        <Input
          name="subtitle"
          placeholder="Start Typing..."
          value={formData.subtitle}
          onChange={handleInputChange}
        />
      </Form.Item>
      <Form.Item name="cover_image" label="Thumbnail">
        <span className="formItemVal"> {formData.cover_image}</span>
        <ImageUploader
          type="session"
          value={
            formData.cover_image ? [{ dataURL: formData.cover_image }] : []
          }
          onChangeImage={(file: any) =>
            setFormData({ ...formData, cover_image: file[0]?.dataURL })
          }
        />
      </Form.Item>

      <div style={{ display: "flex", gap: "1rem" }}>
        <Form.Item name="date" label="Date" required style={{ width: "50%" }}>
          <span className="formItemVal">{formData.date}</span>
          <DatePicker
            onChange={onChangeDate}
            style={{ width: "100%" }}
            value={formData.date ? dayjs(formData.date) : dayjs()}
          />
        </Form.Item>
        <Form.Item name="from" label="From" required>
          <span className="formItemVal">{formData.from}</span>
          <TimePicker
            value={formData.from ? dayjs(formData.from, "HH:mm") : dayjs()}
            use12Hours
            format="h:mm"
            onChange={(time, timeString) =>
              onChangeTime(time, timeString, "from")
            }
          />
        </Form.Item>
        <Form.Item name="till" label="Till">
          <span className="formItemVal">{formData.till}</span>
          <TimePicker
            value={formData.till ? dayjs(formData.till, "HH:mm") : dayjs()}
            use12Hours
            format="h:mm a"
            onChange={(time, timeString) =>
              onChangeTime(time, timeString, "till")
            }
          />
        </Form.Item>
      </div>
      <Form.Item label="Description" required>
        <TextArea
          name="description"
          rows={4}
          placeholder="Start Typing..."
          value={formData.description}
          onChange={handleInputChange}
        />
      </Form.Item>

      <hr />

      <Form.Item name="speaker_ids" label="Speakers">
        <div style={{ display: "flex", gap: "1rem" }}>
          <AutocompleteSelect onChange={handleSpeakerChange} />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={handleAddUser}
          />
        </div>
        <List
          style={{ marginTop: "1rem" }}
          itemLayout="horizontal"
          dataSource={speackerList}
          renderItem={(item, index) => (
            <List.Item actions={[<DeleteFilled />]}>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                  />
                }
                title={<a href="https://ant.design">{item["label"]}</a>}
              />
            </List.Item>
          )}
        />
      </Form.Item>

      <Form.Item name="moderator_ids" label="Moderators">
        <div style={{ display: "flex", gap: "1rem" }}>
          <AutocompleteSelect onChange={handleModeratorChange} />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={handleAddUser}
          />
        </div>
        <List
          style={{ marginTop: "1rem" }}
          itemLayout="horizontal"
          dataSource={moderatorList}
          renderItem={(item, index) => (
            <List.Item actions={[<DeleteFilled />]}>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                  />
                }
                title={<a href="https://ant.design">{item["label"]}</a>}
              />
            </List.Item>
          )}
        />
      </Form.Item>
      <Modal
        title="Add Speaker / Moderator"
        open={isModalOpen}
        footer={[
          <Button key="cancel" type="primary" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" onClick={handleOk}>
            Add
          </Button>,
        ]}
      >
        <Form layout="vertical" className="formModal">
          <Form.Item label="Photo">
            <ImageUploader
              type="profile"
              name="image"
              value={
                formDataModal.image ? [{ dataURL: formDataModal.image }] : []
              }
              onChangeImage={(file: any) =>
                setFormDataModal({ ...formDataModal, image: file[0]?.dataURL })
              }
            />
          </Form.Item>
          <Form.Item label="First Name" required>
            <Input
              name="first_name"
              placeholder="Start Typing..."
              onChange={handleInputModalChange}
            />
          </Form.Item>
          <Form.Item label="Last Name" required>
            <Input
              name="last_name"
              placeholder="Start Typing..."
              onChange={handleInputModalChange}
            />
          </Form.Item>
          <Form.Item label="Email">
            <Input
              name="email"
              placeholder="Start Typing..."
              onChange={handleInputModalChange}
            />
          </Form.Item>
        </Form>
      </Modal>
    </Form>
  );
};

export default SessionForm;
