///slices for simplifying are specifiying our actions in our store

//because Redux toolkit includes redux-thunk by default,
// we can use createAsyncThunk to make asynchronous requests.
//https://dev.to/ifeanyichima/what-is-createasyncthunk-in-redux--mhe
import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
const initialState={
    entities:[],
    loading:false,
    value:10
} as any

export const fetchUsers=createAsyncThunk("users/getAllUsers",async(thunkApi)=>{
    const response=await fetch('https://jsonplaceholder.typicode.com/users?_limit=5')
    const data=await response.json()
    return data
} )
const userSlice=createSlice({
    name:'users',
    initialState,
    reducers:{
      increament:(state)=>{
        state.value++
      }
    },
    extraReducers:(builder)=>{
         // Add reducers for additional action types here
         builder.addCase(fetchUsers.fulfilled, (state, action) => {
            // Add user to the state array
            state.entities.push(...action.payload)
            state.loading=false
          }),
          builder.addCase(fetchUsers.pending, (state, action) => {
            // Add user to the state array
            state.loading=true
          })
    }
})

export default userSlice.reducer
export const {increament}=userSlice.actions