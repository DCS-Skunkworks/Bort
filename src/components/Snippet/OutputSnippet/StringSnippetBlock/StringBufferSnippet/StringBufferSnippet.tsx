import { Component, ReactNode } from 'react';

import Snippet from '../../../Snippet';
import { StringSnippetProps } from '../StringSnippetProps';

export default class StringBufferSnippet extends Component<StringSnippetProps> {
    public render(): ReactNode {
        const { controlIdentifier, output, useAddressConstants } = this.props;
        const methodName = Snippet.snakeToCamelCase(`${controlIdentifier}${output.suffix}_Buffer`);
        const callbackMethodName = Snippet.snakeToCamelCase(`on_${controlIdentifier}_change`);

        return (
            <Snippet>
                void {callbackMethodName}(char* newValue) &#123;
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;/* your code here */
                <br />
                &#125;
                <br />
                DcsBios::StringBuffer&lt;{output.max_length}&gt; {methodName}(
                {(useAddressConstants && output.address_identifier) || Snippet.toHex(output.address)},{' '}
                {callbackMethodName});
            </Snippet>
        );
    }
}
