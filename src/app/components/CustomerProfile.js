import { Button, Modal, Input, Typography } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

function CustomerProfile() {
  const [dataUser, setDataUser] = useState([]);
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editedData, setEditedData] = useState({});
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/user");
      const data = response.data;
      setDataUser(data);

      const initialFormData = {};
      data.forEach((user) => {
        initialFormData[user.Id] = user;
      });
      setFormData(initialFormData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setEditedData(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
    setEditedData({});
  };

  const handleSaveEdit = async () => {
    try {
      // Perform the update using the edited data
      await axios.put(`/api/user`, editedData);

      // Refresh the user data
      fetchData();

      // Close the modal
      handleCloseModal();
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div className="bg-white my-12 p-6 drop-shadow-sm rounded-lg">
      {dataUser.map((user) => (
        <div key={user.Id} className="flex justify-between items-center px-6">
          <div>
            <div>หมายเลขผู้ใช้บริการ: {user.Id}</div>
            <div>อีเมล: {user.Email}</div>
            <div>ชื่อ: {user.Name}</div>
            <div>โทรศัพท์: {user.Phone}</div>
            <div>ตำแหน่ง: {user.UserType}</div>
          </div>

          <Button type="primary" size="large" onClick={() => handleEdit(user)}>
            แก้ไข
          </Button>
        </div>
      ))}

      {/* Edit Modal */}
      <Modal
        title="แก้ไขข้อมูล โปรไฟล์"
        visible={showModal}
        onCancel={handleCloseModal}
        footer={[
          <Button key="cancel" onClick={handleCloseModal}>
            ยกเลิก
          </Button>,
          <Button key="submit" type="primary" onClick={handleSaveEdit}>
            บันทึก
          </Button>,
        ]}
      >
        <div className="flex flex-col gap-2">
          <div>
            <Typography.Title level={5}>อีเมล</Typography.Title>
            <Input
              placeholder="อีเมล"
              value={editedData.Email}
              className=""
              onChange={(e) =>
                setEditedData({ ...editedData, Email: e.target.value })
              }
            />
          </div>
          <div>
            <Typography.Title level={5}>ชื่อ</Typography.Title>
            <Input
              placeholder="ชื่อ"
              value={editedData.Name}
              onChange={(e) =>
                setEditedData({ ...editedData, Name: e.target.value })
              }
            />
          </div>
          <div>
            <Typography.Title level={5}>โทรศัพท์</Typography.Title>
            <Input
              placeholder="โทรศัพท์"
              value={editedData.Phone}
              onChange={(e) =>
                setEditedData({ ...editedData, Phone: e.target.value })
              }
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default CustomerProfile;
