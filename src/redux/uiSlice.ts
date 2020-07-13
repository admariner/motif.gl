/* eslint-disable prefer-destructuring */
/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
// immer wraps around redux-toolkit so we can 'directly' mutate state'
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  currency: '',
  loading: false,
  modalMsg: '',
  modalOpen: false,
  modalImportOpen: true,
  clickedId: null,
  timeLock: false,
  bottomOpen: false,
  scoreLock: false,
  score: null,
  valueLock: false,
};

const ui = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    fetchBegin(state) {
      state.loading = true;
      state.modalMsg = '';
      state.modalOpen = false;
    },
    fetchError(state, action) {
      state.loading = false;
      state.modalMsg = action.payload.message;
      state.modalOpen = true;
    },
    fetchDone(state) {
      state.loading = false;
    },
    closeModal(state) {
      state.modalOpen = false;
    },
    openImportModal(state) {
      state.modalImportOpen = true;
    },
    closeImportModal(state) {
      state.modalImportOpen = false;
    },
    postMessage(state, action) {
      state.modalOpen = true;
      state.modalMsg = action.payload;
    },
    setTimeLock(state) {
      state.timeLock = true;
    },
    setBottomOpen(state, action) {
      state.bottomOpen = action.payload;
    },
    setClickedId(state, action) {
      const id = action.payload;
      state.clickedId = id;
    },
    setScoreLock(state) {
      state.scoreLock = true;
    },
    setScore(state, action) {
      state.score = action.payload;
    },
    setName(state, action) {
      state.name = action.payload;
    },
    setCurrency(state, action) {
      state.currency = action.payload;
    },
    setValueLock(state) {
      state.valueLock = true;
    },
  },
});

export const {
  fetchBegin,
  fetchError,
  fetchDone,
  closeModal,
  openImportModal,
  closeImportModal,
  postMessage,
  setTimeLock,
  setBottomOpen,
  setClickedId,
  setScoreLock,
  setScore,
  setName,
  setCurrency,
  setValueLock,
} = ui.actions;

export default ui.reducer;
