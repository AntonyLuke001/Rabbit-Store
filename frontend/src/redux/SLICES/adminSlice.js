import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

export const fetchUsers = createAsyncThunk(
    "admin/fetchUsers",async() => {
       const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
        {
            headers : { Authorization : `Bearer ${localStorage.getItem("userToken")}`  }
        })
    response.data;
    }
)

export const addUser = createAsyncThunk(
    "admin/addUser",
    async(userData, {rejectWithValue}) => {
        try{

        }catch(err)
        {
            
        }
    }
)