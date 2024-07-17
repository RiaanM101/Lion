import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import blogService from '../services/blogService';

// Async Thunks for CRUD operations
export const addBlog = createAsyncThunk('blogs/addBlog', async (blogData, thunkAPI) => {
  try {
    const response = await blogService.addBlog(blogData);
    return response.data; // Assuming your service returns data property
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data); // Return server error message
  }
});

export const updateBlog = createAsyncThunk('blogs/updateBlog', async ({ id, ...blogData }, thunkAPI) => {
  try {
    const response = await blogService.updateBlog(id, blogData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const deleteBlog = createAsyncThunk('blogs/deleteBlog', async (blogId, thunkAPI) => {
  try {
    await blogService.deleteBlog(blogId);
    return blogId; // Return deleted blog ID for optimistic update
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const fetchBlogs = createAsyncThunk('blogs/fetchBlogs', async (_, thunkAPI) => {
  try {
    const response = await blogService.fetchBlogs();
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const blogSlice = createSlice({
  name: 'blogs',
  initialState: {
    blogs: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blogs.push(action.payload); // Assuming payload is the new blog object
      })
      .addCase(addBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedBlog = action.payload;
        const index = state.blogs.findIndex(blog => blog._id === updatedBlog._id);
        if (index !== -1) {
          state.blogs[index] = updatedBlog; // Replace updated blog in array
        }
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        const deletedBlogId = action.payload;
        state.blogs = state.blogs.filter(blog => blog._id !== deletedBlogId); // Remove deleted blog from array
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blogs = action.payload; // Replace existing blogs with fetched blogs
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { reducer, actions } = blogSlice;
export const { clearError } = actions; // Export clearError action for UI

export default blogSlice.reducer;
