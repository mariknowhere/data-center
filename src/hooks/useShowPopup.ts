/**
 * return function that fires when opening and closing the popup window
 */
export const useShowPopup = () => {
  const showPopupHandler = (event: any) => {
    const input = event.currentTarget;
    const popup = input.querySelector('ul');

    const modalForm = popup.parentElement.parentElement.parentElement;
    const modalPopups = modalForm.querySelectorAll('ul');

    const modalFilterForm = modalForm.parentElement;
    const modalFiltersPopups = modalFilterForm.querySelectorAll('ul');

    if (popup.style.display !== 'flex') {
      for (const modalPopup of modalPopups) {
        if (modalPopup.style.display === 'flex') {
          modalPopup.style.display = 'none';
        }
      }

      for (const modalFilterPopup of modalFiltersPopups) {
        if (modalFilterPopup.style.display === 'flex') {
          modalFilterPopup.style.display = 'none';
        }
      }
    }

    popup.style.display = popup.style.display === 'flex' ? 'none' : 'flex';
  };

  return {
    showPopupHandler,
  };
};
