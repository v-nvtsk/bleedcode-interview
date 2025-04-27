import {
  createAsyncThunk, createSlice,
  PayloadAction
} from "@reduxjs/toolkit";
import {
  ApiUser, AuthApi
} from "../../api/auth.api";
import {User} from "../../types";
import {RootState} from "..";

export const userLogin = createAsyncThunk<ApiUser,
  {
    username: string,
    password: string
  },
  {rejectValue: string}
>('user/login', async (credentials, {rejectWithValue}) => {
  const result = await AuthApi.login(credentials.username, credentials.password);

  if (result.role !== 'interviewer'){
    await AuthApi.logout();

    return rejectWithValue('Вы не авторизованы для доступа к этой системе! Только пользователи с ролью "интервьюер" могут быть допущены.');
  }

  return result;
});
export const userRegister = createAsyncThunk('user/register', async (credentials:{
  username: string,
  password: string,
  role: string
}) => {
  const result = await AuthApi.register(credentials.username, credentials.password, credentials.role);

  if (result){
    return await AuthApi.login(credentials.username, credentials.password);
  }
});
export const userLogout = createAsyncThunk('user/logout', async () => {
  await AuthApi.logout();
});
export const updateSession = createAsyncThunk<User | string,
  void,
  {
    state: RootState;
    rejectValue: string;
  }
>
('user/updateSession', async (_, thunkApi) => {
  const {rejectWithValue,} = thunkApi;
  const result = await AuthApi.updateSession();

  if (!result) {
    return rejectWithValue('Failed to update session...');
  }
    
  return result;

}, {condition: (_, thunkApi) => {
  const {getState} = thunkApi;

  return !getState().user.isLoading;
}});
// 
export type ErrorState =
  | {
    isError: false;
    errorMessage: null
  }
  | {
    isError: true;
    errorMessage: string
  };
export type UserState = {
  isLoading: boolean,
  isInitialized: boolean,
  isAuthenticated: boolean,
  errorState: ErrorState,
  profile: Partial<User>
};

const initialState:UserState = {
  isLoading: false,
  isInitialized: false,
  isAuthenticated: false,
  errorState: {
    isError: false,
    errorMessage: null
  },
  profile: {
    id: -1,
    username: "",
    role: "",
    state: "",
    accessToken: "",
    tasks: [],
    rating: 0
  }
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase (userLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userLogin.fulfilled, (state, action:PayloadAction<ApiUser>) => {
        state.isLoading = false;
        state.isAuthenticated = true;

        const {
          role, username, id
        } = action.payload;

        state.profile = {
          id,
          username,
          role
        };
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.errorState = {
          isError: true,
          errorMessage: action.payload || 'Не удалось войти'
        };
        state.profile = {};
      })
      .addCase(userRegister.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userRegister.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = true;
      })
      .addCase(userRegister.rejected, (state) => {
        state.isLoading = false;
        state.errorState = {
          isError: true,
          errorMessage: 'Не удалось зарегистрироваться'
        };
      })
      .addCase(userLogout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.isLoading = false;
      })
      .addCase(updateSession.pending, (state) => {
        state.isLoading = true;
        state.isInitialized = false;
      })
      .addCase(updateSession.fulfilled, (state, action: PayloadAction<User | string>) => {
        if (typeof action.payload !== "string") {
          state.isAuthenticated = true;
          state.isInitialized = true;
          state.profile = action.payload;
        }
      })
      .addCase(updateSession.rejected, (state) => {
        state.isLoading = false;
        state.isInitialized = true;
        state.isAuthenticated = false;
        state.errorState.isError = false;
        state.errorState.errorMessage = '';
      });
  }
});