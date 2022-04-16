import { Divider, Grid, Stack, Typography } from '@mui/material';
import { Component, ReactNode } from 'react';
import ControlItem from '../../@types/Control';
import Input from '../Input';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';
import Output from '../Output';
import { blue, green, purple } from '@mui/material/colors';

export interface IOContainerProps {
    text: 'Input' | 'Output';
    children: ReactNode[];
}

const ioTheme: SxProps<Theme> = {
    borderWidth: '.1rem',
    borderStyle: 'solid',
    borderColor: theme => theme.palette.primary.dark,
    bgcolor: theme => theme.palette.primary.light,
    borderRadius: '.25rem',
    padding: '1rem',
    marginTop: '1rem',
};

export default class Control extends Component<IOContainerProps, any> {
    public constructor(props: IOContainerProps) {
        super(props);
    }

    public render(): ReactNode {
        const { children, text } = this.props;
        return (
            <Grid item xs={12}>
                <Stack sx={ioTheme} spacing={2} className="control">
                    <Grid item xs={12}>
                        <Typography variant={'h5'} component={'h4'}>
                            {text}
                        </Typography>
                    </Grid>
                    <Stack spacing={4} divider={<Divider />} className="ios">
                        {children}
                    </Stack>
                </Stack>
            </Grid>
        );
    }
}
