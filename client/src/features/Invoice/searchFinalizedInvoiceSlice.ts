/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IDailyFinalizedInvoiceDto } from "../../app/models/dailyFinalizedInvoice";
import agent from "../../app/router/agent";

interface ISearchFinalizedInvoiceState {
  singleInvoiceLoaded: boolean;
  singleInvoiceResult: IDailyFinalizedInvoiceDto | null;
  singleSearchStatus: string;
  singleSearchTabSelected: boolean;
}

const initialState: ISearchFinalizedInvoiceState = {
  singleInvoiceLoaded: false,
  singleInvoiceResult: null,
  singleSearchStatus: "idle",
  singleSearchTabSelected: false,
};
export const fetchSingleInvoiceAsync = createAsyncThunk<
  IDailyFinalizedInvoiceDto,
  string
>(
  "searchFinalizedInvoiceSlice/fetchSingleInvoiceAsync",
  async (draftNumber, thunkApi) => {
    try {
      return await agent.FinalizedInvoices.fetchSingleInvoiceAsync(draftNumber);
    } catch (error: any) {
      return thunkApi.rejectWithValue({ error: error.data });
    }
  }
);

export const searchFinalizedInvoiceSlice = createSlice({
  name: "searchFinalizedInvoiceSlice",
  initialState: initialState,
  reducers: {
    resetSingleSearchedResult: (state) => {
      if (state.singleInvoiceResult) {
        state.singleInvoiceResult = null;
        state.singleInvoiceLoaded = false;
      }
      if (!state.singleSearchTabSelected) {
        console.log("Setting search tab selected to true");
        state.singleSearchTabSelected = true;
      } else {
        console.log("Setting search tab selected to false");
        state.singleSearchTabSelected = false;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSingleInvoiceAsync.rejected, (state, action) => {
      state.singleSearchStatus = "idle";
      state.singleInvoiceLoaded = false;
      state.singleInvoiceResult = null;
      console.log(action.payload);
    });
    builder.addCase(fetchSingleInvoiceAsync.pending, (state) => {
      state.singleInvoiceResult = null;
      state.singleSearchStatus = "pendingSearchSingleFinalizedInvoice";
      state.singleInvoiceLoaded = false;
    });
    builder.addCase(fetchSingleInvoiceAsync.fulfilled, (state, action) => {
      state.singleSearchStatus = "idle";
      state.singleInvoiceLoaded = true;
      state.singleInvoiceResult = action.payload;
    });
  },
});

export const { resetSingleSearchedResult } =
  searchFinalizedInvoiceSlice.actions;
