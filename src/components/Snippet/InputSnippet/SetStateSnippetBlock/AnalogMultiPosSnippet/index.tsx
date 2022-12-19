import { Component, ReactNode } from 'react';

import Snippet from '../../../index';
import Variable from '../../../Variable';

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
