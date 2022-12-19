import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Grid, Typography } from '@mui/material';
import { IpcRendererEvent } from 'electron';
import { Component, ReactNode } from 'react';

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

        this.onReceive = this.onReceive.bind(this);
        this.updateValue = this.updateValue.bind(this);
    }

    public componentDidMount() {
        window.Main.onBiosReceive(this.onReceive);
    }

    // public componentWillUnmount() {
    //     window.Main.stopBiosListening(this.onReceive);
    // }

    private onReceive(event: IpcRendererEvent, address: number, data: Uint16Array) {
        if (address === this.props.address) {
            this.updateValue(data[0]);
        }
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
