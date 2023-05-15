import { Button, Col, Form, Input, Modal, Row } from "antd";
import {SaveOutlined} from '@ant-design/icons'

export const Profile = (prop:{open: boolean, onClose?: () => void}) => {
    const [form] = Form.useForm();
    const submit = (value: any) => {
        console.log(value);
        prop.onClose && prop.onClose();
    };
    return (
        <Modal title={'Thông tin tài khoản'} 
            centered
            width={'80vh'}
            open={prop.open}
            footer={<></>} 
            // onCancel={() => {prop.onClose && prop.onClose()}}x
            closeIcon={
            <Button 
            form="profile"
            type="primary"
            htmlType="submit"
            style={{position: 'relative', left: '-105px'}}
            onClick={(e) => {submit(form.getFieldsValue());}}
            icon={<SaveOutlined></SaveOutlined>} >
                {'Lưu  thay đổi'}
            </Button>}
         >
            <Form
            layout="vertical"
            name="profile"
            form={form}
            onFinish={submit}
            requiredMark={false}
            >
            <Row>
                <Col span={12} style={{padding: 12}}>
                    <Form.Item
                    label="Họ và tên"
                    name="fullName"
                    rules={[
                        { required: true, message: 'Không được để trống' },
                    ]}
                    >
                        <Input placeholder='Nhập họ và tên' />
                    </Form.Item>
                </Col>
                <Col span={12} style={{padding: 12}}>
                    <Form.Item
                    label="Tên đăng nhập"
                    name="username"
                    rules={[
                        { required: true, message: 'Không được để trống' },
                    ]}
                    >
                        <Input placeholder='Nhập tên đăng nhập' />
                    </Form.Item>
                </Col>
                
            </Row>
            <Row>
                <Col span={12} style={{padding: 12}}>
                    <Form.Item
                    label="Địa chỉ email"
                    name="email"
                    rules={[
                        { required: true, message: 'Không được để trống' },
                    ]}
                    >
                        <Input placeholder='Nhập địa chỉ email' />
                    </Form.Item>
                </Col>
                <Col span={12} style={{padding: 12}}>
                    <Form.Item
                    label="Soos điện thoại"
                    name="phone"
                    rules={[
                        { required: true, message: 'Không được để trống' },
                    ]}
                    >
                        <Input placeholder='Nhập số điện thoại' />
                    </Form.Item>
                </Col>
                
            </Row>
            <Row>
                <Col span={12} style={{padding: 12}}>
                    <Form.Item
                    label="Mật khẩu mới"
                    name="newPassword"
                    rules={[
                        { required: true, message: 'Không được để trống' },
                    ]}
                    >
                        <Input placeholder='Nhập mật khẩu mới' type="password"/>
                    </Form.Item>
                </Col>
                <Col span={12} style={{padding: 12}}>
                    <Form.Item
                    label="Nhập lại mật khẩu mới"
                    name="reNewPassword"
                    rules={[
                        { required: true, message: 'Không được để trống' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (!value || getFieldValue('newPassword') === value) {
                                return Promise.resolve();
                              }
                              return Promise.reject(new Error('Không khớp mật khẩu'));
                            },
                          }),
                    ]}
                    >
                        <Input placeholder='Nhập lại mật khẩu mới' type="password"/>
                       
                    </Form.Item>
                </Col>
                
            </Row>
            </Form>
        </Modal>
    );
}