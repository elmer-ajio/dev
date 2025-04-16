"use client";
import React, { forwardRef } from "react";
import {
  IconButton as MuiIconButton,
  IconButtonProps as MuiIconButtonProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  SystemProps,
  AliasesCSSProperties,
  AllSystemCSSProperties,
  SxProps,
  Theme,
} from "@mui/system";

interface IconButtonProps extends MuiIconButtonProps {
  style?: React.CSSProperties;
  system?: SystemProps;
  aliases?: AliasesCSSProperties;
  allSystem?: AllSystemCSSProperties;
  sx?: SxProps<Theme>;
  ref?: React.Ref<HTMLButtonElement>;
  muiProps?: MuiIconButtonProps;
}

const CustomIconButton = styled(
  MuiIconButton,
  {}
)<{ theme?: Theme }>(({ theme }) => ({}));

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (props, ref) => {
    return <CustomIconButton ref={ref} {...props} />;
  }
);

IconButton.displayName = "IconButton";

export default IconButton;
