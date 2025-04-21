import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { IDailyFinalizedInvoiceDto } from "../../app/models/dailyFinalizedInvoice";
import { Typography } from "@mui/material";
import Invoice from "../../app/components/Invoice";
import { useAppSelector } from "../../app/store/configureStore";
import InvoiceItemDetail from "./InvoiceItemDetail";
import Loading from "../../app/components/Loading";

interface Props {
  invoices?: IDailyFinalizedInvoiceDto[];
  singleSearch?: boolean;
}

const InvoiceList: React.FC<Props> = (props: Props) => {
  const { authObject } = useAppSelector((state) => state.authSlice);
  const { gatePassLoaded } = useAppSelector((state) => state.printGatePass);
  const { showInvoiceDetails, invoiceItemDetails, loadingInvoiceDetails } =
    useAppSelector((state) => state.finalizedInvoices);

  const { singleInvoiceResult, singleSearchStatus: singleSearchstatus } = useAppSelector(
    (state) => state.searchSingleInvoice
  );

  const { invoices, singleSearch } = props;
  if (gatePassLoaded) return;
  if (!singleSearch && invoices && invoices.length <= 0) {
    return (
      <Typography variant="h5" sx={{ textAlign: "center", mt: 0 }}>
        No finalized invoices for the day yet...
      </Typography>
    );
  }

  if (singleSearch && !singleInvoiceResult && singleSearchstatus !== "pendingSearchSingleFinalizedInvoice") {
    return (
      <Typography variant="h5" sx={{ textAlign: "center", mt: 0 }}>
        Please enter a finalized draft invoice number...
      </Typography>
    );
  }

  if (loadingInvoiceDetails) {
    return <Loading message="Loading Details" />;
  }
  if (
    singleSearch &&
    singleSearchstatus === "pendingSearchSingleFinalizedInvoice"
  ) {
    return <Loading message="Loading Invoice" />;
  }

  return (
    <>
      {!singleSearch && (
        <Typography
          sx={{
            ml: 22,
            "@media print": { display: "none" },
            display: showInvoiceDetails ? "none" : "block",
          }}
          variant="h6"
        >
          Showing all of your finalized invoices for the day @
          {authObject.username}.
        </Typography>
      )}

      <TableContainer
        sx={{
          display: showInvoiceDetails ? "none" : "block",
          maxHeight: 500,
          maxWidth: 1200,
          position: "relative",
          ml: singleSearch ? "12rem" : "auto",
          mr: "auto",
          mt: singleSearch ? -16 : 0,
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
            {!singleSearch ? (
              invoices!.map((item, index) => (
                <Invoice invoice={item} key={index} index={index} />
              ))
            ) : (
              <Invoice invoice={singleInvoiceResult!} key={1} index={0} />
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {showInvoiceDetails && (
        <InvoiceItemDetail invoiceItems={invoiceItemDetails} />
      )}
    </>
  );
};

export default InvoiceList;
