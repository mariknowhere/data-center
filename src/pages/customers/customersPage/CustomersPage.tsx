import {ChangeEvent, FC, useEffect, useState} from 'react';

import styles from '../../Items.module.scss';
import Navbar from '../../../components/navbar/Navbar';
import Table from '../../../components/table/Table';
import Pagination from '../../../components/pagination/Pagination';
import Button from '../../../components/button/Button';
import {TextVariantEnum} from '../../../components/text/TextTypes';
import {useAppDispatch} from '../../../hooks/useAppDispatch';
import {useAppSelector} from '../../../hooks/useAppSelector';
import Loader from '../../../components/loader/Loader';
import Tabs from '../../../components/tabs/Tabs';
import {ILink} from '../../../components/tabs/TabsTypes';
import Filters from '../../../components/filters/Filters';
import {selectCustomers} from '../../../store/customers/customersSelectors';
import {getCustomers} from '../../../store/customers/customersAsync';
import {customerHeadCells, customerTypes} from '../../../constants/costumer';
import CreateCustomer from '../../../components/modals/customers/CreateCustomer';
import {IFilter} from '../../../components/filters/FiltersTypes';
import {InputTypeEnum} from '../../../components/input/InputTypes';
import {ICustomer} from '../../../store/customers/customersTypes';
import {selectProfileData} from '../../../store/auth/authSelectors';
import ExportModal from '../../../components/modals/general/export/ExportModal';
import {ExportTypes} from '../../../utils/export/ExportTypes';
import Notification from '../../../components/notification/Notification';

import {CREATE_MODAL_OPEN} from '../../../constants/other';
import {filterDateOrNumber} from '../../../utils/prepare/filterDateOrNumber';
import {localization} from '../../../localization/localization';

import {exportCustomers} from './utils/exportCustomers';

let filters = '';
let pagination = '';

/**
 * Component for displaying information on customers page.
 *
 */
