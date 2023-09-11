import {FC, useEffect, useState} from 'react';

import {useNavigate, useParams} from 'react-router-dom';

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
import ConfirmModal from '../../../components/modals/general/confirm/ConfirmModal';
import Loader from '../../../components/loader/Loader';
import {IOffice} from '../../../store/offices/officesTypes';
import {deleteOffice, getAllOffices, getOfficeById} from '../../../store/offices/officesAsync';
import ChangeOffice from '../../../components/modals/office/ChangeOffice';
import Notification from '../../../components/notification/Notification';
import {selectOfficeById, selectOffices} from '../../../store/offices/officesSelectors';
import Archive from '../../../components/archive/Archive';
import {ROUTES} from '../../../router/routes';
import {localization} from '../../../localization/localization';

/**
 * Component for displaying information on office page.
 *
 */
const OfficePage: FC = () => {
  const dispatch = useAppDispatch();

  const { customerId, officeId } = useParams();
  const navigate = useNavigate();

  const {
    allOffices,
    status,
    isLoading,
    error,
  } = useAppSelector(selectOffices);

  const {
    name,
    address,
    availability_wifi,
    responsible_is,
    availability_separate_internet,
    security_level,
    is_delete: isDelete,
  }: IOffice = useAppSelector(selectOfficeById);

  const [isChangeOfficeModal, setChangeOfficeModal] = useState<boolean>(false);
  const [isDeleteOfficeModal, setDeleteOfficeModal] = useState<boolean>(false);

  useEffect(() => {
    if (customerId && officeId) {
      dispatch(getOfficeById({ customerId, officeId }));

      if (allOffices.length === 0) {
        dispatch(getAllOffices({ id: customerId }));
      }
    }
  }, [dispatch, customerId, officeId, allOffices.length]);

  const removeOfficeHandler = () => {
    if (customerId && officeId) {
      dispatch(deleteOffice({ customerId, officeId }));
    }

    navigate(`/${ROUTES.CUSTOMERS}/${customerId}/${ROUTES.OFFICES}`);
  };

  const onOfficeChangeHandler = () => setChangeOfficeModal(prevState => !prevState);
  const onConfirmDeleteModalHandler = () => setDeleteOfficeModal(prevState => !prevState);

  const onBackNavigate = () => navigate(`/${ROUTES.CUSTOMERS}/${customerId}/${ROUTES.OFFICES}`);

  const infoList: IItemProps[] = [
    {
      title: localization.office.infoList.nameText,
      text: name ? name : '-',
      id: 1,
      isFirst: true,
    },
    {
      title: localization.office.infoList.addressText,
      text: address ? address : '-',
      id: 2,
    },
    {
      title: localization.office.infoList.availabilityWifiText,
      text: availability_wifi ? localization.common.present : localization.common.absent,
      id: 3,
    },
    {
      title: localization.office.infoList.availabilitySeparateInternetText,
      text: availability_separate_internet ? localization.common.present : localization.common.absent,
      id: 4,
    },
  ];

  const secondaryInfoList: IItemProps[] = [
    {
      title: localization.office.secondaryInfoList.responsibleText,
      text: responsible_is ? responsible_is : '-',
      id: 1,
      isFirst: true,
    },

    {
      title: localization.office.secondaryInfoList.securityLevelText,
      text: (security_level !== null && security_level !== undefined) ? security_level.toString() : '-',
      id: 2,
    },
  ];

  return (
    <>
      <Navbar />
      <div className={styles['item-content']}>
        {isLoading ? <Loader/> : (
          <div className={styles['item-body']}>
            <div className={styles['item-body-info']}>
              <Title className={styles['item-body-info-title']} variant={TitleVariantEnum.H3}>
                {localization.office.infoList.title}
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
                      {localization.office.interactive.title}
                      {isDelete && (
                        <Archive />
                      )}
                    </>
                  </Title>
                  <div className={styles['item-panel-top-buttons']}>
                    <Button onClick={onBackNavigate} buttonText={localization.common.backButtonText} />
                    <Button
                      onClick={onOfficeChangeHandler}
                      buttonText={localization.common.changeButtonText}
                    />
                    <Button
                      onClick={onConfirmDeleteModalHandler}
                      buttonText={localization.common.deleteButtonText}
                      type={ButtonTypeEnum.Red}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <ChangeOffice isModalVisible={isChangeOfficeModal} setModalVisible={setChangeOfficeModal} />
        <ConfirmModal
          isModalVisible={isDeleteOfficeModal}
          setModalVisible={setDeleteOfficeModal}
          text={localization.office.confirmText}
          onConfirmClick={removeOfficeHandler}
        />
        {(status !== 201 && status !== 202 && status !== 203 && status !== 204 && status !== 205 && status !== 206) && (
          <Notification status={status} error={error} title={localization.office.notificationTitle} />
        )}
      </div>
    </>
  );
};

export default OfficePage;
