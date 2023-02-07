// import { pokemonApi } from '@redux-setup/api';
import {
    AuthReducer,
    ThemeReducer,
    BookReducer,
    AppSettingReducer,
    LoadingReducer,
    CartReducer,
    AuthorReducer,
    ReadingReducer,
    RankReducer,
    SearchReducer,
    PurchaseHistoryReducer,
} from '@redux/reducerNew';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    userApi,
    bookAPI,
    paymentApi,
    timereadAPI,
    authorAPI,
    profileAPI,
    editProfileAPI,
    bookOfAuthAPI,
    chatAPI,
    rankAPI,
    commentAPI,
    purchaseAPI,
} from '@redux/servicesNew';
import { setupListeners } from '@reduxjs/toolkit/query';
import { userPhoneApi } from '@redux/servicesNew/userPhoneAPI';

const rootReducer = combineReducers({
    auth: AuthReducer,
    themeApp: ThemeReducer,
    book: BookReducer,
    setting: AppSettingReducer,
    loading: LoadingReducer,
    cart: CartReducer,
    author: AuthorReducer,
    reading: ReadingReducer,
    rank: RankReducer,
    search: SearchReducer,
    purchaseHistory: PurchaseHistoryReducer,
    // ...other reducers here
});

export type RootState = ReturnType<typeof rootReducer>;

const persistConfig = {
    key: 'roott',
    storage: AsyncStorage,
    timeout: 30000,
    whitelist: ['setting', 'themeApp', 'auth', 'cart', 'reading', 'search'],
    stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

export const store = configureStore({
    reducer: {
        root: persistedReducer,
        [userApi.reducerPath]: userApi.reducer,
        [bookAPI.reducerPath]: bookAPI.reducer,
        [paymentApi.reducerPath]: paymentApi.reducer,
        [userPhoneApi.reducerPath]: userPhoneApi.reducer,
        [timereadAPI.reducerPath]: timereadAPI.reducer,
        [authorAPI.reducerPath]: authorAPI.reducer,
        [profileAPI.reducerPath]: profileAPI.reducer,
        [editProfileAPI.reducerPath]: editProfileAPI.reducer,
        [bookOfAuthAPI.reducerPath]: bookOfAuthAPI.reducer,
        [chatAPI.reducerPath]: chatAPI.reducer,
        [rankAPI.reducerPath]: rankAPI.reducer,
        [chatAPI.reducerPath]: chatAPI.reducer,
        [commentAPI.reducerPath]: commentAPI.reducer,
        [purchaseAPI.reducerPath]: purchaseAPI.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        })
            .concat(userApi.middleware)
            .concat(bookAPI.middleware)
            .concat(paymentApi.middleware)
            .concat(userPhoneApi.middleware)
            .concat(authorAPI.middleware)
            .concat(timereadAPI.middleware)
            .concat(editProfileAPI.middleware)
            .concat(bookOfAuthAPI.middleware)
            .concat(profileAPI.middleware)
            .concat(chatAPI.middleware)
            .concat(rankAPI.middleware)
            .concat(commentAPI.middleware)
            .concat(purchaseAPI.middleware),
});

export const persistor = persistStore(store);
