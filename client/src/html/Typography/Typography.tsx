"use client";
import { forwardRef } from "react";
import {
  Typography as MuiTypography,
  TypographyProps as MuiTypographyProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  SystemProps,
  AliasesCSSProperties,
  AllSystemCSSProperties,
  SxProps,
  Theme,
} from "@mui/system";

interface TypographyProps extends MuiTypographyProps {
  style?: React.CSSProperties;
  system?: SystemProps;
  aliases?: AliasesCSSProperties;
  allSystem?: AllSystemCSSProperties;
  sx?: SxProps<Theme>;
  ref?: React.Ref<HTMLDivElement>;
  muiProps?: MuiTypographyProps;
}

const CustomTypography = styled(MuiTypography, {})<{}>(({ theme }) => ({}));

const Typography = forwardRef<HTMLDivElement, TypographyProps>((props, ref) => {
  return <CustomTypography ref={ref} {...props} />;
});

Typography.displayName = "Typography";

export default Typography;
