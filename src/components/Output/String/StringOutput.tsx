import { Grid, Typography } from '@mui/material';
import { Component, ReactNode } from 'react';

import StringParser from './StringParser';

export interface StringOutputProps {
    address: number;
    maxLength: number;
}

export interface StringOutputState {
    currentValue: string;
}

export default class StringOutput extends Component<StringOutputProps, StringOutputState> {
    private readonly parser: StringParser;

    public constructor(props: StringOutputProps) {
        super(props);
        this.updateValue = this.updateValue.bind(this);
        this.parser = new StringParser(this.props.address, this.props.maxLength, this.updateValue);

        this.state = {
            currentValue: '',
        };
    }

    public componentDidMount() {
        this.parser.start();
    }

    public componentWillUnmount() {
        this.parser.stop();
    }

    private updateValue(newValue: string) {
        if (this.state.currentValue == newValue) return;
        this.setState({
            currentValue: newValue,
        });
    }

    public render(): ReactNode {
        const { currentValue } = this.state;

        return (
            <Grid container item xs={12} sx={{ alignItems: 'center' }} className="output">
                <Grid item xs={11} sx={{ overflowX: 'auto' }}>
                    <Typography
                        variant={'body1'}
                        component={'div'}
                        sx={{
                            fontFamily: 'Monospace',
                        }}
                    >
                        <pre>"{currentValue}"</pre>
                    </Typography>
                </Grid>
                <Grid item xs={1}>
                    <Typography>{currentValue.length}</Typography>
                </Grid>
            </Grid>
        );
    }
}
