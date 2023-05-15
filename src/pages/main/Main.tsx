import React, { useState } from 'react';
import { Layout } from 'antd';
import {
  Redirect, Route, RouteProps, Switch
} from 'react-router-dom';
import { RootClaim, Routes } from '../Routes';
import { PrivateRoute } from '../../components/Routes';
import { Page } from '../../components/page/Page';
import { WaitOverlay } from '../../components/overlay/WaitOverlay';

const { Content } = Layout;
export const Main = () => {

  const renderMain = () => {
    var routerProps: {label: string; routerProps:RouteProps; rootPermission?:RootClaim[]}[]   = []
    for (var item of Routes) {
      if (item.items && item.items.length > 0) {
        for(var child of item.items) {
          if (child.routeProps) {
            routerProps.push({
              label: child.label,
              routerProps: child.routeProps,
              rootPermission: child.rootPermission
            });
          }
        }
      }
      if (item.routeProps) {
        routerProps.push({
          label: item.label,
          routerProps: item.routeProps,
          rootPermission: item.rootPermission
        });
      }
    }
    return routerProps.map(({
      label,
      rootPermission,
      routerProps,
    }) => (
      <PrivateRoute
        allowedRoles={[...(rootPermission ?? [RootClaim.All])]}
        key={`${label}`}
        label={label}
        {...routerProps}
      />
    ))
  }
  return (
    <WaitOverlay >
      <Layout>
        <Content>
          <Switch>
            {renderMain()}
            <Redirect to="/admin" />
          </Switch>
        </Content>
      </Layout>
    </WaitOverlay>
  );
};
