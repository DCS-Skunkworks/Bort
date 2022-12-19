import { Component, ReactNode } from 'react';

import Output from '../../../../../@types/Output';
import Snippet from '../../../index';
import Variable from '../../../Variable';

export interface LedSnippetProps {
    controlIdentifier: string;
    output: Output;
}

export default class LedSnippet extends Component<LedSnippetProps> {
    public render(): ReactNode {
        const { controlIdentifier, output } = this.props;
        const methodName = Snippet.snakeToCamelCase(controlIdentifier);

        return (
            <Snippet>
                DcsBios::LED {methodName}({Snippet.toHex(output.address)}, {Snippet.toHex(output.mask)},{' '}
                <Variable>PIN</Variable>);
            </Snippet>
        );
    }
}
