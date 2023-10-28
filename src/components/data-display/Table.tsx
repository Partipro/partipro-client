import * as React from "react";
import MuiTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Text } from "./Typography.tsx";
import FlexRow from "../layout/FlexRow.tsx";
import FlexColumn from "../layout/FlexColumn.tsx";

type Props<D> = {
  datasource: D[];
  columns: {
    dataKey: keyof D;
    render?: (document: D) => React.ReactNode;
    title?: string;
    align?: "right" | "left" | "center";
    width?: number;
  }[];
  noData?: {
    title?: string;
    action?: React.ReactNode;
  };
};

function Table<D extends object>({ datasource, columns, noData }: Props<D>) {
  if (!datasource.length) {
    return (
      <FlexRow
        sx={{ background: "#ffffff", width: "100%", maxHeight: "160px" }}
      >
        <FlexColumn sx={{ gap: "10px", width: "100%" }} justified aligned>
          <FindInPageIcon sx={{ color: "#A5A5A5", fontSize: "40px" }} />
          <Text
            type="secondary"
            weight="strong"
            size="large"
            label={noData?.title || "Nenhum registro encontrado"}
          />
          {noData?.action}
        </FlexColumn>
      </FlexRow>
    );
  }
  return (
    <TableContainer component={Paper}>
      <MuiTable sx={{ width: "100%" }}>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                width={column.width}
                align={column.align}
                sx={{ padding: "8px 14px !important" }}
              >
                <Text label={column.title || ""} weight="normal" />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {columns.map((column) => {
            return datasource.map((row) => {
              const data = (row[column.dataKey] as string | number)?.toString();
              return (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{data || column.render?.(row)}</TableCell>
                </TableRow>
              );
            });
          })}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
}

export default Table;
