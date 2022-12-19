import { Grid } from '@mui/material';
import { Component, ReactNode } from 'react';

import ActionButton from '../Action';
import InputState from '../InputState';
import ControlSlider from '../Slider';

export interface SetStateProps {
    max: number;
    onTrigger: (argument: string) => void;
}

export default class Input extends Component<SetStateProps, InputState> {
    public constructor(props: SetStateProps) {
        super(props);
        this.state = {
            currentValue: 0,
        };

        this.onSliderChange = this.onSliderChange.bind(this);
    }

    private onSliderChange(event: Event, value: number | number[]) {
        let numberValue: number;
        if (typeof value === 'number') {
            numberValue = value;
        } else {
            numberValue = value[0];
        }

        this.setState({
            currentValue: numberValue,
        });
    }

    public render(): ReactNode {
        const { max, onTrigger } = this.props;
        const { currentValue } = this.state;
        return (
            <Grid container item spacing={2}>
                <Grid item xs={12} md={8}>
                    <ControlSlider min={0} max={max} value={currentValue} onChange={this.onSliderChange} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <ActionButton
                        text={currentValue.toString()}
                        argument={currentValue.toString()}
                        onClick={onTrigger}
                    />
                </Grid>
            </Grid>
        );
    }
}
