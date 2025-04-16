"use client";
import React, { forwardRef } from "react";
import {
  TableHead as MuiTableHead,
  TableHeadProps as MuiTableHeadProps,
} from "@mui/material";

interface TableHeadProps extends MuiTableHeadProps {
  ref?: React.Ref<HTMLTableSectionElement>;
}

const TableHead = forwardRef<HTMLTableSectionElement, TableHeadProps>(
  (props, ref) => {
    return <MuiTableHead ref={ref} {...props} />;
  }
);

TableHead.displayName = "TableHead";

export default TableHead;
