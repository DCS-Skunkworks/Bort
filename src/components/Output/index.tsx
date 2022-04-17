import { Component, ReactNode } from 'react';
import OutputItem from '../../@types/Output';
import { Grid, Typography } from '@mui/material';
import { OutputType } from '../../@types/OutputType';
import IntegerOutput from './Integer';
import StringOutput from './String';

export interface OutputProps {
    identifier: string;
    output: OutputItem;
}

export default class Output extends Component<OutputProps, any> {
    public constructor(props: OutputProps) {
        super(props);
        this.controlForInterface = this.controlForInterface.bind(this);
    }

    private controlForInterface(): ReactNode {
        const { output } = this.props;

        switch (output.type) {
            case OutputType.INTEGER:
                return (
                    <IntegerOutput
                        address={output.address}
                        mask={output.mask!}
                        maxValue={output.max_value!}
                        shiftBy={output.shift_by!}
                    />
                );
            case OutputType.STRING:
                return <StringOutput address={output.address} maxLength={output.max_length!} />;
        }
        console.log('no matching output!');
    }

    public render(): ReactNode {
        const { output } = this.props;
        return (
            <Grid container item xs={12} className="input">
                <Grid
                    item
                    xs={2}
                    sx={{
                        fontWeight: theme => theme.typography.fontWeightBold,
                    }}
                >
                    <Typography variant={'h6'} component={'h5'}>
                        Type:
                    </Typography>
                </Grid>
                <Grid item xs={10} lg={2}>
                    <Typography>{output.type}</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography
                        variant={'body1'}
                        component={'h6'}
                        sx={{
                            fontWeight: theme => theme.typography.fontWeightBold,
                        }}
                    >
                        Current Value:
                    </Typography>
                </Grid>
                <Grid container item xs={10} lg={6}>
                    {this.controlForInterface()}
                </Grid>
            </Grid>
        );
    }
}
