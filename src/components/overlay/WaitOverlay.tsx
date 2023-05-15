import React, { FC, useEffect } from 'react';
import { Spin, SpinProps } from 'antd';
import { useSelectorRoot } from '../../store/store';

interface WaitOverlayProps extends SpinProps{
}

export const WaitOverlay:FC<WaitOverlayProps> = ({ children, ...rest }) => {
  const visible = useSelectorRoot(state => state.control.isLoading);
  return (
    <Spin spinning={visible} {...rest}>
      {children}
    </Spin>
  );
};
