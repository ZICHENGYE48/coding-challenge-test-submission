import { Address } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import normalizeString from "../../utils/normalizeString";

// Define a type for the slice state
interface CounterState {
  addresses: Address[];
}

// Define the initial state using that type
const initialState: CounterState = {
  addresses: [],
};

export const addressBookSlice = createSlice({
  name: "address",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addAddress: (state, action: PayloadAction<Address>) => {
      const newEntry = action.payload;

      const isDuplicate = state.addresses.some(
        (address) =>
          address.id === newEntry.id &&
          normalizeString(address.firstName) ===
            normalizeString(newEntry.firstName) &&
          normalizeString(address.lastName) ===
            normalizeString(newEntry.lastName)
      );

      if (isDuplicate) return;

      state.addresses.push(action.payload);
    },
    removeAddress: (
      state,
      action: PayloadAction<{ id: string; firstName: string; lastName: string }>
    ) => {
      const { id, firstName, lastName } = action.payload;

      state.addresses = state.addresses.filter(
        (address) =>
          !(
            address.id === id &&
            normalizeString(address.firstName) === normalizeString(firstName) &&
            normalizeString(address.lastName) === normalizeString(lastName)
          )
      );
    },
    updateAddresses: (state, action: PayloadAction<Address[]>) => {
      state.addresses = action.payload;
    },
  },
});

export const { addAddress, removeAddress, updateAddresses } =
  addressBookSlice.actions;

// // Other code such as selectors can use the imported `RootState` type
export const selectAddress = (state: RootState) => state.addressBook.addresses;

export default addressBookSlice.reducer;
