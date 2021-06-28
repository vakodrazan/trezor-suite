import React from 'react';
import styled from 'styled-components';
import { ConnectDevicePrompt } from '@suite-components';
import { isWebUSB } from '@suite-utils/transport';
import { getStatus, deviceNeedsAttention } from '@suite-utils/device';
import { useSelector } from '@suite-hooks';
import type { PrerequisiteType } from '@suite-types';

import Transport from './components/Transport';
import DeviceConnect from './components/DeviceConnect';
import DeviceAcquire from './components/DeviceAcquire';
import DeviceUnreadable from './components/DeviceUnreadable';
import DeviceUnknown from './components/DeviceUnknown';
import DeviceSeedless from './components/DeviceSeedless';
import DeviceRecoveryMode from './components/DeviceRecoveryMode';
import DeviceInitialize from './components/DeviceInitialize';
import DeviceBootloader from './components/DeviceBootloader';
import DeviceNoFirmware from './components/DeviceNoFirmware';
import DeviceUpdateRequired from './components/DeviceUpdateRequired';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    prerequisite: PrerequisiteType;
}

// PrerequisitesGuide is a shared component used in Preloader and Onboarding
const PrerequisitesGuide = ({ prerequisite, ...rest }: Props) => {
    const { device, transport } = useSelector(state => ({
        device: state.suite.device,
        transport: state.suite.transport,
    }));
    return (
        <Wrapper {...rest}>
            <ConnectDevicePrompt
                connected={!!device}
                showWarning={!!(device && deviceNeedsAttention(getStatus(device)))}
            />
            {(() => {
                switch (prerequisite) {
                    case 'transport-bridge':
                        return <Transport />;
                    case 'device-disconnected':
                        return <DeviceConnect offerWebUsb={isWebUSB(transport)} />;
                    case 'device-unacquired':
                        return <DeviceAcquire />;
                    case 'device-unreadable':
                        return <DeviceUnreadable />;
                    case 'device-unknown':
                        return <DeviceUnknown />;
                    case 'device-seedless':
                        return <DeviceSeedless />;
                    case 'device-recovery-mode':
                        return <DeviceRecoveryMode />;
                    case 'device-initialize':
                        return <DeviceInitialize />;
                    case 'device-bootloader':
                        return <DeviceBootloader />;
                    case 'firmware-missing':
                        return <DeviceNoFirmware />;
                    case 'firmware-required':
                        return <DeviceUpdateRequired />;

                    default:
                        return prerequisite;
                }
            })()}
        </Wrapper>
    );
};

export default PrerequisitesGuide;
