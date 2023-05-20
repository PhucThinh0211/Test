import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Space,
  Tooltip,
  Typography,
} from "antd";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import styles from "./Form.module.css";
import { useDispatch } from "react-redux";
import { loginRequest } from "../../store/controls/LoginEpic";
import { LoginInfo } from "../../common/define-types";
import { useSelectorRoot } from "../../store/store";
import HeaderLogo from "../../image/icon/jasminelogo.svg";
import { ReloadOutlined } from "@ant-design/icons";
import IdentityApi from "api/identity/identity.api";
import FacebookIcon from "image/icon/facebook-icon.svg";
import GoogleIcon from "image/icon/google-icon.svg";

const { Text } = Typography;

export const Login = () => {
  const [formType, setFormType] = useState("login");
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const isSuccess = useSelectorRoot((state) => state.login.isSuccess);
  const selectLoginErr = useSelectorRoot((state) => state.login.message?.error);
  const [error, setErrorState] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [captchaId, setCaptchaId] = useState("");
  const [captchaUrl, setCaptchaUrl] = useState("");

  const [form] = Form.useForm();

  const fetchToken = async (values: any) => {
    const { remember, username, password, captcha } = values;
    setErrorState(false);
    try {
      setErrorState(false);
      var loginInfo: LoginInfo =
        captchaId === ""
          ? {
              username: username,
              password: password,
              remember: remember,
            }
          : {
              username: username,
              password: password,
              remember: remember,
              captchaId,
              captcha,
            };
      dispatch(loginRequest(loginInfo));
    } catch (err: any) {
      handleLoginError(err);
    }
  };

  const resetPassword = async (values: any) => {
    const { remember, username, password } = values;
    setErrorState(false);
    try {
      setErrorState(false);
      var loginInfo: LoginInfo = {
        username: username,
        password: password,
        remember: remember,
      };
      dispatch(loginRequest(loginInfo));
    } catch (err: any) {
      handleLoginError(err);
    }
  };

  const loginSuccess = useCallback(() => {
    const { from } = location.state || ({ from: { pathname: "/" } } as any); // LocationState

    history.replace(
      from && from.pathname === "/login" ? { from: { pathname: "/" } } : from
    );
    setErrorState(false);
  }, [history, location]);

  const handleLoginError = (err: any) => {
    setErrorState(true);
    let msg = "Có một lỗi xảy ra trong quá trình đăng nhập";
    if (err?.name === "AjaxError") {
      const { status } = err;
      if (err.response) {
        const { data } = err.response;
        if (status === 400 && err.response["error"] === "invalid_grant") {
          msg = "Sai mật khẩu hoặc tên đăng nhập";
        }
        if (status === 400 && err.response["error"] === "invalid_request") {
          setCaptchaId(err.response.CaptchaId);
          setCaptchaUrl(`data:image/png;base64,${err.response.Captcha}`);
        }
      }
      setErrorState(true);
    }
    setErrorMsg(msg);
  };

  const getCaptcha = () => {
    const username = form.getFieldValue("username");
    IdentityApi.getCaptcha(username ?? "").subscribe((res) => {
      setCaptchaId(res.CaptchaId);
      setCaptchaUrl(`data:image/png;base64,${res.Captcha}`);
    });
  };

  useEffect(() => {
    if (isSuccess) {
      loginSuccess();
    } else {
      if (selectLoginErr !== null && selectLoginErr) {
        handleLoginError(selectLoginErr);
      } else {
        setErrorMsg("");
        setErrorState(false);
      }
    }
  }, [isSuccess, loginSuccess, selectLoginErr]);

  return (
    <div className={styles.loginContainer}>
      <Form
        layout="vertical"
        name={formType === "login" ? "login" : "forgotPassword"}
        form={form}
        onFinish={formType === "login" ? fetchToken : resetPassword}
        requiredMark={false}
        className={styles.loginForm}
      >
        <div className={styles.loginHeader}>
          <div className={styles.logoContainer}>
            <img src={HeaderLogo} alt="Logo" className={styles.logo} />
          </div>
          <Typography.Title level={3} style={{ textAlign: "center" }}>
            {formType === "login" ? "Welcome back!" : "Forgot Password "}
          </Typography.Title>
          {formType === "login" && (
            <span>Sign in by entering the information below</span>
          )}
        </div>

        <Form.Item
          label={<Typography.Text strong>Email</Typography.Text>}
          name="username"
          rules={[
            { type: "email", message: "Email không đúng định dạng" },
            {
              required: true,
              message: "Nhập email hoặc tên đăng nhập của bạn",
            },
          ]}
        >
          <Input placeholder="Nhập email hoặc tên đăng nhập" />
        </Form.Item>
        {formType === "login" ? (
          <>
            <Form.Item
              label={<Typography.Text strong>Password</Typography.Text>}
              name="password"
              rules={[{ required: true, message: "Nhập mật khẩu" }]}
            >
              <Input.Password placeholder="Nhập mật khẩu" />
            </Form.Item>
            {captchaId !== "" && captchaId && (
              <Form.Item
                label={<Typography.Text strong>Confirm code</Typography.Text>}
              >
                <Form.Item
                  name="captcha"
                  style={{ display: "inline-block", width: "calc(70% - 8px)" }}
                  rules={[
                    {
                      required: true,
                      message: "Không được bỏ trống",
                    },
                  ]}
                >
                  <Input placeholder="Nhập mã xác thực" />
                </Form.Item>
                <Form.Item
                  style={{
                    display: "inline-block",
                    width: "calc(30% - 8px)",
                    margin: "0 8px",
                  }}
                >
                  <div style={{ display: "flex", gap: 5 }}>
                    <img
                      src={captchaUrl}
                      alt="captcha"
                      style={{
                        width: "100%",
                        height: "auto",
                        maxHeight: "32px",
                        objectFit: "cover",
                      }}
                    />
                    <Tooltip title="Refresh Captcha">
                      <ReloadOutlined onClick={getCaptcha} />
                    </Tooltip>
                  </div>
                </Form.Item>
              </Form.Item>
            )}
            <Space className={styles.rememberAndForgot}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>
                  <Text style={{ color: "#4B465CAA" }}>Remember me</Text>
                </Checkbox>
              </Form.Item>
              <span
                className={styles.Link}
                onClick={() => setFormType("forgotPassword")}
              >
                Forgot password
              </span>
            </Space>
            <Space direction="vertical">
              {error && <Text type="danger">{errorMsg}</Text>}
            </Space>
            <Form.Item>
              <Row>
                <Col span={24} style={{ textAlign: "center" }}>
                  <Button
                    key="confirmButton"
                    form="login"
                    type="primary"
                    size="large"
                    htmlType="submit"
                    className={styles.button}
                    style={{ width: "100%" }}
                  >
                    LOGIN
                  </Button>
                </Col>
              </Row>
            </Form.Item>
            {/* Dont need yet */}
            <Space className={styles.rememberAndForgot}>
              <div className={styles.socialLogin}>
                <span>Or login with</span>
                <img src={FacebookIcon} alt="facebook" />
                <img src={GoogleIcon} alt="google" />
              </div>
              {/* <NavLink to={"/signup"}>Create an account</NavLink> */}
              <span className={styles.Link}>Create an account</span>
            </Space>
          </>
        ) : (
          <Space size={20} style={{ marginInline: "auto" }}>
            <Button
              form="forgorPassword"
              size="large"
              htmlType="submit"
              className={styles.button}
              onClick={() => setFormType("login")}
            >
              Back to login
            </Button>
            <Button
              form="forgorPassword"
              type="primary"
              size="large"
              htmlType="submit"
              className={styles.button}
            >
              Reset password
            </Button>
          </Space>
        )}
      </Form>
    </div>
  );
};
