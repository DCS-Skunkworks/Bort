import { Grid, Typography } from '@mui/material';
import { Component, ReactNode } from 'react';

import OutputItem from '../../@types/Output';
import { OutputType } from '../../@types/OutputType';
import IntegerSnippetBlock from '../Snippet/OutputSnippet/IntegerSnippetBlock/IntegerSnippetBlock';
import StringSnippetBlock from '../Snippet/OutputSnippet/StringSnippetBlock/StringSnippetBlock';
import IntegerOutput from './Integer/IntegerOutput';
import StringOutput from './String/StringOutput';

export interface OutputProps {
    identifier: string;
    output: OutputItem;
    showLiveData: boolean;
    showArduinoData: boolean;
    useAddressConstants: boolean;
}

export default class Output extends Component<OutputProps> {
    public constructor(props: OutputProps) {
        super(props);
        this.controlForInterface = this.controlForInterface.bind(this);
        this.snippetForInterface = this.snippetForInterface.bind(this);
    }

    private controlForInterface(): ReactNode {
        const { output } = this.props;

        switch (output.type) {
            case OutputType.INTEGER:
                return (
                    <IntegerOutput
                        address={output.address}
                        mask={output.mask!}
                        maxValue={output.max_value!}
                        shiftBy={output.shift_by!}
                    />
                );
            case OutputType.STRING:
                return <StringOutput address={output.address} maxLength={output.max_length!} />;
        }
        console.error('no matching output!');
    }

    private snippetForInterface(): ReactNode {
        const { identifier, output, useAddressConstants } = this.props;
        switch (output.type) {
            case OutputType.INTEGER:
                return (
                    <IntegerSnippetBlock
                        controlIdentifier={identifier}
                        output={output}
                        useAddressConstants={useAddressConstants}
                    />
                );
            case OutputType.STRING:
                return (
                    <StringSnippetBlock
                        controlIdentifier={identifier}
                        output={output}
                        useAddressConstants={useAddressConstants}
                    />
                );
        }

        console.error('no snippet!');

        return <></>;
    }

    public render(): ReactNode {
        const { output, showLiveData, showArduinoData } = this.props;
        return (
            <Grid
                container
                item
                columnSpacing={2}
                rowSpacing={1}
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
                        Type:
                    </Typography>
                </Grid>
                <Grid item xs={10} lg={2}>
                    <Typography>{output.type}</Typography>
                </Grid>
                {showLiveData ? (
                    <>
                        <Grid item xs={2} className={'right-align'}>
                            <Typography
                                variant={'body1'}
                                component={'h6'}
                                sx={{
                                    fontWeight: theme => theme.typography.fontWeightBold,
                                }}
                            >
                                Current Value:
                            </Typography>
                        </Grid>
                        <Grid container item xs={10} lg={6}>
                            {this.controlForInterface()}
                        </Grid>
                    </>
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
