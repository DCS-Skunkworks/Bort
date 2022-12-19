import { Component, ReactNode } from 'react';

import Snippet from '../../../index';
import Variable from '../../../Variable';

export interface Switch3PosSnippetProps {
    controlIdentifier: string;
}

export default class Switch3PosSnippet extends Component<Switch3PosSnippetProps> {
    public render(): ReactNode {
        const { controlIdentifier } = this.props;
        const methodName = Snippet.snakeToCamelCase(`${controlIdentifier}`);

        return (
            <Snippet>
                DcsBios::Switch3Pos {methodName}({`"${controlIdentifier}"`}, <Variable>PIN_A</Variable>,{' '}
                <Variable>PIN_B</Variable>);
            </Snippet>
        );
    }
}
