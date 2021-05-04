import React from 'react';
import styled from 'styled-components';

import * as backupActions from '@suite/actions/backup/backupActions';
import { Translation } from '@suite-components';
import { variables } from '@trezor/components';
import { useActions, useSelector } from '@suite/hooks/suite';
import BackupSeedCard from './BackupSeedCard';

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;

    @media only screen and (max-width: ${variables.SCREEN_SIZE.MD}) {
        flex-direction: column;
    }
`;

const StyledBackupSeedCard = styled(BackupSeedCard)`
    width: 30%;

    @media only screen and (max-width: ${variables.SCREEN_SIZE.MD}) {
        width: 100%;
        & + & {
            margin-top: 10px;
        }
    }
`;

const BackupSeedCards = () => {
    const backup = useSelector(s => s.backup);
    const { toggleCheckboxByKey } = useActions({
        toggleCheckboxByKey: backupActions.toggleCheckboxByKey,
    });

    const isChecked = (key: backupActions.ConfirmKey) => backup.userConfirmed.includes(key);

    const items = [
        {
            key: 'wrote-seed-properly',
            label: <Translation id="TR_BACKUP_CHECKBOX_1_TITLE" />,
            icon: 'CALENDAR',
        },
        {
            key: 'made-no-digital-copy',
            label: <Translation id="TR_BACKUP_CHECKBOX_2_TITLE" />,
            icon: 'CALENDAR',
        },
        {
            key: 'will-hide-seed',
            label: <Translation id="TR_BACKUP_CHECKBOX_3_TITLE" />,
            icon: 'CALENDAR',
        },
    ] as const;

    return (
        <Wrapper>
            {items.map(item => (
                <StyledBackupSeedCard
                    // TODO: change data-test, checkbox keys to something more generic, independent of actual content
                    data-test={`@backup/check-item/${item.key}`}
                    onClick={() => toggleCheckboxByKey(item.key)}
                    label={<Translation id="TR_BACKUP_CHECKBOX_1_TITLE" />}
                    icon={item.icon}
                    isChecked={isChecked(item.key)}
                />
            ))}
        </Wrapper>
    );
};

export default BackupSeedCards;
