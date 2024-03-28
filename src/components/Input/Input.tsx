import { Grid, Typography } from '@mui/material';
import { Component, ReactNode } from 'react';

import InputItem from '../../@types/Input';
import { InputInterface } from '../../@types/InputInterface';
import ActionSnippetBlock from '../Snippet/InputSnippet/ActionSnippetBlock/ActionSnippetBlock';
import SetStateSnippetBlock from '../Snippet/InputSnippet/SetStateSnippetBlock/SetStateSnippetBlock';
import SetStringSnippetBlock from '../Snippet/InputSnippet/SetStringSnippetBlock/SetStringSnippetBlock';
import FixedStepSnippetBlock from '../Snippet/InputSnippet/StepSnippetBlock/FixedStepSnippetBlock/FixedStepSnippetBlock';
import VariableStepSnippetBlock from '../Snippet/InputSnippet/StepSnippetBlock/VariableStepSnippetBlock/VariableStepSnippetBlock';
import StringSnippetBlock from '../Snippet/OutputSnippet/StringSnippetBlock/StringSnippetBlock';
import ActionButton from './Action/ActionButton';
import FixedStep from './FixedStep/FixedStep';
import SetState from './SetState/SetState';
import SetString from './String/SetString';
import VariableStep from './VariableStep/VariableStep';

export interface InputProps {
    identifier: string;
    showLiveData: boolean;
    showArduinoData: boolean;
    input: InputItem;
}

export default class Input extends Component<InputProps> {
    public constructor(props: InputProps) {
        super(props);
        this.trigger = this.trigger.bind(this);
        this.controlForInterface = this.controlForInterface.bind(this);
        this.snippetForInterface = this.snippetForInterface.bind(this);
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
                return <FixedStep onClick={this.trigger} />;
            case InputInterface.VARIABLE_STEP:
                return (
                    <VariableStep defaultStep={input.suggested_step!} max={input.max_value!} onTrigger={this.trigger} />
                );
            case InputInterface.SET_STATE:
                return <SetState max={input.max_value!} onTrigger={this.trigger} />;
            case InputInterface.SET_STRING:
                return <SetString onClick={this.trigger} />;
        }
        console.error('no control!');

        return <></>;
    }

    private snippetForInterface(): ReactNode {
        const { identifier, input } = this.props;
        switch (input.interface) {
            case InputInterface.ACTION:
                return <ActionSnippetBlock controlIdentifier={identifier} input={input} />;
            case InputInterface.FIXED_STEP:
                return <FixedStepSnippetBlock controlIdentifier={identifier} input={input} />;
            case InputInterface.VARIABLE_STEP:
                return <VariableStepSnippetBlock controlIdentifier={identifier} input={input} />;
            case InputInterface.SET_STATE:
                return <SetStateSnippetBlock controlIdentifier={identifier} input={input} />;
            case InputInterface.SET_STRING:
                return <SetStringSnippetBlock controlIdentifier={identifier} input={input} />;
        }

        console.error('no snippet!');

        return <></>;
    }

    public render(): ReactNode {
        const { input, showLiveData, showArduinoData } = this.props;
        return (
            <Grid
                container
                item
                spacing={2}
                sx={{ marginTop: '.1rem', marginBottom: '1rem', alignItems: 'center' }}
                className={'input'}
            >
                <Grid
                    item
                    xs={2}
                    sx={{
                        fontWeight: theme => theme.typography.fontWeightBold,
                    }}
                    className={'right-align'}
                >
                    <Typography variant={'h6'} component={'h5'}>
                        Interface:
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant={'body1'}>{input.interface}</Typography>
                </Grid>
                {showLiveData ? (
                    <Grid container item xs={12} md={8}>
                        {this.controlForInterface()}
                    </Grid>
                ) : (
                    <></>
                )}
                {showArduinoData ? (
                    <Grid container item xs={12}>
                        {this.snippetForInterface()}
                    </Grid>
                ) : (
                    <></>
                )}
            </Grid>
        );
    }
}
