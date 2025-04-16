"use client";
import React, { forwardRef } from "react";
import { Paper as MuiPaper, PaperProps as MuiPaperProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  SystemProps,
  AliasesCSSProperties,
  AllSystemCSSProperties,
  SxProps,
  Theme,
} from "@mui/system";

// Extend PaperProps to accept custom props
interface PaperProps extends MuiPaperProps {
  style?: React.CSSProperties;
  system?: SystemProps;
  aliases?: AliasesCSSProperties;
  allSystem?: AllSystemCSSProperties;
  sx?: SxProps<Theme>;
  ref?: React.Ref<HTMLDivElement>;
  muiProps?: MuiPaperProps;
}

const CustomPaper = styled(
  MuiPaper,
  {}
)<{ theme?: Theme }>(({ theme }) => ({
  // Default styles for Paper
  padding: theme?.spacing(2),
  backgroundColor: theme?.palette.background.paper,
  boxShadow: theme?.shadows[3],
  borderRadius: "8px", // Rounded corners
  "&:hover": {
    boxShadow: theme?.shadows[6], // Elevation on hover
  },
}));

const Paper = forwardRef<HTMLDivElement, PaperProps>((props, ref) => {
  return <CustomPaper ref={ref} {...props} />;
});

Paper.displayName = "Paper";

export default Paper;
