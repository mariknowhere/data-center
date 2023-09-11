import {FC} from 'react';
import classNames from 'classnames';

import Text from '../text/Text';
import {dateRefactor} from '../../utils/calculate/dateRefactor';
import Button from '../button/Button';

import {prepareRoleVariantsToRu} from '../../constants/roles';

import {localization} from '../../localization/localization';

import {ILogsProps} from './LogsTypes';
import {limitLog} from './utils/limitLog';


import styles from './Logs.module.scss';

const Logs: FC<ILogsProps> = ({ logs, showFullLogs, onShowLogsHandler }) => {
  const onLogClick = (event: any, description: string) => {
    const actualDescription = event.currentTarget.querySelectorAll('span')[2];
    const isDescriptionShort = actualDescription.innerText.includes('...');

    actualDescription.innerText = isDescriptionShort ? description : limitLog(description);
  };

  return (
    <div className={classNames(styles['logs-wrapper'], {[styles['logs-wrapper_full']]: showFullLogs})}>
      <div className={styles['logs']}>
        {logs.map(({created_at, action_description, user}, index) => (
          <div
            key={created_at + index}
            onClick={(event) => onLogClick(event, action_description)}
          >
            <Text className={styles['logs-text']}>
              {dateRefactor(created_at)} —
              <span className={styles['logs-text-user']}>
                {` ${prepareRoleVariantsToRu[user.role || '']} — ${user.first_name} — (${user.email}) — `}
              </span>
              <span>
                {limitLog(action_description)}
              </span>
            </Text>
          </div>
        ))}
      </div>
      {logs.length > 6 && (
        <Button
          onClick={onShowLogsHandler}
          buttonText={showFullLogs ? localization.logs.hideButtonText : localization.logs.openButtonText}
          className={styles['logs-button']}
        />
      )}
    </div>
  );
};

export default Logs;
