import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  Allusers: [],
  status: "pending",
  individualUserPost: [],
  presentUser: {},
};

export const getAllUsers = createAsyncThunk("users/all", async () => {
  const data = await axios.get(`https://fitsharksm.herokuapp.com/api/user`);
  return data.data;
});

// follow unfollow
export const followUnfollowUser = createAsyncThunk(
  "users/followUnfollow",
  async (dataToBeSent, { rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": dataToBeSent.token,
      },
    };
    try {
      const data = await axios.post(
        `https://fitsharksm.herokuapp.com/api/user/followUnfollow/${dataToBeSent.id}`,
        null,
        config
      );
      return data.data;
    } catch (error) {
      console.log(error);
      console.log(error?.response);
      return rejectWithValue(error.response.data);
    }
  }
);

// individual users posts
export const individualUsersPosts = createAsyncThunk(
  "users/indiposts",
  async (dataToBeSent, { rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": dataToBeSent.token,
      },
    };
    try {
      const data = await axios.get(
        `https://fitsharksm.herokuapp.com/api/user/post/${dataToBeSent.id}`,
        config
      );

      return data.data;
    } catch (error) {
      console.log(error);
      console.log(error?.response);
      return rejectWithValue(error.response.data);
    }
  }
);

// Mark all notifications as read
export const markNotificationRead = createAsyncThunk(
  "users/clearNotification",
  async (dataToBeSent, { rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": dataToBeSent.token,
      },
    };
    try {
      const data = await axios.post(
        `https://fitsharksm.herokuapp.com/api/user/clearnotification`,
        null,
        config
      );
      toast.success("notification marked as  read !", {});
      return data.data;
    } catch (error) {
      console.log(error);
      console.log(error?.response);
      return rejectWithValue(error.response.data);
    }
  }
);

// update profile
export const updateUserImage = createAsyncThunk(
  "users/updateUserImage",
  async (dataToBeSent, { rejectWithValue }) => {
    console.log(dataToBeSent);
    const config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": dataToBeSent.token,
      },
    };
    toast.info("updating image !");
    try {
      const data = await axios.post(
        `https://fitsharksm.herokuapp.com/api/user/update`,
        dataToBeSent.data,
        config
      );
      toast.success("image has been updated !", {});
      return data.data;
    } catch (error) {
      console.log(error);
      console.log(error?.response);
      return rejectWithValue(error.response.data);
    }
  }
);

// user slice

export const userSlice = createSlice({
  name: "allusers",
  initialState,
  reducers: {
    addPresentUser: (state, { payload }) => {
      // console.log(payload);
      state.presentUser = state.Allusers?.find((ele) => ele._id == payload);
    },
  },
  extraReducers: {
    [getAllUsers.pending]: (state, action) => {
      state.status = "pending";
    },
    [getAllUsers.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.Allusers = payload;
    },
    [followUnfollowUser.pending]: (state, action) => {
      state.status = "pending";
    },
    [followUnfollowUser.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.Allusers = payload;
    },
    [markNotificationRead.pending]: (state, action) => {
      state.status = "pending";
    },
    [markNotificationRead.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.Allusers = payload;
    },
    [individualUsersPosts.pending]: (state, action) => {
      state.status = "pending";
    },
    [individualUsersPosts.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.individualUserPost = payload;
    },
    [updateUserImage.pending]: (state, action) => {
      state.status = "pending";
    },
    [updateUserImage.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.Allusers = payload;
    },
  },
});

export const { addPresentUser } = userSlice.actions;

export default userSlice.reducer;
