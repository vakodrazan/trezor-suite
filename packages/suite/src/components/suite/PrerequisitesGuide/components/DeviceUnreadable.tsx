import React from 'react';
import styled from 'styled-components';
import { Translation, TroubleshootingTips } from '@suite-components';
import {
    TROUBLESHOOTING_TIP_BRIDGE,
    TROUBLESHOOTING_TIP_USB,
    TROUBLESHOOTING_TIP_DIFFERENT_COMPUTER,
} from '@suite-components/TroubleshootingTips/tips';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

// We don't really know what happened, show some generic help and provide link to contact a support
const DeviceUnreadable = () => (
    <Wrapper>
        <>
            <TroubleshootingTips
                label={<Translation id="TR_YOUR_DEVICE_IS_CONNECTED_BUT_UNREADABLE" />}
                items={[
                    TROUBLESHOOTING_TIP_BRIDGE,
                    TROUBLESHOOTING_TIP_USB,
                    TROUBLESHOOTING_TIP_DIFFERENT_COMPUTER,
                ]}
            />

            {/* <Button onClick={() => TrezorConnect.disableWebUSB()}>
                    <Translation id="TR_TRY_BRIDGE" />
                </Button> */}
        </>
    </Wrapper>
);

export default DeviceUnreadable;
