import { useRef, useState } from "react";

import { NavigateNext, Search } from "@mui/icons-material";
import {
	Box,
	Breadcrumbs,
	Button,
	Grid,
	InputAdornment,
	Link,
	Paper,
	Stack,
	TableCell,
	TableRow,
	TextField,
	Typography,
} from "@mui/material";

import { ReviewListTableColumns } from "../constants/constants";
import InfiniteTable from "../components/InfiniteTable";

import { textEllipsis } from "../utils/string-utils";
import { ReviewListTableItem } from "../types";
import { useSearchReviewsMutation } from "../store/apis/review-api-slice";
import { IReviewDTO } from "../store/apis/types/response-types";

const ReviewsListPage = () => {
	const [search, setSearch] = useState<string>("");
	const searchRef = useRef<HTMLInputElement>(null);

	const handleTableRowClick = (id: string) => {
		console.log(id);
	};

	const handleSearchClick = () => {
		setSearch(searchRef?.current?.value || "");
	};

	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			sx={{ width: "98%", height: "97%", overflow: "hidden" }}
		>
			<Paper elevation={3} sx={{ width: "100%", height: "100%" }}>
				<Box
					sx={{
						width: "100%",
						height: "100%",
					}}
				>
					<Grid
						container
						direction="column"
						justifyContent="start"
						alignItems="stretch"
						sx={{
							height: "100%",
							padding: "1.5rem",
						}}
					>
						<Grid item>
							<Breadcrumbs
								separator={<NavigateNext fontSize="small" />}
								sx={{ marginBottom: "0.75rem" }}
							>
								<Link underline="hover" onClick={() => {}}>
									Reviews
								</Link>
							</Breadcrumbs>
							<Stack
								direction="row"
								justifyContent="space-between"
								alignItems="center"
								sx={{ marginBottom: "1rem" }}
							>
								<Typography variant="h5" sx={{ fontWeight: "600" }}>
									Reviews
								</Typography>
								<Stack
									width={"30%"}
									direction="row"
									justifyContent="space-between"
									alignItems="center"
									gap="8px"
								>
									<TextField
										inputRef={searchRef}
										size="small"
										label="Search"
										fullWidth
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">
													<Search />
												</InputAdornment>
											),
										}}
									/>
									<Button
										onClick={handleSearchClick}
										variant="contained"
										sx={{ paddingX: "2rem" }}
									>
										Search
									</Button>
								</Stack>
							</Stack>
						</Grid>
						<InfiniteTable<IReviewDTO>
							search={search}
							useGetDataMutation={useSearchReviewsMutation as any}
							defaultSortCol={ReviewListTableColumns.CREATED_ON}
							tableColumns={Object.values(ReviewListTableColumns)}
							tableHeight={"80vh"}
							tableRowRender={(item, idx) => (
								<TableRow
									key={idx}
									onClick={() => handleTableRowClick(item.id)}
								>
									<TableCell>{textEllipsis(item.id, 20)}</TableCell>
									<TableCell>{item.createdBy}</TableCell>
									<TableCell>{item.createdOn}</TableCell>
									<TableCell>{item.rating}</TableCell>
								</TableRow>
							)}
						/>
					</Grid>
				</Box>
			</Paper>
		</Box>
	);
};

export default ReviewsListPage;
