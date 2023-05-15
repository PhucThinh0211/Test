import { ConfigProvider } from 'antd';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Root } from './pages/Root';
import './App.css'

export const App = () => (
  <ConfigProvider prefixCls="ant">
    <BrowserRouter basename="/">
      <Switch>
        <Route path="/" component={Root} />
      </Switch>
    </BrowserRouter>
  </ConfigProvider>
);
