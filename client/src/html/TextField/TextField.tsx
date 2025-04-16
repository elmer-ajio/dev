"use client";

import { forwardRef } from "react";
import {
  TextField as MuiTextField,
  OutlinedTextFieldProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  SystemProps,
  AliasesCSSProperties,
  AllSystemCSSProperties,
  SxProps,
  Theme,
} from "@mui/system";

interface CustomTextFieldProps extends OutlinedTextFieldProps {
  style?: React.CSSProperties;
  system?: SystemProps;
  aliases?: AliasesCSSProperties;
  allSystem?: AllSystemCSSProperties;
  sx?: SxProps<Theme>;
  muiProps?: OutlinedTextFieldProps;
  fontSize?: number | string;
}

const CustomTextField = styled(MuiTextField, {})(({ theme }) => ({}));

const TextField = forwardRef<HTMLInputElement, CustomTextFieldProps>(
  (props, ref) => {
    return <CustomTextField ref={ref} {...props} />;
  }
);

TextField.displayName = "TextField";

export default TextField;
