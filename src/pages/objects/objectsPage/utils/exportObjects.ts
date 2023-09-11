import {WidthType} from 'docx';

import {ExportTypes, ITableBodyDocx, ITableCellDocx, ITableRowDocx} from '../../../../utils/export/ExportTypes';
import {exportExcel} from '../../../../utils/export/excel/exportExcel';
import {exportDOCX} from '../../../../utils/export/docx/exportDOCX';
import {exportPDF} from '../../../../utils/export/pdf/exportPDF';
import {IHeadCell} from '../../../../components/table/TableTypes';
import {
  OBJECT_TYPES,
  OBJECTS_TITLES,
  prepareAttackerModelToRu,
  prepareDesktopPlatformToRu,
  prepareMobilePlatformToRu, prepareObjectTypeToRu, prepareProgrammingLanguageToRu, prepareSocialEngineeringTypesToRu,
  prepareWorkTypeToRu,
} from '../../../../constants/objects';
import {preparedMultiSelectData} from '../../../../utils/prepare/preparedMultiSelectData';
import {localization} from '../../../../localization/localization';

/**
 *
 * @param {ExportTypes} type       Export type
 * @param {any[]} bodyRows         Array of body rows to collect data
 * @param {IHeadCell[]} headCells  Array of head cells to collect data
 * @param {string} selectTab       Actual select tab
 */
