/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IDailyFinalizedInvoiceDto } from "../../app/models/dailyFinalizedInvoice";
import agent from "../../app/router/agent";

interface ISearchFinalizedInvoiceState {
  singleForcedInvoiceLoaded: boolean;
  singleForcedInvoiceResult: IDailyFinalizedInvoiceDto | null;
  singleForcedStatus: string;
}

const initialState: ISearchFinalizedInvoiceState = {
  singleForcedInvoiceLoaded: false,
  singleForcedInvoiceResult: null,
  singleForcedStatus: "idle",
};
export const fetchSingleInvoiceAsync = createAsyncThunk<
  IDailyFinalizedInvoiceDto,
  string
>(
  "searchForcedInvoiceSlice/fetchSingleInvoiceAsync",
  async (draftNumber, thunkApi) => {
    try {
      return await agent.FinalizedInvoices.fetchSingleInvoiceAsync(draftNumber);
    } catch (error: any) {
      return thunkApi.rejectWithValue({ error: error.data });
    }
  }
);

export const searchForcedInvoiceSlice = createSlice({
  name: "searchFinalizedInvoiceSlice",
  initialState: initialState,
  reducers: {
    resetSingleSearchedResultForced: (state) => {
      if (state.singleForcedInvoiceResult) {
        state.singleForcedInvoiceResult = null;
        state.singleForcedInvoiceLoaded = false;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSingleInvoiceAsync.rejected, (state, action) => {
      state.singleForcedStatus = "idle";
      state.singleForcedInvoiceLoaded = false;
      state.singleForcedInvoiceResult = null;
      console.log(action.payload);
    });
    builder.addCase(fetchSingleInvoiceAsync.pending, (state) => {
      state.singleForcedInvoiceResult = null;
      state.singleForcedStatus = "pendingSingleForcedInvoiceSearch";
      state.singleForcedInvoiceLoaded = false;
    });
    builder.addCase(fetchSingleInvoiceAsync.fulfilled, (state, action) => {
      state.singleForcedStatus = "idle";
      state.singleForcedInvoiceLoaded = true;
      state.singleForcedInvoiceResult = action.payload;
    });
  },
});
export const { resetSingleSearchedResultForced } =
  searchForcedInvoiceSlice.actions;
