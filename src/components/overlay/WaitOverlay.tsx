import React, { FC } from "react";
import { Spin, SpinProps } from "antd";
import { useSelectorRoot } from "../../store/store";

interface WaitOverlayProps extends SpinProps {}

export const WaitOverlay: FC<WaitOverlayProps> = () => {
  const visible = useSelectorRoot((state) => state.control.isLoading);
  return visible ? (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.1)",
        pointerEvents: "none",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
    >
      <Spin tip={"Loading ...."} />
    </div>
  ) : (
    <></>
  );
};
