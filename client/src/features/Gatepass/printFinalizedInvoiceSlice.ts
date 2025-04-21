/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IGatePass } from "../../app/models/printGatePassContainer";
import agent from "../../app/router/agent";
import { IPrintGatePassDataDto } from "../../app/models/dailyFinalizedInvoice";

interface IPrintFinalInvoiceState {
  gatePasses: IGatePass[];
  gatePassLoaded: boolean;
  gatePassLoadingStatus: string;
  
}

const initialState: IPrintFinalInvoiceState = {
  gatePasses: [],
  gatePassLoaded: false,
  gatePassLoadingStatus: "idle",
};

export const fetchInvoiceToPrint = createAsyncThunk<
  IGatePass[],
  IPrintGatePassDataDto
>("printFinalizedInvoiceSlices/fetchInvoiceToPrint", async (data, thunkArg) => {
  try {
    return agent.PrintFinalizedGatePass.printFinalizedGatePass(data);
  } catch (error: any) {
    return thunkArg.rejectWithValue({ error: error.data });
  }
});

export const forceGatePassToPrint = createAsyncThunk<
  IGatePass[],
  IPrintGatePassDataDto
>("printFinalizedInvoiceSlices/fetchInvoiceToPrint", async (data, thunkArg) => {
  try {
    return agent.PrintFinalizedGatePass.printForcedFinalizedGatePass(data);
  } catch (error: any) {
    return thunkArg.rejectWithValue({ error: error.data });
  }
});

export const printFinalizedInvoiceSlice = createSlice({
  name: "printFinalizedInvoiceSlice",
  initialState: initialState,
  reducers: {
    setShowPrintLayoutToFalse: (state) => {
      state.gatePassLoaded = false;
      state.gatePasses = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInvoiceToPrint.rejected, (state) => {
      state.gatePassLoadingStatus = "idle";
      state.gatePasses = [];
    });
    builder.addCase(fetchInvoiceToPrint.pending, (state) => {
      state.gatePassLoadingStatus = "pendingGatePassPrint";
      state.gatePasses = [];
    });
    builder.addCase(fetchInvoiceToPrint.fulfilled, (state, action) => {
      state.gatePassLoadingStatus = "idle";
      state.gatePasses = action.payload;
      state.gatePassLoaded = true;
    });
  },
});

export const { setShowPrintLayoutToFalse } = printFinalizedInvoiceSlice.actions;
