import {createSlice} from '@reduxjs/toolkit';

import {isError} from '../storeHelpers';

import {ICustomer, ICustomersState} from './customersTypes';
import {
  changeCustomer,
  createCustomer,
  deleteCustomer,
  getAllCustomers,
  getCustomerById,
  getCustomers, restoreCustomer,
} from './customersAsync';

const initialState: ICustomersState = {
  customers: [],
  allCustomers: [],
  customerById: {
    inn: 0,
    customer_name: '',
    customer_type: '',
    number_employees: 0,
  },
  errors: {
    inn_error: '',
    customer_name_error: '',
    customer_type_error: '',
    number_employees_error: '',
  },
  isLoading: false,
  error: null,
  status: null,
  count: 0,
};

export const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    setCustomerInnError(state, action)  {
      state.errors.inn_error = action.payload;
    },
    setCustomerNameError(state, action) {
      state.errors.customer_name_error = action.payload;
    },
    setCustomerTypeError(state, action)  {
      state.errors.customer_type_error = action.payload;
    },
    setCustomerNumberEmployeesError(state, action) {
      state.errors.number_employees_error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCustomers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.customers = action.payload.data;

        state.count = action.payload.count;
      })
      .addCase(getCustomers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = null;
      })
      .addCase(getAllCustomers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allCustomers = action.payload.data;

        state.count = action.payload.count;
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.count += 1;

        state.allCustomers.push(action.payload.customer);
        state.status = action.payload.status;

        state.customers.length < 10 && state.customers.push(action.payload.customer);
      })
      .addCase(createCustomer.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = null;
      })
      .addCase(changeCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.customers.forEach((customer: ICustomer) => {
          if (customer.id === action.payload.customer.id) {
            customer.inn = action.payload.customer.inn;
            customer.customer_name = action.payload.customer.customer_name;
          }
        });
        state.allCustomers.forEach((customer: ICustomer) => {
          if (customer.id === action.payload.customer.id) {
            customer.inn = action.payload.customer.inn;
            customer.customer_name = action.payload.customer.customer_name;
          }
        });

        state.status = action.payload.status;
        state.customerById = action.payload.customer;
      })
      .addCase(changeCustomer.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = null;
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.count -= 1;

        state.status = action.payload.status;
        state.customers = state.customers.filter((customer: ICustomer) => customer.id !== action.payload.id);
        state.allCustomers = state.allCustomers.filter((customer: ICustomer) => customer.id !== action.payload.id);
      })
      .addCase(deleteCustomer.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = null;
      })
      .addCase(getCustomerById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.customerById = action.payload;
      })
      .addCase(getCustomerById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = null;
      })
      .addCase(restoreCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.customerById.is_delete = false;
        state.status = action.payload.status;
      })
      .addCase(restoreCustomer.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = null;
      })

      .addMatcher(isError, (state, action) => {
        state.error = action.payload;
        state.status = action.payload;
        state.isLoading = false;
      });
  },
});

export const {
  setCustomerInnError,
  setCustomerNameError,
  setCustomerTypeError,
  setCustomerNumberEmployeesError,
} = customersSlice.actions;

export default customersSlice.reducer;
