import { Component, ReactNode } from 'react';
import { Theme } from '@mui/material/styles';
import { Grid } from '@mui/material';
import { SxProps } from '@mui/system';

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
