export const userColumns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    sorter: true,
    width: 250,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    sorter: true,
    width: 300,
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
    sorter: true,
    width: 250,
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    render: (text, record) => {
      return <div>{record?.address || "NA"}</div>;
    },
  },
];
