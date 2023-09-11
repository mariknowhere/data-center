import {FC, useEffect, useState} from 'react';

import {useNavigate} from 'react-router-dom';

import classNames from 'classnames';

import Text from '../text/Text';
import {TextVariantEnum} from '../text/TextTypes';
import {ROUTES_OBJECT} from '../../router/routes';
import Input from '../input/Input';
import {InputTypeEnum} from '../input/InputTypes';
import {
  OBJECT_TYPES,
  prepareAttackerModelToRu,
  prepareDesktopPlatformToRu,
  prepareMobilePlatformToRu, prepareObjectTypeToRu, prepareProgrammingLanguageToRu, prepareSocialEngineeringTypesToRu,
  prepareWorkTypeToRu,
} from '../../constants/objects';
import {prepareCustomerTypeToRu} from '../../constants/costumer';
import {limitString} from '../../utils/prepare/limitString';
import {preparedMultiSelectData} from '../../utils/prepare/preparedMultiSelectData';
import {prepareNegativeConsequencesToRu} from '../../constants/vulns';
import {localization} from '../../localization/localization';

import {ITableProps} from './TableTypes';
import styles from './Table.module.scss';

const Table: FC<ITableProps> = ({
  headCells,
  projectsBodyRows,
  objectsBodyRows,
  vulnBodyRows,
  customerBodyRows,
  infSystemBodyRows,
  officeBodyRows,
  selectTab,
  className,
  activeRowIds,
  setActiveRowIds,
}) => {
  const navigate = useNavigate();

  const [bodyCells, setBodyCells] = useState<any[]>(projectsBodyRows || customerBodyRows || infSystemBodyRows || officeBodyRows || objectsBodyRows || vulnBodyRows);

  useEffect(() => {
    setBodyCells(projectsBodyRows || customerBodyRows || infSystemBodyRows || officeBodyRows ||
      objectsBodyRows || vulnBodyRows);
  }, [projectsBodyRows, customerBodyRows, infSystemBodyRows, officeBodyRows, objectsBodyRows, vulnBodyRows]);

  const onRowClick = (id: string | undefined) => navigate(`${id}/`);

  const onObjectRowClick = (objectId: string, objectType?: string) => {
    switch (objectType || selectTab) {
    case OBJECT_TYPES.WebApp: {
      navigate(`${ROUTES_OBJECT.WEB_APP}/${objectId}/`);

      break;
    }

    case OBJECT_TYPES.API: {
      navigate(`${ROUTES_OBJECT.API}/${objectId}/`);

      break;
    }

    case OBJECT_TYPES.MobileApp: {
      navigate(`${ROUTES_OBJECT.MOBILE_APP}/${objectId}/`);

      break;
    }

    case OBJECT_TYPES.NetworkDevice: {
      navigate(`${ROUTES_OBJECT.NETWORK_DEVICE}/${objectId}/`);

      break;
    }

    case OBJECT_TYPES.Server: {
      navigate(`${ROUTES_OBJECT.SERVER}/${objectId}/`);

      break;
    }

    case OBJECT_TYPES.ARM: {
      navigate(`${ROUTES_OBJECT.ARM}/${objectId}/`);

      break;
    }

    case OBJECT_TYPES.WiFi: {
      navigate(`${ROUTES_OBJECT.WIFI}/${objectId}/`);

      break;
    }

    case OBJECT_TYPES.SocialEngineering: {
      navigate(`${ROUTES_OBJECT.SOCIAL_ENGINEERING}/${objectId}/`);

      break;
    }

    case OBJECT_TYPES.DesktopApp: {
      navigate(`${ROUTES_OBJECT.DESKTOP_APP}/${objectId}/`);

      break;
    }

    case OBJECT_TYPES.SourceCode: {
      navigate(`${ROUTES_OBJECT.SOURCE_CODE}/${objectId}/`);

      break;
    }

    case OBJECT_TYPES.External: {
      navigate(`${ROUTES_OBJECT.EXTERNAL}/${objectId}/`);

      break;
    }

    case OBJECT_TYPES.Internal: {
      navigate(`${ROUTES_OBJECT.INTERNAL}/${objectId}/`);

      break;
    }

    case OBJECT_TYPES.Other: {
      navigate(`${ROUTES_OBJECT.OTHER}/${objectId}/`);

      break;
    }
    }
  };

  const onSortColumn = (event: any, cellText: string) => {
    const headRow = event.currentTarget.parentNode;
    const headRowCells = headRow.querySelectorAll('th');
    const headRowCellsArray = Array.from(headRowCells);

    const headRowInput = headRow.querySelector('input');
    const table = headRow.parentElement.parentElement;
    const body = table.querySelector('tbody');
    const bodyRows = body.querySelectorAll('tr');
    const bodyRowsArray = Array.from(bodyRows);

    const image = event.currentTarget.querySelector('img');
    let activeBodyRowIds: string[] = [];

    if (event.target.tagName === 'INPUT') {
      bodyRowsArray.forEach((bodyRow: any) => {
        const bodyRowInput = bodyRow.querySelector('input');

        if (headRowInput.checked) {
          activeBodyRowIds.push(bodyRow.id);
        } else {
          activeBodyRowIds = [];
        }

        bodyRowInput.checked = headRowInput.checked;
      });

      if (setActiveRowIds) {
        setActiveRowIds([...activeBodyRowIds]);
      }
    }

    if (image) {
      const fullImageUrl = image.src.split('/').slice(0, 5).join('/');
      const imageUrl = image.src.split('/')[5];

      headRowCellsArray.forEach((headRowCell: any) => {
        const headRowImage = headRowCell.querySelector('img');

        if (headRowCell.id !== cellText && headRowImage) {
          const headRowImageUrl = headRowImage.src.split('/')[5];

          if (headRowImageUrl === 'sort-up.svg' || headRowImageUrl === 'sort-down.svg') {
            headRowImage.setAttribute('src', `${fullImageUrl}/sort.svg`);
          }
        }
      });

      const actualBodyRows = projectsBodyRows || customerBodyRows || infSystemBodyRows || officeBodyRows || objectsBodyRows || vulnBodyRows || [];
      const arrayForSort = [...actualBodyRows];
      let prepareBodyRows = [];

      switch (imageUrl) {
      case 'sort.svg': {
        image.setAttribute('src', `${fullImageUrl}/sort-up.svg`);

        prepareBodyRows = arrayForSort?.sort((firstItem, secondItem) => {
          // @ts-ignore
          const firstItemValue = firstItem[cellText] || '';
          // @ts-ignore
          const secondItemValue = secondItem[cellText] || '';

          if (firstItemValue > secondItemValue && firstItemValue !== '-') {
            return 1;
          }

          if (firstItemValue < secondItemValue) {
            return -1;
          }

          return 0;
        });

        break;
      }

      case 'sort-up.svg': {
        image.setAttribute('src', `${fullImageUrl}/sort-down.svg`);

        prepareBodyRows = arrayForSort?.sort((firstItem, secondItem) => {
          // @ts-ignore
          const firstItemValue = firstItem[cellText] || '';
          // @ts-ignore
          const secondItemValue = secondItem[cellText] || '';

          if (firstItemValue < secondItemValue) {
            return 1;
          }

          if (firstItemValue > secondItemValue) {
            return -1;
          }

          return 0;
        });

        break;
      }

      case 'sort-down.svg': {
        image.setAttribute('src', `${fullImageUrl}/sort.svg`);

        prepareBodyRows = arrayForSort?.sort();

        break;
      }
      }

      setBodyCells(prepareBodyRows);
    }
  };

  const onCheckboxClick = (event: any) => {
    const bodyRow = event.currentTarget.parentElement;
    const bodyRowInput = bodyRow.querySelector('input');

    const isIdFree = activeRowIds?.find((activeRowId) => activeRowId === bodyRow.id);

    if (setActiveRowIds) {
      if (bodyRowInput.checked && !isIdFree) {
        setActiveRowIds([...activeRowIds || [], bodyRow.id]);
      } else {
        setActiveRowIds(activeRowIds?.filter(activeRowId => activeRowId !== bodyRow.id));
      }
    }

    event.stopPropagation();
  };

  return (
    <table className={classNames(styles['table'], className)}>
      <thead className={styles['table-head']}>
        <tr>
          {headCells.map(({id, text, image = true, align = 'left', checked}) => (
            <th
              key={id}
              id={id}
              onClick={(event) => onSortColumn(event, id)}
              style={{textAlign: align}}
              className={classNames(styles['table-head-item'], {[styles['table_checked']]: checked})}
            >
              {text && <Text variant={TextVariantEnum.S} className={styles['table-head-item-text']}>{text}</Text>}
              {image && <img className={styles['table-head-item-image']} src="/assets/icons/sort.svg" alt="sort"/>}
              {checked && <Input type={InputTypeEnum.Checkbox} />}
            </th>
          ))}
        </tr>
      </thead>
      {projectsBodyRows && (
        <tbody className={styles['table-body']}>
          {bodyCells.map(({
            name,
            start_date,
            end_date,
            gos_order_number,
            gos_order_date,
            id,
          }) => (
            <tr key={id} onClick={() => onRowClick(id)} className={styles['table-body-row']}>
              <td onClick={onCheckboxClick} className={styles['table-body-data']}>
                <Input type={InputTypeEnum.Checkbox} />
              </td>
              <td className={styles['table-body-data']}>
                {name ? name : '-'}
              </td>
              <td className={styles['table-body-data']}>
                {start_date ? start_date : '-'}
              </td>
              <td className={styles['table-body-data']}>
                {end_date ? end_date : '-'}
              </td>
              <td className={styles['table-body-data']}>
                {gos_order_number ? gos_order_number : '-'}
              </td>
              <td className={styles['table-body-data']}>
                {gos_order_date ? gos_order_date : '-'}
              </td>
            </tr>
          ))}
        </tbody>
      )}
      {objectsBodyRows && (
        <tbody className={styles['table-body']}>
          {bodyCells.map(({
            inf_system = null,
            office = null,
            object_type,

            ip_address = null,
            app_name = null,
            ssid = null,
            engineering_type = null,
            programming_language = null,

            domain_name = null,
            platform_type = null,
            network_device_name = null,
            bssid = null,
            success_criterion = null,
            number_rows = null,

            assignment,
            greybox,
            blackbox,
            attacker_model = null,
            work_type,
            additional_info,
            id,
          }: any) => (
            <tr key={id} id={id} onClick={() => onObjectRowClick(id, object_type)} className={styles['table-body-row']}>
              <td onClick={onCheckboxClick} className={styles['table-body-data']}>
                <Input type={InputTypeEnum.Checkbox} />
              </td>
              {selectTab === OBJECT_TYPES.Base ? (
                <>
                  <td className={styles['table-body-data']}>
                    {object_type ? prepareObjectTypeToRu[object_type] : '-'}
                  </td>
                  <td className={styles['table-body-data']}>
                    {inf_system?.name ?? office?.name ?? '-'}
                  </td>
                  <td className={styles['table-body-data']}>
                    {ip_address ? ip_address : '-'}
                  </td>
                  <td className={styles['table-body-data']}>
                    {app_name ? app_name : '-'}
                  </td>
                  <td className={styles['table-body-data']}>
                    {ssid ? ssid : '-'}
                  </td>
                  <td className={styles['table-body-data']}>
                    {(engineering_type && engineering_type?.length !== 0) ?
                      preparedMultiSelectData(engineering_type, prepareSocialEngineeringTypesToRu) : '-'}
                  </td>
                  <td className={styles['table-body-data']}>
                    {prepareDesktopPlatformToRu[platform_type] ? prepareDesktopPlatformToRu[platform_type] :
                      prepareMobilePlatformToRu[platform_type] ? prepareMobilePlatformToRu[platform_type] : '-'
                    }
                  </td>
                  <td className={styles['table-body-data']}>
                    {bssid ? bssid : '-'}
                  </td>
                  <td className={styles['table-body-data']}>
                    {success_criterion ? success_criterion : '-'}
                  </td>
                  <td className={styles['table-body-data']}>
                    {greybox ?
                      blackbox ? localization.object.filters.greyboxAndBlackboxText :
                        localization.object.filters.greyboxAndBlackboxText :
                      blackbox ? localization.object.filters.blackboxText : '-'}
                  </td>
                  <td className={styles['table-body-data']}>
                    {attacker_model ? prepareAttackerModelToRu[attacker_model] : '-'}
                  </td>
                  <td className={styles['table-body-data']}>
                    {work_type ? prepareWorkTypeToRu[work_type] : '-'}
                  </td>
                </>
              ) : (
                <>
                  <td className={styles['table-body-data']}>
                    {inf_system?.name ?? office?.name ?? '-'}
                  </td>
                  <td className={styles['table-body-data']}>
                    {ip_address ? ip_address :
                      app_name ? app_name :
                        ssid ? ssid :
                          (engineering_type && engineering_type?.length !== 0) ?
                            preparedMultiSelectData(engineering_type, prepareSocialEngineeringTypesToRu) :
                            (programming_language && programming_language?.length !== 0) ?
                              preparedMultiSelectData(programming_language, prepareProgrammingLanguageToRu) : '-'
                    }
                  </td>
                  {(selectTab !== OBJECT_TYPES.Other && selectTab !== OBJECT_TYPES.External && selectTab !== OBJECT_TYPES.Internal) && (
                    <td className={styles['table-body-data']}>
                      {domain_name ? domain_name :
                        prepareDesktopPlatformToRu[platform_type] ? prepareDesktopPlatformToRu[platform_type] :
                          prepareMobilePlatformToRu[platform_type] ? prepareMobilePlatformToRu[platform_type] :
                            network_device_name ? network_device_name :
                              bssid ? bssid :
                                success_criterion ? success_criterion :
                                  (number_rows !== null && number_rows !== undefined) ? number_rows : '-'
                      }
                    </td>
                  )}
                  {(selectTab === OBJECT_TYPES.NetworkDevice || selectTab === OBJECT_TYPES.Server) && (
                    <td className={styles['table-body-data']}>
                      {assignment ? assignment : '-'}
                    </td>
                  )}
                  {selectTab !== OBJECT_TYPES.SourceCode && selectTab !== OBJECT_TYPES.SocialEngineering
                    && selectTab !== OBJECT_TYPES.External && selectTab !== OBJECT_TYPES.Internal
                    && selectTab !== OBJECT_TYPES.Other && (
                    <td className={styles['table-body-data']}>
                      {greybox ?
                        blackbox ? localization.object.filters.greyboxAndBlackboxText :
                          localization.object.filters.greyboxText :
                        blackbox ? localization.object.filters.blackboxText : '-'}
                    </td>
                  )}
                  {(selectTab === OBJECT_TYPES.WebApp || selectTab === OBJECT_TYPES.API
                    || selectTab === OBJECT_TYPES.NetworkDevice || selectTab === OBJECT_TYPES.Server
                    || selectTab === OBJECT_TYPES.ARM || selectTab === OBJECT_TYPES.WiFi) && (
                    <td className={styles['table-body-data']}>
                      {attacker_model ? prepareAttackerModelToRu[attacker_model] : '-'}
                    </td>
                  )}
                  {(selectTab === OBJECT_TYPES.WebApp || selectTab === OBJECT_TYPES.API
                    || selectTab === OBJECT_TYPES.NetworkDevice || selectTab === OBJECT_TYPES.Server
                    || selectTab === OBJECT_TYPES.ARM) && (
                    <td className={styles['table-body-data']}>
                      {work_type ? prepareWorkTypeToRu[work_type] : '-'}
                    </td>
                  )}
                  {selectTab !== OBJECT_TYPES.SourceCode && (
                    <td className={styles['table-body-data']}>
                      {additional_info ? additional_info : '-'}
                    </td>
                  )}
                </>
              )}
            </tr>
          ))}
        </tbody>
      )}
      {vulnBodyRows && (
        <tbody className={styles['table-body']}>
          {bodyCells.map(({
            location,
            cve_id,
            cwe_id,
            name,
            negative_consequences,
            description,
            procedure_exploiting,
            recommendations,
            id,
          }) => (
            <tr key={id} onClick={() => onRowClick(id)} className={styles['table-body-row']}>
              <td onClick={onCheckboxClick} className={styles['table-body-data']}>
                <Input type={InputTypeEnum.Checkbox} />
              </td>
              <td className={styles['table-body-data']}>
                {name ? name : '-'}
              </td>
              <td className={styles['table-body-data']}>
                {cve_id ? cve_id.join(', ') : '-'}
              </td>
              <td className={styles['table-body-data']}>
                {cwe_id ? cwe_id.join(', ') : '-'}
              </td>
              <td className={styles['table-body-data']}>
                {location ? location : '-'}
              </td>
              <td className={styles['table-body-data']}>
                {description ? limitString(description, 200) : '-'}
              </td>
              <td className={styles['table-body-data']}>
                {(negative_consequences && negative_consequences?.length !== 0) ?
                  preparedMultiSelectData(negative_consequences, prepareNegativeConsequencesToRu) : '-'
                }
              </td>
              <td className={styles['table-body-data']}>
                {procedure_exploiting ? limitString(procedure_exploiting, 200) : '-'}
              </td>
              <td className={styles['table-body-data']}>
                {recommendations ? recommendations : '-'}
              </td>
            </tr>
          ))}
        </tbody>
      )}
      {customerBodyRows && (
        <tbody className={styles['table-body']}>
          {bodyCells.map(({
            inn,
            customer_name,
            number_employees,
            customer_type,
            id,
          }) => (
            <tr key={id} onClick={() => onRowClick(id)} className={styles['table-body-row']}>
              <td onClick={onCheckboxClick} className={styles['table-body-data']}>
                <Input type={InputTypeEnum.Checkbox} />
              </td>
              <td className={styles['table-body-data']}>
                {customer_name ? customer_name : '-'}
              </td>
              <td className={styles['table-body-data']}>
                {(inn !== null && inn !== undefined) ? inn.toString() : '-'}
              </td>
              <td className={styles['table-body-data']}>
                {(number_employees !== null && number_employees !== undefined) ? number_employees.toString() : '-'}
              </td>
              <td className={styles['table-body-data']}>
                {customer_type ? prepareCustomerTypeToRu[customer_type] : '-'}
              </td>
            </tr>
          ))}
        </tbody>
      )}
      {infSystemBodyRows && (
        <tbody className={styles['table-body']}>
          {bodyCells.map(({
            name,
            availability_interface,
            web_interface_address,
            security_level,
            product,
            product_manager,
            inf_system_contact_person,
            id,
          }) => (
            <tr key={id} onClick={() => onRowClick(id)} className={styles['table-body-row']}>
              <td onClick={onCheckboxClick} className={styles['table-body-data']}>
                <Input type={InputTypeEnum.Checkbox} />
              </td>
              <td className={styles['table-body-data']}>
                {name ? name : '-'}
              </td>
              <td className={styles['table-body-data']}>
                <Text className={styles[`table-body-data-verification_${availability_interface ? 'green' : 'red'}`]}>
                  {availability_interface ? localization.common.present : localization.common.absent}
                </Text>
              </td>
              <td className={styles['table-body-data']}>
                {web_interface_address ? web_interface_address : '-'}
              </td>
              <td className={styles['table-body-data']}>
                {(security_level !== null && security_level !== undefined) ? security_level : '-'}
              </td>
              <td className={styles['table-body-data']}>
                {product ? product : '-'}
              </td>
              <td className={styles['table-body-data']}>
                {product_manager ? product_manager : '-'}
              </td>
              <td className={styles['table-body-data']}>
                {inf_system_contact_person ? inf_system_contact_person : '-'}
              </td>
            </tr>
          ))}
        </tbody>
      )}
      {officeBodyRows && (
        <tbody className={styles['table-body']}>
          {bodyCells.map(({
            name,
            address,
            availability_wifi,
            responsible_is,
            availability_separate_internet,
            security_level,
            id,
          }) => (
            <tr key={id} onClick={() => onRowClick(id)} className={styles['table-body-row']}>
              <td onClick={onCheckboxClick} className={styles['table-body-data']}>
                <Input type={InputTypeEnum.Checkbox} />
              </td>
              <td className={styles['table-body-data']}>
                {name ? name : '-'}
              </td>
              <td className={styles['table-body-data']}>
                {address ? address : '-'}
              </td>
              <td className={styles['table-body-data']}>
                <Text
                  className={styles[`table-body-data-verification_${availability_wifi ? 'green' : 'red'}`]}
                >
                  {availability_wifi ? localization.common.present : localization.common.absent}
                </Text>
              </td>
              <td className={styles['table-body-data']}>
                {responsible_is ? responsible_is : '-'}
              </td>
              <td className={styles['table-body-data']}>
                <Text
                  className={styles[`table-body-data-verification_${availability_separate_internet ? 'green' : 'red'}`]}
                >
                  {availability_separate_internet ? localization.common.present : localization.common.absent}
                </Text>
              </td>
              <td className={styles['table-body-data']}>
                {(security_level !== null && security_level !== undefined) ? security_level : '-'}
              </td>
            </tr>
          ))}
        </tbody>
      )}
    </table>
  );
};

export default Table;
