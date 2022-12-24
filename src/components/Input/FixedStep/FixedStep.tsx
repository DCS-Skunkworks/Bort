import { Grid } from '@mui/material';
import { Component, ReactNode } from 'react';

import ActionButton from '../Action/ActionButton';

export interface FixedStepProps {
    onClick: (argument: string) => void;
}

export default class FixedStep extends Component<FixedStepProps> {
    public constructor(props: FixedStepProps) {
        super(props);
    }

    public render(): ReactNode {
        const { onClick } = this.props;
        return (
            <Grid container item spacing={2}>
                <Grid item xs={6}>
                    <ActionButton text={'DEC'} argument={'DEC'} onClick={onClick} />
                </Grid>
                <Grid item xs={6}>
                    <ActionButton text={'INC'} argument={'INC'} onClick={onClick} />
                </Grid>
            </Grid>
        );
    }
}
