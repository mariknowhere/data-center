import {FC, useEffect, useState} from 'react';

import {useNavigate, useParams} from 'react-router-dom';

import classNames from 'classnames';

import styles from '../../Item.module.scss';
import Navbar from '../../../components/navbar/Navbar';
import Button from '../../../components/button/Button';
import {ButtonTypeEnum} from '../../../components/button/ButtonTypes';
import {useAppSelector} from '../../../hooks/useAppSelector';
import {useAppDispatch} from '../../../hooks/useAppDispatch';
import PageItem from '../../../components/pageItem/PageItem';
import {IItemProps} from '../../../components/pageItem/PageItemTypes';
import Title from '../../../components/title/Title';
import {TitleVariantEnum} from '../../../components/title/TitleTypes';
import {selectCustomerById, selectCustomers} from '../../../store/customers/customersSelectors';
import {ICustomer} from '../../../store/customers/customersTypes';
import ChangeCustomer from '../../../components/modals/customers/ChangeCustomer';
import {deleteCustomer, getCustomerById, restoreCustomer} from '../../../store/customers/customersAsync';
import ConfirmModal from '../../../components/modals/general/confirm/ConfirmModal';
import Loader from '../../../components/loader/Loader';
import {ROUTES} from '../../../router/routes';
import Notification from '../../../components/notification/Notification';
import {prepareCustomerTypeToRu} from '../../../constants/costumer';


import {selectProfileData} from '../../../store/auth/authSelectors';
import Archive from '../../../components/archive/Archive';
import {ModalTypes} from '../../../components/modals/general/confirm/ConfirmTypes';
import {localization} from '../../../localization/localization';

/**
 * Component for displaying information on customer page.
 *
 */
const CustomerPage: FC = () => {
  const dispatch = useAppDispatch();

  const { customerId } = useParams();
  const navigate = useNavigate();

  const { isLoading, error, status } = useAppSelector(selectCustomers);
  const { role } = useAppSelector(selectProfileData);

  const {
    customer_name: customerName,
    customer_type: customerType,
    inn: innName,
    number_employees: numberEmployees,
    is_delete: isDelete,
  }: ICustomer = useAppSelector(selectCustomerById);

  const [isChangeCustomerModal, setChangeCustomerModal] = useState<boolean>(false);
  const [isDeleteCustomerModal, setDeleteCustomerModal] = useState<boolean>(false);
  const [isRestoreCustomerModal, setRestoreCustomerModal] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getCustomerById(customerId || ''));
  }, [dispatch, customerId]);

  const removeCustomerHandler = () => {
    if (customerId) {
      dispatch(deleteCustomer(customerId));
    }

    navigate(ROUTES.COMMON + ROUTES.CUSTOMERS);
  };

  const restoreCustomerHandler = () => {
    if (customerId) {
      dispatch(restoreCustomer(customerId));
    }
  };

  const showInfSystemsPage = () => navigate(ROUTES.INF_SYSTEMS);
  const showOfficesPage = () => navigate(ROUTES.OFFICES);

  const onChangeCustomerModalChange = () => setChangeCustomerModal(prevState => !prevState);
  const onDeleteCustomerModalChange = () => setDeleteCustomerModal(prevState => !prevState);
  const onRestoreCustomerModalChange = () => setRestoreCustomerModal(prevState => !prevState);

  const onBackNavigate = () => navigate(ROUTES.COMMON + ROUTES.CUSTOMERS);

  const infoList: IItemProps[] = [
    {
      title: localization.customer.infoList.nameText,
      text: customerName ? customerName : '-',
      id: 1,
      isFirst: true,
    },
    {
      title: localization.customer.infoList.innText,
      text: (innName !== null && innName !== undefined) ? innName.toString() : '-',
      id: 2,
    },
  ];

  const secondaryInfoList: IItemProps[] = [
    {
      title: localization.customer.secondaryInfoList.employeesText,
      text: (numberEmployees !== null && numberEmployees !== undefined) ? numberEmployees.toString() : '-',
      id: 1,
    },
    {
      title: localization.customer.secondaryInfoList.typeText,
      text: customerType ? prepareCustomerTypeToRu[customerType] : '-',
      id: 2,
    },
  ];

  return (
    <>
      <Navbar />
      <div className={styles['item-content']}>
        {isLoading ? <Loader /> : (
          <div className={styles['item-body']}>
            <div className={styles['item-body-info']}>
              <Title className={styles['item-body-info-title']} variant={TitleVariantEnum.H3}>
                {localization.customer.infoList.title}
              </Title>
              <div className={styles['item-body-info-list']}>
                {infoList.map((item) => (
                  <PageItem key={item.id} {...item} />
                ))}
              </div>
            </div>
            <div className={styles['item-body-info-secondary']}>
              <Title className={styles['item-body-info-secondary-title']} variant={TitleVariantEnum.H3}>
                {localization.common.secondaryInfoTitle}
              </Title>
              <div className={styles['item-body-info-secondary-list']}>
                {secondaryInfoList.map((item) => (
                  <PageItem key={item.id} {...item} />
                ))}
              </div>
            </div>
            <div className={styles['item-panel']}>
              <div className={styles['item-panel-top-wrapper']}>
                <div className={styles['item-panel-top']}>
                  <Title className={styles['item-panel-top-title']} variant={TitleVariantEnum.H3}>
                    <>
                      {localization.customer.interactive.title}
                      {isDelete && (
                        <Archive />
                      )}
                    </>
                  </Title>
                  <div className={styles['item-panel-top-buttons']}>
                    <Button onClick={onBackNavigate} buttonText={localization.common.backButtonText} />
                    <Button
                      onClick={onChangeCustomerModalChange}
                      buttonText={localization.common.changeButtonText}
                    />
                    <Button
                      onClick={onDeleteCustomerModalChange}
                      buttonText={localization.common.deleteButtonText}
                      type={ButtonTypeEnum.Red}
                    />
                  </div>
                  <div className={classNames(
                    styles['item-panel-top-buttons'], styles['item-panel-top-buttons_secondary'],
                  )}
                  >
                    <Button
                      onClick={showInfSystemsPage}
                      buttonText={localization.customer.interactive.infSystemButtonText}
                    />
                    <Button
                      onClick={showOfficesPage}
                      buttonText={localization.customer.interactive.officeButtonText}
                    />
                  </div>
                  {(role === 'admin' || role === 'manager' || role === 'chief') && isDelete && (
                    <div className={classNames(
                      styles['item-panel-top-buttons'], styles['item-panel-top-buttons_secondary'],
                    )}
                    >
                      <Button
                        onClick={onRestoreCustomerModalChange}
                        buttonText={localization.common.restoreButtonText}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        <ChangeCustomer isModalVisible={isChangeCustomerModal} setModalVisible={setChangeCustomerModal} />
        <ConfirmModal
          isModalVisible={isDeleteCustomerModal}
          setModalVisible={setDeleteCustomerModal}
          text={localization.customer.confirmText}
          onConfirmClick={removeCustomerHandler}
        />
        <ConfirmModal
          isModalVisible={isRestoreCustomerModal}
          setModalVisible={setRestoreCustomerModal}
          text={localization.customer.confirmText}
          onConfirmClick={restoreCustomerHandler}
          type={ModalTypes.Restore}
        />
        {(status !== 201 && status !== 202 && status !== 203 && status !== 204 && status !== 205 && status !== 206) && (
          <Notification status={status} error={error} title={localization.customer.notificationTitle} />
        )}
      </div>
    </>
  );
};

export default CustomerPage;
