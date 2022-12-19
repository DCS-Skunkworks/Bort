import { Component, ReactNode } from 'react';
import Variable from '../../../Variable';
import Snippet from '../../../index';

export interface AnalogMultiPosSnippetProps {
    controlIdentifier: string;
}

export default class AnalogMultiPosSnippet extends Component<AnalogMultiPosSnippetProps> {
    public render(): ReactNode {
        const { controlIdentifier } = this.props;
        const methodName = Snippet.snakeToCamelCase(`${controlIdentifier}`);

        return (
            <Snippet>
                DcsBios::AnalogMultiPos {methodName}({`"${controlIdentifier}"`}, <Variable>PIN</Variable>,{' '}
                <Variable>STEPS</Variable>, <Variable>(RESOLUTION/STEPS)</Variable>);
            </Snippet>
        );
    }
}
