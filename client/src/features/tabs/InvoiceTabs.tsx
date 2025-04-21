import * as React from "react";
import { useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import InvoiceList from "../Invoice/InvoiceList";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { getAllFinalizedInvoicesByUser } from "../Invoice/dailyFinalizedInvoiceSlice";
import Loading from "../../app/components/Loading";
import RefreshButton from "../../app/components/RefreshButton";
import InvoiceSearch from "../Invoice/InvoiceSearch";
import InvoiceListForce from "../Invoice/InvoiceListForce";
import InvoiceSearchForce from "../Invoice/InvoiceSearchForce";
import { resetSingleSearchedResult } from "../Invoice/searchFinalizedInvoiceSlice";
import { resetSingleSearchedResultForced } from "../Invoice/searchForcedInvoiceSlice";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const InvoiceTabs = () => {
  const dispatch = useAppDispatch();
  const { invoicesLoaded, invoices, status } = useAppSelector(
    (state) => state.finalizedInvoices
  );
  const { singleSearchTabSelected } = useAppSelector(
    (state) => state.searchSingleInvoice
  );

  const { authObject } = useAppSelector((state) => state.authSlice);

  const { gatePassLoaded } = useAppSelector((state) => state.printGatePass);

  const [value, setValue] = React.useState(singleSearchTabSelected ? 1 : 0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(event);
    setValue(newValue);
  };

  useEffect(() => {
    if (!invoicesLoaded) {
      const username = authObject?.username || localStorage.getItem("username");

      if (username) {
        dispatch(getAllFinalizedInvoicesByUser(authObject.username));
      }
    }
  }, [invoicesLoaded, dispatch, authObject]);

  if (status === "pendingGetAllFinalizedInvoicesByUser") {
    return <Loading message="Loading Invoices" />;
  }

  if (!authObject || !authObject.role) return;

  const adminOrSuperintendent =
    authObject.role.toLowerCase().includes("admin") ||
    authObject.role.toLowerCase().includes("intendent");
  if (gatePassLoaded) return;
  return (
    <>
      <Box sx={{ width: "100%", mt: 10 }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            "@media print": { display: "none" },
          }}
        >
          <Tabs value={value} onChange={handleChange}>
            <Tab
              onClick={() => dispatch(resetSingleSearchedResult())}
              label="Invoices"
              sx={{ "@media print": { display: "none" } }}
              {...a11yProps(0)}
            />
            <Tab
              onClick={() => dispatch(resetSingleSearchedResult())}
              label="Search"
              sx={{ "@media print": { display: "none" } }}
              {...a11yProps(1)}
            />
            {adminOrSuperintendent && (
              <Tab
                onClick={() => dispatch(resetSingleSearchedResultForced())}
                label="Force"
                sx={{ "@media print": { display: "none" } }}
                {...a11yProps(2)}
              />
            )}
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <RefreshButton />
          <InvoiceList
            invoices={invoices.length <= 0 || !invoices ? [] : invoices}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <InvoiceSearch />
          <InvoiceList singleSearch={true} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <InvoiceSearchForce />
          <InvoiceListForce />
        </CustomTabPanel>
      </Box>
    </>
  );
};

export default InvoiceTabs;
