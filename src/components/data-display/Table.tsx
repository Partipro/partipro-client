import * as React from "react";
import MuiTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Text } from "./Typography.tsx";
import FlexRow from "../layout/FlexRow.tsx";
import FlexColumn from "../layout/FlexColumn.tsx";
import { useAuth } from "../../context/AuthContext.tsx";
import { Roles } from "../../models/User.ts";

type Props<D> = {
  datasource: D[];
  columns: {
    dataKey?: keyof D | string;
    render?: (document: D) => React.ReactNode;
    title?: string;
    align?: "right" | "left" | "center";
    width?: number;
    key: string;
  }[];
  noData?: {
    title?: string;
    action?: React.ReactNode;
  };
};

function Table<D extends object>({ datasource, columns, noData }: Props<D>) {
  const { user } = useAuth();

  if (!datasource.length) {
    return (
      <FlexRow
        sx={{
          background: "#ffffff",
          width: "100%",
          padding: "10px",
          borderRadius: "8px",
        }}
      >
        <FlexColumn sx={{ gap: "10px", width: "100%" }} justified aligned>
          <FindInPageIcon sx={{ color: "#A5A5A5", fontSize: "34px" }} />
          <Text
            type="secondary"
            weight="strong"
            size="medium"
            label={noData?.title || "Nenhum registro encontrado"}
          />
          {user?.role !== Roles.RENTER ? noData?.action : ""}
        </FlexColumn>
      </FlexRow>
    );
  }
  return (
    <TableContainer>
      <MuiTable sx={{ width: "100%", background: "#ffffff", borderRadius: 2 }}>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.key}
                width={column.width}
                align={column.align}
                sx={{ padding: "8px 14px !important" }}
              >
                <Text
                  label={column.title || ""}
                  weight="normal"
                  size="medium"
                />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {datasource.map((row, i) => (
            <TableRow
              key={(row as { _id: string })._id || i}
              sx={{
                "&:last-child td, &:last-child th": {
                  border: 0,
                  paddingBottom: "15px !important",
                },
              }}
            >
              {columns.map((column) => (
                <>
                  <TableCell
                    sx={{ padding: "5px 14px !important" }}
                    key={column.key}
                    component="th"
                    align={column.align}
                    width={column.width}
                    scope="row"
                  >
                    {(row[(column?.dataKey as keyof D) || ("" as keyof D)] as
                      | string
                      | number) || column.render?.(row)}
                  </TableCell>
                </>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
}

export default Table;
