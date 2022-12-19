import { Component, ReactNode } from 'react';
import Input from '../../../../../@types/Input';
import RotaryEncoderSnippet from '../RotaryEncoderSnippet';
import InputSnippetBlock from '../../index';

export interface VariableStepSnippetBlockProps {
    controlIdentifier: string;
    input: Input;
}

export default class VariableStepSnippetBlock extends Component<VariableStepSnippetBlockProps> {
    public render(): ReactNode {
        const { controlIdentifier, input } = this.props;
        const message = `${controlIdentifier} <new_value>|-<decrease_by>|+<increase_by>`;

        return (
            <InputSnippetBlock message={message} input={input}>
                <RotaryEncoderSnippet
                    controlIdentifier={controlIdentifier}
                    downArgument={`-${input.suggested_step}`}
                    upArgument={`+${input.suggested_step}`}
                />
            </InputSnippetBlock>
        );
    }
}
