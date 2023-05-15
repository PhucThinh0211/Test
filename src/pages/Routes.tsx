import React, { ReactNode } from 'react'
import { RouteProps } from 'react-router-dom'
import Chart from '../image/icon/chart-bar.svg'
import Users from '../image/icon/users.svg'
import User from '../image/icon/user.svg'
import Brand from '../image/icon/brand-tabler.svg'
import {  UserManager } from './screen/UserManager/UserManager'
import { Admin } from './screen/admin/Admin'

export const enum RootClaim {
  System = 'System',
  Admin = 'Admin',
  User = 'User',
  All = 'All'
}

export interface RouteObj {
  label: string
  icon?: string;
  rootPermission?: RootClaim[]
  routeProps?: RouteProps
  documentTitle?: string;
  items?: RouteObj[];
  color?: string;
  isRoot?: boolean;
}

export const Routes: RouteObj[] = [
  {
    label: 'Khách hàng',
    color: '#22222255',
    isRoot: true
  },
  {
    label: 'Khách hàng',
    icon: Users,
    routeProps: {
      path: '/client'
    },
    rootPermission: [RootClaim.All],
    items: [
      {
        label: 'Quản lý khách hàng',
        routeProps: {
          path: '/quanlyuser',
          children: <UserManager></UserManager>,
        },
        rootPermission: [RootClaim.All],
        color: '#22222255'
      },
    ]
  },
  {
    label: 'Quản lý nội bộ',
    color: '#22222255',
    isRoot: true
  },
  {
    label: 'Quản trị viên',
    icon: User,
    rootPermission: [RootClaim.All],
    items: [
      {
        label: 'Quản lý quản trị viên',
        routeProps: {
          path: '/admin',
          children: <Admin></Admin>,
        },
        rootPermission: [RootClaim.All],
        color: '#22222255'
        
      },
      
    ]
  },
]
