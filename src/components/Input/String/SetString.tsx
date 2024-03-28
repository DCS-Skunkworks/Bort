import { Grid } from '@mui/material';
import { Component, ReactNode } from 'react';

import ActionButton from '../Action/ActionButton';
import TextBox from '../TextBox/TextBox';

export interface SetStringProps {
    onClick: (argument: string) => void;
}

interface SetStringState {
    currentValue: string;
}

export default class SetString extends Component<SetStringProps, SetStringState> {
    public constructor(props: SetStringProps) {
        super(props);

        this.state = {
            currentValue: '',
        };

        this.onTextChange = this.onTextChange.bind(this);
    }

    private onTextChange(value: string) {
        this.setState({
            currentValue: value,
        });
    }

    public render(): ReactNode {
        const { onClick } = this.props;
        const { currentValue } = this.state;
        return (
            <Grid container item sx={{ alignItems: 'center' }} spacing={2}>
                <Grid item xs={9}>
                    <TextBox onChange={this.onTextChange} />
                </Grid>
                <Grid item xs={3}>
                    <ActionButton text={'SEND'} argument={currentValue} onClick={onClick} />
                </Grid>
            </Grid>
        );
    }
}
