import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { IDailyFinalizedInvoiceDto } from "../../app/models/dailyFinalizedInvoice";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { getInvoiceDetails } from "../../features/Invoice/dailyFinalizedInvoiceSlice";
import { fetchInvoiceToPrint } from "../../features/Gatepass/printFinalizedInvoiceSlice";

interface Props {
  invoice: IDailyFinalizedInvoiceDto;
  index: number;
}

const Invoice: React.FC<Props> = (props: Props) => {
  const { invoice, index } = props;
  const { authObject } = useAppSelector((state) => state.authSlice);
  const dispatch = useAppDispatch();

  if (!authObject || !authObject.username) return;

  return (
    <TableRow key={index}>
      <TableCell align="center">{index + 1}</TableCell>
      <TableCell
        align="center"
        sx={{
          p: 0,
          fontSize: "12px",
          fontWeight: "bold",
        }}
      >
        {invoice.draftNumber}
      </TableCell>
      <TableCell align="center">{invoice.finalNumber}</TableCell>
      <TableCell
        align="center"
        sx={{
          p: 0,
          fontSize: "12px",
        }}
      >
        {invoice.creator.toUpperCase()}
      </TableCell>
      <TableCell align="center">{invoice.payeeName.slice(0, 15)}</TableCell>
      <TableCell
        align="center"
        sx={{
          p: 0,
          fontSize: "12px",
        }}
      >
        {invoice.created}
      </TableCell>
      <TableCell
        align="center"
        sx={{
          p: 0,
          fontSize: "12px",
        }}
      >
        {invoice.invoiceType.slice(0, 2)}
      </TableCell>
      <TableCell
        align="center"
        sx={{
          p: 0,
          fontSize: "12px",
        }}
      >
        {invoice.invoiceStatus}
      </TableCell>
      <TableCell
        align="center"
        sx={{
          p: 0,
          fontSize: "12px",
        }}
      >
        <Button
          variant="contained"
          onClick={() => dispatch(getInvoiceDetails(invoice.draftNumber))}
        >
          View
        </Button>
      </TableCell>
      <TableCell
        align="center"
        sx={{
          p: 0,
          fontSize: "12px",
        }}
      >
        <Button
          sx={{ bgcolor: invoice.invoicePrintedAlready ? "error.main" : "" }}
          variant="contained"
          onClick={() =>
            dispatch(
              fetchInvoiceToPrint({
                draftNumber: invoice.draftNumber,
                customerContractGkey: invoice.contractCutomerGkey,
                user: authObject.username,
              })
            )
          }
        >
          Print
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default Invoice;
