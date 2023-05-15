import React, { FC, ReactNode } from 'react';
import classnames from 'classnames';
import styles from './FloatingActionButton.module.css';

interface FloatingActionButtonProps {
  onClick?: ()=> void,
  right?: string
  left?: string
  bottom?: string
  top?: string,
  size?: 'xl' | 'lg' | 'md' | 'sm',
  children?: ReactNode
}

export const FloatingActionButton:FC<FloatingActionButtonProps> = ({
  onClick, children, right, left, bottom, top, size = 'md',
}) => (
  <div
    className={
      classnames(styles.FloatingActionButton, {
        [styles['FloatingActionButton-sm']]: size === 'sm',
        [styles['FloatingActionButton-md']]: size === 'md',
        [styles['FloatingActionButton-ld']]: size === 'lg',
        [styles['FloatingActionButton-xl']]: size === 'xl',
      })
    }
    onClick={onClick}
    style={{
      right, left, bottom, top,
    }}
  >
    {children}
  </div>
);
