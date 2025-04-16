"use client";

import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@/src/html";

interface CustomTableProps {
  tableHeader: string[];
  tableData: string[];
  tableInfo?: string;
}

const CustomTable: React.FC<CustomTableProps> = ({
  tableHeader,
  tableData,
  tableInfo,
}) => {
  return (
    <TableContainer
      component={Paper}
      sx={{ maxHeight: "calc(100vh - 200px)", overflow: "auto" }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {tableHeader.map((tHeader, index) => (
              <TableCell key={index}>{tHeader}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.length > 0 ? (
            tableData.map((dBody, index) => (
              <TableRow key={index}>
                <TableCell>{dBody}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              {" "}
              <TableCell>{tableInfo}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
