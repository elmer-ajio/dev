"use client";
import React, { forwardRef } from "react";
import { Table as MuiTable, TableProps as MuiTableProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import { SxProps, Theme } from "@mui/system";

interface TableProps extends MuiTableProps {
  sx?: SxProps<Theme>;
  ref?: React.Ref<HTMLTableElement>;
}

const CustomTable = styled(
  MuiTable,
  {}
)<{ theme?: Theme }>(({ theme }) => ({}));

const Table = forwardRef<HTMLTableElement, TableProps>((props, ref) => {
  return <CustomTable ref={ref} {...props} />;
});

Table.displayName = "Table";

export default Table;
