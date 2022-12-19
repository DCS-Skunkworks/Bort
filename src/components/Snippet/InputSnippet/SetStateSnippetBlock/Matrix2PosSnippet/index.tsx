import { Component, ReactNode } from 'react';

import Snippet from '../../../index';
import Variable from '../../../Variable';

export interface Matrix2PosSnippetProps {
    controlIdentifier: string;
}

export default class Matrix2PosSnippet extends Component<Matrix2PosSnippetProps> {
    public render(): ReactNode {
        const { controlIdentifier } = this.props;
        const methodName = Snippet.snakeToCamelCase(`${controlIdentifier}`);

        return (
            <Snippet>
                DcsBios::Matrix2Pos {methodName}({`"${controlIdentifier}"`}, <Variable>ROW</Variable>,{' '}
                <Variable>COL</Variable>);
            </Snippet>
        );
    }
}
