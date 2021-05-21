import React from 'react';
import { Translation } from '@suite-components';
import { useActions } from '@suite-hooks';
import * as STEP from '@onboarding-constants/steps';
import { NeueOption, OptionWrapper, OptionsWrapper, OptionsDivider } from '@onboarding-components';
import * as onboardingActions from '@onboarding-actions/onboardingActions';
import { OnboardingStepBox } from '@suite/components/firmware';

const CreateOrRecoverStep = () => {
    const { goToNextStep, addPath } = useActions({
        goToNextStep: onboardingActions.goToNextStep,
        goToPreviousStep: onboardingActions.goToPreviousStep,
        addPath: onboardingActions.addPath,
    });

    return (
        <OnboardingStepBox
            image="WALLET"
            heading={<Translation id="TR_WELCOME_TO_TREZOR_TEXT_WALLET_CREATION" />}
        >
            <OptionsWrapper>
                <OptionWrapper>
                    <NeueOption
                        icon="NEW"
                        data-test="@onboarding/path-create-button"
                        onClick={() => {
                            addPath(STEP.PATH_CREATE);
                            goToNextStep();
                        }}
                        heading={<Translation id="TR_CREATE_WALLET" />}
                    />
                </OptionWrapper>
                <OptionsDivider />
                <OptionWrapper>
                    <NeueOption
                        icon="RECOVER"
                        data-test="@onboarding/path-recovery-button"
                        onClick={() => {
                            addPath(STEP.PATH_RECOVERY);
                            goToNextStep();
                        }}
                        heading={<Translation id="TR_RESTORE_EXISTING_WALLET" />}
                    />
                </OptionWrapper>
            </OptionsWrapper>
        </OnboardingStepBox>
    );
};

export default CreateOrRecoverStep;
