import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { OnboardingButtonAlt } from '@onboarding-components';
import { Translation } from '@suite-components';
import { Dispatch } from '@suite-types';
import * as onboardingActions from '@onboarding-actions/onboardingActions';
import { OnboardingStepBox } from '@suite/components/firmware';

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            resetOnboarding: onboardingActions.resetOnboarding,
            enableOnboardingReducer: onboardingActions.enableOnboardingReducer,
        },
        dispatch,
    );

type Props = ReturnType<typeof mapDispatchToProps>;

const IsSameDevice = ({ resetOnboarding, enableOnboardingReducer }: Props) => (
    <OnboardingStepBox
        disableConfirmWrapper
        heading={<Translation id="ONBOARDING_UNEXPECTED_DEVICE_DIFFERENT_HEADING" />}
        description={
            <>
                <Translation id="ONBOARDING_UNEXPECTED_DEVICE_DIFFERENT_P1" />
                <Translation id="ONBOARDING_UNEXPECTED_DEVICE_DIFFERENT_P2" />
            </>
        }
        innerActions={
            <OnboardingButtonAlt
                onClick={() => {
                    resetOnboarding();
                    enableOnboardingReducer(true);
                }}
                data-test="@onboarding/unexpected-state/is-same/start-over-button"
            >
                <Translation id="TR_START_AGAIN" />
            </OnboardingButtonAlt>
        }
    />
);

export default connect(null, mapDispatchToProps)(IsSameDevice);
