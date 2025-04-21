import {
  Backdrop,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { useAppDispatch } from "../../app/store/configureStore";
import { closeInvoiceDetailInspector } from "./dailyFinalizedInvoiceSlice";
import { locationHelper } from "../../app/location/locationHelper";
import { IInvoiceDetailDto } from "../../app/models/dailyFinalizedInvoice";

interface Props {
  invoiceItems: IInvoiceDetailDto[];
}

const dateOptions: Intl.DateTimeFormatOptions = {
  month: "short",
  year: "numeric",
  day: "2-digit",
};
const transactionDate = new Date().toLocaleString("en-US", dateOptions);

const InvoiceItemDetail: React.FC<Props> = (props: Props) => {
  const { invoiceItems } = props;

  const dispatch = useAppDispatch();

  if (!invoiceItems) return;
  return (
    <Backdrop open={true} invisible={false}>
      <Box mt={30} height="100vh" sx={{ p: 2 }}>
        <Card>
          <CardHeader
            sx={{
              p: 0,
              bgcolor: "#393939",
              color: "white",
            }}
            title="Invoice Inspector"
          />
          <CardContent>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                flexDirection: "row",
                gap: 3,
              }}
            >
              <Box>
                <Typography>Date : {transactionDate}</Typography>
                <Typography>
                  Invoice: {invoiceItems[0].invoiceNumber}
                </Typography>
              </Box>
              <Box>
                <Typography>
                  Holds :{" "}
                  {invoiceItems.reduce(
                    (count, current) =>
                      current.activeHold !== "None" ? count + 1 : count,
                    0
                  )}
                </Typography>
                <Typography>Units: {invoiceItems.length}</Typography>
              </Box>
            </Box>
            <TableContainer sx={{ maxHeight: 200 }}>
              <Table sx={{ minWidth: 450 }} stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">No</TableCell>
                    <TableCell align="center">Unit</TableCell>
                    <TableCell align="center">Location</TableCell>
                    <TableCell sx={{ bgcolor: "orange" }} align="center">
                      Valid
                    </TableCell>
                    <TableCell align="center">Payee</TableCell>
                    <TableCell align="center">Size</TableCell>
                    <TableCell align="center">Freight</TableCell>
                    <TableCell align="center">Category</TableCell>
                    <TableCell align="center">Line</TableCell>
                    <TableCell sx={{ bgcolor: "orange" }} align="center">
                      Hold
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {invoiceItems.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell align="center" sx={{ fontSize: "12px" }}>
                        {index + 1}
                      </TableCell>
                      <TableCell align="center" sx={{ fontSize: "12px" }}>
                        {item.containerNumber}
                      </TableCell>
                      <TableCell align="center" sx={{ fontSize: "12px" }}>
                        {locationHelper(item.berth, item.containerLocation)}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontSize: "12px",
                          bgcolor:
                            item.gatePassValidity !== "None"
                              ? "lightgreen"
                              : "red",
                        }}
                      >
                        {item.gatePassValidity.length > 0
                          ? item.gatePassValidity
                          : "Null!"}
                      </TableCell>
                      <TableCell align="center" sx={{ fontSize: "12px" }}>
                        {item.consignee.slice(0, 10)}
                      </TableCell>
                      <TableCell align="center" sx={{ fontSize: "12px" }}>
                        {item.containerLength}
                      </TableCell>
                      <TableCell align="center" sx={{ fontSize: "12px" }}>
                        {item.containerFreightStatus}
                      </TableCell>
                      <TableCell align="center" sx={{ fontSize: "12px" }}>
                        {item.containerCategory}
                      </TableCell>
                      <TableCell align="center" sx={{ fontSize: "12px" }}>
                        {item.lineId}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontSize: "12px",
                          bgcolor:
                            item.activeHold === "None" ? "lightgreen" : "red",
                        }}
                      >
                        {item.activeHold.slice(0, 10)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <CardActions
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Button
                variant="contained"
                onClick={() => dispatch(closeInvoiceDetailInspector())}
              >
                Close
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      </Box>
    </Backdrop>
  );
};

export default InvoiceItemDetail;
