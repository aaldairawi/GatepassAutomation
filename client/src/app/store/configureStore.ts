import { configureStore } from "@reduxjs/toolkit";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { dailyFinalizedInvoiceSlice } from "../../features/Invoice/dailyFinalizedInvoiceSlice";
import { authSlice } from "../../features/auth/authSlice";
import { searchFinalizedInvoiceSlice } from "../../features/Invoice/searchFinalizedInvoiceSlice";
import { printFinalizedInvoiceSlice } from "../../features/Gatepass/printFinalizedInvoiceSlice";
import { searchForcedInvoiceSlice } from "../../features/Invoice/searchForcedInvoiceSlice";

export const store = configureStore({
  reducer: {
    finalizedInvoices: dailyFinalizedInvoiceSlice.reducer,
    authSlice: authSlice.reducer,
    searchSingleInvoice: searchFinalizedInvoiceSlice.reducer,
    printGatePass: printFinalizedInvoiceSlice.reducer,
    searchForceGatePass: searchForcedInvoiceSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
