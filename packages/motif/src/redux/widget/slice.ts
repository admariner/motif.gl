/* eslint-disable prefer-destructuring */
/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
// immer wraps around redux-toolkit so we can 'directly' mutate state'
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WidgetState, WidgetProp } from './types';

const initialState: WidgetState = {};

const widget = createSlice({
  name: 'widget',
  initialState,
  reducers: {
    setWidget(_state, action: PayloadAction<WidgetProp[]>): WidgetState {
      const widgets = action.payload;
      const uniqueKeys = [...new Set(widgets.map((item) => item.group))];
      const results = {};
      // Take the first active entry for the same group
      uniqueKeys.forEach((k) => {
        results[k] =
          widgets.filter((w) => w.group === k && w.active === true)[0]?.id ||
          null;
      });
      return results;
    },
    updateWidget(
      state,
      action: PayloadAction<{ key: string; id: string }>,
    ): void {
      const { key, id } = action.payload;
      state[key] = state[key] === id ? null : id;
    },
  },
});

export const { setWidget, updateWidget } = widget.actions;

export default widget.reducer;
