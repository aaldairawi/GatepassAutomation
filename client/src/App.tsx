import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "./App.css";

import Header from "./app/components/Header";
import { useCallback, useEffect, useState } from "react";
import Login from "./app/components/Login";
import InvoiceTabs from "./features/tabs/InvoiceTabs";
import { useAppDispatch, useAppSelector } from "./app/store/configureStore";
import { getUserInLocalStorage } from "./features/auth/authSlice";
import Loading from "./app/components/Loading";
import GatePassPrintList from "./features/Gatepass/GatePassPrintList";

const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const { loggedIn } = useAppSelector((state) => state.authSlice);
  const { gatePassLoaded, gatePasses, gatePassLoadingStatus } = useAppSelector(
    (state) => state.printGatePass
  );

  const theme = createTheme({
    palette: {
      background: {
        default: "white",
      },
    },
  });

  const initApp = useCallback(async () => {
    dispatch(getUserInLocalStorage());
  }, [dispatch]);

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <ToastContainer
          position="bottom-right"
          hideProgressBar
          theme="colored"
        />
        <CssBaseline />
        {/* <GlobalStyles/> */}
        <Header />
        {loading && <Loading message="Initializing App" />}
        {!loggedIn && <Login />}
        {loggedIn && gatePassLoadingStatus !== "pendingGatePassPrint" && (
          <InvoiceTabs />
        )}
        {gatePassLoadingStatus === "pendingGatePassPrint" && (
          <Loading message="Loading Gatepass" />
        )}
        {gatePassLoaded && loggedIn && <GatePassPrintList items={gatePasses} />}
      </ThemeProvider>
    </>
  );
};

export default App;