const CustomersPage: FC = () => {
  const dispatch = useAppDispatch();

  const { role } = useAppSelector(selectProfileData);

  const {
    customers,
    isLoading,
    error,
    status,
    count,
  } = useAppSelector(selectCustomers);

  const [isCreateModal, setCreateModal] = useState<boolean>(!!localStorage.getItem(CREATE_MODAL_OPEN));
  const [isExportModal, setExportModal] = useState<boolean>(false);

  const [selectTab, setSelectTab] = useState<string>('all');
  const [customerType, setCustomerType] = useState<any>(null);

  const [secondaryEmployees, setSecondaryEmployees] = useState<number | null>(null);

  const [customerFilters, setCustomerFilters] = useState<ICustomer>({
    customer_name: '',
    customer_type: '',
    inn: null,
    number_employees: null,
    is_delete: false,
  });

  useEffect(() => {
    dispatch(getCustomers({}));

    if (localStorage.getItem(CREATE_MODAL_OPEN)) {
      localStorage.removeItem(CREATE_MODAL_OPEN);
    }
  }, [dispatch]);

  const onCustomerTypeChange = (data: any) => {
    const prepareType = data.map(({ value }: any) => value);

    setCustomerType(data);
    setCustomerFilters({...customerFilters, customer_type: prepareType });
  };

  const onTabClick = (name: string) => setSelectTab(name);
  const onExportModalChange = () => setExportModal(prevState => !prevState);
  const onCreateModalChange = () => setCreateModal(prevState => !prevState);

  const onSearchButtonClick = (reset: boolean) => {
    filters = '';

    Object.entries(customerFilters).forEach((customerValue: any) => {
      const isFilterItemArray = Array.isArray(customerValue[1]);
      const isFilterArrayEmpty = isFilterItemArray && customerValue[1].length > 0;

      if (customerValue[1] && !isFilterItemArray) {
        filters += `${filters ? '&' : ''}${customerValue[0]}=${customerValue[1]}`;
      } else if (isFilterArrayEmpty) {
        customerValue[1].forEach((filter: string) => {
          filters += `${filters ? '&' : ''}${customerValue[0]}=${filter}`;
        });
      }
    });

    filters = filterDateOrNumber(filters, customerFilters, secondaryEmployees, 'number_employees');

    if (reset) {
      filters = '';

      setCustomerFilters({
        customer_name: '',
        customer_type: '',
        inn: null,
        number_employees: null,
        is_delete: false,
      });

      setCustomerType(null);
      setSecondaryEmployees(null);

      dispatch(getCustomers({ filters: '', pagination }));
    }

    if (filters && !reset) {
      dispatch(getCustomers({ filters, pagination }));
    }
  };

  const onPageClick = (offset: number, limit: number) => {
    pagination = `offset=${offset}&limit=${limit}`;

    dispatch(getCustomers({ pagination, filters }));
  };

  const customerTabLinks: ILink[] = [
    {
      name: localization.customer.tabs.allTitle,
      count: count,
      tabId: 'all',
    },
  ];

  const filterItems: IFilter[] = [
    {
      id: 1,
      text: localization.customer.filters.customerNameText,
      placeholder: localization.customer.filters.customerNamePlaceholder,
      type: InputTypeEnum.Text,
      value: customerFilters.customer_name,
      onChange: (event: ChangeEvent<HTMLInputElement>) => setCustomerFilters({
        ...customerFilters,
        customer_name: event.target.value,
      }),
    },
    {
      id: 2,
      text: localization.customer.filters.innText,
      placeholder: localization.customer.filters.innPlaceholder,
      type: InputTypeEnum.Number,
      value: customerFilters.inn,
      onChange: (event: ChangeEvent<HTMLInputElement>) => setCustomerFilters({
        ...customerFilters,
        inn: parseInt(event.target.value),
      }),
    },
    {
      id: 3,
      text: localization.customer.filters.employeesText,
      placeholder: localization.customer.filters.employeesPlaceholder,
      type: InputTypeEnum.Number,
      value: customerFilters.number_employees,
      onChange: (event: ChangeEvent<HTMLInputElement>) => setCustomerFilters({
        ...customerFilters,
        number_employees: parseInt(event.target.value),
      }),
      secondaryValue: secondaryEmployees,
      onSecondaryChange: (event: ChangeEvent<HTMLInputElement>) => setSecondaryEmployees(parseInt(event.target.value)),
      primaryText: localization.common.primaryNumberTextHelper,
      secondaryText: localization.common.secondaryNumberTextHelper,
    },
    {
      id: 4,
      text: localization.customer.filters.typeText,
      placeholder: localization.customer.filters.typePlaceholder,
      value: customerType,
      onSelectChange: onCustomerTypeChange,
      options: customerTypes,
      isMulti: true,
    },
    {
      id: 5,
      text: localization.common.deleteFilterText,
      type: InputTypeEnum.Checkbox,
      value: customerFilters.is_delete,
      onChange: (event: ChangeEvent<HTMLInputElement>) => setCustomerFilters({
        ...customerFilters,
        is_delete: event.target.checked,
      }),
    },
  ];

  return (
    <>
      <Navbar/>
      <div className={styles.items}>
        {isLoading ? <Loader/> : (
          <>
            <div className={styles['items-content']}>
              <Filters filters={filterItems} onSearchButtonClick={onSearchButtonClick}/>
              <Tabs links={customerTabLinks} tabActive={selectTab} onClick={onTabClick}/>
              <div className={styles['items-departures']}>
                {(role === 'admin' || role === 'manager' || role === 'chief') && (
                  <Button
                    onClick={onCreateModalChange}
                    buttonText={localization.customer.createButtonText}
                    typeButtonText={TextVariantEnum.S}
                  />
                )}
                <Button
                  onClick={onExportModalChange}
                  buttonText={localization.common.exportTableButtonText}
                  typeButtonText={TextVariantEnum.S}
                />
              </div>
            </div>
            <div className={styles['items-table-wrapper']}>
              <Table className={styles['items-table']} headCells={customerHeadCells} customerBodyRows={customers}/>
            </div>
          </>
        )}
        <Pagination count={count} onPageClick={onPageClick}/>
        <CreateCustomer isModalVisible={isCreateModal} setModalVisible={setCreateModal}/>
        <ExportModal
          isModalVisible={isExportModal}
          setModalVisible={setExportModal}
          handlePdfExport={() => exportCustomers(ExportTypes.PDF, customers)}
          handleDocxExport={() => exportCustomers(ExportTypes.DOCX, customers)}
          handleExcelExport={() => exportCustomers(ExportTypes.EXCEL, customers)}
        />
        {(status !== 200 && status !== 202 && status !== 203 && status !== 205 && status !== 206 && status !== 207) && (
          <Notification status={status} error={error} title={localization.customer.notificationTitle} />
        )}
      </div>
    </>
  );
};

export default CustomersPage;
