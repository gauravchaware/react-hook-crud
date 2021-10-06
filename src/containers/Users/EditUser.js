import React, { useEffect, useState } from "react";
import { Form, Input, Button, notification, Space } from "antd";
import { useHistory } from "react-router-dom";
import { putUser, getUserById } from "../../services/users";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */

const openNotificationWithIcon = (type, message) => {
  notification[type]({
    message: message,
  });
};

const EditUser = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const url = history.location.pathname;
    const id = url.substring(url.lastIndexOf("/") + 1);
    setIsLoading(true);
    getUserById(id)
      .then((res) => {
        console.log("res", res);
        form.setFieldsValue(res.data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        openNotificationWithIcon("error", "Error in getting user.");
      });
  }, []);

  const onFinish = (values) => {
    const url = history.location.pathname;
    const id = url.substring(url.lastIndexOf("/") + 1);
    setIsLoading(true);
    putUser(id, values)
      .then(() => {
        setIsLoading(false);
        openNotificationWithIcon("success", "User updated successfully.");
        history.push("/users");
      })
      .catch(() => {
        openNotificationWithIcon("error", "Error in user creation.");
        setIsLoading(false);
      });
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      <div>
        {" "}
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
          form={form}
        >
          <Form.Item name={"name"} label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name={"email"}
            label="Email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name={"phone"} label="Phone" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={"address"} label="Address">
            <Input.TextArea />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
            <Space>
              <Button loading={isLoading} type="primary" htmlType="submit">
                Update
              </Button>
              <Button htmlType="button" onClick={onReset}>
                Reset
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default EditUser;
