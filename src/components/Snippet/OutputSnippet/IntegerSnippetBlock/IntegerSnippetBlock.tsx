import { Component, ReactNode } from 'react';

import OutputSnippetBlock from '../OutputSnippetBlock';
import IntegerBufferSnippet from './IntegerBufferSnippet/IntegerBufferSnippet';
import { IntegerSnippetProps } from './IntegerSnippetProps';
import LedSnippet from './LedSnippet/LedSnippet';
import ServoSnippet from './ServoSnippet/ServoSnippet';

export default class IntegerSnippetBlock extends Component<IntegerSnippetProps> {
    constructor(props: IntegerSnippetProps) {
        super(props);

        this.snippetsForInput = this.snippetsForInput.bind(this);
    }

    private *snippetsForInput(): Iterable<ReactNode> {
        const { controlIdentifier, output, useAddressConstants } = this.props;
        yield (
            <IntegerBufferSnippet
                controlIdentifier={controlIdentifier}
                output={output}
                useAddressConstants={useAddressConstants}
                key={'integer-buffer-snippet'}
            />
        );

        if (output.max_value == 1) {
            yield (
                <LedSnippet
                    controlIdentifier={controlIdentifier}
                    output={output}
                    useAddressConstants={useAddressConstants}
                    key={'led-snippet'}
                />
            );
        } else if (output.max_value == 65535) {
            yield (
                <ServoSnippet
                    controlIdentifier={controlIdentifier}
                    output={output}
                    useAddressConstants={useAddressConstants}
                    key={'servo-snippet'}
                />
            );
        }
    }

    public render(): ReactNode {
        const { output } = this.props;

        return <OutputSnippetBlock output={output}>{[...this.snippetsForInput()]}</OutputSnippetBlock>;
    }
}
