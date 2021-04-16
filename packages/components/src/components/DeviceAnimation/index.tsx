/* eslint-disable jsx-a11y/media-has-caption */
import styled from 'styled-components';
import React, { ReactNode } from 'react';
import { useTheme } from '../../utils';
import Lottie from 'lottie-react';
import LottieT1Connect from './lottie/t1_connect.json';
import LottieTTConnect from './lottie/tt_connect.json';
import VideoT1BootloaderLight from '../../videos/t1_bootloader_light.mp4';
import VideoT1BootloaderDark from '../../videos/t1_bootloader_dark.mp4';
import VideoT1SuccessLight from '../../videos/t1_success_light.mp4';
import VideoT1SuccessDark from '../../videos/t1_success_dark.mp4';
import VideoTTBootloaderLight from '../../videos/tt_bootloader_light.mp4';
import VideoTTBootloaderDark from '../../videos/tt_bootloader_dark.mp4';
import VideoTTSuccessLight from '../../videos/tt_success_light.mp4';
import VideoTTSuccessDark from '../../videos/tt_success_dark.mp4';

const Wrapper = styled.div<{ size: number; borderRadius: string }>`
    width: ${props => props.size}px;
    height: ${props => props.size}px;
    border-radius: ${props => props.borderRadius};
    background: ${props => props.theme.BG_GREY};
    overflow: hidden;
`;

const StyledLottie = styled(Lottie)`
    width: 100%;
    height: 100%;
`;

const StyledVideo = styled(Lottie)`
    width: 100%;
    height: 100%;
`;

type DeviceAnimationType =
    | 'T1_CONNECT'
    | 'TT_CONNECT'
    | 'T1_BOOTLOADER'
    | 'T1_SUCCESS'
    | 'TT_BOOTLOADER'
    | 'TT_SUCCESS';

type Props = {
    size?: number;
    type: DeviceAnimationType;
    loop?: boolean;
    borderRadius?: string;
};

type VideoProps = {
    size: number;
    src: string;
    loop: boolean;
};

const Video = ({ size, src, loop }: VideoProps) => (
    <video loop={loop} autoPlay width={size} height={size}>
        <source src={src} type="video/mp4" />
    </video>
);

const DeviceAnimation = ({
    size = 100,
    type,
    loop = false,
    borderRadius = '50%',
    ...props
}: Props) => {
    const variant = useTheme().THEME;
    return (
        <Wrapper size={size} borderRadius={borderRadius} {...props}>
            {type === 'T1_CONNECT' && <StyledLottie animationData={LottieT1Connect} loop={loop} />}
            {type === 'TT_CONNECT' && <StyledLottie animationData={LottieTTConnect} loop={loop} />}
            {type === 'T1_BOOTLOADER' && (
                <Video
                    size={size}
                    loop={loop}
                    src={variant === 'light' ? VideoT1BootloaderLight : VideoT1BootloaderDark}
                />
            )}
            {type === 'T1_SUCCESS' && (
                <Video
                    size={size}
                    loop={loop}
                    src={variant === 'light' ? VideoT1SuccessLight : VideoT1SuccessDark}
                />
            )}
            {type === 'TT_BOOTLOADER' && (
                <Video
                    size={size}
                    loop={loop}
                    src={variant === 'light' ? VideoTTBootloaderLight : VideoTTBootloaderDark}
                />
            )}
            {type === 'TT_SUCCESS' && (
                <Video
                    size={size}
                    loop={loop}
                    src={variant === 'light' ? VideoTTSuccessLight : VideoTTSuccessDark}
                />
            )}
        </Wrapper>
    );
};

export { DeviceAnimation, Props as DeviceAnimationProps };
