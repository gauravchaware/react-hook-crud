import React, { useState } from "react";
import { Form, Input, Button, notification, Space } from "antd";
import { useHistory } from "react-router-dom";
import { postUser } from "../../services/users";

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

const CreateUser = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = (values) => {
    setIsLoading(true);
    postUser(values)
      .then(() => {
        setIsLoading(false);
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
                Submit
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

export default CreateUser;
