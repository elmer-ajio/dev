"use client";
import React, { forwardRef } from "react";
import {
  DialogTitle as MuiDialogTitle,
  DialogTitleProps as MuiDialogTitleProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { SxProps, Theme } from "@mui/system";

interface DialogTitleProps extends MuiDialogTitleProps {
  sx?: SxProps<Theme>;
  ref?: React.Ref<HTMLDivElement>;
}

const CustomDialogTitle = styled(
  MuiDialogTitle,
  {}
)<{ theme?: Theme }>(({ theme }) => ({}));

const DialogTitle = forwardRef<HTMLDivElement, DialogTitleProps>(
  (props, ref) => {
    return <CustomDialogTitle ref={ref} {...props} />;
  }
);

DialogTitle.displayName = "DialogTitle";

export default DialogTitle;
