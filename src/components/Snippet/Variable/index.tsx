import { Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import { Component, ReactNode } from 'react';

interface VariableProps {
    children: ReactNode;
}

const variableStyle: SxProps<Theme> = {
    color: theme => theme.palette.error.light,
    fontFamily: 'Monospace',
};

export default class Variable extends Component<VariableProps> {
    public render(): ReactNode {
        return (
            <i>
                <Typography variant={'body1'} component={'span'} sx={variableStyle}>
                    {this.props.children}
                </Typography>
            </i>
        );
    }
}
