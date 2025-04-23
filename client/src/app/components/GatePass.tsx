import { Box, Container, Typography } from "@mui/material";
import { IGatePass } from "../models/printGatePassContainer";
import Barcode from "react-barcode";
import { locationHelper } from "../location/locationHelper";

interface Props {
  invoice: IGatePass;
}
const GatePass: React.FC<Props> = (props: Props) => {
  const { invoice } = props;

  return (
    <Container
      sx={{
        opacity: "30%",
        position: "relative",
        m: 0,
        p: 0,
        top: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "column",
        width: "95vw",
        ml: "auto",
        mr: "auto",
        pageBreakInside: "avoid",
        breakInside: "avoid",
        borderBottom: "1px dashed black",
        "@media print": { mt: 0, opacity: "100%" },
      }}
      disableGutters
    >
      <Box
        sx={{
          p: 0,
          m: 0,
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <img
          style={{ width: "250px", height: "auto" }}
          alt="bgtLogo"
          src="/images/bgt_logo.jpg"
          onError={(event) => console.log("Failed to load image", event)}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            p: 0,
          }}
        >
          <Typography sx={{ p: 0 }}>
            BASRA GATEWAY TERMINAL
          </Typography>
          <Typography sx={{ p: 0 }}>
            Berth 20/27, North Port, Umm Qasr Basra Province Iraq
          </Typography>
          <Typography variant="h6" sx={{  p: 0 }}>
            www.ictsiiraq.com
          </Typography>
          <Typography variant="subtitle1">GATE PASS</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          p: 0,
          m: 0,
          width: "100%",
        }}
      >
        <Barcode
          value={invoice.containerNumber}
          height={30}
          width={1.5}
          displayValue={false}
        />
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: "bold",
            margin: "auto",
          }}
        >
          {invoice.containerNumber} -
          {locationHelper(invoice.berth, invoice.containerYardLocation)}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          mt: "0.5rem",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
          <span
            style={{
              border: "1px solid black",
              borderRight: "none",
              borderBottom: "none",
              width: "100%",
              fontSize: "14px",
            }}
          >
            Transaction Date
          </span>
          <span
            style={{
              border: "1px solid black",
              borderRight: "none",
              borderBottom: "none",
              width: "100%",
              fontSize: "14px",
            }}
          >
            {invoice.transactionDate}
          </span>
          <span
            style={{
              border: "1px solid black",
              borderRight: "none",
              borderBottom: "none",
              width: "100%",
              fontSize: "14px",
            }}
          >
            Validity
          </span>
          <span
            style={{
              border: "1px solid black",
              borderBottom: "none",
              width: "100%",
              fontSize: "14px",
            }}
          >
            {invoice.finalValidityDate}
          </span>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
          <span
            style={{
              border: "1px solid black",
              borderRight: "none",
              borderBottom: "none",
              width: "100%",
              fontSize: "14px",
            }}
          >
            Customer Contract
          </span>
          <span
            style={{
              color: invoice.customerContract.length <= 0 ? "transparent" : "",
              border: "1px solid black",
              borderRight: "none",
              borderBottom: "none",
              width: "100%",
              fontSize: "14px",
            }}
          >
            {invoice.customerContract.length <= 0
              ? "RABEA ALQU"
              : invoice.customerContract.slice(0, 10)}
          </span>
          <span
            style={{
              border: "1px solid black",
              borderRight: "none",
              borderBottom: "none",
              width: "100%",
              fontSize: "14px",
            }}
          >
            DO Validity
          </span>
          <span
            style={{
              border: "1px solid black",
              borderBottom: "none",
              width: "100%",
              fontSize: "14px",
            }}
          >
            {invoice.deliveryOrderDate}
          </span>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
          <span
            style={{
              border: "1px solid black",
              borderRight: "none",
              borderBottom: "none",
              width: "100%",
              fontSize: "14px",
            }}
          >
            Delivery Type
          </span>
          <span
            style={{
              border: "1px solid black",
              borderRight: "none",
              borderBottom: "none",
              width: "100%",
              fontSize: "14px",
            }}
          >
            {invoice.deliveryType}
          </span>
          <span
            style={{
              border: "1px solid black",
              borderRight: "none",
              borderBottom: "none",
              width: "100%",
              fontSize: "14px",
            }}
          >
            Consignee
          </span>
          <span
            style={{
              border: "1px solid black",
              borderBottom: "none",
              width: "100%",
              fontSize: "14px",
            }}
          >
            {invoice.consignee.slice(0, 15)}
          </span>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
          <span
            style={{
              border: "1px solid black",
              borderRight: "none",
              borderBottom: "none",
              width: "100%",
              fontSize: "14px",
            }}
          >
            Invoice
          </span>
          <span
            style={{
              border: "1px solid black",
              borderRight: "none",
              borderBottom: "none",
              width: "100%",
              fontSize: "14px",
            }}
          >
            {invoice.invoiceNumber}
          </span>
          <span
            style={{
              border: "1px solid black",
              borderRight: "none",
              borderBottom: "none",
              fontSize: "14px",
              width: "100%",
            }}
          >
            Gross/Weight
          </span>
          <span
            style={{
              border: "1px solid black",
              borderBottom: "none",
              fontSize: "14px",
              width: "100%",
            }}
          >
            {invoice.grossWeight}
          </span>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
          <span
            style={{
              border: "1px solid black",
              borderBottom: "none",
              borderRight: "none",
              fontSize: "14px",
              width: "100%",
            }}
          >
            Size
          </span>
          <span
            style={{
              border: "1px solid black",
              fontSize: "14px",
              borderRight: "none",
              borderBottom: "none",
              width: "100%",
            }}
          >
            {invoice.containerLength}
          </span>
          <span
            style={{
              border: "1px solid black",
              fontSize: "14px",
              borderRight: "none",
              borderBottom: "none",
              width: "100%",
            }}
          >
            Full/Empty
          </span>
          <span
            style={{
              border: "1px solid black",
              fontSize: "14px",
              borderBottom: "none",
              width: "100%",
            }}
          >
            {invoice.containerFreightStatus}
          </span>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
          <span
            style={{
              border: "1px solid black",
              borderRight: "none",
              fontSize: "14px",
              width: "100%",
            }}
          >
            Category
          </span>
          <span
            style={{
              border: "1px solid black",
              fontSize: "14px",
              borderRight: "none",
              width: "100%",
            }}
          >
            {invoice.containerCategory}
          </span>
          <span
            style={{
              border: "1px solid black",
              fontSize: "14px",
              borderRight: "none",
              width: "100%",
            }}
          >
            Line
          </span>
          <span
            style={{
              border: "1px solid black",
              fontSize: "14px",
              width: "100%",
            }}
          >
            {invoice.lineId.slice(0, 5)}
          </span>
        </Box>
        {/* <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
          <span
            style={{
              border: "1px solid black",
              fontSize: "14px",
              borderRight: "none",
              width: "100%",
            }}
          >
            ISO
          </span>
          <span
            style={{
              border: "1px solid black",
              fontSize: "14px",
              borderRight: "none",
              width: "100%",
            }}
          >
            {invoice.containerIsoCode}
          </span>
          <span
            style={{
              border: "1px solid black",
              borderRight: "none",
              fontSize: "14px",
              width: "100%",
            }}
          >
            Berth
          </span>
          <span
            style={{
              border: "1px solid black",
              fontSize: "14px",
              width: "100%",
            }}
          >
            {invoice.berth}
          </span>
        </Box> */}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          pb: 1,
        }}
      >
        <Typography sx={{ fontSize: "10px" }}>
          لن تتحمل الشركة أي مسؤولية عن الشاحنات المتوقفة أو المتروكة في الخارج
          أماكن وقوف السيارات، نوصي السائقين بعدم ترك سياراتهم غير المراقب.
        </Typography>
        <Typography sx={{ fontSize: "10px" }}>
          BGT will accept no responsibility for trucks, parked or left in
          external parking areas, we recommended drivers dont leave their
          vehicles unattended.
        </Typography>
      </Box>
    </Container>
  );
};

export default GatePass;
