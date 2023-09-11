import {ChangeEvent, FC, useEffect, useState} from 'react';

import {useNavigate, useParams} from 'react-router-dom';

import styles from '../../Items.module.scss';
import Navbar from '../../../components/navbar/Navbar';
import Table from '../../../components/table/Table';
import Pagination from '../../../components/pagination/Pagination';
import Filters from '../../../components/filters/Filters';
import Button from '../../../components/button/Button';
import {TextVariantEnum} from '../../../components/text/TextTypes';
import {useAppDispatch} from '../../../hooks/useAppDispatch';
import {useAppSelector} from '../../../hooks/useAppSelector';
import Loader from '../../../components/loader/Loader';
import Tabs from '../../../components/tabs/Tabs';
import {ILink} from '../../../components/tabs/TabsTypes';
import {InputTypeEnum} from '../../../components/input/InputTypes';
import {IFilter} from '../../../components/filters/FiltersTypes';
import {IOffice} from '../../../store/offices/officesTypes';
import {getOffices} from '../../../store/offices/officesAsync';
import {officeHeadCells} from '../../../constants/offices';
import CreateOffice from '../../../components/modals/office/CreateOffice';
import ExportModal from '../../../components/modals/general/export/ExportModal';
import {ExportTypes} from '../../../utils/export/ExportTypes';
import Notification from '../../../components/notification/Notification';

import {selectOffices} from '../../../store/offices/officesSelectors';

import {CREATE_MODAL_OPEN} from '../../../constants/other';
import {filterDateOrNumber} from '../../../utils/prepare/filterDateOrNumber';
import {ROUTES} from '../../../router/routes';
import {localization} from '../../../localization/localization';

import {exportOffices} from './utils/exportOffices';

let filters = '';
let pagination = '';

/**
 * Component for displaying information on offices page.
 *
 */
