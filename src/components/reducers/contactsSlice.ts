import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Contact {
    id: string;
    name: string;
    phone: number;
    email: string;
    photo: string;
}

interface ContactsState {
    contacts: Contact[];
    selectedContact: Contact | null;
    loading: boolean;
    error: string | null;
}

export const fetchContactById = createAsyncThunk(
    'contacts/fetchContactById',
    async (contactId: string) => {
        try {
            const response = await axios.get<Contact>(`https://your-api-url/${contactId}`);
            return response.data;
        } catch (error) {
            throw new Error('Ошибка при загрузке контакта');
        }
    }
);

const initialState: ContactsState = {
    contacts: [],
    selectedContact: null,
    loading: false,
    error: null,
};

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchContactById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchContactById.fulfilled, (state, action: PayloadAction<Contact>) => {
                state.loading = false;
                state.selectedContact = action.payload;
            })
            .addCase(fetchContactById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Ошибка при загрузке контакта';
            });
    },
});

export default contactsSlice.reducer;
