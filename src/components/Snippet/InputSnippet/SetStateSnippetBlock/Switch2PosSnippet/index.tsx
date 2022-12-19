import { Component, ReactNode } from 'react';
import Variable from '../../../Variable';
import Snippet from '../../../index';

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
