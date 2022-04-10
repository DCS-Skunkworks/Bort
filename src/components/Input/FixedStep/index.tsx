import { Component, ReactNode } from 'react';
import ActionButton from '../Action';
import { Grid } from '@mui/material';

export interface FixedStateProps {
    onClick: (argument: string) => {};
}

export default class FixedState extends Component<FixedStateProps, any> {
    public constructor(props: FixedStateProps) {
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
