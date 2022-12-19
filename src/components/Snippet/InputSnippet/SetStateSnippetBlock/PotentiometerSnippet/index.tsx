import { Component, ReactNode } from 'react';
import Snippet from '../../../index';
import Variable from '../../../Variable';

export interface PotentiometerSnippetProps {
    controlIdentifier: string;
}

export default class PotentiometerSnippet extends Component<PotentiometerSnippetProps> {
    public render(): ReactNode {
        const { controlIdentifier } = this.props;
        const methodName = Snippet.snakeToCamelCase(`${controlIdentifier}`);

        return (
            <Snippet>
                DcsBios::Potentiometer {methodName}({`"${controlIdentifier}"`}, <Variable>PIN</Variable>);
            </Snippet>
        );
    }
}
