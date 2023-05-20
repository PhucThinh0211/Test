import React from "react";
import { Avatar, Dropdown, Space, Input } from "antd";
import { SearchOutlined, DownOutlined } from "@ant-design/icons";
import styles from "./HeaderSection.module.css";
import DefaultAvatar from "../../image/default_avatar.png";
import LogoutSvg from "../../image/icon/logout-icon.svg";
import SettingsSvg from "../../image/icon/settings-icon.svg";
import type { MenuProps } from "antd";
import { ProfileItem } from "./ProfileItem";
import { useState } from "react";
import { useDispatchRoot } from "store/store";
import { logout } from "store/controls/LoginEpic";

export const ProfileSection = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const dispatch = useDispatchRoot();
  const handleFocus = () => {
    setIsSearchActive(true);
  };
  const handleLoseFocus = (e: any) => {
    e.target.value = "";
    setIsSearchActive(false);
  };
  const handleLogout = () => {
    dispatch(logout());
  };
  const items: MenuProps["items"] = [
    {
      label: (
        <ProfileItem label="Settings" imgSrc={SettingsSvg} href="/settings" />
      ),
      key: "0",
    },
    {
      label: (
        <ProfileItem
          label="Logout"
          imgSrc={LogoutSvg}
          href="/logout"
          style={{ color: "red" }}
          onClick={handleLogout}
        />
      ),
      key: "1",
    },
  ];
  return (
    <div className={styles.profileSection}>
      <Input
        onFocus={handleFocus}
        onBlur={handleLoseFocus}
        suffix={<SearchOutlined style={{ cursor: "pointer" }} />}
        className={`${styles.searchInput} searchInput ${
          isSearchActive ? styles.searchActive : ""
        }`}
      />
      <Dropdown menu={{ items }} trigger={["click"]} placement="bottomRight">
        <Space style={{ cursor: "pointer" }}>
          <Avatar size={40} src={DefaultAvatar} />
          <DownOutlined />
        </Space>
      </Dropdown>
    </div>
  );
};
