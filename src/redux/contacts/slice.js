import { createSelector, createSlice } from "@reduxjs/toolkit";
import {
  apiAddContact,
  apiDeleteContact,
  apiGetAllContacts,
} from "./operations";
import { useSelector } from "react-redux";
import { selectNameFilter } from "../filters/slice";
import { apiLogout } from "../auth/operations";

const initialContacts = [];

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: initialContacts,
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(apiGetAllContacts.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(apiGetAllContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(apiGetAllContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(apiAddContact.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(apiAddContact.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(apiAddContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(apiDeleteContact.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(apiDeleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(
          (contact) => contact.id !== action.payload.id
        );
      })
      .addCase(apiDeleteContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(apiLogout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(apiLogout.fulfilled, (state) => {
        state.loading = false;
        state.items = [];
        state.error = null;
      })
      .addCase(apiLogout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;
export const selectContacts = (state) => state.contacts.items;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, filter) => {
    if (!filter) {
      return contacts;
    }
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);

export default contactsSlice.reducer;
