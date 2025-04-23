import {
  AppBar,
  Avatar,
  Box,
  Button,
  Toolbar,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { removeUserFromLocalStorage } from "../../features/auth/authSlice";
import { resetUserInvoicesList } from "../../features/Invoice/dailyFinalizedInvoiceSlice";
import { setShowPrintLayoutToFalse } from "../../features/Gatepass/printFinalizedInvoiceSlice";
const Header = () => {
  const dispatch = useAppDispatch();
  const { authObject, loggedIn } = useAppSelector((state) => state.authSlice);

  const onHandleUserLogout = () => {
    dispatch(removeUserFromLocalStorage());
    dispatch(resetUserInvoicesList());
    dispatch(setShowPrintLayoutToFalse());
  };
  return (
    <AppBar
      position="fixed"
      sx={{
        mb: 0,
        zIndex: 300,
        p: 0,
        "@media print": {
          display: "none",
        },
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 1,
          bgcolor: "#393939",
        }}
      >
        <Box>
          <Avatar
            src="/images/bgt_logo.jpg"
            alt="Bgt Logo"
            variant="square"
            sx={{ width: "15rem", height: "auto" }}
          />
        </Box>
        {loggedIn && (
          <Box>
            <Typography variant="h6">Welcome @{authObject.username}</Typography>
          </Box>
        )}
        <Box
          sx={{
            verticalAlign: "middle",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5" sx={{ p: 0, m: 0 }}>
            BGT Gate Pass V 1.6
          </Typography>
        </Box>
        {loggedIn && (
          <Box
            sx={{
              verticalAlign: "middle",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button variant="contained" onClick={() => onHandleUserLogout()}>
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
