import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../auth/operations"; // импортируем instance для использования с авторизацией

export const apiGetAllContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const token = state.auth.token;

      if (!token) {
        return thunkApi.rejectWithValue("Token is missing");
      }

      instance.defaults.headers.common.Authorization = `Bearer ${token}`;

      const { data } = await instance.get("/contacts");
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
      const state = thunkApi.getState();
      const token = state.auth.token;

      if (!token) {
        return thunkApi.rejectWithValue("Token is missing");
      }

      instance.defaults.headers.common.Authorization = `Bearer ${token}`;

      const { data } = await instance.post("/contacts", contact);
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
      const state = thunkApi.getState();
      const token = state.auth.token;

      if (!token) {
        return thunkApi.rejectWithValue("Token is missing");
      }

      instance.defaults.headers.common.Authorization = `Bearer ${token}`;

      const { data } = await instance.delete(`/contacts/${id}`);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
