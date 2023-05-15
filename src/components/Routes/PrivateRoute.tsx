import React, { Children, FC, ReactNode } from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { NotAllowed } from './NotAllowed';
import { RootClaim } from '../../pages/Routes';
import { useSelectorRoot } from '../../store/store';
import { Layout } from 'antd';
import { Page } from '../page/Page';

interface PrivateRouteProps extends RouteProps {
  allowedRoles: Array<RootClaim>;
  label: string;
}

export const PrivateRoute: FC<PrivateRouteProps> = ({ children, allowedRoles, label, ...rest }) => {
  const userRoles = useSelectorRoot(state => state.login.role );
  const roles = allowedRoles.filter((r) => userRoles?.name === r || r === 'All');
  return (
    <Route
      {...rest}
      render={roles.length > 0 ? () =>(
        <Layout>
          <Page title={label}>
          {children as ReactNode}
          </Page>
        </Layout>
        ) 
        : () => (<NotAllowed />)}

    />
  );
};
