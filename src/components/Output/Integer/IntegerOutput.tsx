import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Grid, Typography } from '@mui/material';
import { Component, ReactNode } from 'react';

import IntegerParser from './IntegerParser';

export interface IntegerOutputProps {
    address: number;
    mask: number;
    shiftBy: number;
    maxValue: number;
}

export interface IntegerOutputState {
    currentValue: number;
}

export default class IntegerOutput extends Component<IntegerOutputProps, IntegerOutputState> {
    private readonly parser: IntegerParser;

    public constructor(props: IntegerOutputProps) {
        super(props);
        this.updateValue = this.updateValue.bind(this);
        this.parser = new IntegerParser(this.props.address, this.props.mask, this.props.shiftBy, this.updateValue);

        this.state = {
            currentValue: 0,
        };
    }

    public componentDidMount() {
        this.parser.start();
    }

    public componentWillUnmount() {
        this.parser.stop();
    }

    private updateValue(data: number) {
        const { mask, shiftBy } = this.props;
        const currentValue = (data & mask) >> shiftBy;

        this.setState({
            currentValue: currentValue,
        });
    }

    public render(): ReactNode {
        const { maxValue } = this.props;
        const { currentValue } = this.state;
        const percentage = (currentValue / maxValue) * 100;
        const rotation = (currentValue / (maxValue + 1)) * 360;

        return (
            <Grid container item xs={12} className="output">
                <Grid item xs={4}>
                    <ArrowUpwardIcon sx={{ transform: `rotate(${rotation}deg)` }} />
                </Grid>
                <Grid item xs={4}>
                    <Typography>{currentValue}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography>{`${percentage.toFixed()}%`}</Typography>
                </Grid>
            </Grid>
        );
    }
}
