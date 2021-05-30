import React, { useState } from 'react';
import { Translation } from '@suite-components';
import * as guideActions from '@suite-actions/guideActions';
import { useActions } from '@suite-hooks';
import styled, { css } from 'styled-components';
import { Icon, variables, useTheme } from '@trezor/components';

const Wrapper = styled.div`
    background: ${props => props.theme.BG_WHITE};
    display: flex;
    flex-direction: column;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    padding: 22px 22px 27px 22px;
`;

const Content = styled.div`
    height: 100%;
    overflow-y: auto;
    padding: 0 22px;
`;

const HeadingMain = styled.h1`
    font-size: ${variables.FONT_SIZE.BIG};
    font-weight: ${variables.FONT_WEIGHT.DEMI_BOLD};
    text-align: left;
    color: ${props => props.theme.TYPE_DARK_GREY};
    width: 100%;
`;

const HeadingSecondary = styled.h2`
    font-size: ${variables.FONT_SIZE.SMALL};
    font-weight: ${variables.FONT_WEIGHT.DEMI_BOLD};
    text-align: center;
    color: ${props => props.theme.TYPE_DARK_GREY};
    width: 100%;
`;

const ActionButton = styled.button`
    border: 0;
    background: none;
    left: auto;
    cursor: pointer;
`;

const FeedbackLinkWrapper = styled.div`
    border-top: 1px solid ${props => props.theme.STROKE_GREY};
`;

const FeedbackButton = styled.button`
    display: flex;
    align-items: center;
    width: 100%;
    border: 0;
    background: none;
    cursor: pointer;
    color: ${props => props.theme.TYPE_LIGHT_GREY};
    text-align: left;
    padding: 22px;

    &:last-child {
        left: auto;
    }
`;

const FeedbackButtonLabel = styled.div`
    padding: 0 15px;
    font-size: ${variables.FONT_SIZE.SMALL};
    font-weight: ${variables.FONT_WEIGHT.DEMI_BOLD};
    width: 100%;
`;

const FeedbackButtonLeftIcon = styled(Icon)`
    margin-top: -2px;
`;

const FeedbackButtonRightIcon = styled(Icon)`
    margin-top: -1px;
`;

const Section = styled.section`
    padding: 48px 0 0 0;
`;

const SectionHeading = styled.h3`
    font-size: ${variables.FONT_SIZE.SMALL};
    font-weight: ${variables.FONT_WEIGHT.DEMI_BOLD};
    color: ${props => props.theme.TYPE_LIGHT_GREY};
    padding: 0 0 11px 0;
`;

const CategorySelector = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 54px);
    gap: 18px 18px;
`;

const CategorySelectorButton = styled.button<{ hasIcon?: boolean }>`
    display: flex;
    justify-items: center;
    align-items: center;
    flex-direction: column;
    border-radius: 6px;
    border: 1px solid ${props => props.theme.STROKE_GREY};
    width: 100%;
    height: 53px;
    background: none;

    ${props =>
        props.hasIcon &&
        css`
            // grid-column: 2 / 1;
            height: 120px;
        `}
`;

const CategorySelectorButtonIcon = styled.div`
    width: 70px;
    height: 70px;
`;

const CategorySelectorLabel = styled.div`
    font-size: ${variables.FONT_SIZE.SMALL};
    font-weight: ${variables.FONT_WEIGHT.DEMI_BOLD};
    color: ${props => props.theme.TYPE_LIGHT_GREY};
`;

type GuideView = 'GUIDE_DEFAULT' | 'GUIDE_CATEGORY' | 'GUIDE_ARTICLE';
type FeedbackView =
    | 'FEEDBACK_TYPE_SELECTION'
    | 'FEEDBACK_BUG'
    | 'FEEDBACK_SUGGESTION'
    | 'FEEDBACK_ERROR'
    | 'FEEDBACK_SUCCESS';
type ActiveView = GuideView | FeedbackView;

const GuidePanel = (props: any) => {
    const theme = useTheme();
    const { close } = useActions({
        close: guideActions.close,
    });
    const [activeView, setActiveView] = useState<ActiveView>('GUIDE_DEFAULT');

    return (
        <Wrapper {...props}>
            <Header>
                {/* <ActionButton>
                    <Icon icon="ARROW_LEFT" size={16} color={theme.TYPE_LIGHT_GREY}  />
                </ActionButton> */}
                <HeadingMain>
                    Learn &amp; Discover
                </HeadingMain>
                <ActionButton onClick={close}>
                    <Icon icon="CROSS" size={24} color={theme.TYPE_LIGHT_GREY} />
                </ActionButton>
            </Header>
            <Content>
                <Section>
                    <SectionHeading>
                        Categories
                    </SectionHeading>
                    <CategorySelector>
                        <CategorySelectorButton hasIcon>
                            <CategorySelectorButtonIcon>
                                <img src="https://dummyimage.com/70x70" alt="" />
                            </CategorySelectorButtonIcon>
                            <CategorySelectorLabel>Crypto basics</CategorySelectorLabel>
                        </CategorySelectorButton>
                        <CategorySelectorButton hasIcon>
                            <CategorySelectorLabel>Trezor Suite</CategorySelectorLabel>
                        </CategorySelectorButton>
                        <CategorySelectorButton hasIcon>
                            <CategorySelectorLabel>Trezor Suite</CategorySelectorLabel>
                        </CategorySelectorButton>
                        <CategorySelectorButton>
                            <CategorySelectorLabel>Currencies</CategorySelectorLabel>
                        </CategorySelectorButton>
                        <CategorySelectorButton>
                            <CategorySelectorLabel>Dictionary</CategorySelectorLabel>
                        </CategorySelectorButton>
                    </CategorySelector>
                </Section>
                {process.env.VERSION}
            </Content>
            <FeedbackLinkWrapper>
                <FeedbackButton>
                    <FeedbackButtonLeftIcon
                        icon="LIGHTBULB"
                        size={14}
                        color={theme.TYPE_LIGHT_GREY}
                    />
                    <FeedbackButtonLabel>Feedback or Suggestion</FeedbackButtonLabel>
                    <FeedbackButtonRightIcon
                        icon="ARROW_RIGHT"
                        size={16}
                        color={theme.TYPE_LIGHT_GREY}
                    />
                </FeedbackButton>
            </FeedbackLinkWrapper>
        </Wrapper>
    );
};

export default GuidePanel;
