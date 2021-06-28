import React from 'react';
import styled from 'styled-components';
import { variables } from '@trezor/components';
import { WelcomeLayout, PrerequisitesGuide } from '@suite-components';
import type { PrerequisiteType } from '@suite-types';

const StyledPrerequisitesGuide = styled(PrerequisitesGuide)`
    margin-top: 20vh;
    @media all and (max-height: ${variables.SCREEN_SIZE.MD}) {
        margin-top: 5vh;
    }
    @media all and (max-height: ${variables.SCREEN_SIZE.SM}) {
        margin-top: 0vh;
    }
`;

interface Props {
    prerequisite: PrerequisiteType;
}

const PrerequisiteScreen = ({ prerequisite }: Props) => (
    <WelcomeLayout>
        <StyledPrerequisitesGuide prerequisite={prerequisite} />
    </WelcomeLayout>
);

export default PrerequisiteScreen;
