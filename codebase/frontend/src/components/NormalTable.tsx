import { useState } from "react";

import { QuestionMark } from "@mui/icons-material";
import {
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
  useTheme,
} from "@mui/material";

import { camelToNormal } from "../utils/string-utils";
import { isNotPresent } from "../utils/array-utils";

type Props<T> = {
  tableColumns: T[keyof T][];
  tableHeight: string;
  empty?: {
    icon: React.ReactNode;
    mainText: React.ReactNode;
    subText: React.ReactNode;
  };
  tableRowRender: (items: T, idx: number) => React.ReactNode;
  defaultSortCol: T[keyof T];
  search: string;
  data?: T[];
};
const NormalTable = <TableItem,>({
  tableColumns,
  tableHeight,
  empty,
  tableRowRender,
  defaultSortCol,
  data,
}: Props<TableItem>) => {
  type TableColumn = TableItem[keyof TableItem];

  const [sortCol, setSortCol] = useState<TableColumn>(defaultSortCol);
  const [sortDir, setSortDir] = useState<"desc" | "asc">("asc");
  const {
    palette: { grey },
  } = useTheme();

  const handleSortChange = (col: TableColumn) => {
    if (col === sortCol) {
      setSortDir((prev) => (prev === "desc" ? "asc" : "desc"));
    }
    setSortCol(col);
  };

  return (
    <>
      <Grid item>
        <TableContainer sx={{ maxHeight: tableHeight && "80vh" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {Object.values(tableColumns).map((item: TableColumn, idx) => (
                  <TableCell
                    key={idx}
                    sx={{ borderBottom: "2px solid lightgray" }}
                  >
                    <TableSortLabel
                      onClick={() => handleSortChange(item)}
                      active={sortCol === item}
                      direction={sortDir}
                    >
                      {camelToNormal(item as string)}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody sx={{ overflow: "scroll" }}>
              {!isNotPresent(data) && data?.map(tableRowRender)}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      {isNotPresent(data) && (
        <Grid item xs>
          <Stack
            sx={{
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {empty?.icon || (
              <QuestionMark
                sx={{
                  color: grey[400],
                  width: "6rem",
                  height: "6rem",
                }}
              />
            )}
            <Typography variant="h3" color={grey[400]}>
              {empty?.mainText || "No Items Found"}
            </Typography>
            <Typography variant="h6" color={grey[400]} paddingBottom="4rem">
              {empty?.subText || "Check back later when items may be present"}
            </Typography>
          </Stack>
        </Grid>
      )}
    </>
  );
};

export default NormalTable;