export const exportObjects = (type: ExportTypes, bodyRows: any[], headCells: IHeadCell[], selectTab: string) => {
  const objectsHeadersPDF = headCells.map(projectCell => projectCell.text);
  objectsHeadersPDF.shift();

  let preparedObjectBodyPDF: any[] = [];
  let preparedObjectBody: ITableRowDocx[] = [];

  let filenameTitle = '';
  let sizeCell: number = 0;
  let sizeColumn: number = 190;

  switch (selectTab) {
  case OBJECT_TYPES.Base: {
    filenameTitle = OBJECTS_TITLES.BASE;
    sizeCell = 1100;

    preparedObjectBodyPDF = bodyRows.map(({
      object_type,
      inf_system,
      office,
      ip_address,
      app_name,
      ssid,
      engineering_type,
      platform_type,
      bssid,
      success_criterion,
      greybox,
      blackbox,
      attacker_model,
      work_type,
    }) => {
      return {
        object_type: object_type ? prepareObjectTypeToRu[object_type] : '-',
        inf_system_id: inf_system?.name || office?.name ? inf_system.name || office.name : '-',
        ip_address: ip_address ? ip_address : '-',
        app_name: app_name ? app_name : '-',
        ssid: ssid ? ssid : '-',
        engineering_type: (engineering_type && engineering_type?.length !== 0) ?
          preparedMultiSelectData(engineering_type, prepareSocialEngineeringTypesToRu) : '-',
        platform_type: platform_type ? prepareMobilePlatformToRu[platform_type] : '-',
        bssid: bssid ? bssid : '-',
        success_criterion: success_criterion ? success_criterion : '-',
        test_method: greybox ?
          blackbox ? localization.object.filters.greyboxAndBlackboxText : localization.modals.objects.greyboxText :
          blackbox ? localization.modals.objects.blackboxText : '-',
        attacker_model: attacker_model ? prepareAttackerModelToRu[attacker_model] : '-',
        work_type: work_type ? prepareWorkTypeToRu[work_type] : '-',
      };
    });

    preparedObjectBody = bodyRows.map(({
      object_type,
      inf_system,
      office,
      ip_address,
      app_name,
      ssid,
      engineering_type,
      platform_type,
      bssid,
      success_criterion,
      greybox,
      blackbox,
      attacker_model,
      work_type,
    }) => {
      const object = {
        object_type: object_type ? prepareObjectTypeToRu[object_type] : '-',
        inf_system_id: inf_system?.name || office?.name ? inf_system.name || office.name : '-',
        ip_address: ip_address ? ip_address : '-',
        app_name: app_name ? app_name : '-',
        ssid: ssid ? ssid : '-',
        engineering_type: (engineering_type && engineering_type?.length !== 0) ?
          preparedMultiSelectData(engineering_type, prepareSocialEngineeringTypesToRu) : '-',
        platform_type: prepareDesktopPlatformToRu[platform_type] ? prepareDesktopPlatformToRu[platform_type] :
          prepareMobilePlatformToRu[platform_type] ? prepareMobilePlatformToRu[platform_type] : '-',
        bssid: bssid ? bssid : '-',
        success_criterion: success_criterion ? success_criterion : '-',
        test_method: greybox ?
          blackbox ? localization.object.filters.greyboxAndBlackboxText : localization.modals.objects.greyboxText
          : blackbox ? localization.modals.objects.blackboxText : '-',
        attacker_model: attacker_model ? prepareAttackerModelToRu[attacker_model] : '-',
        work_type: work_type ? prepareWorkTypeToRu[work_type] : '-',
      };

      return {
        cells: Object.values(object).map((text) => {
          return {
            size: sizeCell,
            text,
          };
        }),
      };
    });

    break;
  }

  case OBJECT_TYPES.SourceCode: {
    filenameTitle = OBJECTS_TITLES.SOURCE_CODES;
    sizeCell = 4600;

    preparedObjectBodyPDF = bodyRows.map(({
      inf_system,
      programming_language,
      number_rows,
    }) => {
      return {
        inf_system_id: inf_system?.name ? inf_system.name : '-',
        programming_language: (programming_language && programming_language?.length !== 0) ?
          preparedMultiSelectData(programming_language, prepareProgrammingLanguageToRu) : '-',
        number_rows: (number_rows !== null && number_rows !== undefined) ? number_rows : '-',
      };
    });

    preparedObjectBody = bodyRows.map(({
      inf_system,
      programming_language,
      number_rows,
    }) => {
      const object = {
        inf_system_id: inf_system?.name ? inf_system.name : '-',
        programming_language: (programming_language && programming_language?.length !== 0) ?
          preparedMultiSelectData(programming_language, prepareProgrammingLanguageToRu) : '-',
        number_rows: (number_rows !== null && number_rows !== undefined) ? number_rows : '-',
      };

      return {
        cells: Object.values(object).map((text) => {
          return {
            size: sizeCell,
            text,
          };
        }),
      };
    });

    break;
  }

  case OBJECT_TYPES.External: {
    filenameTitle = OBJECTS_TITLES.EXTERNALS;
    sizeCell = 4600;

    preparedObjectBodyPDF = bodyRows.map(({
      inf_system,
      ip_address,
      additional_info,
    }) => {
      return {
        inf_system_id: inf_system?.name ? inf_system.name : '-',
        ip_address: ip_address ? ip_address : '-',
        additional_info: additional_info ? additional_info : '-',
      };
    });

    preparedObjectBody = bodyRows.map(({
      inf_system,
      programming_language,
      additional_info,
    }) => {
      const object = {
        inf_system_id: inf_system?.name ? inf_system.name : '-',
        programming_language: programming_language ? programming_language : '-',
        additional_info: additional_info ? additional_info : '-',
      };

      return {
        cells: Object.values(object).map((text) => {
          return {
            size: sizeCell,
            text,
          };
        }),
      };
    });

    break;
  }

  case OBJECT_TYPES.Internal: {
    filenameTitle = OBJECTS_TITLES.INTERNALS;
    sizeCell = 4600;

    preparedObjectBodyPDF = bodyRows.map(({
      inf_system,
      ip_address,
      additional_info,
    }) => {
      return {
        inf_system_id: inf_system?.name ? inf_system.name : '-',
        ip_address: ip_address ? ip_address : '-',
        additional_info: additional_info ? additional_info : '-',
      };
    });

    preparedObjectBody = bodyRows.map(({
      inf_system,
      programming_language,
      additional_info,
    }) => {
      const object = {
        inf_system_id: inf_system?.name ? inf_system.name : '-',
        programming_language: programming_language ? programming_language : '-',
        additional_info: additional_info ? additional_info : '-',
      };

      return {
        cells: Object.values(object).map((text) => {
          return {
            size: sizeCell,
            text,
          };
        }),
      };
    });

    break;
  }

  case OBJECT_TYPES.Other: {
    filenameTitle = OBJECTS_TITLES.OTHERS;
    sizeCell = 4600;

    preparedObjectBodyPDF = bodyRows.map(({
      inf_system,
      office,
      ip_address,
      additional_info,
    }) => {
      return {
        inf_system_id: inf_system?.name || office?.name ? inf_system.name || office.name : '-',
        ip_address: ip_address ? ip_address : '-',
        additional_info: additional_info ? additional_info : '-',
      };
    });

    preparedObjectBody = bodyRows.map(({
      inf_system,
      office,
      programming_language,
      additional_info,
    }) => {
      const object = {
        inf_system_id: inf_system?.name || office?.name ? inf_system.name || office.name : '-',
        programming_language: programming_language ? programming_language : '-',
        additional_info: additional_info ? additional_info : '-',
      };

      return {
        cells: Object.values(object).map((text) => {
          return {
            size: sizeCell,
            text,
          };
        }),
      };
    });

    break;
  }

  case OBJECT_TYPES.API: {
    filenameTitle = OBJECTS_TITLES.API;
    sizeCell = 2000;

    preparedObjectBodyPDF = bodyRows.map(({
      additional_info,
      attacker_model,
      inf_system,
      ip_address,
      domain_name,
      greybox,
      blackbox,
      work_type,
    }) => {
      return {
        inf_system_id: inf_system?.name ? inf_system.name : '-',
        ip_address: ip_address ? ip_address : '-',
        domain_name: domain_name ? domain_name : '-',
        test_method: greybox ?
          blackbox ? localization.object.filters.greyboxAndBlackboxText : localization.modals.objects.greyboxText :
          blackbox ? localization.modals.objects.blackboxText : '-',
        attacker_model: attacker_model ? prepareAttackerModelToRu[attacker_model] : '-',
        work_type: work_type ? prepareWorkTypeToRu[work_type] : '-',
        additional_info: additional_info ? additional_info : '-',
      };
    });

    preparedObjectBody = bodyRows.map(({
      additional_info,
      attacker_model,
      inf_system,
      ip_address,
      domain_name,
      greybox,
      blackbox,
      work_type,
    }) => {
      const object = {
        inf_system_id: inf_system?.name ? inf_system.name : '-',
        ip_address: ip_address ? ip_address : '-',
        domain_name: domain_name ? domain_name : '-',
        test_method: greybox ?
          blackbox ? localization.object.filters.greyboxAndBlackboxText : localization.modals.objects.greyboxText :
          blackbox ? localization.modals.objects.blackboxText : '-',
        attacker_model: attacker_model ? prepareAttackerModelToRu[attacker_model] : '-',
        work_type: work_type ? prepareWorkTypeToRu[work_type] : '-',
        additional_info: additional_info ? additional_info : '-',
      };

      return {
        cells: Object.values(object).map((text) => {
          return {
            size: sizeCell,
            text,
          };
        }),
      };
    });

    break;
  }

  case OBJECT_TYPES.WebApp: {
    filenameTitle = OBJECTS_TITLES.WEB_APPS;
    sizeCell = 2000;

    preparedObjectBodyPDF = bodyRows.map(({
      additional_info,
      attacker_model,
      inf_system,
      ip_address,
      greybox,
      blackbox,
      domain_name,
      work_type,
    }) => {
      return {
        inf_system_id: inf_system?.name ? inf_system.name : '-',
        ip_address: ip_address ? ip_address : '-',
        domain_name: domain_name ? domain_name : '-',
        test_method: greybox ?
          blackbox ? localization.object.filters.greyboxAndBlackboxText : localization.modals.objects.greyboxText :
          blackbox ? localization.modals.objects.blackboxText : '-',
        attacker_model: attacker_model ? prepareAttackerModelToRu[attacker_model] : '-',
        work_type: work_type ? prepareWorkTypeToRu[work_type] : '-',
        additional_info: additional_info ? additional_info : '-',
      };
    });

    preparedObjectBody = bodyRows.map(({
      additional_info,
      attacker_model,
      inf_system,
      ip_address,
      greybox,
      blackbox,
      domain_name,
      work_type,
    }) => {
      const object = {
        inf_system_id: inf_system?.name ? inf_system.name : '-',
        ip_address: ip_address ? ip_address : '-',
        domain_name: domain_name ? domain_name : '-',
        test_method: greybox ?
          blackbox ? localization.object.filters.greyboxAndBlackboxText : localization.modals.objects.greyboxText :
          blackbox ? localization.modals.objects.blackboxText : '-',
        attacker_model: attacker_model ? prepareAttackerModelToRu[attacker_model] : '-',
        work_type: work_type ? prepareWorkTypeToRu[work_type] : '-',
        additional_info: additional_info ? additional_info : '-',
      };

      return {
        cells: Object.values(object).map((text) => {
          return {
            size: sizeCell,
            text,
          };
        }),
      };
    });

    break;
  }

  case OBJECT_TYPES.NetworkDevice: {
    filenameTitle = OBJECTS_TITLES.NETWORK_DEVICES;
    sizeCell = 1800;
    sizeColumn = 240;

    preparedObjectBodyPDF = bodyRows.map(({
      additional_info,
      assignment,
      attacker_model,
      inf_system,
      office,
      ip_address,
      network_device_name,
      greybox,
      blackbox,
      work_type,
    }) => {
      return {
        inf_system_id: inf_system?.name || office?.name ? inf_system.name || office.name : '-',
        ip_address: ip_address ? ip_address : '-',
        network_device_name: network_device_name ? network_device_name : '-',
        assignment: assignment ? assignment : '-',
        test_method: greybox ?
          blackbox ? localization.object.filters.greyboxAndBlackboxText : localization.modals.objects.greyboxText :
          blackbox ? localization.modals.objects.blackboxText : '-',
        attacker_model: attacker_model ? prepareAttackerModelToRu[attacker_model] : '-',
        work_type: work_type ? prepareWorkTypeToRu[work_type] : '-',
        additional_info: additional_info ? additional_info : '-',
      };
    });

    preparedObjectBody = bodyRows.map(({
      additional_info,
      assignment,
      attacker_model,
      inf_system,
      office,
      ip_address,
      network_device_name,
      greybox,
      blackbox,
      work_type,
    }) => {
      const object = {
        inf_system_id: inf_system?.name || office?.name ? inf_system.name || office.name : '-',
        ip_address: ip_address ? ip_address : '-',
        network_device_name: network_device_name ? network_device_name : '-',
        assignment: assignment ? assignment : '-',
        test_method: greybox ?
          blackbox ? localization.object.filters.greyboxAndBlackboxText : localization.modals.objects.greyboxText :
          blackbox ? localization.modals.objects.blackboxText : '-',
        attacker_model: attacker_model ? prepareAttackerModelToRu[attacker_model] : '-',
        work_type: work_type ? prepareWorkTypeToRu[work_type] : '-',
        additional_info: additional_info ? additional_info : '-',
      };

      return {
        cells: Object.values(object).map((text) => {
          return {
            size: sizeCell,
            text,
          };
        }),
      };
    });

    break;
  }

  case OBJECT_TYPES.Server: {
    filenameTitle = OBJECTS_TITLES.SERVERS;
    sizeCell = 1900;
    sizeColumn = 240;

    preparedObjectBodyPDF = bodyRows.map(({
      additional_info,
      assignment,
      attacker_model,
      inf_system,
      office,
      ip_address,
      network_device_name,
      greybox,
      blackbox,
      work_type,
    }) => {
      return {
        inf_system_id: inf_system?.name || office?.name ? inf_system.name || office.name : '-',
        ip_address: ip_address ? ip_address : '-',
        network_device_name: network_device_name ? network_device_name : '-',
        assignment: assignment ? assignment : '-',
        test_method: greybox ?
          blackbox ? localization.object.filters.greyboxAndBlackboxText : localization.modals.objects.greyboxText :
          blackbox ? localization.modals.objects.blackboxText : '-',
        attacker_model: attacker_model ? prepareAttackerModelToRu[attacker_model] : '-',
        work_type: work_type ? prepareWorkTypeToRu[work_type] : '-',
        additional_info: additional_info ? additional_info : '-',
      };
    });

    preparedObjectBody = bodyRows.map(({
      additional_info,
      assignment,
      attacker_model,
      inf_system,
      office,
      ip_address,
      network_device_name,
      greybox,
      blackbox,
      work_type,
    }) => {
      const object = {
        inf_system_id: inf_system?.name || office?.name ? inf_system.name || office.name : '-',
        ip_address: ip_address ? ip_address : '-',
        network_device_name: network_device_name ? network_device_name : '-',
        assignment: assignment ? assignment : '-',
        test_method: greybox ?
          blackbox ? localization.object.filters.greyboxAndBlackboxText : localization.modals.objects.greyboxText :
          blackbox ? localization.modals.objects.blackboxText : '-',
        attacker_model: attacker_model ? prepareAttackerModelToRu[attacker_model] : '-',
        work_type: work_type ? prepareWorkTypeToRu[work_type] : '-',
        additional_info: additional_info ? additional_info : '-',
      };

      return {
        cells: Object.values(object).map((text) => {
          return {
            size: sizeCell,
            text,
          };
        }),
      };
    });

    break;
  }

  case OBJECT_TYPES.ARM: {
    filenameTitle = OBJECTS_TITLES.ARM;
    sizeCell = 2000;
    sizeColumn = 240;

    preparedObjectBodyPDF = bodyRows.map(({
      additional_info,
      attacker_model,
      inf_system,
      office,
      ip_address,
      network_device_name,
      greybox,
      blackbox,
      work_type,
    }) => {
      return {
        inf_system_id: inf_system?.name || office?.name ? inf_system.name || office.name : '-',
        ip_address: ip_address ? ip_address : '-',
        network_device_name: network_device_name ? network_device_name : '-',
        test_method: greybox ?
          blackbox ? localization.object.filters.greyboxAndBlackboxText : localization.modals.objects.greyboxText :
          blackbox ? localization.modals.objects.blackboxText : '-',
        attacker_model: attacker_model ? prepareAttackerModelToRu[attacker_model] : '-',
        work_type: work_type ? prepareWorkTypeToRu[work_type] : '-',
        additional_info: additional_info ? additional_info : '-',
      };
    });

    preparedObjectBody = bodyRows.map(({
      additional_info,
      attacker_model,
      inf_system,
      office,
      ip_address,
      network_device_name,
      greybox,
      blackbox,
      work_type,
    }) => {
      const object = {
        inf_system_id: inf_system?.name || office?.name ? inf_system.name || office.name : '-',
        ip_address: ip_address ? ip_address : '-',
        network_device_name: network_device_name ? network_device_name : '-',
        test_method: greybox ?
          blackbox ? localization.object.filters.greyboxAndBlackboxText : localization.modals.objects.greyboxText :
          blackbox ? localization.modals.objects.blackboxText : '-',
        attacker_model: attacker_model ? prepareAttackerModelToRu[attacker_model] : '-',
        work_type: work_type ? prepareWorkTypeToRu[work_type] : '-',
        additional_info: additional_info ? additional_info : '-',
      };

      return {
        cells: Object.values(object).map((text) => {
          return {
            size: sizeCell,
            text,
          };
        }),
      };
    });

    break;
  }

  case OBJECT_TYPES.MobileApp: {
    filenameTitle = OBJECTS_TITLES.MOBILE_APPS;
    sizeCell = 2800;

    preparedObjectBodyPDF = bodyRows.map(({
      inf_system,
      app_name,
      platform_type,
      greybox,
      blackbox,
      additional_info,
    }) => {
      return {
        inf_system_id: inf_system?.name ? inf_system.name : '-',
        app_name: app_name ? app_name : '-',
        platform_type: platform_type ? prepareMobilePlatformToRu[platform_type] : '-',
        test_method: greybox ?
          blackbox ? localization.object.filters.greyboxAndBlackboxText : localization.modals.objects.greyboxText :
          blackbox ? localization.modals.objects.blackboxText : '-',
        additional_info: additional_info ? additional_info : '-',
      };
    });

    preparedObjectBody = bodyRows.map(({
      inf_system,
      app_name,
      platform_type,
      greybox,
      blackbox,
      additional_info,
    }) => {
      const object = {
        inf_system_id: inf_system?.name ? inf_system.name : '-',
        app_name: app_name ? app_name : '-',
        platform_type: platform_type ? prepareMobilePlatformToRu[platform_type] : '-',
        test_method: greybox ?
          blackbox ? localization.object.filters.greyboxAndBlackboxText : localization.modals.objects.greyboxText :
          blackbox ? localization.modals.objects.blackboxText : '-',
        additional_info: additional_info ? additional_info : '-',
      };

      return {
        cells: Object.values(object).map((text) => {
          return {
            size: sizeCell,
            text,
          };
        }),
      };
    });

    break;
  }

  case OBJECT_TYPES.SocialEngineering: {
    filenameTitle = OBJECTS_TITLES.SOCIAL_ENGINEERING;
    sizeCell = 3500;

    preparedObjectBodyPDF = bodyRows.map(({
      office,
      engineering_type,
      success_criterion,
      additional_info,
    }) => {
      return {
        office_id: office?.name ? office.name : '-',
        engineering_type: (engineering_type && engineering_type?.length !== 0) ?
          preparedMultiSelectData(engineering_type, prepareSocialEngineeringTypesToRu) : '-',
        success_criterion: success_criterion ? success_criterion : '-',
        additional_info: additional_info ? additional_info : '-',
      };
    });

    preparedObjectBody = bodyRows.map(({
      office,
      engineering_type,
      success_criterion,
      additional_info,
    }) => {
      const object = {
        office_id: office?.name ? office.name : '-',
        engineering_type: (engineering_type && engineering_type?.length !== 0) ?
          preparedMultiSelectData(engineering_type, prepareSocialEngineeringTypesToRu) : '-',
        success_criterion: success_criterion ? success_criterion : '-',
        additional_info: additional_info ? additional_info : '-',
      };

      return {
        cells: Object.values(object).map((text) => {
          return {
            size: sizeCell,
            text,
          };
        }),
      };
    });

    break;
  }

  case OBJECT_TYPES.WiFi: {
    filenameTitle = OBJECTS_TITLES.WIFI;
    sizeCell = 2400;

    preparedObjectBodyPDF = bodyRows.map(({
      office,
      ssid,
      bssid,
      greybox,
      blackbox,
      attacker_model,
      additional_info,
    }) => {
      return {
        office_id: office?.name ? office.name : '-',
        ssid: ssid ? ssid : '-',
        bssid: bssid ? bssid : '-',
        test_method: greybox ?
          blackbox ? localization.object.filters.greyboxAndBlackboxText : localization.modals.objects.greyboxText :
          blackbox ? localization.modals.objects.blackboxText : '-',
        attacker_model: attacker_model ? prepareAttackerModelToRu[attacker_model] : '-',
        additional_info: additional_info ? additional_info : '-',
      };
    });

    preparedObjectBody = bodyRows.map(({
      office,
      ssid,
      bssid,
      greybox,
      blackbox,
      attacker_model,
      additional_info,
    }) => {
      const object = {
        office_id: office?.name ? office.name : '-',
        ssid: ssid ? ssid : '-',
        bssid: bssid ? bssid : '-',
        test_method: greybox ?
          blackbox ? localization.object.filters.greyboxAndBlackboxText : localization.modals.objects.greyboxText :
          blackbox ? localization.modals.objects.blackboxText : '-',
        attacker_model: attacker_model ? prepareAttackerModelToRu[attacker_model] : '-',
        additional_info: additional_info ? additional_info : '-',
      };

      return {
        cells: Object.values(object).map((text) => {
          return {
            size: sizeCell,
            text,
          };
        }),
      };
    });

    break;
  }

  case OBJECT_TYPES.DesktopApp: {
    filenameTitle = OBJECTS_TITLES.DESKTOP_APPS;
    sizeCell = 2800;

    preparedObjectBodyPDF = bodyRows.map(({
      inf_system,
      app_name,
      platform_type,
      greybox,
      blackbox,
      additional_info,
    }) => {
      return {
        inf_system_id: inf_system?.name ? inf_system.name : '-',
        app_name: app_name ? app_name : '-',
        platform_type: platform_type ? prepareDesktopPlatformToRu[platform_type] : '-',
        test_method: greybox ?
          blackbox ? localization.object.filters.greyboxAndBlackboxText : localization.modals.objects.greyboxText :
          blackbox ? localization.modals.objects.blackboxText : '-',
        additional_info: additional_info ? additional_info : '-',
      };
    });

    preparedObjectBody = bodyRows.map(({
      inf_system,
      app_name,
      platform_type,
      greybox,
      blackbox,
      additional_info,
    }) => {
      const object = {
        inf_system_id: inf_system?.name ? inf_system.name : '-',
        app_name: app_name ? app_name : '-',
        platform_type: platform_type ? prepareDesktopPlatformToRu[platform_type] : '-',
        test_method: greybox ?
          blackbox ? localization.object.filters.greyboxAndBlackboxText : localization.modals.objects.greyboxText :
          blackbox ? localization.modals.objects.blackboxText : '-',
        additional_info: additional_info ? additional_info : '-',
      };

      return {
        cells: Object.values(object).map((text) => {
          return {
            size: sizeCell,
            text,
          };
        }),
      };
    });

    break;
  }
  }

  const objectsHeaders: ITableCellDocx[] = headCells.map(cell => {
    return {
      size: sizeCell,
      text: cell.text || '',
    };
  });

  objectsHeaders.shift();

  const objectsBody: ITableBodyDocx = {
    rows: preparedObjectBody,
  };

  const objectsBodyPDF = preparedObjectBodyPDF.map((bodyRow) => Object.values(bodyRow));

  switch (type) {
  case ExportTypes.PDF: {
    return exportPDF('landscape', filenameTitle,
      [{ title: filenameTitle, headers: objectsHeadersPDF, body: objectsBodyPDF }], 'auto');
  }

  case ExportTypes.DOCX: {
    return exportDOCX(filenameTitle, {
      title: filenameTitle,
      headers: objectsHeaders,
      body: objectsBody,
    }, WidthType.DXA);
  }

  case ExportTypes.EXCEL: {
    return exportExcel({ headers: objectsHeaders, title: filenameTitle, body: objectsBody }, sizeColumn);
  }
  }
};
