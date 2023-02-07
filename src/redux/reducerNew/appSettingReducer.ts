import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import i18n from 'I18n/I18n';

export enum Language {
  en = 'en',
  vi = 'vi',
}

export enum Currency {
  usd = 'usd',
  vnd = 'vnd',
}

type AppSettingState = {
  language: Language;
  currency: Currency;
};

const defaultAppSettingState: AppSettingState = {
  language: Language.vi,
  currency: Currency.vnd,
};

const appSettingSlice = createSlice({
  name: 'appSetting',
  initialState: defaultAppSettingState,
  reducers: {
    changeLanguage(state: AppSettingState, action: PayloadAction<Language>) {
      i18n.changeLanguage(action.payload);
      state.language = action.payload;
      return state;
    },
    changeCurrency(state: AppSettingState, action: PayloadAction<Currency>) {
      state.currency = action.payload;
      return state;
    },
  },
});

export const {changeLanguage, changeCurrency} = appSettingSlice.actions;
export const AppSettingReducer = appSettingSlice.reducer;
