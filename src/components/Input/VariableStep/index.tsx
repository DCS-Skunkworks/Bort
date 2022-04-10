import { Component, ReactNode } from 'react';
import ActionButton from '../Action';
import { Grid } from '@mui/material';
import ControlSlider from '../Slider';

export interface VariableStepProps {
    defaultStep: number;
    max: number;
    onTrigger: (argument: string) => {};
}

export default class VariableStep extends Component<VariableStepProps, any> {
    public constructor(props: VariableStepProps) {
        super(props);
        this.state = {
            currentStep: this.props.defaultStep,
        };

        this.onSliderChange = this.onSliderChange.bind(this);
    }

    private onSliderChange(event: Event, value: number | number[], activeThumb: number) {
        this.setState({
            currentStep: value,
        });
    }

    public render(): ReactNode {
        const { defaultStep, max, onTrigger } = this.props;
        const { currentStep } = this.state;
        const extraMarks = [{ value: defaultStep, label: '' }];
        return (
            <Grid container item spacing={2}>
                <Grid item xs={12} md={8}>
                    <ControlSlider
                        min={1}
                        max={max}
                        value={currentStep}
                        extraMarks={extraMarks}
                        onChange={this.onSliderChange}
                    />
                </Grid>
                <Grid item xs={6} md={2}>
                    <ActionButton text={`-${currentStep}`} argument={`-${currentStep}`} onClick={onTrigger} />
                </Grid>
                <Grid item xs={6} md={2}>
                    <ActionButton text={`+${currentStep}`} argument={`+${currentStep}`} onClick={onTrigger} />
                </Grid>
            </Grid>
        );
    }
}
