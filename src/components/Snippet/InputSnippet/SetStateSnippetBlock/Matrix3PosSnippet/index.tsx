import { Component, ReactNode } from 'react';
import Variable from '../../../Variable';
import Snippet from '../../../index';

export interface Matrix2PosSnippetProps {
    controlIdentifier: string;
}

export default class Matrix3PosSnippet extends Component<Matrix2PosSnippetProps> {
    public render(): ReactNode {
        const { controlIdentifier } = this.props;
        const methodName = Snippet.snakeToCamelCase(`${controlIdentifier}`);

        return (
            <Snippet>
                DcsBios::Matrix3Pos {methodName}({`"${controlIdentifier}"`}, <Variable>ROW_A</Variable>,{' '}
                <Variable>COL_A</Variable>, <Variable>ROW_B</Variable>, <Variable>COL_B</Variable>);
            </Snippet>
        );
    }
}
