import {TypedUseSelectorHook, useSelector} from 'react-redux';

import {RootState} from '../store/storeTypes';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
