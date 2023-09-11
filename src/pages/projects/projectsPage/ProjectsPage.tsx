import {ChangeEvent, FC, useEffect, useState} from 'react';

import styles from '../../Items.module.scss';
import Navbar from '../../../components/navbar/Navbar';
import Table from '../../../components/table/Table';
import Pagination from '../../../components/pagination/Pagination';
import {projectHeadCells} from '../../../constants/projects';
import Filters from '../../../components/filters/Filters';
import Button from '../../../components/button/Button';
import {TextVariantEnum} from '../../../components/text/TextTypes';
import {selectProjects} from '../../../store/projects/projectsSelectors';
import CreateProject from '../../../components/modals/projects/CreateProject';
import {getProjects} from '../../../store/projects/projectsAsync';
import {useAppDispatch} from '../../../hooks/useAppDispatch';
import {useAppSelector} from '../../../hooks/useAppSelector';
import Loader from '../../../components/loader/Loader';
import Tabs from '../../../components/tabs/Tabs';
import {ILink} from '../../../components/tabs/TabsTypes';
import {InputTypeEnum} from '../../../components/input/InputTypes';
import {IFilter} from '../../../components/filters/FiltersTypes';
import {dateChange} from '../../../utils/dateChange';
import {IProject} from '../../../store/projects/projectsTypes';
import {selectProfileData} from '../../../store/auth/authSelectors';
import ExportModal from '../../../components/modals/general/export/ExportModal';
import {ExportTypes} from '../../../utils/export/ExportTypes';
import Notification from '../../../components/notification/Notification';

import {filterDateOrNumber} from '../../../utils/prepare/filterDateOrNumber';
import {localization} from '../../../localization/localization';

import {exportProjects} from './utils/exportProjects';

let filters = '';
let pagination = '';

/**
 * Component for displaying information on projects page.
 *
 */
