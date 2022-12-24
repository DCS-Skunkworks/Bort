import { Grid, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import { Component, ReactNode } from 'react';

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

export default class ControlHeader extends Component<ControlProps> {
    public constructor(props: ControlProps) {
        super(props);
        this.selectContents = this.selectContents.bind(this);
    }

    selectContents(el: Node) {
        const range = document.createRange();
        range.selectNodeContents(el);
        const sel = window.getSelection()!;
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
