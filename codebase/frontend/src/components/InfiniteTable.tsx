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
	useGetDataMutation: UseMutation<
		MutationDefinition<
			IPageRequest,
			BaseQueryFn<
				string | FetchArgs,
				unknown,
				FetchBaseQueryError,
				{},
				FetchBaseQueryMeta
			>,
			never,
			{ content: T[] },
			"api"
		>
	>;
	tableColumns: T[keyof T][];
	tableHeight: string;
	empty?: {
		icon: React.ReactNode;
		mainText: React.ReactNode;
		subText: React.ReactNode;
	};
	error?: {
		icon: React.ReactNode;
		mainText: React.ReactNode;
		subText: React.ReactNode;
	};
	tableRowRender: (items: T, idx: number) => React.ReactNode;
	defaultSortCol: T[keyof T];
	search: string;
	data?: T[];
};
const InfiniteTable = <TableItem,>({
	tableColumns,
	tableHeight,
	useGetDataMutation,
	empty,
	error,
	tableRowRender,
	defaultSortCol,
	search,
	data,
}: Props<TableItem>) => {
	type TableColumn = TableItem[keyof TableItem];

	const pageSize = 20;
	const [pageNum, setPageNum] = useState<number>(1);
	const [itemList, setItemList] = useState<TableItem[]>();
	const [getData, { isLoading, isError, isSuccess }] = useGetDataMutation();
	const [sortCol, setSortCol] = useState<TableColumn>(defaultSortCol);
	const [sortDir, setSortDir] = useState<"desc" | "asc">("asc");
	const [hasNoMoreContent, setHasNoMoreContent] = useState<boolean>(false);
	const loaderRef = useRef(null);
	const {
		palette: { grey },
	} = useTheme();

	const handleObserver = useCallback((entries: any[]) => {
		const target = entries[0];
		if (target.isIntersecting) {
			setPageNum((prev) => prev + 1);
		}
	}, []);

	useEffect(() => {
		const option = {
			root: null,
			rootMargin: "20px",
			threshold: 0,
		};
		const observer = new IntersectionObserver(handleObserver, option);
		if (loaderRef.current) observer.observe(loaderRef.current);
	}, [handleObserver]);

	useEffect(() => {
		const doGetData = async () => {
			const tempSortCol = sortCol as unknown as string;
			const data = await getData({
				sortCol: tempSortCol,
				sortDir,
				pageNum,
				search,
				pageSize,
			}).unwrap();
			if (data.content && data.content.length === 0) setHasNoMoreContent(true);
			setItemList((prev) => [...(prev || []), ...data.content]);
		};
		doGetData();
	}, [sortCol, sortDir, pageNum, search]);

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
							{!isNotPresent(itemList) && itemList?.map(tableRowRender)}
							{data?.map(tableRowRender)}
							{!hasNoMoreContent && !isError && (
								<TableRow>
									{tableColumns.map(() => (
										<TableCell>
											<Skeleton variant="text" sx={{ fontSize: "1rem" }} />
										</TableCell>
									))}
									<div ref={loaderRef} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
			</Grid>
			{isSuccess && isNotPresent(itemList) && (
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
			{isLoading && <>{/** TODO: Add loading display */}</>}
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
			)}
		</>
	);
};

export default InfiniteTable;
