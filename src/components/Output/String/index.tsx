import { Component, ReactNode } from 'react';
import { Grid, Typography } from '@mui/material';
import { IpcRendererEvent } from 'electron';

export interface StringOutputProps {
    address: number;
    maxLength: number;
}

export interface StringOutputState {
    currentValue: string;
    stringBuffer: ArrayBuffer;
    stringBuffer_uint8: Uint8Array;
}

export default class StringOutput extends Component<StringOutputProps, StringOutputState> {
    public constructor(props: StringOutputProps) {
        super(props);
        const stringBuffer = new ArrayBuffer(props.maxLength);
        this.state = {
            currentValue: '',
            stringBuffer: stringBuffer,
            stringBuffer_uint8: new Uint8Array(stringBuffer),
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
        if (address >= this.props.address && this.props.address + this.props.maxLength > address) {
            this.updateValue(address, data);
        }
    }

    private updateValue(calledAddress: number, data: Uint16Array) {
        const { address, maxLength } = this.props;
        const { stringBuffer, stringBuffer_uint8 } = this.state;
        const data_uint8 = new Uint8Array(data.buffer);
        stringBuffer_uint8[calledAddress - address] = data_uint8[0];
        if (address + maxLength > calledAddress + 1) {
            stringBuffer_uint8[calledAddress - address + 1] = data_uint8[1];
        }

        let str = '';
        for (let i = 0; i < stringBuffer.byteLength; i++) {
            if (stringBuffer_uint8[i] == 0) break;
            str = str + String.fromCharCode(stringBuffer_uint8[i]);
        }

        this.setState({
            currentValue: str,
        });
    }

    public render(): ReactNode {
        const { currentValue } = this.state;

        return (
            <Grid container item xs={12} className="output">
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
