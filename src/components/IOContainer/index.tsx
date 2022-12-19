import { Divider, Grid, Stack, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import { Component, ReactNode } from 'react';

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

export default class Control extends Component<IOContainerProps> {
    public constructor(props: IOContainerProps) {
        super(props);
    }

    public render(): ReactNode {
        const { children, text } = this.props;
        return (
            <Grid item xs={12}>
                <Stack sx={ioTheme} className="control">
                    <Grid item xs={12}>
                        <Typography variant={'h5'} component={'h4'}>
                            {text}
                        </Typography>
                    </Grid>
                    <Stack divider={<Divider />} className="ios">
                        {children}
                    </Stack>
                </Stack>
            </Grid>
        );
    }
}
