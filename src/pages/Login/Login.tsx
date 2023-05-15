import React, { useEffect, useState } from 'react'
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Space,
  Typography,
} from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import styles from './Form.module.css';
import loginBg from '../../image/loginBg.svg';
import { useDispatch } from 'react-redux';
import { loginRequest } from '../../store/controls/LoginEpic';
import { LoginInfo } from '../../common/define-types';
import { useSelectorRoot } from '../../store/store';

const { Text, Link } = Typography
export const Login = () => {
  const history = useHistory()
  const location = useLocation();
  const dispatch = useDispatch();
  const isSuccess = useSelectorRoot(state => state.login.isSuccess);
  const [error, setErrorState] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const [form] = Form.useForm()

  const fetchToken = async (values: any) => {
    const { remember, username, password} = values
    setErrorState(false)
    try {
      setErrorState(false);
      var loginInfo: LoginInfo = {
        username: username,
        password: password,
        remember: remember,
      }
      dispatch(loginRequest(loginInfo));
    } catch (err: any) {
      handleLoginError(err)
    }
  }
  
  const loginSuccess = () => {
    const { from } = location.state || ({ from: { pathname: '/' } } as any) // LocationState

      history.replace(
        from && from.pathname === '/login' ? { from: { pathname: '/' } } : from,
      )
  }

  const handleLoginError = (err: any) => {
    setErrorState(true)
    let msg = 'Có một lỗi xảy ra trong quá trình đăng nhập'
    if (err.isAxiosError) {
      const { status } = err.toJSON()
      if (err.response) {
        const { data } = err.response
        if (status === 400 && data['error'] === 'invalid_grant') {
          msg = 'Sai mật khẩu hoặc tên đăng nhập'
        }
      }
      setErrorMsg(msg)
      setErrorState(true)
    }
  }
  useEffect(() => {
    if (isSuccess) {
      loginSuccess();
    }
  }, [isSuccess]);

  return (
    <Row justify="space-around" style={{ height: '100%' }}>
      <Col sm={24} md={18} lg={16} xl={16} xxl={16}>
        <img src={loginBg} 
        alt='login'
        sizes='cover'
        className={styles.imgLogin}/>
      </Col>
      
      <Col sm={24} md={18} lg={16} xl={8} xxl={8}>
        <div
          className={styles.form}
        >
          <div className={styles.header}>
            <Typography.Title level={3} style={{color:'#005BA5'}}>Demo</Typography.Title>
          </div>
          <Form
            layout="vertical"
            name="login"
            form={form}
            onFinish={fetchToken}
            requiredMark={false}
          >
            <Form.Item
              label="Email hoặc tên đăng nhập"
              name="username"
              rules={[
                { type: 'email', message: 'Email không đúng định dạng' },
                { required: true, message: 'Nhập email hoặc tên đăng nhập của bạn' },
              ]}
            >
              <Input placeholder='Nhập email hoặc tên đăng nhập' />
            </Form.Item>
            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: 'Nhập mật khẩu' }]}
            >
              <Input.Password placeholder='Nhập mật khẩu'/>
            </Form.Item>
            
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox ><Text style={{color: '#4B465CAA'}}>Ghi nhớ đăng nhập</Text></Checkbox>
              </Form.Item>
            </Form.Item>
            <Space direction="vertical">
              {error && <Text type="danger">{errorMsg}</Text>}
            </Space>
            <Form.Item>
              <Row>
                
                <Col span={24} style={{ textAlign: 'center' }}>
                  <Button
                    key="confirmButton"
                    form="login"
                    type="primary"
                    size="large"
                    htmlType="submit"
                    style={{width: '90%'}}
                  >
                    Đăng nhập
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  )
}
