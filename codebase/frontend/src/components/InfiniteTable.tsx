import { useCallback, useEffect, useRef, useState } from "react";

import { Error, QuestionMark } from "@mui/icons-material";
import {
	Grid,
	Skeleton,
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
import {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
	FetchBaseQueryMeta,
	MutationDefinition,
} from "@reduxjs/toolkit/dist/query";
import { UseMutation } from "@reduxjs/toolkit/dist/query/react/buildHooks";

import { camelToNormal } from "../utils/string-utils";
import { isNotPresent } from "../utils/array-utils";
import { IPageRequest } from "../types";

type Props<T> = {
	tableColumns: T[keyof T][];
	tableRowRender: (items: T, idx: number) => React.ReactNode;
	sortCol?: string;
	sortDir?: IPageRequest["sortDir"];
	setSortCol?: (col: string) => void;
	setSortDir?: (dir: "asc" | "desc") => void;
	data?: T[];
	height?: string;
};
const InfiniteTable = <TableItem,>({
	tableColumns,
	tableRowRender,
	setSortCol,
	setSortDir,
	sortCol,
	sortDir,
	height,
	data,
}: Props<TableItem>) => {
	type TableColumn = TableItem[keyof TableItem];
	const {
		palette: { grey },
	} = useTheme();

	const handleSortChange = (col: TableColumn) => {
		if (setSortCol && setSortDir) {
			if (col === sortCol) {
				setSortDir(sortDir === "asc" ? "desc" : "asc");
			}
			setSortCol(col as string);
		}
	};

	return (
		<>
			<TableContainer sx={{ maxHeight: height }}>
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
						{/* {!hasNoMoreContent && !isError && (
								<TableRow>
									{tableColumns.map(() => (
										<TableCell>
											<Skeleton variant="text" sx={{ fontSize: "1rem" }} />
										</TableCell>
									))}
									<div ref={loaderRef} />
								</TableRow>
							)} */}
					</TableBody>
				</Table>
			</TableContainer>
			{/* {isSuccess && isNotPresent(itemList) && (
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
			{isError && (
				<Grid item xs>
					<Stack
						sx={{
							height: "100%",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						{error?.icon || (
							<Error
								sx={{
									color: grey[400],
									width: "6rem",
									height: "6rem",
								}}
							/>
						)}
						<Typography variant="h3" color={grey[400]}>
							{error?.mainText || "Error"}
						</Typography>
						<Typography variant="h6" color={grey[400]} paddingBottom="4rem">
							{error?.subText || " An error occurred. Please try again later."}
						</Typography>
					</Stack>
				</Grid>
			)} */}
		</>
	);
};

export default InfiniteTable;
