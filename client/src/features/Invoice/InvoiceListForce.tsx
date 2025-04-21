import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { Typography } from "@mui/material";
import { useAppSelector } from "../../app/store/configureStore";
import InvoiceItemDetail from "./InvoiceItemDetail";
import Loading from "../../app/components/Loading";
import InvoiceForce from "../../app/components/InvoiceForce";

const InvoiceListForce = () => {
  const { showInvoiceDetails, invoiceItemDetails } = useAppSelector(
    (state) => state.finalizedInvoices
  );

  const { singleForcedInvoiceResult, singleForcedStatus } = useAppSelector(
    (state) => state.searchForceGatePass
  );

  if (!singleForcedInvoiceResult) {
    return (
      <Typography variant="h5" sx={{ textAlign: "center", mt: 0 }}>
        Please use this tab with caution...
      </Typography>
    );
  }

  if (singleForcedStatus === "pendingSingleForcedInvoiceSearch") {
    return <Loading message="Loading" />;
  }

  return (
    <>
      <TableContainer
        sx={{
          display: showInvoiceDetails ? "none" : "block",
          maxHeight: 500,
          maxWidth: 1200,
          position: "relative",
          ml: "12rem",
          mr: "auto",
          mt: -16,
        }}
      >
        <Table sx={{ minWidth: 650 }} stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                sx={{
                  bgcolor: showInvoiceDetails ? " rgba(0, 0, 0, 0)" : "white",
                  color: showInvoiceDetails ? "transparent" : "black",
                }}
              >
                No
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  bgcolor: showInvoiceDetails ? " rgba(0, 0, 0, 0)" : "white",
                  color: showInvoiceDetails ? "transparent" : "black",
                }}
              >
                Draft
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  bgcolor: showInvoiceDetails ? " rgba(0, 0, 0, 0)" : "white",
                  color: showInvoiceDetails ? "transparent" : "black",
                }}
              >
                Final
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  bgcolor: showInvoiceDetails ? " rgba(0, 0, 0, 0)" : "white",
                  color: showInvoiceDetails ? "transparent" : "black",
                }}
              >
                Creator
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  bgcolor: showInvoiceDetails ? " rgba(0, 0, 0, 0)" : "white",
                  color: showInvoiceDetails ? "transparent" : "black",
                }}
              >
                Payee
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  bgcolor: showInvoiceDetails ? " rgba(0, 0, 0, 0)" : "white",
                  color: showInvoiceDetails ? "transparent" : "black",
                }}
              >
                Created
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  bgcolor: showInvoiceDetails ? " rgba(0, 0, 0, 0)" : "white",
                  color: showInvoiceDetails ? "transparent" : "black",
                }}
              >
                Type
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  bgcolor: showInvoiceDetails ? " rgba(0, 0, 0, 0)" : "white",
                  color: showInvoiceDetails ? "transparent" : "black",
                }}
              >
                Status
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  bgcolor: showInvoiceDetails ? " rgba(0, 0, 0, 0)" : "white",
                  color: showInvoiceDetails ? "transparent" : "black",
                }}
              >
                Inspect
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  bgcolor: showInvoiceDetails ? " rgba(0, 0, 0, 0)" : "white",
                  color: showInvoiceDetails ? "transparent" : "black",
                }}
              >
                Print
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              <InvoiceForce
                invoice={singleForcedInvoiceResult}
                key={1}
                index={0}
              />
            }
          </TableBody>
        </Table>
      </TableContainer>
      {showInvoiceDetails && (
        <InvoiceItemDetail invoiceItems={invoiceItemDetails} />
      )}
    </>
  );
};

export default InvoiceListForce;
