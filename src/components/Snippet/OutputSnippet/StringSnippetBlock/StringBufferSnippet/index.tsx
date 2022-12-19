import { Component, ReactNode } from 'react';

import Output from '../../../../../@types/Output';
import Snippet from '../../../index';

export interface StringBufferSnippetProps {
    controlIdentifier: string;
    output: Output;
}

export default class StringBufferSnippet extends Component<StringBufferSnippetProps> {
    public render(): ReactNode {
        const { controlIdentifier, output } = this.props;
        const methodName = Snippet.snakeToCamelCase(`${controlIdentifier}_Buffer`);
        const callbackMethodName = Snippet.snakeToCamelCase(`on_${controlIdentifier}_change`);

        return (
            <Snippet>
                void {callbackMethodName}(char* newValue) &#123;
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;/* your code here */
                <br />
                &#125;
                <br />
                DcsBios::StringBuffer&lt;{output.max_length}&gt; {methodName}({Snippet.toHex(output.address)},{' '}
                {callbackMethodName});
            </Snippet>
        );
    }
}
