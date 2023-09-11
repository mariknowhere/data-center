import {createSlice} from '@reduxjs/toolkit';

import {isError} from '../storeHelpers';

import {IOffice, IOfficesState} from './officesTypes';
import {changeOffice, createOffice, deleteOffice, getAllOffices, getOfficeById, getOffices} from './officesAsync';

const initialState: IOfficesState = {
  offices: [],
  allOffices: [],
  officeById: {
    name: '',
    address: '',
    availability_wifi: false,
    responsible_is: '',
    availability_separate_internet: false,
    security_level: 0,
    id: '',
  },
  errors: {
    office_name_error: '',
    address_error: '',
    responsible_is_error: '',
    office_security_level_error: '',
  },
  isLoading: false,
  error: null,
  status: null,
  count: 0,
};

export const officesSlice = createSlice({
  name: 'offices',
  initialState,
  reducers: {
    setOfficeNameError(state, action) {
      state.errors.office_name_error = action.payload;
    },
    setOfficeAddressError(state, action) {
      state.errors.address_error = action.payload;
    },
    setOfficeResponsibleError(state, action) {
      state.errors.responsible_is_error = action.payload;
    },
    setOfficeSecurityLevelError(state, action) {
      state.errors.office_security_level_error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOffices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.offices = action.payload.data;

        state.count = action.payload.count;
      })
      .addCase(getOffices.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = null;
      })
      .addCase(getAllOffices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allOffices = action.payload.data;

        state.count = action.payload.count;
      })
      .addCase(createOffice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.count += 1;
        state.status = action.payload.status;

        state.allOffices.push(action.payload.office);
        state.offices.length < 10 && state.offices.push(action.payload.office);
      })
      .addCase(createOffice.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = null;
      })
      .addCase(getOfficeById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.officeById = action.payload;
      })
      .addCase(getOfficeById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = null;
      })
      .addCase(deleteOffice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.count -= 1;

        state.status = action.payload.status;
        state.offices = state.offices.filter((office: IOffice) => office.id !== action.payload.id);
        state.allOffices = state.allOffices.filter((office: IOffice) => office.id !== action.payload.id);
      })
      .addCase(deleteOffice.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = null;
      })
      .addCase(changeOffice.fulfilled, (state, action) => {
        state.isLoading = false;

        state.offices.forEach((office: IOffice) => {
          if (office.id === action.payload.office.id) {
            office.name = action.payload.office.name;
            office.address = action.payload.office.address;
            office.availability_wifi = action.payload.office.availability_wifi;
            office.responsible_is = action.payload.office.responsible_is;
            office.availability_separate_internet = action.payload.office.availability_separate_internet;
            office.security_level = action.payload.office.security_level;
          }
        });

        state.allOffices.forEach((office: IOffice) => {
          if (office.id === action.payload.office.id) {
            office.name = action.payload.office.name;
            office.address = action.payload.office.address;
            office.availability_wifi = action.payload.office.availability_wifi;
            office.responsible_is = action.payload.office.responsible_is;
            office.availability_separate_internet = action.payload.office.availability_separate_internet;
            office.security_level = action.payload.office.security_level;
          }
        });

        state.status = action.payload.status;
        state.officeById = action.payload.office;
      })
      .addCase(changeOffice.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = null;
      })

      .addMatcher(isError, (state, action) => {
        state.status = action.payload;
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const {
  setOfficeNameError,
  setOfficeAddressError,
  setOfficeResponsibleError,
  setOfficeSecurityLevelError,
} = officesSlice.actions;

export default officesSlice.reducer;
