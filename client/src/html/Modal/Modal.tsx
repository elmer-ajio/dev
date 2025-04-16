"use client";
import React, { forwardRef } from "react";
import { Modal as MuiModal, ModalProps as MuiModalProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  SystemProps,
  AliasesCSSProperties,
  AllSystemCSSProperties,
  SxProps,
  Theme,
} from "@mui/system";

interface ModalProps extends MuiModalProps {
  style?: React.CSSProperties;
  system?: SystemProps;
  aliases?: AliasesCSSProperties;
  allSystem?: AllSystemCSSProperties;
  sx?: SxProps<Theme>;
  ref?: React.Ref<HTMLDivElement>;
  muiProps?: MuiModalProps;
}

const CustomModal = styled(
  MuiModal,
  {}
)<{ theme?: Theme }>(({ theme }) => ({}));

const Modal = forwardRef<HTMLDivElement, ModalProps>((props, ref) => {
  return <CustomModal ref={ref} {...props} />;
});

Modal.displayName = "Modal";

export default Modal;
