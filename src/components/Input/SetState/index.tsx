import { ChangeEvent, Component, ReactNode } from 'react';
import ControlSlider from '../Slider';
import ActionButton from '../Action';
import { Grid } from '@mui/material';

export interface SetStateProps {
    max: number;
    onTrigger: (argument: string) => {};
}

export default class Input extends Component<SetStateProps, any> {
    public constructor(props: SetStateProps) {
        super(props);
        this.state = {
            currentValue: 0,
        };

        this.onSliderChange = this.onSliderChange.bind(this);
    }

    private onSliderChange(event: Event, value: number | number[], activeThumb: number) {
        this.setState({
            currentValue: value,
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
                    <ActionButton text={currentValue} argument={currentValue} onClick={onTrigger} />
                </Grid>
            </Grid>
        );
    }
}
