import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: null,
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
        },
        loginFailure: (state, action) => {
            state.isFetching = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.currentUser = null;
        },

        // Registration reducers
        registerStart: (state) => {
            state.isFetching = true;
            state.error = null; // Reset any previous errors
        },
        registerSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
        },
        registerFailure: (state, action) => {
            state.isFetching = false;
            state.error = action.payload;
        },
        resetRegistrationError: (state) => {
            state.error = null;
        },

        // New action to set the user's address
        setAddress: (state, action) => {
            state.currentUser.billingAddress = action.payload;
        },
        setContact: (state, action) => {
            state.currentUser.contact = action.payload;
        },
        setGst: (state, action) => {
            state.currentUser.gst = action.payload;
        },
        profileUpdateStart: (state) => {
            state.isFetching = true;
            state.error = null;
        },
        profileUpdateSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
        },
        profileUpdateFailure: (state, action) => {
            state.isFetching = false;
            state.error = action.payload;
        },
    },
});

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    logout,
    registerStart,
    registerSuccess,
    registerFailure,
    resetRegistrationError,
    setAddress,
    setContact,
    setGst,
    profileUpdateStart,
    profileUpdateSuccess,
    profileUpdateFailure,
} = userSlice.actions;
export default userSlice.reducer;