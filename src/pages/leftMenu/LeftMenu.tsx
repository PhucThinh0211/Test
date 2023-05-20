import React, { useEffect, useState } from "react";
import { Button, Layout, Menu, Typography } from "antd";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelectorRoot } from "../../store/store";
import { pushBreadcrum, setCollap } from "../../store/slice/controlSlice";
import { RouteObj, Routes } from "../Routes";
import CaratRight from "remixicon-react/ArrowRightSLineIcon";
import CaratLeft from "remixicon-react/ArrowLeftSLineIcon";
import logo from "../../logo.svg";
import styles from "./LeftMenu.module.css";
import HeaderLogo from "../../image/icon/Header-logo.svg";
import { FloatingActionButton } from "../../components/Buttons/FloatingActionButton";
import { ReactSVG } from "react-svg";
import styled from "styled-components";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
const { Text } = Typography;
interface SVGProps {
  $filled?: boolean;
  $colorText?: string;
}
const SVG = styled(ReactSVG)<SVGProps>`
  & svg rect {
    stroke: ${(props) => (props.$filled ? "#1677ff" : props.$colorText)};
  }
  & svg ellipse {
    stroke: ${(props) => (props.$filled ? "#1677ff" : props.$colorText)};
  }
  & svg path {
    stroke: ${(props) => (props.$filled ? "#1677ff" : props.$colorText)};
  }
`;

export const LeftMenu = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const collapsed = useSelectorRoot((state) => state.control.isCollap);
  const getWindowDimensions = () => {
    const width = typeof window !== "undefined" ? window.innerWidth : 1000;
    const height = typeof window !== "undefined" ? window.innerHeight : null;
    return {
      width,
      height,
    };
  };
  useEffect(() => {
    if (getWindowDimensions().width < 1000) dispatch(setCollap(true));
  }, []);
  const [widthWin, setWitdhWin] = useState(getWindowDimensions().width);
  const navigate = ({ key }: any) => {
    history.push(key);
  };
  window.addEventListener("resize", () => {
    var withWindows = getWindowDimensions().width;
    setWitdhWin(withWindows ?? 1000);
  });

  const activeKey = (): string => {
    for (var route of Routes) {
      if (location.pathname.startsWith(`${route.routeProps?.path as string}`)) {
        return route.routeProps?.path as string;
      }
      for (var child of route.items ?? []) {
        if (
          location.pathname.startsWith(`${child.routeProps?.path as string}`)
        ) {
          return child.routeProps?.path as string;
        }
      }
    }
    return "/";
  };
  const activeGroupKey = (): string => {
    for (var route of Routes) {
      if (location.pathname.startsWith(`${route.routeProps?.path as string}`)) {
        console.log(route.routeProps?.path);
        return route.routeProps?.path as string;
      }
      for (var child of route.items ?? []) {
        if (
          location.pathname.startsWith(`${child.routeProps?.path as string}`)
        ) {
          console.log(route.routeProps?.path);
          return route.routeProps?.path as string;
        }
      }
    }
    return "/";
  };
  const rederItem = (route: RouteObj) =>
    route.isRoot ? (
      <Menu.Item
        key={route.routeProps ? (route.routeProps.path as string) : undefined}
        icon={route.icon ? <img src={route.icon} alt="icon" /> : undefined}
      >
        {!collapsed ? (
          <Text
            style={{
              marginLeft: route.icon || route.isRoot ? 0 : 30,
              color:
                activeKey() === (route.routeProps?.path as string)
                  ? "#000"
                  : route.color,
            }}
          >
            {route.label}
          </Text>
        ) : (
          <Text></Text>
        )}
      </Menu.Item>
    ) : (
      <Menu.SubMenu
        key={route.routeProps ? (route.routeProps.path as string) : undefined}
        icon={
          route.icon ? (
            <SVG
              src={route.icon}
              $filled={activeGroupKey() === route.routeProps?.path}
              $colorText={route.color ?? "#000"}
            ></SVG>
          ) : undefined
        }
        title={route.label}
      >
        {route.items &&
          route.items.map((child) => (
            <Menu.Item
              key={
                child.routeProps ? (child.routeProps.path as string) : undefined
              }
              icon={
                child.icon ? <img src={child.icon} alt="icon"></img> : undefined
              }
            >
              {!collapsed ? (
                <Text
                  style={{
                    marginLeft: child.icon || child.isRoot ? 0 : 10,
                    color:
                      activeKey() === (child.routeProps?.path as string)
                        ? "#000"
                        : child.color,
                  }}
                >
                  {child.label}
                </Text>
              ) : (
                <Text
                  style={{
                    color:
                      activeKey() === (child.routeProps?.path as string)
                        ? "#000"
                        : child.color,
                  }}
                >
                  {child.label}
                </Text>
              )}
            </Menu.Item>
          ))}
      </Menu.SubMenu>
    );
  const render = () => (
    <>
      <Menu
        onSelect={navigate}
        className={styles.LeftMenu}
        selectedKeys={[activeKey()]}
        mode="inline"
      >
        {Routes.map((route) => (
          <>{rederItem(route)}</>
        ))}
      </Menu>
    </>
  );

  return widthWin >= 1000 ? (
    <Layout.Sider
      collapsible={false}
      width={collapsed ? 50 : 260}
      collapsed={collapsed}
      style={{ backgroundColor: "white" }}
    >
      {render()}
    </Layout.Sider>
  ) : (
    <Layout.Sider
      width={50}
      collapsed={collapsed}
      style={{ backgroundColor: "white" }}
    >
      <Layout
        style={{
          backgroundColor: "white",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1000,
          width: collapsed ? 80 : 260,
        }}
      >
        {render()}
      </Layout>
    </Layout.Sider>
  );
};
