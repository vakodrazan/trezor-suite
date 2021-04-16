import React from 'react';
import styled from 'styled-components';
import { DeviceAnimation } from '../../index';
import { storiesOf } from '@storybook/react';
import { select, boolean, number, text } from '@storybook/addon-knobs';

const Center = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 100px 0px;
`;

Center.displayName = 'CenterWrapper';

storiesOf('DeviceAnimation', module).add('DeviceAnimation', () => {
    const type: any = select(
        'Type',
        ['T1_CONNECT', 'TT_CONNECT', 'T1_BOOTLOADER', 'T1_SUCCESS', 'TT_BOOTLOADER', 'TT_SUCCESS'],
        'T1_CONNECT'
    );
    const loop: any = boolean('Loop', true);
    const size: any = number('Size', 200);
    const borderRadius: any = text('BorderRadius', '50%');

    return (
        <Center>
            <DeviceAnimation type={type} loop={loop} size={size} borderRadius={borderRadius} />
        </Center>
    );
});
