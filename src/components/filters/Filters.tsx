import {FC, useState} from 'react';

import classNames from 'classnames';

import Button from '../button/Button';
import {ButtonTypeEnum} from '../button/ButtonTypes';
import {TextVariantEnum} from '../text/TextTypes';
import InputForm from '../inputForm/InputForm';

import {localization} from '../../localization/localization';

import {IFiltersProps} from './FiltersTypes';
import styles from './Filters.module.scss';

const Filters: FC<IFiltersProps> = ({ filters, onSearchButtonClick }) => {
  const [visibleFilters, setVisibleFilters] = useState<boolean>(true);

  const showFiltersHandler = () => setVisibleFilters(prevState => !prevState);

  return (
    <div className={styles['filters']}>
      <Button
        onClick={showFiltersHandler}
        buttonText={localization.filters.openButtonText}
        type={ButtonTypeEnum.White}
        typeButtonText={TextVariantEnum.S}
        className={classNames(styles['filters-button'], {[styles['filters-button_active']]: visibleFilters})}
      />
      {visibleFilters && (
        <div className={styles['filters-content']}>
          <div className={styles['filters-items']}>
            {filters?.map(({ id, ...rest }) => (
              <div key={id} className={styles['filters-search-wrapper']}>
                <InputForm
                  {...rest}
                />
              </div>
            ))}
          </div>
          <div className={styles['filters-button-wrapper']}>
            <Button
              onClick={() => onSearchButtonClick ? onSearchButtonClick(true) : null}
              className={styles['filters-button']}
              buttonText={localization.filters.resetButtonText}
              typeButtonText={TextVariantEnum.S}
            />
            <Button
              onClick={() => onSearchButtonClick ? onSearchButtonClick(false) : null}
              className={styles['filters-button']}
              buttonText={localization.filters.searchButtonText}
              typeButtonText={TextVariantEnum.S}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Filters;
