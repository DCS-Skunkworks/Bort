import { Component, ReactNode } from 'react';
import Variable from '../../../Variable';
import Snippet from '../../../index';

export interface RotaryEncoderSnippetProps {
    controlIdentifier: string;
    downArgument: string;
    upArgument: string;
}

export default class RotaryEncoderSnippet extends Component<RotaryEncoderSnippetProps> {
    public render(): ReactNode {
        const { controlIdentifier, downArgument, upArgument } = this.props;
        const methodName = Snippet.snakeToCamelCase(`${controlIdentifier}`);

        return (
            <Snippet>
                DcsBios::RotaryEncoder {methodName}({`"${controlIdentifier}"`}, "{downArgument}", "{upArgument}",{' '}
                <Variable>PIN_A</Variable>, <Variable>PIN_B</Variable>);
            </Snippet>
        );
    }
}
