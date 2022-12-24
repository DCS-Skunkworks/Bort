import { Component, ReactNode } from 'react';

import Output from '../../../@types/Output';
import Snippet from '../Snippet';
import SnippetContainer from '../SnippetContainer/SnippetContainer';
import SnippetContainerHeaderItem from '../SnippetContainer/SnippetContainerHeader/SnippetContainerHeaderItem/SnippetContainerHeaderItem';

export interface OutputSnippetBlockProps {
    output: Output;
    children: ReactNode;
}

export default class OutputSnippetBlock extends Component<OutputSnippetBlockProps> {
    constructor(props: OutputSnippetBlockProps) {
        super(props);

        this.headerText = this.headerText.bind(this);
    }

    private *headerText(): Iterable<ReactNode> {
        const { output } = this.props;
        yield (
            <SnippetContainerHeaderItem title={'Address'} monospace>
                {Snippet.toHex(output.address)}
            </SnippetContainerHeaderItem>
        );
        if (output.mask !== undefined) {
            yield (
                <SnippetContainerHeaderItem title={'Mask'} monospace>
                    {Snippet.toHex(output.mask)}
                </SnippetContainerHeaderItem>
            );
        }
        if (output.shift_by !== undefined) {
            yield <SnippetContainerHeaderItem title={'Shift By'}>{output.shift_by}</SnippetContainerHeaderItem>;
        }
        if (output.max_value !== undefined) {
            yield <SnippetContainerHeaderItem title={'Max Value'}>{output.max_value}</SnippetContainerHeaderItem>;
        }
        if (output.max_length !== undefined) {
            yield <SnippetContainerHeaderItem title={'Max Length'}>{output.max_length}</SnippetContainerHeaderItem>;
        }
        if (output.description !== undefined) {
            yield <SnippetContainerHeaderItem title={'Description'}>{output.description}</SnippetContainerHeaderItem>;
        }
    }

    public render(): ReactNode {
        return (
            <SnippetContainer>
                {[...this.headerText()]}
                {this.props.children}
            </SnippetContainer>
        );
    }
}
