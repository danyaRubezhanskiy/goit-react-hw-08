import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const apiGetAllContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkApi) => {
    try {
      const { data } = await axios.get(
        "https://66d450445b34bcb9ab3e3d8a.mockapi.io/contacts"
      );
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const apiAddContact = createAsyncThunk(
  "contacts/addContact",
  async (contact, thunkApi) => {
    try {
      const { data } = await axios.post(
        "https://66d450445b34bcb9ab3e3d8a.mockapi.io/contacts",
        contact
      );
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const apiDeleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (id, thunkApi) => {
    try {
      const { data } = await axios.delete(
        `https://66d450445b34bcb9ab3e3d8a.mockapi.io/contacts/${id}`
      );
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
