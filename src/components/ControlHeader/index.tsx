import { Divider, Grid, Stack, Typography } from '@mui/material';
import { Component, ReactNode } from 'react';
import ControlItem from '../../@types/Control';
import Input from '../Input';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';
import Output from '../Output';
import { blue, green, purple } from '@mui/material/colors';
import IOContainer from '../IOContainer';

export interface ControlProps {
    moduleName: string;
    description: string;
    identifier: string;
}

const controlHeaderTheme: SxProps<Theme> = {
    borderWidth: '.1rem',
    borderStyle: 'solid',
    borderColor: theme => theme.palette.secondary.dark,
    bgcolor: theme => theme.palette.secondary.light,
    borderRadius: '.25rem',
    padding: '1rem',
    marginTop: '1rem',
};

const controlNameTheme: SxProps<Theme> = {
    fontWeight: theme => theme.typography.fontWeightBold,
};

export default class Control extends Component<ControlProps, any> {
    public constructor(props: ControlProps) {
        super(props);
        this.selectContents = this.selectContents.bind(this);
    }

    selectContents(el: any) {
        let range = document.createRange();
        range.selectNodeContents(el);
        let sel = window.getSelection()!;
        sel.removeAllRanges();
        sel.addRange(range);
    }

    public render(): ReactNode {
        const { moduleName, description, identifier } = this.props;
        return (
            <Grid container item xs={12} sx={controlHeaderTheme} className="control-header">
                <Grid item xs={12} sm={6} sx={controlNameTheme} className="control-description valign-wrapper">
                    <Typography variant={'h4'} component={'h3'}>
                        {description}
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={6}
                    className="control-identifier"
                    // onClick={this.selectContents}
                >
                    <Typography
                        variant={'body1'}
                        component={'div'}
                        sx={{
                            fontFamily: 'Monospace',
                        }}
                        className={'right-align'}
                    >
                        <pre>
                            {moduleName}/{identifier}
                        </pre>
                    </Typography>
                </Grid>
            </Grid>
        );
    }
}
