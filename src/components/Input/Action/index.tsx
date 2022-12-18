import { Component, ReactNode } from 'react';
import { Button } from '@mui/material';

export interface ActionButtonProps {
    text: string;
    argument: string;
    onClick: (argument: string) => void;
}

export default class ActionButton extends Component<ActionButtonProps> {
    public constructor(props: ActionButtonProps) {
        super(props);
    }

    public render(): ReactNode {
        const { text, argument, onClick } = this.props;
        return (
            <Button variant={'outlined'} fullWidth onClick={() => onClick(argument)}>
                {text}
            </Button>
        );
    }
}
