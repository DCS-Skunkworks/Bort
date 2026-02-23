import { Chip, Divider, Grid, Stack, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import { Component, ReactNode } from 'react';

export interface PositionsContainerProps {
    value?: number;
    positions: string[];
    allowInput: boolean;
    identifier: string;
}

const positionsTheme: SxProps<Theme> = {
    borderWidth: '.1rem',
    borderStyle: 'solid',
    borderColor: theme => theme.palette.primary.dark,
    bgcolor: theme => theme.palette.primary.light,
    borderRadius: '.25rem',
    padding: '1rem',
    marginTop: '1rem',
};

export default class PositionsContainer extends Component<PositionsContainerProps> {
    public constructor(props: PositionsContainerProps) {
        super(props);
        this.trigger = this.trigger.bind(this);
    }

    private async trigger(value: number) {
        await window.Main.sendToBios(`${this.props.identifier} ${value}\n`);
    }

    public render(): ReactNode {
        const { value, positions, allowInput } = this.props;
        return (
            <Grid item xs={12}>
                <Stack sx={positionsTheme} className="control">
                    <Grid item xs={12}>
                        <Typography variant={'h5'} component={'h4'}>
                            {'Positions'}
                        </Typography>
                    </Grid>
                    <Stack direction={'row'} divider={<Divider />} spacing={0.5} sx={{ marginTop: '0.5rem' }}>
                        {positions.map((p, i) => (
                            <Chip
                                label={p}
                                key={i}
                                variant={value === i ? 'filled' : 'outlined'}
                                clickable={allowInput}
                                onClick={() => this.trigger(i)}
                            />
                        ))}
                    </Stack>
                </Stack>
            </Grid>
        );
    }
}
