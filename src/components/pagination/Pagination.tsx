import {FC, useEffect, useState} from 'react';

import classNames from 'classnames';

import {localization} from '../../localization/localization';

import styles from './Pagination.module.scss';
import {IPaginationProps} from './PaginationTypes';


const Pagination: FC<IPaginationProps> = ({
  onPageClick,
  count = 0,
  startPage = 1,
  startLimit = 10,
  setStartLimit,
}) => {
  const [limit, setLimit] = useState<number>(startLimit);
  const [pages, setPages] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  const [pageOne, setPageOne] = useState<number>(1);
  const [pageTwo, setPageTwo] = useState<number>(0);
  const [pageThree, setPageThree] = useState<number>(0);
  const [pageFour, setPageFour] = useState<number>(0);
  const [pageFive, setPageFive] = useState<number>(0);

  useEffect(() => {
    setLimit(startLimit);
  }, [startLimit]);

  useEffect(() => {
    if (count) {
      const allPages = Math.ceil(count / limit);

      setPages(allPages);
      setPage(startPage);
    }
  }, [count, startPage, limit]);

  useEffect(() => {
    if (pages === 1) {
      setPageOne(1);
      setPageTwo(0);
      setPageThree(0);
      setPageFour(0);
      setPageFive(0);
    } else if (pages === 2) {
      setPageOne(1);
      setPageTwo(2);
      setPageThree(0);
      setPageFour(0);
      setPageFive(0);
    } else if (pages === 3) {
      setPageOne(1);
      setPageTwo(2);
      setPageThree(3);
      setPageFour(0);
      setPageFive(0);
    } else if (pages === 4) {
      setPageOne(1);
      setPageTwo(2);
      setPageThree(3);
      setPageFour(4);
      setPageFive(0);
    } else if (pages >= 5) {
      setPageOne(1);
      setPageTwo(2);
      setPageThree(3);
      setPageFour(4);
      setPageFive(5);
    }
  }, [pages]);

  const onPageClickHandler = (offset: number) => {
    if (offset <= pages && offset >= pages - 3 && pages > 5) {
      setPageOne(pages - 4);
      setPageTwo(pages - 3);
      setPageThree(pages - 2);
      setPageFour(pages - 1);
      setPageFive(pages);
    } else if (offset < pages && offset === 1 && pages > 5) {
      setPageOne(offset);
      setPageTwo(offset + 1);
      setPageThree(offset + 2);
      setPageFour(offset + 3);
      setPageFive(offset + 4);
    } else if (pages > 5) {
      setPageOne(offset - 1);
      setPageTwo(offset);
      setPageThree(offset + 1);
      setPageFour(offset + 2);
      setPageFive(offset + 3);
    }

    setPage(offset);
    onPageClick((offset - 1) * limit, limit);
  };

  const onLimitChangeHandler = (event: any) => {
    const actualLimit = parseInt(event.target.value);

    setLimit(actualLimit);
    if (setStartLimit) {
      setStartLimit(actualLimit);
    }

    onPageClick((page - 1) * actualLimit, actualLimit);
  };

  return (
    <div className={styles['pagination']}>
      <div>
        <span className={styles['pagination-total']}>{localization.pagination.amount}</span>
        <select className={styles['pagination-select']} value={limit} onChange={onLimitChangeHandler} >
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="75">75</option>
          <option value="100">100</option>
        </select>
      </div>
      <div className={styles['pagination-additional']}>
        <span className={styles['pagination-total']}>{`${localization.pagination.allTitle} ${count}`}</span>
        <img
          onClick={() => page !== 1 && onPageClickHandler(page - 1)}
          src="/assets/icons/arrow-left.svg"
          alt={localization.pagination.arrowLeftAlt}
          className={styles['pagination-arrow']}
        />
        <span
          onClick={() => page !== pageOne && onPageClickHandler(pageOne)}
          className={classNames(
            styles['pagination-number'], { [styles['pagination-number_blue']]: page === pageOne },
          )}
        >
          {pageOne}
        </span>
        {pageTwo > 0 && (
          <span
            onClick={() => page !== pageTwo && onPageClickHandler(pageTwo)}
            className={classNames(
              styles['pagination-number'], { [styles['pagination-number_blue']]: page === pageTwo },
            )}
          >
            {pageTwo}
          </span>
        )}
        {pageThree > 0 && (
          <span
            onClick={() => page !== pageThree && onPageClickHandler(pageThree)}
            className={classNames(
              styles['pagination-number'], { [styles['pagination-number_blue']]: page === pageThree },
            )}
          >
            {pageThree}
          </span>
        )}
        {pageFour > 0 && (
          <span
            onClick={() => page !== pageFour && onPageClickHandler(pageFour)}
            className={classNames(
              styles['pagination-number'], { [styles['pagination-number_blue']]: page === pageFour },
            )}
          >
            {pageFour}
          </span>
        )}
        {pageFive > 0 && (
          <span
            onClick={() => page !== pageFive && onPageClickHandler(pageFive)}
            className={classNames(
              styles['pagination-number'], { [styles['pagination-number_blue']]: page === pageFive },
            )}
          >
            {pageFive}
          </span>
        )}
        <img
          onClick={() => page !== pages && onPageClickHandler(page + 1)}
          src="/assets/icons/arrow-right.svg"
          alt={localization.pagination.arrowRightAlt}
          className={styles['pagination-arrow']}
        />
      </div>
    </div>
  );
};

export default Pagination;
