import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { getAllFinalizedInvoicesByUser } from "../../features/Invoice/dailyFinalizedInvoiceSlice";

const RefreshButton = () => {
  const dispatch = useAppDispatch();
  const { authObject } = useAppSelector((state) => state.authSlice);
  if (!authObject.username) {
    return;
  }
  return (
    <Button
      onClick={() =>
        dispatch(getAllFinalizedInvoicesByUser(authObject.username))
      }
      variant="contained"
      sx={{ outine: "1px solid black", position: "absolute", top: 180 }}
    >
      Refresh
    </Button>
  );
};

export default RefreshButton;
