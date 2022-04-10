import { Divider, Grid, Stack, Typography } from '@mui/material';
import { Component, ReactNode } from 'react';
import ControlItem from '../../@types/Control';
import Input from '../Input';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';
import Output from '../Output';
import { blue, green, purple } from '@mui/material/colors';
import IOContainer from '../IOContainer';
import ControlHeader from '../ControlHeader';

export interface ControlProps {
    moduleName: string;
    control: ControlItem;
}

const controlTheme: SxProps<Theme> = {
    // borderTopWidth: '.1rem',
    // borderTopColor: theme => theme.palette.text.primary,
    // borderTopStyle: 'solid',
    // marginTop: '1rem',
};

const controlHeaderTheme: SxProps<Theme> = {
    borderWidth: '.1rem',
    borderStyle: 'solid',
    borderColor: green['800'],
    bgcolor: green['50'],
    borderRadius: '.25rem',
    padding: '1rem',
    marginTop: '1rem',
};

const controlNameTheme: SxProps<Theme> = {
    fontWeight: theme => theme.typography.fontWeightBold,
};

const controlIdTheme: SxProps<Theme> = {
    fontFamily: theme => 'Monospace',
};

const inputTheme: SxProps<Theme> = {
    borderWidth: '.1rem',
    borderStyle: 'solid',
    borderColor: blue['800'],
    bgcolor: blue['50'],
    borderRadius: '.25rem',
    padding: '1rem',
    marginTop: '1rem',
};
const outputTheme: SxProps<Theme> = {
    borderWidth: '.1rem',
    borderStyle: 'solid',
    borderColor: blue['800'],
    bgcolor: blue['50'],
    borderRadius: '.25rem',
    padding: '1rem',
    marginTop: '1rem',
};

export default class Control extends Component<ControlProps, any> {
    public constructor(props: ControlProps) {
        super(props);
        this.selectContents = this.selectContents.bind(this);
    }

    selectContents(el: any) {
        let range = document.createRange();
        range.selectNodeContents(el);
        let sel = window.getSelection()!;
        sel.removeAllRanges();
        sel.addRange(range);
    }

    public render(): ReactNode {
        const { moduleName, control } = this.props;
        const hasInputs = control.inputs.length > 0;
        const hasOutputs = control.outputs.length > 0;
        return (
            <Stack sx={controlTheme} className="control">
                <Divider />
                <ControlHeader
                    moduleName={moduleName}
                    description={control.description}
                    identifier={control.identifier}
                />
                <Grid container className="control-body">
                    {hasInputs && (
                        <IOContainer text={'Input'}>
                            {control.inputs.map((x, i) => (
                                <Input identifier={control.identifier} input={x} key={i} />
                            ))}
                        </IOContainer>
                    )}
                    {hasOutputs && (
                        <IOContainer text={'Output'}>
                            {control.outputs.map((x, i) => (
                                <Output identifier={control.identifier} output={x} key={i} />
                            ))}
                        </IOContainer>
                    )}
                </Grid>
            </Stack>
        );
    }
}
