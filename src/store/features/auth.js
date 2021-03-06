import { createSlice } from '@reduxjs/toolkit'

// create slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    loggedIn: false,
    user: undefined,
    error: undefined,
  },
  reducers: {
    loginRequest(state, action) {
      console.log("action: loginRequest");
      state.loading = true;
    },
    loginSuccess(state, action) {
      console.log("action: loginSuccess");
      state.loading = false;
      state.loggedIn = true;
      state.user = action.payload;
    },
    loginFailure(state, action) {
      console.log("action: loginFailure");
      state.loading = false;
      state.loggedIn = false;
      state.user = undefined;
      state.error = action.payload;
    },
    logoutRequest(state, action) {
      console.log("action: logoutRequest");
      state.loggedIn = false;
      state.user = undefined;
    }
  }
})

// extract action-creators from slice
const { loginRequest, loginSuccess, loginFailure } = authSlice.actions;

// helper function to mock an api request
const mockAPIReguest = (success, timeout) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        resolve({ name: 'Test User' });
      } else {
        reject({ message: 'Error: Credentials invalid' });
      }
    }, timeout || 1000);
  });
}

// action creator login
export const login = (credentials) => async (dispatch) => {
  console.log("action-creator: login");
  console.log(credentials);

  try {
    // dispatch a loginRequest action to indicate loading
    dispatch(loginRequest());

    // mock api login request
    const { email, password } = credentials;
    const credentialsCorrect = (email === 'test@test.com' && password === 'PASSWORD') ? true : false;
    const response = await mockAPIReguest(credentialsCorrect /* sucess */);
    console.log("mock-api response:");
    console.log(response);

    // dispatch a loginSuccess action
    dispatch(loginSuccess(response));
  }
  catch (err) {
    console.log("mock-api error:");
    console.log(err);

    // dispatch a loginFailure action
    dispatch(loginFailure(err.message));
  }
}

export default authSlice.reducer;
