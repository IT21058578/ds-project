import { Box, ButtonBase, Icon, useTheme } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import { NavLinkItemWithIcon } from "../types";

type Props = {
	navLinkItem: NavLinkItemWithIcon;
	isCollapsed?: boolean;
};

const NavButton = ({
	navLinkItem: { link, icon, label },
	isCollapsed,
}: Props) => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const {
		typography: { fontFamily },
		palette: {
			grey,
			primary: { main: primary },
		},
	} = useTheme();

	const primaryLight = "#dbf1c8";

	return (
		<ButtonBase
			sx={{
				color: grey[900],
				backgroundColor: pathname === link ? primaryLight : grey[100],
				fontSize: "1rem",
				fontWeight: "600",
				paddingY: "0.75rem",
				paddingX: "1rem",
				marginY: "0.25rem",
				marginX: "0.5rem",
				borderRadius: "0.25rem",
				fontFamily,
			}}
			{...(link && { onClick: () => navigate(link) })}
		>
			<Icon sx={{ color: pathname === link ? primary : grey[600] }}>
				{icon}
			</Icon>
			{!isCollapsed && (
				<Box
					style={{
						marginLeft: "1.25rem",
						width: "100%",
						textAlign: "start",
					}}
				>
					{label}
				</Box>
			)}
		</ButtonBase>
	);
};

export default NavButton;
