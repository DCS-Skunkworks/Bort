import { Component, ReactNode } from 'react';
import InputItem from '../../@types/Input';
import { InputInterface } from '../../@types/InputInterface';
import ActionButton from './Action';
import SetState from './SetState';
import VariableStep from './VariableStep';
import FixedState from './FixedStep';
import { Divider, Grid, Typography } from '@mui/material';

export interface InputProps {
    identifier: string;
    input: InputItem;
}

export default class Input extends Component<InputProps, any> {
    public constructor(props: InputProps) {
        super(props);
        this.trigger = this.trigger.bind(this);
        this.controlForInterface = this.controlForInterface.bind(this);
    }

    private async trigger(argument: string) {
        await window.Main.sendToBios(`${this.props.identifier} ${argument}\n`);
    }

    private controlForInterface(): ReactNode {
        const { input } = this.props;

        switch (input.interface) {
            case InputInterface.ACTION:
                return <ActionButton text={input.argument!} argument={input.argument!} onClick={this.trigger} />;
            case InputInterface.FIXED_STEP:
                return <FixedState onClick={this.trigger} />;
            case InputInterface.VARIABLE_STEP:
                return (
                    <VariableStep defaultStep={input.suggested_step!} max={input.max_value!} onTrigger={this.trigger} />
                );
            case InputInterface.SET_STATE:
                return <SetState max={input.max_value!} onTrigger={this.trigger} />;
        }
        console.log('no control!');
    }

    public render(): ReactNode {
        const { input } = this.props;
        return (
            <Grid container item xs={12} className="input">
                <Divider />
                <Grid
                    item
                    xs={3}
                    md={2}
                    sx={{
                        fontWeight: theme => theme.typography.fontWeightBold,
                    }}
                >
                    <Typography variant={'h6'} component={'h5'}>
                        Interface:
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant={'body1'}>{input.interface}</Typography>
                </Grid>
                <Grid container item xs={12} md={8}>
                    {this.controlForInterface()}
                </Grid>
            </Grid>
        );
    }
}
