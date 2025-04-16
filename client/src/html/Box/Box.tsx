"use client";
import { forwardRef } from "react";
import { Box as MuiBox, BoxProps as MuiBoxProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  SystemProps,
  AliasesCSSProperties,
  AllSystemCSSProperties,
  SxProps,
  Theme,
} from "@mui/system";

interface BoxProps extends MuiBoxProps {
  style?: React.CSSProperties;
  system?: SystemProps;
  aliases?: AliasesCSSProperties;
  allSystem?: AllSystemCSSProperties;
  sx?: SxProps<Theme>;
  ref?: React.Ref<HTMLDivElement>;
  muiProps?: MuiBoxProps;
}

const CustomBox = styled(MuiBox, {})<{}>(({ theme }) => ({}));

const Box = forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
  return <CustomBox ref={ref} {...props} />;
});

Box.displayName = "Box";

export default Box;
