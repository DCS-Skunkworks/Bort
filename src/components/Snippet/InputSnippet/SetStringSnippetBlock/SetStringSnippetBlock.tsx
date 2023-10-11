import { Component, ReactNode } from 'react';

import Input from '../../../../@types/Input';
import InputSnippetBlock from '../InputSnippetBlock';
import SetStringSnippet from './SetStringSnippet/SetStringSnippet';

export interface SetStringSnippetBlockProps {
    controlIdentifier: string;
    input: Input;
}

export default class SetStringSnippetBlock extends Component<SetStringSnippetBlockProps> {
    public render(): ReactNode {
        const { controlIdentifier, input } = this.props;
        const message = `${controlIdentifier} Set String Value`;

        return (
            <InputSnippetBlock message={message} input={input}>
                <SetStringSnippet controlIdentifier={controlIdentifier} input={input} />
            </InputSnippetBlock>
        );
    }
}
