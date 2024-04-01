import { Component, ReactNode } from 'react';

import Snippet from '../../../Snippet';
import Variable from '../../../Variable/Variable';
import { IntegerSnippetProps } from '../IntegerSnippetProps';

export default class ServoSnippet extends Component<IntegerSnippetProps> {
    public render(): ReactNode {
        const { controlIdentifier, output, useAddressConstants } = this.props;
        const methodName = Snippet.snakeToCamelCase(controlIdentifier);

        return (
            <Snippet>
                DcsBios::ServoOutput {methodName}(
                {(useAddressConstants && output.address_identifier) || Snippet.toHex(output.address)},{' '}
                <Variable>PIN</Variable>, <Variable>544</Variable>, <Variable>2400</Variable>);
            </Snippet>
        );
    }
}
