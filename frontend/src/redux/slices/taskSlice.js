// frontend/src/redux/slices/taskSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  tasks: [],
  sharedTasks: [],
  loading: false,
  error: null,
};

export const createTask = createAsyncThunk('tasks/createTask', async (taskData, thunkAPI) => {
  try {
    const { auth } = thunkAPI.getState();
    const config = {
      headers: {
        Authorization: `Bearer ${auth.userInfo.token}`,
      },
    };
    const response = await axios.post('/api/tasks', taskData, config);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const getTasks = createAsyncThunk('tasks/getTasks', async (_, thunkAPI) => {
  try {
    const { auth } = thunkAPI.getState();
    const config = {
      headers: {
        Authorization: `Bearer ${auth.userInfo.token}`,
      },
    };
    const response = await axios.get('/api/tasks', config);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const updateTask = createAsyncThunk('tasks/updateTask', async (taskData, thunkAPI) => {
  try {
    const { auth } = thunkAPI.getState();
    const config = {
      headers: {
        Authorization: `Bearer ${auth.userInfo.token}`,
      },
    };
    const response = await axios.put('/api/tasks', taskData, config);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const shareTask = createAsyncThunk('tasks/shareTask', async (shareData, thunkAPI) => {
  try {
    const { auth } = thunkAPI.getState();
    const config = {
      headers: {
        Authorization: `Bearer ${auth.userInfo.token}`,
      },
    };
    const response = await axios.post('/api/tasks/share', shareData, config);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const getSharedTasks = createAsyncThunk('tasks/getSharedTasks', async (_, thunkAPI) => {
  try {
    const { auth } = thunkAPI.getState();
    const config = {
      headers: {
        Authorization: `Bearer ${auth.userInfo.token}`,
      },
    };
    const response = await axios.get('/api/tasks/shared', config);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.tasks.findIndex((task) => task._id === action.payload._id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(shareTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(shareTask.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(shareTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getSharedTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSharedTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.sharedTasks = action.payload;
      })
      .addCase(getSharedTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default taskSlice.reducer;
