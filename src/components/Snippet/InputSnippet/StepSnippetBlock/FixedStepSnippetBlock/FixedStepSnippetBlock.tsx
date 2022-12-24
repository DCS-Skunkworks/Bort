import { Component, ReactNode } from 'react';

import Input from '../../../../../@types/Input';
import InputSnippetBlock from '../../InputSnippetBlock';
import RotaryEncoderSnippet from '../RotaryEncoderSnippet/RotaryEncoderSnippet';

export interface FixedStepSnippetBlockProps {
    controlIdentifier: string;
    input: Input;
}

export default class FixedStepSnippetBlock extends Component<FixedStepSnippetBlockProps> {
    public render(): ReactNode {
        const { controlIdentifier, input } = this.props;
        const message = `${controlIdentifier} <DEC|INC>`;

        return (
            <InputSnippetBlock message={message} input={input}>
                <RotaryEncoderSnippet controlIdentifier={controlIdentifier} downArgument={'DEC'} upArgument={'INC'} />
            </InputSnippetBlock>
        );
    }
}
