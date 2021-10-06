import React, { useEffect, useState } from "react";
import { Table, Input, Button, Alert, Space, notification, Modal } from "antd";
import { useHistory } from "react-router-dom";
import { getUsers, deleteUser } from "../../services/users";
import { userColumns } from "../../constants";

const { Search } = Input;

const openNotificationWithIcon = (type, message) => {
  notification[type]({
    message: message,
  });
};

const Users = () => {
  const history = useHistory();
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [metaData, setMetaData] = useState({
    pageNumber: 1,
    pageSize: 5,
    total: 0,
    sorter: null,
    search: null,
  });

  useEffect(() => {
    getAllUsers(metaData);
  }, []);

  const getAllUsers = ({ pageNumber, pageSize, sorter, search }) => {
    setIsLoading(true);

    let field = null;
    let order = null;

    if (sorter && sorter.field && sorter.order) {
      field = sorter.field;
      order = sorter.order === "ascend" ? "asc" : "desc";
    }

    let queryString = `_page=${pageNumber}&_limit=${pageSize}${
      field && order ? `&_sort=${field}&_order=${order}` : ""
    }`;
    if (search) {
      queryString = `${queryString}${`&q=${search}`}`;
    }

    getUsers(queryString)
      .then((res) => {
        setUserData(res.data);
        setMetaData({
          pageNumber,
          pageSize,
          sorter,
          search,
          total: res.headers["x-total-count"],
        });
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError("Something went wrong.");
      });
  };

  const onSearch = (value) => {
    const newMetaData = {
      ...metaData,
      search: value,
    };
    setMetaData(newMetaData);
    getAllUsers({ ...newMetaData, pageNumber: 1 });
  };

  const addUser = () => {
    history.push("/users/create");
  };

  const removeUser = (record) => {
    deleteUser(record.id)
      .then(() => {
        openNotificationWithIcon("success", "User deleted sucessfully.");
        getAllUsers(metaData);
      })
      .catch(() => {
        openNotificationWithIcon("warning", "User not deleted.");
      });
  };

  const editUser = (record) => {
    history.push(`/users/edit/${record?.id}`);
  };

  return (
    <>
      <div>
        <h3>Manage Users</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <Search
            placeholder="search name, email"
            onSearch={onSearch}
            enterButton
            allowClear
            style={{ width: 250 }}
          />
          <Button type="primary" onClick={addUser}>
            Add user
          </Button>
        </div>
        <Table
          bordered
          loading={isLoading}
          dataSource={userData}
          columns={[
            ...userColumns,
            {
              title: "Action",
              dataIndex: "",
              key: "x",
              width: 80,
              render: (text, record) => (
                <Space>
                  <Button type="link" block onClick={() => editUser(record)}>
                    Edit
                  </Button>
                  <Button type="link" block onClick={() => removeUser(record)}>
                    Delete
                  </Button>
                </Space>
              ),
            },
          ]}
          rowKey={(row) => row.id}
          onChange={(page, filters, sorter) => {
            const newMetaData = {
              ...metaData,
              pageNumber: page.current,
              sorter,
            };
            setMetaData(newMetaData);
            getAllUsers(newMetaData);
          }}
          pagination={{
            showSizeChanger: false,
            showQuickJumper: true,
            pageSize: metaData?.pageSize,
            defaultCurrent: metaData?.pageNumber,
            current: metaData?.pageNumber,
            total: metaData?.total,
          }}
        />
        {error && <Alert message={error} type="error" />}
      </div>
    </>
  );
};

export default Users;