const ProjectsPage: FC = () => {
  const dispatch = useAppDispatch();

  const { role } = useAppSelector(selectProfileData);

  const {
    projects,
    isLoading,
    error,
    status,
    count,
  } = useAppSelector(selectProjects);

  const [projectFilters, setProjectFilters] = useState<IProject>({
    end_date: '',
    gos_order_date: '',
    gos_order_number: '',
    name: '',
    start_date: '',
    is_delete: false,
  });

  const [isCreateModal, setCreateModal] = useState<boolean>(false);
  const [isExportModal, setExportModal] = useState<boolean>(false);
  const [selectTab, setSelectTab] = useState<string>('all');

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [gosOrderDate, setGosOrderDate] = useState<Date | null>(null);

  const [secondaryStartDate, setSecondaryStartDate] = useState<Date | null>(null);
  const [secondaryEndDate, setSecondaryEndDate] = useState<Date | null>(null);
  const [secondaryGosOrderDate, setSecondaryGosOrderDate] = useState<Date | null>(null);

  const [prepareSecondaryStartDate, setPrepareSecondaryStartDate] = useState<string>('');
  const [prepareSecondaryEndDate, setPrepareSecondaryEndDate] = useState<string>('');
  const [prepareSecondaryGosOrderDate, setPrepareSecondaryGosOrderDate] = useState<string>('');

  useEffect(() => {
    dispatch(getProjects({}));
  }, [dispatch]);

  const onTabClick = (name: string) => setSelectTab(name);
  const onCreateProjectHandler = () => setCreateModal(prevState => !prevState);
  const onExportProjectHandler = () => setExportModal(prevState => !prevState);

  const onStartDateChange = (date: any) => {
    dateChange(date, setStartDate, setProjectFilters, projectFilters, 'start_date');
  };
  const onEndDateChange = (date: any) => {
    dateChange(date, setEndDate, setProjectFilters, projectFilters, 'end_date');
  };
  const onGosDateChange = (date: any) => {
    dateChange(date, setGosOrderDate, setProjectFilters, projectFilters, 'gos_order_date');
  };

  const onSecondaryStartDateChange = (date: any) => {
    dateChange(date, setSecondaryStartDate, setPrepareSecondaryStartDate);
  };
  const onSecondaryEndDateChange = (date: any) => {
    dateChange(date, setSecondaryEndDate, setPrepareSecondaryEndDate);
  };
  const onSecondaryGosOrderDateChange = (date: any) => {
    dateChange(date, setSecondaryGosOrderDate, setPrepareSecondaryGosOrderDate);
  };

  const onSearchButtonClick = (reset: boolean) => {
    filters = '';

    Object.entries(projectFilters).forEach((projectValue: any) => {
      if (projectValue[1]) {
        filters += `${filters ? '&' : ''}${projectValue[0]}=${projectValue[1]}`;
      }
    });

    filters = filterDateOrNumber(filters, projectFilters, prepareSecondaryStartDate, 'start_date');
    filters = filterDateOrNumber(filters, projectFilters, prepareSecondaryEndDate, 'end_date');
    filters = filterDateOrNumber(filters, projectFilters, prepareSecondaryGosOrderDate, 'gos_order_date');

    if (reset) {
      filters = '';

      setProjectFilters({
        end_date: '',
        gos_order_date: '',
        gos_order_number: '',
        name: '',
        start_date: '',
        is_delete: false,
      });

      setStartDate(null);
      setEndDate(null);
      setGosOrderDate(null);

      setSecondaryStartDate(null);
      setSecondaryEndDate(null);
      setSecondaryGosOrderDate(null);

      setPrepareSecondaryStartDate('');
      setPrepareSecondaryEndDate('');
      setPrepareSecondaryGosOrderDate('');

      dispatch(getProjects({ filters: '', pagination }));
    }

    if (filters && !reset) {
      dispatch(getProjects({ filters, pagination }));
    }
  };

  const onPageClick = (offset: number, limit: number) => {
    pagination = `offset=${offset}&limit=${limit}`;

    dispatch(getProjects({ pagination, filters }));
  };

  const projectsTabLinks: ILink[] = [
    {
      name: localization.project.tabs.allTitle,
      count: count,
      tabId: 'all',
    },
  ];

  const filterItems: IFilter[] = [
    {
      id: 1,
      text: localization.project.filters.nameText,
      placeholder: localization.project.filters.namePlaceholder,
      type: InputTypeEnum.Text,
      value: projectFilters.name,
      onChange: (event: ChangeEvent<HTMLInputElement>) => setProjectFilters({
        ...projectFilters,
        name: event.target.value,
      }),
    },
    {
      id: 2,
      text: localization.project.filters.startDateText,
      type: InputTypeEnum.Date,
      date: startDate,
      onDateChange: onStartDateChange,
      secondaryValue: secondaryStartDate,
      onSecondaryChange: onSecondaryStartDateChange,
      primaryText: localization.common.primaryDateTextHelper,
      secondaryText: localization.common.secondaryDateTextHelper,
    },
    {
      id: 3,
      text: localization.project.filters.endDateText,
      type: InputTypeEnum.Date,
      date: endDate,
      onDateChange: onEndDateChange,
      secondaryValue: secondaryEndDate,
      onSecondaryChange: onSecondaryEndDateChange,
      primaryText: localization.common.primaryDateTextHelper,
      secondaryText: localization.common.secondaryDateTextHelper,
    },
    {
      id: 4,
      text: localization.project.filters.gosOrderNumberText,
      placeholder: localization.project.filters.gosOrderNumberPlaceholder,
      type: InputTypeEnum.Text,
      value: projectFilters.gos_order_number,
      onChange: (event: ChangeEvent<HTMLInputElement>) => setProjectFilters({
        ...projectFilters,
        gos_order_number: event.target.value,
      }),
    },
    {
      id: 5,
      text: localization.project.filters.gosOrderDateText,
      type: InputTypeEnum.Date,
      date: gosOrderDate,
      onDateChange: onGosDateChange,
      secondaryValue: secondaryGosOrderDate,
      onSecondaryChange: onSecondaryGosOrderDateChange,
      primaryText: localization.common.primaryDateTextHelper,
      secondaryText: localization.common.secondaryDateTextHelper,
    },
    {
      id: 6,
      text: localization.common.deleteFilterText,
      type: InputTypeEnum.Checkbox,
      value: projectFilters.is_delete,
      onChange: (event: ChangeEvent<HTMLInputElement>) => setProjectFilters({
        ...projectFilters,
        is_delete: event.target.checked,
      }),
    },
  ];

  return (
    <>
      <Navbar />
      <div className={styles.items}>
        {isLoading ? <Loader/> : (
          <>
            <div className={styles['items-content']}>
              <Filters filters={filterItems} onSearchButtonClick={onSearchButtonClick}/>
              <Tabs links={projectsTabLinks} tabActive={selectTab} onClick={onTabClick}/>
              <div className={styles['items-departures']}>
                {(role === 'admin' || role === 'manager' || role === 'chief') && (
                  <Button
                    onClick={onCreateProjectHandler}
                    buttonText={localization.project.createButtonText}
                    typeButtonText={TextVariantEnum.S}
                  />
                )}
                <Button
                  onClick={onExportProjectHandler}
                  buttonText={localization.common.exportTableButtonText}
                  typeButtonText={TextVariantEnum.S}
                />
              </div>
            </div>
            <div className={styles['items-table-wrapper']}>
              <Table className={styles['items-table']} headCells={projectHeadCells} projectsBodyRows={projects} />
            </div>
          </>
        )}
        <Pagination onPageClick={onPageClick} count={count} />
        {(role === 'admin' || role === 'manager' || role === 'chief') && (
          <CreateProject isModalVisible={isCreateModal} setModalVisible={setCreateModal}/>
        )}
        <ExportModal
          isModalVisible={isExportModal}
          setModalVisible={setExportModal}
          handlePdfExport={() => exportProjects(ExportTypes.PDF, projects)}
          handleDocxExport={() => exportProjects(ExportTypes.DOCX, projects)}
          handleExcelExport={() => exportProjects(ExportTypes.EXCEL, projects)}
        />
        {(status !== 200 && status !== 202 && status !== 203 && status !== 205 && status !== 206 && status !== 207) && (
          <Notification status={status} error={error} title={localization.project.notificationProjectTitle} />
        )}
      </div>
    </>
  );
};

export default ProjectsPage;
