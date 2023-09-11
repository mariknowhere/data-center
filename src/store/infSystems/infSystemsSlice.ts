import {createSlice} from '@reduxjs/toolkit';

import {isError} from '../storeHelpers';

import {IInfSystem, IInfSystemsState} from './infSystemsTypes';
import {
  changeInfSystem,
  createInfSystem,
  deleteInfSystem,
  getAllInfSystems,
  getInfSystemById,
  getInfSystems,
} from './infSystemsAsync';

const initialState: IInfSystemsState = {
  infSystems: [],
  allInfSystems: [],
  infSystemById: {
    name: '',
    availability_interface: false,
    web_interface_address: '',
    security_level: 0,
    product: '',
    product_manager: '',
    inf_system_contact_person: '',
    id: '0',
  },
  errors: {
    inf_system_name_error: '',
    web_interface_address_error: '',
    inf_system_security_level_error: '',
    product_error: '',
    product_manager_error: '',
    inf_system_contact_person_error: '',
  },
  isLoading: false,
  error: null,
  status: null,
  count: 0,
};

export const infSystemsSlice = createSlice({
  name: 'infSystems',
  initialState,
  reducers: {
    setInfSystemNameError(state, action) {
      state.errors.inf_system_name_error = action.payload;
    },
    setInfSystemWebInterfaceAddressError(state, action) {
      state.errors.web_interface_address_error = action.payload;
    },
    setInfSystemSecurityLevelError(state, action) {
      state.errors.inf_system_security_level_error = action.payload;
    },
    setInfSystemProductError(state, action) {
      state.errors.product_error = action.payload;
    },
    setInfSystemProductManagerError(state, action) {
      state.errors.product_manager_error = action.payload;
    },
    setInfSystemContactPersonError(state, action) {
      state.errors.inf_system_contact_person_error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInfSystems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.infSystems = action.payload.data;

        state.count = action.payload.count;
      })
      .addCase(getInfSystems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = null;
      })
      .addCase(getAllInfSystems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allInfSystems = action.payload.data;

        state.count = action.payload.count;
      })
      .addCase(createInfSystem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.count += 1;
        state.status = action.payload.status;

        state.allInfSystems.push(action.payload.infSystem);
        state.infSystems.length < 10 && state.infSystems.push(action.payload.infSystem);
      })
      .addCase(createInfSystem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = null;
      })
      .addCase(getInfSystemById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.infSystemById = action.payload;
      })
      .addCase(getInfSystemById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = null;
      })
      .addCase(deleteInfSystem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.count -= 1;

        state.status = action.payload.status;
        state.infSystems = state.infSystems.filter((infSystem: IInfSystem) => infSystem.id !== action.payload.id);
        state.allInfSystems = state.allInfSystems.filter((infSystem: IInfSystem) => infSystem.id !== action.payload.id);
      })
      .addCase(deleteInfSystem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = null;
      })
      .addCase(changeInfSystem.fulfilled, (state, action) => {
        state.isLoading = false;

        state.infSystems.forEach((infSystem: IInfSystem) => {
          if (infSystem.id === action.payload.infSystem.id) {
            infSystem.name = action.payload.infSystem.name;
            infSystem.availability_interface = action.payload.infSystem.availability_interface;
            infSystem.web_interface_address = action.payload.infSystem.web_interface_address;
            infSystem.security_level = action.payload.infSystem.security_level;
            infSystem.product = action.payload.infSystem.product;
            infSystem.product_manager = action.payload.infSystem.product_manager;
            infSystem.inf_system_contact_person = action.payload.infSystem.inf_system_contact_person;
          }
        });

        state.allInfSystems.forEach((infSystem: IInfSystem) => {
          if (infSystem.id === action.payload.infSystem.id) {
            infSystem.name = action.payload.infSystem.name;
            infSystem.availability_interface = action.payload.infSystem.availability_interface;
            infSystem.web_interface_address = action.payload.infSystem.web_interface_address;
            infSystem.security_level = action.payload.infSystem.security_level;
            infSystem.product = action.payload.infSystem.product;
            infSystem.product_manager = action.payload.infSystem.product_manager;
            infSystem.inf_system_contact_person = action.payload.infSystem.inf_system_contact_person;
          }
        });

        state.status = action.payload.status;
        state.infSystemById = action.payload.infSystem;
      })
      .addCase(changeInfSystem.pending, (state) => {
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
  setInfSystemNameError,
  setInfSystemWebInterfaceAddressError,
  setInfSystemSecurityLevelError,
  setInfSystemProductError,
  setInfSystemProductManagerError,
  setInfSystemContactPersonError,
} = infSystemsSlice.actions;

export default infSystemsSlice.reducer;
