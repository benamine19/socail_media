import { createSlice, createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit';

const boite_disscussionSlice = createSlice({
 name:'boite_disscussionSlice',
 initialState: {
    ouvert :false,
    id_amie:null,
    name_amie:null,
    profile_pic_amie:null,
    id_group:null,
  },
 reducers :{
  click_sur_ami:(state,action) =>{
    state.ouvert = true
    state.id_amie = action.payload.id_amie;
    state.name_amie = action.payload.name_amie;
    state.profile_pic_amie = action.payload.profile_pic_amie;
    state.id_group = action.payload.id_group;
  },
  fermer_disscusion:(state,action) =>{
    state.ouvert = false
  },
 }
});

export default boite_disscussionSlice.reducer;

export const { click_sur_ami ,fermer_disscusion } = boite_disscussionSlice.actions;


