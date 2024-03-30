import { Component, ReactNode } from 'react';

import Snippet from '../../../Snippet';
import { IntegerSnippetProps } from '../IntegerSnippetProps';

export default class IntegerBufferSnippet extends Component<IntegerSnippetProps> {
    public render(): ReactNode {
        const { controlIdentifier, output, useAddressConstants } = this.props;
        const methodName = Snippet.snakeToCamelCase(`${controlIdentifier}_Buffer`);
        const callbackMethodName = Snippet.snakeToCamelCase(`on_${controlIdentifier}_change`);

        return (
            <Snippet>
                void {callbackMethodName}(unsigned int newValue) &#123;
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;/* your code here */
                <br />
                &#125;
                <br />
                DcsBios::IntegerBuffer {methodName}(
                {(useAddressConstants && output.address_mask_shift_identifier) ||
                    `${Snippet.toHex(output.address)}, ${Snippet.toHex(output.mask)}, ${output.shift_by}`}
                , {callbackMethodName});
            </Snippet>
        );
    }
}
