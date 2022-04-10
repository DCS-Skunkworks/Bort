import { Component, ReactNode } from 'react';
import { Grid } from '@mui/material';

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
    }

    public componentDidMount() {
        window.Main.onBiosReceive((address: number, data: Uint16Array) => {
            if (address >= this.props.address && this.props.address + this.props.maxLength > address) {
                this.updateValue(address, data);
            }
        });
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
                <Grid
                    item
                    xs={11}
                    sx={{
                        fontFamily: 'Monospace',
                    }}
                >
                    "{currentValue}"
                </Grid>
                <Grid item xs={1}>
                    {currentValue.length}
                </Grid>
            </Grid>
        );
    }
}
