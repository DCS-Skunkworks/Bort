import { Component, ReactNode } from 'react';

import Snippet from '../../../Snippet';
import Variable from '../../../Variable/Variable';

export interface Switch2PosSnippetProps {
    controlIdentifier: string;
}

export default class Switch2PosSnippet extends Component<Switch2PosSnippetProps> {
    public render(): ReactNode {
        const { controlIdentifier } = this.props;
        const methodName = Snippet.snakeToCamelCase(`${controlIdentifier}`);

        return (
            <Snippet>
                DcsBios::Switch2Pos {methodName}({`"${controlIdentifier}"`}, <Variable>PIN</Variable>);
            </Snippet>
        );
    }
}
