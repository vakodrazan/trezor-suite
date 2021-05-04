import Option from './Option';
import NeueOption, { OptionsWrapper, OptionWrapper, OptionsDivider } from './NeueOption';
import Text from './Text';

import ControlsWrapper from './Wrapper/ControlsWrapper';
import StepBodyWrapper from './Wrapper/StepBodyWrapper';
import StepFooterWrapper from './Wrapper/StepFooterWrapper';
import StepHeadingWrapper from './Wrapper/StepHeadingWrapper';
import StepWrapper from './Wrapper/StepWrapper';

import OnboardingButtonAlt from './Buttons/ButtonAlt';
import OnboardingButtonCta from './Buttons/ButtonCta';
import OnboardingButtonBack from './Buttons/ButtonBack';
import OnboardingButtonSkip from './Buttons/ButtonSkip';

import Box, { BoxProps } from './Box/Box';
import Coin, { CoinProps } from './Coin/Coin';
import CoinsGroup from './CoinsGroup/CoinsGroup';
import ConnectDevicePrompt from './ConnectDevicePrompt';
import ConnectDevicePromptManager from './ConnectDevicePromptManager';
import OnboardingLayout from './Layouts/OnboardingLayout';
import WelcomeLayout from './Layouts/WelcomeLayout';
import ProgressBar from './ProgressBar';
import Hologram from './Hologram';
import DeviceAnimation from './DeviceAnimation';
import TroubleshootingTips from './TroubleshootingTips';
import Dots from './Loaders/Dots';

const Loaders = {
    Dots,
};

const Wrapper = {
    Controls: ControlsWrapper,
    Options: OptionsWrapper,
    StepBody: StepBodyWrapper,
    StepFooter: StepFooterWrapper,
    StepHeading: StepHeadingWrapper,
    Step: StepWrapper,
};

export {
    OnboardingButtonAlt,
    OnboardingButtonCta,
    OnboardingButtonBack,
    OnboardingButtonSkip,
    Loaders,
    Text,
    Wrapper,
    Option,
    NeueOption,
    OptionsWrapper,
    OptionWrapper,
    OptionsDivider,
    Box,
    Coin,
    CoinsGroup,
    ConnectDevicePrompt,
    ConnectDevicePromptManager,
    WelcomeLayout,
    OnboardingLayout,
    ProgressBar,
    TroubleshootingTips,
    Hologram,
    DeviceAnimation,
};
export type { BoxProps, CoinProps };
