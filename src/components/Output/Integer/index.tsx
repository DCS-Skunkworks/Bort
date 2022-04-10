import { Component, ReactNode } from 'react';
import { Grid } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

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
    public constructor(props: IntegerOutputProps) {
        super(props);

        this.state = {
            currentValue: 0,
        };
    }

    // TODO: can these events be deregistered when not active? addresses are shared so seems difficult.
    //  removals need a function and do discriminate based on callback, so if we can ensure the callback
    //  used for removal is the same it would work.
    public componentDidMount() {
        window.Main.onBiosReceive((address: number, data: Uint16Array) => {
            if (address === this.props.address) {
                this.updateValue(data[0]);
            }
        });
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
                    {currentValue}
                </Grid>
                <Grid item xs={4}>
                    {`${percentage.toFixed()}%`}
                </Grid>
            </Grid>
        );
    }
}
