export const PROJECTS_ROUTES = {
  FULL_URL: `${process.env.REACT_APP_API_URI}/api/v1/projects`,
  LOGS: 'logs',
  RESTORE: 'restore',
};

export const projectHeadCells = [
  {
    id: 'checked',
    checked: true,
    image: false,
  },
  {
    id: 'name',
    text: 'Название',
  },
  {
    id: 'start_date',
    text: 'Дата начала',
  },
  {
    id: 'end_date',
    text: 'Дата окончания',
  },
  {
    id: 'gos_order_number',
    text: 'Номер гос. заказа',
  },
  {
    id: 'gos_order_date',
    text: 'Дата гос. заказа',
  },
];