const OfficesPage: FC = () => {
  const dispatch = useAppDispatch();

  const { customerId } = useParams();
  const navigate = useNavigate();

  const {
    offices,
    status,
    count,
    isLoading,
    error,
  } = useAppSelector(selectOffices);

  const [isCreateModal, setCreateModal] = useState<boolean>(!!localStorage.getItem(CREATE_MODAL_OPEN));
  const [isExportModal, setExportModal] = useState<boolean>(false);
  const [selectTab, setSelectTab] = useState<string>('all');

  const [secondarySecurityLevel, setSecondarySecurityLevel] = useState<number | null>(null);

  const [officeFilters, setOfficeFilters] = useState<IOffice>({
    address: '',
    availability_separate_internet: false,
    availability_wifi: false,
    name: '',
    security_level: null,
    responsible_is: '',
    is_delete: false,
  });

  useEffect(() => {
    dispatch(getOffices({ id: customerId }));

    if (localStorage.getItem(CREATE_MODAL_OPEN)) {
      localStorage.removeItem(CREATE_MODAL_OPEN);
    }
  }, [dispatch, customerId]);

  const onTabClick = (name: string) => setSelectTab(name);

  const onExportProjectHandler = () => setExportModal(prevState => !prevState);
  const onCreateOfficeHandler = () => setCreateModal(prevState => !prevState);

  const onBackNavigate = () => navigate(`/${ROUTES.CUSTOMERS}/${customerId}`);

  const onSearchButtonClick = (reset: boolean) => {
    filters = '';

    Object.entries(officeFilters).forEach((officeValue: any) => {
      if (officeValue[1] || officeValue[1] === 0) {
        filters += `${filters ? '&' : ''}${officeValue[0]}=${officeValue[1]}`;
      }
    });

    filters = filterDateOrNumber(filters, officeFilters, secondarySecurityLevel, 'security_level');

    if (reset) {
      filters = '';

      setOfficeFilters({
        address: '',
        availability_separate_internet: false,
        availability_wifi: false,
        name: '',
        security_level: null,
        responsible_is: '',
        is_delete: false,
      });

      setSecondarySecurityLevel(null);

      dispatch(getOffices({ id: customerId, filters: '', pagination }));
    }

    if (filters && !reset) {
      dispatch(getOffices({ filters, pagination, id: customerId }));
    }
  };

  const onPageClick = (offset: number, limit: number) => {
    pagination = `offset=${offset}&limit=${limit}`;

    if (customerId) {
      dispatch(getOffices({ pagination, filters, id: customerId }));
    }
  };

  const officeTabLinks: ILink[] = [
    {
      name: localization.office.tabs.allTitle,
      count: count,
      tabId: 'all',
    },
  ];

  const filterItems: IFilter[] = [
    {
      id: 1,
      text: localization.office.filters.nameText,
      placeholder: localization.office.filters.namePlaceholder,
      type: InputTypeEnum.Text,
      value: officeFilters.name,
      onChange: (event: ChangeEvent<HTMLInputElement>) => setOfficeFilters({
        ...officeFilters,
        name: event.target.value,
      }),
    },
    {
      id: 2,
      text: localization.office.filters.addressText,
      placeholder: localization.office.filters.addressPlaceholder,
      type: InputTypeEnum.Text,
      value: officeFilters.address,
      onChange: (event: ChangeEvent<HTMLInputElement>) => setOfficeFilters({
        ...officeFilters,
        address: event.target.value,
      }),
    },
    {
      id: 3,
      text: localization.office.filters.responsibleText,
      placeholder: localization.office.filters.responsiblePlaceholder,
      type: InputTypeEnum.Text,
      value: officeFilters.responsible_is,
      onChange: (event: ChangeEvent<HTMLInputElement>) => setOfficeFilters({
        ...officeFilters,
        responsible_is: event.target.value,
      }),
    },
    {
      id: 4,
      text: localization.office.filters.securityLevelText,
      placeholder: localization.office.filters.securityLevelPlaceholder,
      type: InputTypeEnum.Number,
      value: officeFilters.security_level,
      onChange: (event: ChangeEvent<HTMLInputElement>) => setOfficeFilters({
        ...officeFilters,
        security_level: parseInt(event.target.value),
      }),
      secondaryValue: secondarySecurityLevel,
      onSecondaryChange: (event: ChangeEvent<HTMLInputElement>) => {
        setSecondarySecurityLevel(parseInt(event.target.value));
      },
      primaryText: localization.common.primaryNumberTextHelper,
      secondaryText: localization.common.secondaryNumberTextHelper,
    },
    {
      id: 5,
      text: localization.office.filters.availabilityWifiText,
      type: InputTypeEnum.Checkbox,
      value: officeFilters.availability_wifi,
      onChange: (event: ChangeEvent<HTMLInputElement>) => setOfficeFilters({
        ...officeFilters,
        availability_wifi: event.target.checked,
      }),
    },
    {
      id: 6,
      text: localization.office.filters.availabilitySeparateInternetText,
      type: InputTypeEnum.Checkbox,
      value: officeFilters.availability_separate_internet,
      onChange: (event: ChangeEvent<HTMLInputElement>) => setOfficeFilters({
        ...officeFilters,
        availability_separate_internet: event.target.checked,
      }),
    },
    {
      id: 7,
      text: localization.common.deleteFilterText,
      type: InputTypeEnum.Checkbox,
      value: officeFilters.is_delete,
      onChange: (event: ChangeEvent<HTMLInputElement>) => setOfficeFilters({
        ...officeFilters,
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
              <Tabs links={officeTabLinks} tabActive={selectTab} onClick={onTabClick}/>
              <div className={styles['items-departures']}>
                <Button
                  onClick={onBackNavigate}
                  buttonText={localization.common.backButtonText}
                  typeButtonText={TextVariantEnum.S}
                />
                <Button
                  onClick={onCreateOfficeHandler}
                  buttonText={localization.office.createButtonText}
                  typeButtonText={TextVariantEnum.S}
                />
                <Button
                  onClick={onExportProjectHandler}
                  buttonText={localization.common.exportTableButtonText}
                  typeButtonText={TextVariantEnum.S}
                />
              </div>
            </div>
            <div className={styles['items-table-wrapper']}>
              <Table className={styles['items-table']} headCells={officeHeadCells} officeBodyRows={offices}/>
            </div>
          </>
        )}
        <Pagination count={count} onPageClick={onPageClick} />
        <CreateOffice isModalVisible={isCreateModal} setModalVisible={setCreateModal}/>
        <ExportModal
          isModalVisible={isExportModal}
          setModalVisible={setExportModal}
          handlePdfExport={() => exportOffices(ExportTypes.PDF, offices)}
          handleDocxExport={() => exportOffices(ExportTypes.DOCX, offices)}
          handleExcelExport={() => exportOffices(ExportTypes.EXCEL, offices)}
        />
        {(status !== 200 && status !== 202 && status !== 203 && status !== 205 && status !== 206 && status !== 207) && (
          <Notification status={status} error={error} title={localization.office.notificationTitle} />
        )}
      </div>
    </>
  );
};

export default OfficesPage;
