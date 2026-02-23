import { Chip, Grid, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import { Component, ReactNode } from 'react';

import DeprecatedAttributeDocumentation from '../../@types/DeprecatedAttributeDocumentation';

export interface ControlProps {
    moduleName: string;
    description: string;
    identifier: string;
    deprecated?: DeprecatedAttributeDocumentation;
}

const controlHeaderTheme: SxProps<Theme> = {
    borderWidth: '.1rem',
    borderStyle: 'solid',
    borderColor: theme => theme.palette.secondary.dark,
    bgcolor: theme => theme.palette.secondary.light,
    borderRadius: '.25rem',
    padding: '1rem',
    marginTop: '1rem',
    alignItems: 'center',
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
        const { moduleName, description, identifier, deprecated } = this.props;
        return (
            <Grid container item xs={12} sx={controlHeaderTheme} className="control-header">
                <Grid item xs={12} sm={'auto'} sx={controlNameTheme} className="control-description">
                    <Typography
                        variant={'h4'}
                        component={'h3'}
                        sx={{ opacity: deprecated !== undefined ? '50%' : '100%' }}
                    >
                        {description}
                    </Typography>
                </Grid>
                <Grid item xs />
                <Grid
                    item
                    xs={12}
                    sm={'auto'}
                    className="control-identifier"
                    sx={{ opacity: deprecated !== undefined ? '50%' : '100%' }}
                    // onClick={this.selectContents}
                >
                    <Typography
                        variant={'body1'}
                        component={'div'}
                        sx={{
                            fontFamily: 'Monospace',
                            textDecoration: deprecated !== undefined ? 'line-through' : 'initial',
                        }}
                    >
                        <pre>
                            {moduleName}/{identifier}
                        </pre>
                    </Typography>
                </Grid>
                {deprecated !== undefined && (
                    <Grid container item xs={12} spacing={2} justifyContent={'space-between'}>
                        <Grid item xs={12} sm={'auto'}>
                            <Chip label={'Deprecated'} color={'error'} variant={'outlined'} />
                        </Grid>
                        {deprecated.use_instead !== undefined && (
                            <Grid container item xs={12} sm={'auto'} direction={'row'} spacing={1}>
                                <Grid item>
                                    <Typography variant={'body1'} component={'div'}>
                                        Replaced by:
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography
                                        variant={'body1'}
                                        component={'div'}
                                        sx={{
                                            fontFamily: 'Monospace',
                                        }}
                                    >
                                        {moduleName}/{deprecated.use_instead}
                                    </Typography>
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                )}
            </Grid>
        );
    }
}
