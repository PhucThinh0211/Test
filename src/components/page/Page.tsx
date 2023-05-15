import React, { FC, useEffect, useState } from 'react';
import { Avatar, Button, Col, Layout, LayoutProps, Row, Typography } from 'antd';
import { UserOutlined, DownOutlined } from '@ant-design/icons';

import { useDispatch } from 'react-redux';
import { setTitle } from '../../store/slice/controlSlice';
import { useSelectorRoot } from '../../store/store';
import { Profile } from '../../pages/Profile/Profile';
import { LinkBreadcrum } from '../../pages/Breadcrum/LinkBreadcrum';

const { Content } = Layout;

const {Text} = Typography;

interface PageProps {
  title?: string;
}

export const Page: FC<LayoutProps & PageProps> = ({
  children,
  title,
  className,
  ...props
}) => {
  const {user} = useSelectorRoot(x => x.login)
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (title) {
      dispatch(setTitle(title));
    }
  }, []);
  const onClick = () => {
    setOpen(true);
  }

  return (
    <>
    <Layout {...props}>
      <Content >
        <Row style={{padding: "27px 0px 0px 30px"}}>
            <Col span={18}>
                <Text style={{fontSize: 30, color: "#005BA5", fontWeight: 500}}>{title}</Text>
            </Col>
            <Col span={6}>
              
              <Row align={'middle'} style={{justifyContent: 'flex-end'}}>
                <Button type='text' onClick={onClick} style={{height: '40px'}}>
                  <Avatar size={30} icon={<UserOutlined />} ></Avatar>
                
                  <Text style={{fontSize: 15, color: "#005BA5", fontWeight: 500, marginLeft: '10px', marginRight: '15px'}}>{user?.fullName}</Text>
                
                  <DownOutlined></DownOutlined>
                
              </Button>
              </Row>
             
            </Col>
        </Row>
        <Row>
          <LinkBreadcrum></LinkBreadcrum>
        </Row>
        <Row style={{padding: 17, overflowY: 'scroll', height: "cal(100vh - 100px)"}}>
          {children}
        </Row>
      </Content>
    </Layout>
    <Profile open={open} onClose={() => setOpen(false)}></Profile>
    </>
  );
};
