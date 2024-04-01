import { Component, ReactNode } from 'react';

import OutputSnippetBlock from '../OutputSnippetBlock';
import StringBufferSnippet from './StringBufferSnippet/StringBufferSnippet';
import { StringSnippetProps } from './StringSnippetProps';

export default class StringSnippetBlock extends Component<StringSnippetProps> {
    public render(): ReactNode {
        const { controlIdentifier, output, useAddressConstants } = this.props;

        return (
            <OutputSnippetBlock output={output}>
                <StringBufferSnippet
                    controlIdentifier={controlIdentifier}
                    output={output}
                    useAddressConstants={useAddressConstants}
                />
            </OutputSnippetBlock>
        );
    }
}
