import { Component, ReactNode } from 'react';
import Variable from '../../../Variable';
import Snippet from '../../../index';
import Output from '../../../../../@types/Output';

export interface ServoSnippetProps {
    controlIdentifier: string;
    output: Output;
}

export default class ServoSnippet extends Component<ServoSnippetProps> {
    public render(): ReactNode {
        const { controlIdentifier, output } = this.props;
        const methodName = Snippet.snakeToCamelCase(controlIdentifier);

        return (
            <Snippet>
                DcsBios::ServoOutput {methodName}({Snippet.toHex(output.address)}, <Variable>PIN</Variable>,{' '}
                <Variable>544</Variable>, <Variable>2400</Variable>);
            </Snippet>
        );
    }
}
