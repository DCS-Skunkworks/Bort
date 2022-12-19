import { Component, ReactNode } from 'react';

import Snippet from '../../../index';
import Variable from '../../../Variable';

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
