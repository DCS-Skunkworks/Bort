import { Component, ReactNode } from 'react';
import Input from '../../../../../@types/Input';
import Variable from '../../../Variable';
import Snippet from '../../../index';

export interface ActionButtonSnippetProps {
    controlIdentifier: string;
    input: Input;
}

export default class ActionButtonSnippet extends Component<ActionButtonSnippetProps> {
    public render(): ReactNode {
        const { controlIdentifier, input } = this.props;
        const methodName = Snippet.snakeToCamelCase(`${controlIdentifier}_${input.argument}`);

        return (
            <Snippet>
                DcsBios::ActionButton {methodName}({`"${controlIdentifier}"`}, {`"${input.argument}"`},{' '}
                <Variable>PIN</Variable>);
            </Snippet>
        );
    }
}
