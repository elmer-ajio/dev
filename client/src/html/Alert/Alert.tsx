"use client";
import { forwardRef } from "react";
import { Alert as MuiAlert, AlertProps as MuiAlertProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  SystemProps,
  AliasesCSSProperties,
  AllSystemCSSProperties,
  SxProps,
  Theme,
} from "@mui/system";

interface AlertProps extends MuiAlertProps {
  style?: React.CSSProperties;
  system?: SystemProps;
  aliases?: AliasesCSSProperties;
  allSystem?: AllSystemCSSProperties;
  sx?: SxProps<Theme>;
  ref?: React.Ref<HTMLDivElement>;
  muiProps?: MuiAlertProps;
}

const CustomAlert = styled(MuiAlert, {})<{}>(({ theme }) => ({}));

const Alert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  return <CustomAlert ref={ref} {...props} />;
});

Alert.displayName = "Alert";

export default Alert;
