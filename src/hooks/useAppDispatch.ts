import {useDispatch} from 'react-redux';

import {AppDispatch} from '../store/storeTypes';

export const useAppDispatch = () => useDispatch<AppDispatch>();
