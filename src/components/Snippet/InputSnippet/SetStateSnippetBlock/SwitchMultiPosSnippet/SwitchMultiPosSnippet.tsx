import { Component, ReactNode } from 'react';

import Snippet from '../../../Snippet';
import Variable from '../../../Variable/Variable';

export interface SwitchMultiPosSnippetProps {
    controlIdentifier: string;
    maxValue: number;
}

export default class SwitchMultiPosSnippet extends Component<SwitchMultiPosSnippetProps> {
    public render(): ReactNode {
        const { controlIdentifier, maxValue } = this.props;
        const methodName = Snippet.snakeToCamelCase(`${controlIdentifier}`);
        const pinArrayName = `${methodName}Pins`;
        const pinArraySize = maxValue + 1;
        const pinArray = [...Array(pinArraySize).keys()].map(i => [
            i > 0 && ', ',
            <Variable key={i}>PIN_{i}</Variable>,
        ]);

        return (
            <Snippet>
                const byte {pinArrayName}[{pinArraySize}] = &#123;{pinArray}&#125;;
                <br />
                DcsBios::SwitchMultiPos {methodName}({`"${controlIdentifier}"`}, {pinArrayName}, {pinArraySize});
            </Snippet>
        );
    }
}
