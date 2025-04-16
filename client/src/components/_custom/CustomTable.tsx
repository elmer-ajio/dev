"use client";

import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Skeleton,
  Box,
} from "@/src/html";

interface CustomTableProps<TData> {
  tableHeader: (string | { label: string; key: keyof TData })[];
  tableData: TData[];
  tableInfo?: string;
  loading: boolean;
}

const CustomTable = <TData extends Record<string, any>>({
  tableHeader,
  tableData,
  tableInfo,
  loading,
}: CustomTableProps<TData>) => {
  return (
    <TableContainer
      component={Paper}
      sx={{ maxHeight: "calc(100vh - 200px)", overflow: "auto" }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {tableHeader.map((tHeader, index) => (
              <TableCell
                key={index}
                sx={{
                  textAlign: "center",
                  verticalAlign: "middle",
                }}
              >
                {typeof tHeader === "object" ? tHeader.label : tHeader}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              {tableHeader.map((_, index) => (
                <TableCell
                  key={index}
                  sx={{
                    textAlign: "center",
                    verticalAlign: "middle",
                  }}
                >
                  <Skeleton
                    variant="text"
                    sx={{
                      maxWidth: "100%",
                    }}
                  />
                </TableCell>
              ))}
            </TableRow>
          ) : tableData.length > 0 ? (
            <>
              {tableData.map((dBody, rowIndex) => (
                <TableRow key={rowIndex}>
                  {tableHeader.map((header, colIndex) => (
                    <TableCell
                      key={colIndex}
                      sx={{
                        textAlign: "center",
                        verticalAlign: "middle",
                        ...(header === "Actions" && {
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }),
                      }}
                    >
                      {typeof header === "object"
                        ? dBody[header.key]
                        : header === "Actions" &&
                          dBody["actions"]?.map(
                            (item: React.ReactNode, index: number) => (
                              <Box key={index}>{item}</Box>
                            ),
                          )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </>
          ) : (
            <TableRow>
              <TableCell
                colSpan={tableHeader.length}
                sx={{
                  textAlign: "center",
                  verticalAlign: "middle",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100px",
                  }}
                >
                  {tableInfo}
                </Box>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
