import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

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

import { CustomerListTableColumns } from "../constants/constants";
import InfiniteTable from "../components/InfiniteTable";

import { textEllipsis } from "../utils/string-utils";
import { useSearchUsersMutation } from "../store/apis/user-api-slice";
import {
	ISearchUsersResponseData,
	IUserDTO,
} from "../store/apis/types/response-types";

const CustomersListPage = () => {
	const navigate = useNavigate();
	const [search, setSearch] = useState<string>("");
	const searchRef = useRef<HTMLInputElement>(null);

	const handleTableRowClick = (id: string) => {
		navigate(`${id}`);
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
									Customers
								</Link>
							</Breadcrumbs>
							<Stack
								direction="row"
								justifyContent="space-between"
								alignItems="center"
								sx={{ marginBottom: "1rem" }}
							>
								<Typography variant="h5" sx={{ fontWeight: "600" }}>
									Customers
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
						<InfiniteTable<IUserDTO>
							search={search}
							useGetDataMutation={useSearchUsersMutation as any}
							defaultSortCol={CustomerListTableColumns.CREATED_ON}
							tableColumns={Object.values(CustomerListTableColumns)}
							tableHeight={"80vh"}
							tableRowRender={(item, idx) => (
								<TableRow
									key={idx}
									onClick={() => handleTableRowClick(item.id)}
									hover={true}
									sx={{ ":hover": { cursor: "pointer" } }}
								>
									<TableCell>{textEllipsis(item.id, 20)}</TableCell>
									<TableCell>{item.firstName}</TableCell>
									<TableCell>{item.createdOn}</TableCell>
									<TableCell>{item.lastLoggedOn}</TableCell>
								</TableRow>
							)}
						/>
					</Grid>
				</Box>
			</Paper>
		</Box>
	);
};

export default CustomersListPage;
