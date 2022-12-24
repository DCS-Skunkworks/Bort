import { Grid } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import { Component, ReactNode } from 'react';

export interface SnippetContainerProps {
    children?: ReactNode;
}

const snippetContainerStyle: SxProps<Theme> = {};

export default class SnippetContainer extends Component<SnippetContainerProps> {
    public render(): ReactNode {
        return (
            <Grid sx={snippetContainerStyle} xs={12}>
                {this.props.children}
            </Grid>
        );
    }
}
