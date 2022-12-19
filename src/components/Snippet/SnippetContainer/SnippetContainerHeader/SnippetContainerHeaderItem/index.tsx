import { Component, ReactNode } from 'react';
import { Theme } from '@mui/material/styles';
import { Grid, Typography } from '@mui/material';
import { SxProps } from '@mui/system';

export interface SnippetContainerHeaderItemProps {
    title: string;
    monospace?: boolean;
    children?: ReactNode;
}

const snippetContainerHeaderItemStyle: SxProps<Theme> = {};

export default class SnippetContainerHeaderItem extends Component<SnippetContainerHeaderItemProps> {
    public render(): ReactNode {
        return (
            <Grid container item columnSpacing={2} sx={snippetContainerHeaderItemStyle} xs={12}>
                <Grid item xs={2} className={'right-align'}>
                    <Typography variant={'body1'} component={'span'} fontWeight={'bold'}>
                        {this.props.title}:
                    </Typography>
                </Grid>
                <Grid item xs={10}>
                    <Typography
                        variant={'body1'}
                        component={'span'}
                        fontFamily={this.props.monospace ? 'monospace' : 'default'}
                    >
                        {this.props.children}
                    </Typography>
                </Grid>
            </Grid>
        );
    }
}
