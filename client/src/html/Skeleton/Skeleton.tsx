"use client";
import React, { forwardRef } from "react";
import {
  Skeleton as MuiSkeleton,
  SkeletonProps as MuiSkeletonProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { SystemProps, SxProps, Theme } from "@mui/system";

interface SkeletonBoxProps extends MuiSkeletonProps {
  style?: React.CSSProperties;
  system?: SystemProps;
  sx?: SxProps<Theme>;
  ref?: React.Ref<HTMLDivElement>;
  width?: string | number;
  height?: string | number;
  muiProps?: MuiSkeletonProps;
}

const CustomSkeletonBox = styled(MuiSkeleton, {})<{}>(({ theme }) => ({}));

const Skeleton = forwardRef<HTMLDivElement, SkeletonBoxProps>((props, ref) => {
  return <CustomSkeletonBox ref={ref} {...props} />;
});

Skeleton.displayName = "SkeletonBox";

export default Skeleton;
