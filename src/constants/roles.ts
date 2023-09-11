export const ROLES_ROUTES = {
  TEAMLEADS: `${process.env.REACT_APP_API_URI}/api/v1/teamleads`,
  ASSIGN_TEAMLEAD: 'assign_teamlead',
  DELETE_TEAMLEAD: 'delete_teamlead',
  MANAGERS: `${process.env.REACT_APP_API_URI}/api/v1/managers`,
  ASSIGN_MANAGER: 'assign_manager',
  DELETE_MANAGER: 'delete_manager',
  PENTESTERS: `${process.env.REACT_APP_API_URI}/api/v1/pentesters`,
  ASSIGN_PENTESTER: 'assign_pentesters',
  DELETE_PENTESTER: 'delete_pentesters',
};

export const prepareRoleVariantsToRu: { [index: string]: string } = {
  admin: 'Администратор',
  client: 'Клиент',
  manager: 'Менеджер',
  chief: 'Руководитель',
  teamlead: 'Тимлид',
  pentester: 'Пентестер',
  analyst: 'Аналитик',
};
