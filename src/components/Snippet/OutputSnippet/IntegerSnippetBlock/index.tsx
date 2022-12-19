import { Component, ReactNode } from 'react';

import Output from '../../../../@types/Output';
import OutputSnippetBlock from '../index';
import IntegerBufferSnippet from './IntegerBufferSnippet';
import LedSnippet from './LedSnippet';
import ServoSnippet from './ServoSnippet';

export interface IntegerSnippetBlockProps {
    controlIdentifier: string;
    output: Output;
}

export default class IntegerSnippetBlock extends Component<IntegerSnippetBlockProps> {
    constructor(props: IntegerSnippetBlockProps) {
        super(props);

        this.snippetsForInput = this.snippetsForInput.bind(this);
    }

    private *snippetsForInput(): Iterable<ReactNode> {
        const { controlIdentifier, output } = this.props;
        yield <IntegerBufferSnippet controlIdentifier={controlIdentifier} output={output} />;

        if (output.max_value == 1) {
            yield <LedSnippet controlIdentifier={controlIdentifier} output={output} />;
        } else if (output.max_value == 65535) {
            yield <ServoSnippet controlIdentifier={controlIdentifier} output={output} />;
        }
    }

    public render(): ReactNode {
        const { output } = this.props;

        return <OutputSnippetBlock output={output}>{[...this.snippetsForInput()]}</OutputSnippetBlock>;
    }
}
