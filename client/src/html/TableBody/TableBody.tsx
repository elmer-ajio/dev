"use client";
import React, { forwardRef } from "react";
import {
  TableBody as MuiTableBody,
  TableBodyProps as MuiTableBodyProps,
} from "@mui/material";

interface TableBodyProps extends MuiTableBodyProps {
  ref?: React.Ref<HTMLTableSectionElement>;
}

const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  (props, ref) => {
    return <MuiTableBody ref={ref} {...props} />;
  }
);

TableBody.displayName = "TableBody";

export default TableBody;
