/* eslint-disable @typescript-eslint/no-explicit-any */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  IDailyFinalizedInvoiceDto,
  IInvoiceDetailDto,
} from "../../app/models/dailyFinalizedInvoice";
import agent from "../../app/router/agent";

interface IDailyFinalizedInvoicesState {
  invoices: IDailyFinalizedInvoiceDto[];
  invoicesLoaded: boolean;
  status: string;
  showInvoiceDetails: boolean;
  loadingInvoiceDetails: boolean;
  invoiceItemDetails: IInvoiceDetailDto[];
}

const initialState: IDailyFinalizedInvoicesState = {
  invoices: [],
  invoicesLoaded: false,
  status: "idle",
  showInvoiceDetails: false,
  loadingInvoiceDetails: false,
  invoiceItemDetails: [],
};

export const getAllFinalizedInvoicesByUser = createAsyncThunk<
  IDailyFinalizedInvoiceDto[],
  string
>(
  "dailyFinalizedInvoiceSlice/getAllFinalizedInvoicesByUser",
  async (username, thunkApi) => {
    try {
      return await agent.FinalizedInvoices.getAllFinalizedInvoicesByCreator(
        username
      );
    } catch (error: any) {
      return thunkApi.rejectWithValue({ error: error.data });
    }
  }
);

export const getInvoiceDetails = createAsyncThunk<IInvoiceDetailDto[], string>(
  "dailyFinalizedInvoiceSlice/getInvoiceDetails",
  async (draftNumber, thunkApi) => {
    try {
      return await agent.FinalizedInvoices.getInvoiceDetails(draftNumber);
    } catch (error: any) {
      return thunkApi.rejectWithValue({ error: error.data });
    }
  }
);

export const dailyFinalizedInvoiceSlice = createSlice({
  name: "dailyFinalizedInvoiceSlice",
  initialState: initialState,
  reducers: {
    resetUserInvoicesList: (state) => {
      state.invoices = [];
      state.invoicesLoaded = false;
    },
    closeInvoiceDetailInspector: (state) => {
      state.showInvoiceDetails = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllFinalizedInvoicesByUser.rejected, (state) => {
      state.status = "idle";
      
    });
    builder.addCase(getAllFinalizedInvoicesByUser.pending, (state) => {
      state.status = "pendingGetAllFinalizedInvoicesByUser";
    });
    builder.addCase(
      getAllFinalizedInvoicesByUser.fulfilled,
      (state, action) => {
        state.invoices = action.payload;
        state.invoicesLoaded = true;
        state.status = "idle";
      }
    );
    builder.addCase(getInvoiceDetails.rejected, (state) => {
      state.status = "idle";
      state.loadingInvoiceDetails = false;
      
    });
    builder.addCase(getInvoiceDetails.pending, (state) => {
      state.status = "pendingGetAllInvoiceDetails";
      state.loadingInvoiceDetails = true;
    });
    builder.addCase(getInvoiceDetails.fulfilled, (state, action) => {
      state.invoiceItemDetails = action.payload;
      state.showInvoiceDetails = true;
      state.loadingInvoiceDetails = false;
      state.status = "idle";
    });
  },
});

export const { resetUserInvoicesList, closeInvoiceDetailInspector } =
  dailyFinalizedInvoiceSlice.actions;
