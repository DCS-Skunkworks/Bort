import { Component, ReactNode } from 'react';

import Snippet from '../../../Snippet';
import Variable from '../../../Variable/Variable';
import { IntegerSnippetProps } from '../IntegerSnippetProps';

export default class LedSnippet extends Component<IntegerSnippetProps> {
    public render(): ReactNode {
        const { controlIdentifier, output, useAddressConstants } = this.props;
        const methodName = Snippet.snakeToCamelCase(controlIdentifier);

        return (
            <Snippet>
                DcsBios::LED {methodName}(
                {(useAddressConstants && output.address_mask_identifier) ||
                    `${Snippet.toHex(output.address)}, ${Snippet.toHex(output.mask)}`}
                , <Variable>PIN</Variable>);
            </Snippet>
        );
    }
}
