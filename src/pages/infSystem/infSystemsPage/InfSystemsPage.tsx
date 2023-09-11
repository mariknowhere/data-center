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
import {getInfSystems} from '../../../store/infSystems/infSystemsAsync';
import {infSystemHeadCells} from '../../../constants/infSystems';
import {IInfSystem} from '../../../store/infSystems/infSystemsTypes';
import CreateInfSystem from '../../../components/modals/infSystem/CreateInfSystem';
import ExportModal from '../../../components/modals/general/export/ExportModal';
import {ExportTypes} from '../../../utils/export/ExportTypes';
import Notification from '../../../components/notification/Notification';

import {selectInfSystems} from '../../../store/infSystems/infSystemsSelectors';

import {CREATE_MODAL_OPEN} from '../../../constants/other';
import {filterDateOrNumber} from '../../../utils/prepare/filterDateOrNumber';
import {ROUTES} from '../../../router/routes';
import {localization} from '../../../localization/localization';

import {exportInfSystems} from './utils/exportInfSystems';

let filters = '';
let pagination = '';

/**
 * Component for displaying information on inf systems page.
 *
 */
const InfSystemsPage: FC = () => {
  const dispatch = useAppDispatch();

  const { customerId } = useParams();
  const navigate = useNavigate();

  const {
    infSystems,
    status,
    count,
    isLoading,
    error,
  } = useAppSelector(selectInfSystems);

  const [isCreateModal, setCreateModal] = useState<boolean>(!!localStorage.getItem(CREATE_MODAL_OPEN));
  const [isExportModal, setExportModal] = useState<boolean>(false);
  const [selectTab, setSelectTab] = useState<string>('all');

  const [secondarySecurityLevel, setSecondarySecurityLevel] = useState<number | null>(null);

  const [infSystemFilters, setInfSystemFilters] = useState<IInfSystem>({
    availability_interface: false,
    inf_system_contact_person: '',
    name: '',
    security_level: null,
    product: '',
    product_manager: '',
    web_interface_address: '',
    is_delete: false,
  });

  useEffect(() => {
    dispatch(getInfSystems({ id: customerId }));

    if (localStorage.getItem(CREATE_MODAL_OPEN)) {
      localStorage.removeItem(CREATE_MODAL_OPEN);
    }
  }, [dispatch, customerId]);

  const onTabClick = (name: string) => setSelectTab(name);
  const onExportProjectHandler = () => setExportModal(prevState => !prevState);
  const onCreateInfSystemHandler = () => setCreateModal(prevState => !prevState);

  const onBackNavigate = () => navigate(`/${ROUTES.CUSTOMERS}/${customerId}`);

  const onPageClick = (offset: number, limit: number) => {
    pagination = `offset=${offset}&limit=${limit}`;

    if (customerId) {
      dispatch(getInfSystems({ pagination, filters, id: customerId }));
    }
  };

  const onSearchButtonClick = (reset: boolean) => {
    filters = '';

    Object.entries(infSystemFilters).forEach((infSystemValue: any) => {
      if (infSystemValue[1] || infSystemValue[1] === 0) {
        filters += `${filters ? '&' : ''}${infSystemValue[0]}=${infSystemValue[1]}`;
      }
    });

    filters = filterDateOrNumber(filters, infSystemFilters, secondarySecurityLevel, 'security_level');

    if (reset) {
      filters = '';

      setInfSystemFilters({
        availability_interface: false,
        inf_system_contact_person: '',
        name: '',
        security_level: null,
        product: '',
        product_manager: '',
        web_interface_address: '',
        is_delete: false,
      });

      setSecondarySecurityLevel(null);

      dispatch(getInfSystems({ id: customerId, filters: '', pagination }));
    }

    if (filters && !reset) {
      dispatch(getInfSystems({ filters, pagination, id: customerId }));
    }
  };

  const infSystemTabLinks: ILink[] = [
    {
      name: localization.infSystem.tabs.allTitle,
      count: count,
      tabId: 'all',
    },
  ];

  const filterItems: IFilter[] = [
    {
      id: 1,
      text: localization.infSystem.filters.nameText,
      placeholder: localization.infSystem.filters.namePlaceholder,
      type: InputTypeEnum.Text,
      value: infSystemFilters.name,
      onChange: (event: ChangeEvent<HTMLInputElement>) => setInfSystemFilters({
        ...infSystemFilters,
        name: event.target.value,
      }),
    },
    {
      id: 2,
      text: localization.infSystem.filters.webInterfaceText,
      placeholder: localization.infSystem.filters.webInterfacePlaceholder,
      type: InputTypeEnum.Text,
      value: infSystemFilters.web_interface_address,
      onChange: (event: ChangeEvent<HTMLInputElement>) => setInfSystemFilters({
        ...infSystemFilters,
        web_interface_address: event.target.value,
      }),
    },
    {
      id: 3,
      text: localization.infSystem.filters.securityLevelText,
      placeholder: localization.infSystem.filters.securityLevelPlaceholder,
      type: InputTypeEnum.Number,
      value: infSystemFilters.security_level,
      onChange: (event: ChangeEvent<HTMLInputElement>) => setInfSystemFilters({
        ...infSystemFilters,
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
      id: 4,
      text: localization.infSystem.filters.productText,
      placeholder: localization.infSystem.filters.productPlaceholder,
      type: InputTypeEnum.Text,
      value: infSystemFilters.product,
      onChange: (event: ChangeEvent<HTMLInputElement>) => setInfSystemFilters({
        ...infSystemFilters,
        product: event.target.value,
      }),
    },
    {
      id: 5,
      text: localization.infSystem.filters.productManagerText,
      placeholder: localization.infSystem.filters.productManagerPlaceholder,
      type: InputTypeEnum.Text,
      value: infSystemFilters.product_manager,
      onChange: (event: ChangeEvent<HTMLInputElement>) => setInfSystemFilters({
        ...infSystemFilters,
        product_manager: event.target.value,
      }),
    },
    {
      id: 6,
      text: localization.infSystem.filters.contactPersonText,
      placeholder: localization.infSystem.filters.contactPersonPlaceholder,
      type: InputTypeEnum.Text,
      value: infSystemFilters.inf_system_contact_person,
      onChange: (event: ChangeEvent<HTMLInputElement>) => setInfSystemFilters({
        ...infSystemFilters,
        inf_system_contact_person: event.target.value,
      }),
    },
    {
      id: 7,
      text: localization.infSystem.filters.availabilityInterfaceText,
      type: InputTypeEnum.Checkbox,
      value: infSystemFilters.availability_interface,
      onChange: (event: ChangeEvent<HTMLInputElement>) => setInfSystemFilters({
        ...infSystemFilters,
        availability_interface: event.target.checked,
      }),
    },
    {
      id: 8,
      text: localization.common.deleteFilterText,
      type: InputTypeEnum.Checkbox,
      value: infSystemFilters.is_delete,
      onChange: (event: ChangeEvent<HTMLInputElement>) => setInfSystemFilters({
        ...infSystemFilters,
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
              <Tabs links={infSystemTabLinks} tabActive={selectTab} onClick={onTabClick}/>
              <div className={styles['items-departures']}>
                <Button
                  onClick={onBackNavigate}
                  buttonText={localization.common.backButtonText}
                  typeButtonText={TextVariantEnum.S}
                />
                <Button
                  onClick={onCreateInfSystemHandler}
                  buttonText={localization.infSystem.createButtonText}
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
              <Table className={styles['items-table']} headCells={infSystemHeadCells} infSystemBodyRows={infSystems}/>
            </div>
          </>
        )}
        <Pagination count={count} onPageClick={onPageClick} />
        <CreateInfSystem isModalVisible={isCreateModal} setModalVisible={setCreateModal}/>
        <ExportModal
          isModalVisible={isExportModal}
          setModalVisible={setExportModal}
          handlePdfExport={() => exportInfSystems(ExportTypes.PDF, infSystems)}
          handleDocxExport={() => exportInfSystems(ExportTypes.DOCX, infSystems)}
          handleExcelExport={() => exportInfSystems(ExportTypes.EXCEL, infSystems)}
        />
        {(status !== 200 && status !== 202 && status !== 203 && status !== 205 && status !== 206 && status !== 207) && (
          <Notification status={status} error={error} title={localization.infSystem.notificationTitle} />
        )}
      </div>
    </>
  );
};

export default InfSystemsPage;
