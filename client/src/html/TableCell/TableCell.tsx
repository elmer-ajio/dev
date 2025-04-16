"use client";
import React, { forwardRef } from "react";
import {
  TableCell as MuiTableCell,
  TableCellProps as MuiTableCellProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { SxProps, Theme } from "@mui/system";

interface TableCellProps extends MuiTableCellProps {
  sx?: SxProps<Theme>;
  ref?: React.Ref<HTMLTableCellElement>;
}

const CustomTableCell = styled(
  MuiTableCell,
  {}
)<{ theme?: Theme }>(({ theme }) => ({}));

const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  (props, ref) => {
    return <CustomTableCell ref={ref} {...props} />;
  }
);

TableCell.displayName = "TableCell";

export default TableCell;
