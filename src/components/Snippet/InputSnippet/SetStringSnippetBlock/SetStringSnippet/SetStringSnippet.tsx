import { Component, ReactNode } from 'react';

import Input from '../../../../../@types/Input';
import Snippet from '../../../Snippet';
import Variable from '../../../Variable/Variable';

export interface SetStringSnippetProps {
    controlIdentifier: string;
    input: Input;
}

export default class SetStringSnippet extends Component<SetStringSnippetProps> {
    public render(): ReactNode {
        const { controlIdentifier } = this.props;
        const methodName = Snippet.snakeToCamelCase(`${controlIdentifier}_Set_Freq`);

        return (
            <Snippet>
                DcsBios::ActionButton {methodName}({`"${controlIdentifier}"`}, <Variable>FREQUENCY</Variable>,{' '}
                <Variable>PIN</Variable>);
            </Snippet>
        );
    }
}
