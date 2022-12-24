import { Grid } from '@mui/material';
import { Component, ReactNode } from 'react';

import ActionButton from '../Action/ActionButton';
import InputState from '../InputState';
import ControlSlider from '../Slider/ControlSlider';

export interface VariableStepProps {
    defaultStep: number;
    max: number;
    onTrigger: (argument: string) => void;
}

export default class VariableStep extends Component<VariableStepProps, InputState> {
    public constructor(props: VariableStepProps) {
        super(props);
        this.state = {
            currentValue: this.props.defaultStep,
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
        const { defaultStep, max, onTrigger } = this.props;
        const { currentValue } = this.state;
        const extraMarks = [{ value: defaultStep, label: '' }];
        return (
            <Grid container item spacing={2}>
                <Grid item xs={12} md={8}>
                    <ControlSlider
                        min={1}
                        max={max}
                        value={currentValue}
                        extraMarks={extraMarks}
                        onChange={this.onSliderChange}
                    />
                </Grid>
                <Grid item xs={6} md={2}>
                    <ActionButton text={`-${currentValue}`} argument={`-${currentValue}`} onClick={onTrigger} />
                </Grid>
                <Grid item xs={6} md={2}>
                    <ActionButton text={`+${currentValue}`} argument={`+${currentValue}`} onClick={onTrigger} />
                </Grid>
            </Grid>
        );
    }
}
