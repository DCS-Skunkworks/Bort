import { Component, ReactNode } from 'react';

import Output from '../../../../@types/Output';
import OutputSnippetBlock from '../index';
import StringBufferSnippet from './StringBufferSnippet';

export interface StringSnippetBlockProps {
    controlIdentifier: string;
    output: Output;
}

export default class StringSnippetBlock extends Component<StringSnippetBlockProps> {
    public render(): ReactNode {
        const { controlIdentifier, output } = this.props;

        return (
            <OutputSnippetBlock output={output}>
                <StringBufferSnippet controlIdentifier={controlIdentifier} output={output} />
            </OutputSnippetBlock>
        );
    }
}
