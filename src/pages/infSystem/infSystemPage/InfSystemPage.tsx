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
import {deleteInfSystem, getAllInfSystems, getInfSystemById} from '../../../store/infSystems/infSystemsAsync';
import {IInfSystem} from '../../../store/infSystems/infSystemsTypes';
import ChangeInfSystem from '../../../components/modals/infSystem/ChangeInfSystem';
import Notification from '../../../components/notification/Notification';
import {selectInfSystemById, selectInfSystems} from '../../../store/infSystems/infSystemsSelectors';
import Archive from '../../../components/archive/Archive';
import {ROUTES} from '../../../router/routes';
import {localization} from '../../../localization/localization';

/**
 * Component for displaying information on inf system page.
 *
 */
const InfSystemPage: FC = () => {
  const dispatch = useAppDispatch();

  const { customerId, infSystemId } = useParams();
  const navigate = useNavigate();

  const {
    allInfSystems,
    status,
    isLoading,
    error,
  } = useAppSelector(selectInfSystems);

  const {
    name,
    availability_interface,
    web_interface_address,
    security_level,
    product,
    product_manager,
    inf_system_contact_person,
    is_delete: isDelete,
  }: IInfSystem = useAppSelector(selectInfSystemById);

  const [isChangeInfSystemModal, setChangeInfSystemModal] = useState<boolean>(false);
  const [isDeleteInfSystemModal, setDeleteInfSystemModal] = useState<boolean>(false);

  useEffect(() => {
    if (customerId && infSystemId) {
      dispatch(getInfSystemById({ customerId, infSystemId }));

      if (allInfSystems.length === 0) {
        dispatch(getAllInfSystems({ id: customerId }));
      }
    }
  }, [dispatch, customerId, infSystemId, allInfSystems.length]);

  const removeInfSystemHandler = () => {
    if (customerId && infSystemId) {
      dispatch(deleteInfSystem({ customerId, infSystemId }));
    }

    navigate(`/${ROUTES.CUSTOMERS}/${customerId}/${ROUTES.INF_SYSTEMS}`);
  };

  const onInfSystemChangeHandler = () => setChangeInfSystemModal(prevState => !prevState);
  const onDeleteInfSystemModalHandler = () => setDeleteInfSystemModal(prevState => !prevState);

  const onBackNavigate = () => navigate(`/${ROUTES.CUSTOMERS}/${customerId}/${ROUTES.INF_SYSTEMS}`);

  const infoList: IItemProps[] = [
    {
      title: localization.infSystem.infoList.nameText,
      text: name ? name : '-',
      id: 1,
      isFirst: true,
    },
    {
      title: localization.infSystem.infoList.availabilityInterfaceText,
      text: availability_interface ? localization.common.present : localization.common.absent,
      id: 2,
    },
    {
      title: localization.infSystem.infoList.webInterfaceAddressText,
      text: web_interface_address ? web_interface_address : '-',
      id: 3,
    },
    {
      title: localization.infSystem.infoList.securityLevelText,
      text: (security_level !== null && security_level !== undefined) ? security_level.toString() : '-',
      id: 4,
    },
  ];

  const secondaryInfoList: IItemProps[] = [
    {
      title: localization.infSystem.secondaryInfoList.productText,
      text: product ? product : '-',
      id: 1,
      isFirst: true,
    },
    {
      title: localization.infSystem.secondaryInfoList.productManagerText,
      text: product_manager ? product_manager : '-',
      id: 2,
    },
    {
      title: localization.infSystem.secondaryInfoList.contactPersonText,
      text: inf_system_contact_person ? inf_system_contact_person : '-',
      id: 3,
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
                {localization.infSystem.infoList.title}
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
                      {localization.infSystem.interactive.title}
                      {isDelete && (
                        <Archive />
                      )}
                    </>
                  </Title>
                  <div className={styles['item-panel-top-buttons']}>
                    <Button onClick={onBackNavigate} buttonText={localization.common.backButtonText} />
                    <Button
                      onClick={onInfSystemChangeHandler}
                      buttonText={localization.common.changeButtonText}
                    />
                    <Button
                      onClick={onDeleteInfSystemModalHandler}
                      buttonText={localization.common.deleteButtonText}
                      type={ButtonTypeEnum.Red}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <ChangeInfSystem isModalVisible={isChangeInfSystemModal} setModalVisible={setChangeInfSystemModal}/>
        <ConfirmModal
          isModalVisible={isDeleteInfSystemModal}
          setModalVisible={setDeleteInfSystemModal}
          text={localization.infSystem.confirmText}
          onConfirmClick={removeInfSystemHandler}
        />
        {(status !== 201 && status !== 202 && status !== 203 && status !== 204 && status !== 205 && status !== 206) && (
          <Notification status={status} error={error} title={localization.infSystem.notificationTitle} />
        )}
      </div>
    </>
  );
};

export default InfSystemPage;
