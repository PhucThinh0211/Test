import React, { ReactNode } from "react";
import { RouteProps } from "react-router-dom";
import Chart from "../image/icon/chart-bar.svg";
import Users from "../image/icon/users.svg";
import User from "../image/icon/user.svg";
import Brand from "../image/icon/brand-tabler.svg";
import { UserManager } from "./screen/UserManager/UserManager";
import { Admin } from "./screen/admin/Admin";

export const enum RootClaim {
  System = "System",
  Admin = "Admin",
  User = "User",
  All = "All",
}

export interface RouteObj {
  label: string;
  icon?: string;
  rootPermission?: RootClaim[];
  routeProps?: RouteProps;
  documentTitle?: string;
  items?: RouteObj[];
  color?: string;
  isRoot?: boolean;
}

export const Routes: RouteObj[] = [
  {
    label: "Dashboard",
    color: "#22222255",
    routeProps: {
      path: "/dashboard",
    },
    isRoot: true,
  },
  {
    label: "Dịch vụ",
    rootPermission: [RootClaim.All],
    items: [
      {
        label: "Tours",
        routeProps: {
          path: "/tours",
          // children: <UserManager></UserManager>,
        },
        rootPermission: [RootClaim.All],
        color: "#22222255",
      },
      {
        label: "Tài xế",
        routeProps: {
          path: "/drivers",
          // children: <UserManager></UserManager>,
        },
        rootPermission: [RootClaim.All],
        color: "#22222255",
      },
      {
        label: "Motors",
        routeProps: {
          path: "/motors",
          // children: <UserManager></UserManager>,
        },
        rootPermission: [RootClaim.All],
        color: "#22222255",
      },
      {
        label: "Homestay",
        routeProps: {
          path: "/homestays",
          // children: <UserManager></UserManager>,
        },
        rootPermission: [RootClaim.All],
        color: "#22222255",
      },
      {
        label: "Nhà hàng",
        routeProps: {
          path: "/restaurants",
          // children: <UserManager></UserManager>,
        },
        rootPermission: [RootClaim.All],
        color: "#22222255",
      },
      {
        label: "Trạm xăng",
        routeProps: {
          path: "/stations",
          // children: <UserManager></UserManager>,
        },
        rootPermission: [RootClaim.All],
        color: "#22222255",
      },
      {
        label: "Đại lý bus",
        routeProps: {
          path: "/busAgents",
          // children: <UserManager></UserManager>,
        },
        rootPermission: [RootClaim.All],
        color: "#22222255",
      },
    ],
  },
  {
    label: "Đại lý",
    color: "#22222255",
    items: [
      {
        label: "Danh sách đại lý",
        routeProps: {
          path: "/agents",
          // children: <UserManager></UserManager>,
        },
        rootPermission: [RootClaim.All],
        color: "#22222255",
      },
      {
        label: "Chính sách hoa hồng",
        routeProps: {
          path: "/commission",
          // children: <UserManager></UserManager>,
        },
        rootPermission: [RootClaim.All],
        color: "#22222255",
      },
    ],
  },
  {
    label: "Vận hành tour",
    isRoot: true,
    rootPermission: [RootClaim.All],
  },
  {
    label: "Báo cáo",
    rootPermission: [RootClaim.All],
    items: [
      {
        label: "Quản lý quản trị viên",
        routeProps: {
          path: "/admin",
          // children: <Admin></Admin>,
        },
        rootPermission: [RootClaim.All],
        color: "#22222255",
      },
    ],
  },
  {
    label: "Activity log",
    isRoot: true,
    rootPermission: [RootClaim.All],
  },
];
