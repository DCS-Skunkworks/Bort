import { TextField } from '@mui/material';
import React, { Component, ReactNode } from 'react';

export interface TextBoxProps {
    onChange: (argument: string) => void;
}

export default class TextBox extends Component<TextBoxProps> {
    public constructor(props: TextBoxProps) {
        super(props);
    }

    public render(): ReactNode {
        const { onChange } = this.props;
        return (
            <TextField
                type={'text'}
                size={'small'}
                variant={'outlined'}
                label={'Value'}
                fullWidth
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    onChange(event.target.value);
                }}
            />
        );
    }
}
