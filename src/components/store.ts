import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './reducers/contactsSlice';

export const store = configureStore({
    reducer: {
        contacts: contactsReducer,
    },
});
