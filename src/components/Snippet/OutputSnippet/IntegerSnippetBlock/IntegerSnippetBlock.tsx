import { Component, ReactNode } from 'react';

import Output from '../../../../@types/Output';
import OutputSnippetBlock from '../OutputSnippetBlock';
import IntegerBufferSnippet from './IntegerBufferSnippet/IntegerBufferSnippet';
import LedSnippet from './LedSnippet/LedSnippet';
import ServoSnippet from './ServoSnippet/ServoSnippet';

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
        yield (
            <IntegerBufferSnippet
                controlIdentifier={controlIdentifier}
                output={output}
                key={'integer-buffer-snippet'}
            />
        );

        if (output.max_value == 1) {
            yield <LedSnippet controlIdentifier={controlIdentifier} output={output} key={'led-snippet'} />;
        } else if (output.max_value == 65535) {
            yield <ServoSnippet controlIdentifier={controlIdentifier} output={output} key={'servo-snippet'} />;
        }
    }

    public render(): ReactNode {
        const { output } = this.props;

        return <OutputSnippetBlock output={output}>{[...this.snippetsForInput()]}</OutputSnippetBlock>;
    }
}
