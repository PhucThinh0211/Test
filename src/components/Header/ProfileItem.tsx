import React from "react";
import { NavLink } from "react-router-dom";
interface IProfileItem {
  imgSrc: string;
  label: string;
  href: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const ProfileItem = ({
  imgSrc,
  label,
  href,
  style,
  onClick,
}: IProfileItem) => {
  return (
    <span>
      <div
        style={{
          ...style,
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          paddingInline: 10,
          gap: 10,
        }}
        onClick={onClick}
      >
        <img src={imgSrc} alt="icon" />
        <span style={{ fontWeight: 600 }}>{label}</span>
      </div>
    </span>
  );
};
