import { Component, ReactNode } from 'react';

import Input from '../../../../@types/Input';
import InputSnippetBlock from '../index';
import ActionButtonSnippet from './ActionButtonSnippet';

export interface ActionSnippetBlockProps {
    controlIdentifier: string;
    input: Input;
}

export default class ActionSnippetBlock extends Component<ActionSnippetBlockProps> {
    public render(): ReactNode {
        const { controlIdentifier, input } = this.props;
        const message = `${controlIdentifier} ${input.argument}`;

        return (
            <InputSnippetBlock message={message} input={input}>
                <ActionButtonSnippet controlIdentifier={controlIdentifier} input={input} />
            </InputSnippetBlock>
        );
    }
}
