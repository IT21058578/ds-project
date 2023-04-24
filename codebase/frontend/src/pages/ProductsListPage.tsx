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

import { ProductsListTableColumns } from "../constants/constants";
import InfiniteTable from "../components/InfiniteTable";

import { textEllipsis } from "../utils/string-utils";
import { IProductDTO } from "../store/apis/types/response-types";
import useInfiniteQuery from "../hooks/useInfiniteQuery";
import { useSearchProductsMutation } from "../store/apis/products-api-slice";
import { useNavigate } from "react-router-dom";
import AddEditProductModal from "../components/AddEditProductModal";
import { useAppSelector } from "../store/hooks";

const ProductsListPage = () => {
	const navigate = useNavigate();
	const userRoles = useAppSelector((state) => state.auth.user?.roles);
	const [search, setSearch] = useState<string>("");
	const [sortCol, setSortCol] = useState<string>("");
	const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
	const [isCreateProductModalOpen, setIsCreateProductModalOpen] =
		useState<boolean>(false);
	const { data, loaderRef } = useInfiniteQuery({
		useSearchDataMutation: useSearchProductsMutation as any,
		search,
		searchOptions: {},
		sortCol,
		sortDir,
	});
	const searchRef = useRef<HTMLInputElement>(null);

	const isUserSeller = () => !!userRoles?.includes("SELLER");

	const handleTableRowClick = (id: string) => {
		navigate(id);
	};

	const handleSearchClick = () => {
		setSearch(searchRef?.current?.value || "");
	};

	const handleCreateProductClick = () => {
		setIsCreateProductModalOpen(true);
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
									Products
								</Link>
							</Breadcrumbs>
							<Stack
								direction="row"
								justifyContent="space-between"
								alignItems="center"
								sx={{ marginBottom: "1rem" }}
							>
								<Typography variant="h5" sx={{ fontWeight: "600" }}>
									Products
								</Typography>
								{isUserSeller() && (
									<Button
										variant="contained"
										onClick={handleCreateProductClick}
									>
										Create Product
									</Button>
								)}
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
						<InfiniteTable<IProductDTO>
							height="78vh"
							tableColumns={["id", "name", "brandName", "countInStock"]}
							setSortCol={setSortCol}
							setSortDir={setSortDir}
							sortCol={sortCol}
							sortDir={sortDir}
							data={data}
							tableRowRender={(item, idx) => (
								<TableRow
									key={item.id || idx}
									onClick={() => handleTableRowClick(item.id)}
									hover={true}
									sx={{ ":hover": { cursor: "pointer" } }}
								>
									<TableCell>{textEllipsis(item.id, 20)}</TableCell>
									<TableCell>{item.name}</TableCell>
									<TableCell>{item.brandName}</TableCell>
									<TableCell>{item.countInStock}</TableCell>
								</TableRow>
							)}
						/>
					</Grid>
				</Box>
			</Paper>
			<AddEditProductModal
				type="ADD"
				isOpen={isCreateProductModalOpen}
				setIsOpen={setIsCreateProductModalOpen}
			/>
		</Box>
	);
};

export default ProductsListPage;
