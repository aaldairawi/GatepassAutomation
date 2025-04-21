import { Box, TextField, CircularProgress, Button } from "@mui/material";
import { useAppDispatch } from "../../app/store/configureStore";
import { useState } from "react";
import { fetchSingleInvoiceAsync } from "./searchFinalizedInvoiceSlice";

const InvoiceSearch = () => {
  
  const dispatch = useAppDispatch();
  const [invoiceNumber, setInvoiceNumber] = useState<string>("");

  const handleOnChangeInvoiceNumber = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInvoiceNumber(event.target.value);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(fetchSingleInvoiceAsync(invoiceNumber));
  };
  const isInvoiceNumberLengthValid =
    invoiceNumber.length == 6 || invoiceNumber.length == 7;
  
  return (
    <Box
      sx={{
        outline: "1px solid white",
        mt: 2,
        "@media print": {
          display: "none",
        },
        p: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: 150,
      }}
      component="form"
      onSubmit={handleSubmit}
    >
      <TextField
        placeholder="Search Invoice"
        variant="outlined"
        fullWidth
        value={invoiceNumber}
        onChange={handleOnChangeInvoiceNumber}
        sx={{
          m: 2,
          borderRadius: "5px",
          textAlign: "center",
          color: "white",
          backgroundColor: "white",
        }}
      />

      <Button
        fullWidth
        variant="contained"
        disabled={!isInvoiceNumberLengthValid}
        type="submit"
        loadingIndicator={<CircularProgress color="secondary" size={13} />}
      >
        SEARCH
      </Button>
    </Box>
  );
};

export default InvoiceSearch;
