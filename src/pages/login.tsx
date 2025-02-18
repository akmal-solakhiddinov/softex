import React, { useEffect } from "react";
import { Button, Form, Input } from "antd";
import type { FormItemProps } from "antd";
import {  UserOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router";
import { IUser } from "../lib/types";

const MyFormItemContext = React.createContext<(string | number)[]>([]);

interface MyFormItemGroupProps {
  prefix: string | number | (string | number)[];
}

function toArr(
  str: string | number | (string | number)[]
): (string | number)[] {
  return Array.isArray(str) ? str : [str];
}

const MyFormItemGroup: React.FC<
  React.PropsWithChildren<MyFormItemGroupProps>
> = ({ prefix, children }) => {
  const prefixPath = React.useContext(MyFormItemContext);
  const concatPath = React.useMemo(
    () => [...prefixPath, ...toArr(prefix)],
    [prefixPath, prefix]
  );

  return (
    <MyFormItemContext.Provider value={concatPath}>
      {children}
    </MyFormItemContext.Provider>
  );
};

const MyFormItem = ({ name, ...props }: FormItemProps) => {
  const prefixPath = React.useContext(MyFormItemContext);
  const concatName =
    name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;

  return <Form.Item name={concatName} {...props} />;
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const onFinish = (value: { user: IUser }) => {
    if (!value.user.login || !value.user.password) {
      alert("Missing values");
      return;
    }

    const local = localStorage.getItem("user");
    const storedUser = local ? JSON.parse(local) : null;

    if (storedUser) {
      console.log("exist");
      if (storedUser.user.password === value.user.password) {
        navigate("/");
      } else {
        alert("Wrong password with this login");
      }
    } else {
      localStorage.setItem("user", JSON.stringify(value));
      navigate("/");
    }
  };

  useEffect(() => {
    const local = localStorage.getItem("user");
    if (local) navigate("/");
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <div
        style={{
          backgroundColor: "#3178C6",
          width: "60%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src="./ts.png" alt="ts" width={700} height={150} />
      </div>
      <div
        style={{
          width: "40%",
          height: "100vh",
          padding: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Form
          name="form_item_path"
          layout="vertical"
          onFinish={onFinish}
          style={{ minWidth: "70%" }}
        >
          <h1 style={{ textAlign: "center"  , fontSize:"40px"
          }}>Sign in</h1>

          <MyFormItemGroup prefix={["user"]}>
            <MyFormItem name="login" label="Login">
              <Input placeholder="Login"suffix={<UserOutlined />}/>
            </MyFormItem>
            <MyFormItem name="password" label="Password">
              <Input type="password" placeholder="Password" suffix={<EyeOutlined />}/>
            </MyFormItem>
          </MyFormItemGroup>

          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
