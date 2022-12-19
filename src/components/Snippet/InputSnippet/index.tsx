import { Component, ReactNode } from 'react';
import SnippetContainer from '../SnippetContainer';
import Input from '../../../@types/Input';
import SnippetContainerHeaderItem from '../SnippetContainer/SnippetContainerHeader/SnippetContainerHeaderItem';

export interface InputSnippetBlockProps {
    message: string;
    input: Input;
    children: ReactNode;
}

export default class InputSnippetBlock extends Component<InputSnippetBlockProps> {
    constructor(props: InputSnippetBlockProps) {
        super(props);

        this.headerText = this.headerText.bind(this);
    }

    private *headerText(): Iterable<ReactNode> {
        const { message, input } = this.props;

        yield (
            <SnippetContainerHeaderItem title={'Message'} monospace>
                {message}
            </SnippetContainerHeaderItem>
        );
        if (input.max_value !== undefined) {
            yield <SnippetContainerHeaderItem title={'Value Range'}>0-{input.max_value}</SnippetContainerHeaderItem>;
        }
        if (input.suggested_step !== undefined) {
            yield (
                <SnippetContainerHeaderItem title={'Suggested Step'}>{input.suggested_step}</SnippetContainerHeaderItem>
            );
        }
        if (input.description !== undefined) {
            yield <SnippetContainerHeaderItem title={'Description'}>{input.description}</SnippetContainerHeaderItem>;
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
