import CopyAll from '@mui/icons-material/CopyAll';
import { Grid, IconButton } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import { Component, ReactNode } from 'react';
import * as ReactDOM from 'react-dom';

const snippetTheme: SxProps<Theme> = {
    borderWidth: '.1rem',
    borderStyle: 'solid',
    fontFamily: 'monospace',
    position: 'relative',
    borderColor: theme => theme.palette.primary.dark,
    bgcolor: theme => theme.palette.grey['900'] + '22',
    borderRadius: '.25rem',
    padding: '1rem',
    marginTop: '1rem',
    width: '100%',
    overflowX: 'auto',
};

const copyButtonStyle: SxProps<Theme> = {
    position: 'absolute',
    top: 0,
    right: 0,
    opacity: 0.4,
    ':hover': { opacity: 1 },
    '@keyframes confirm': {
        '0%': {
            color: 'default',
        },
        '30%': {
            color: theme => theme.palette.success.main,
        },
        '50%': {
            color: theme => theme.palette.success.main,
        },
        '100%': {
            color: 'default',
        },
    },
    ':focus': {
        animationName: 'confirm',
        animationDuration: '1s',
        animationDirection: 'alternate',
    },
    ':active': {
        animation: 'none',
    },
};

interface SnippetProps {
    children: ReactNode;
}

export default class Snippet extends Component<SnippetProps> {
    constructor(props: SnippetProps) {
        super(props);

        this.onCopyClick = this.onCopyClick.bind(this);
    }
    public static snakeToCamelCase(input: string): string {
        const parts = input.split('_');
        return parts
            .slice(1)
            .reduce(
                (previous, word) => `${previous}${word.charAt(0).toUpperCase()}${word.substring(1).toLowerCase()}`,
                parts[0].toLowerCase(),
            );
    }

    public static toHex(input?: number): string {
        if (input === undefined) return '0x0000';
        const base = input.toString(16);
        const remaining = (4 - base.length) % 4;
        return `0x${[...Array(remaining).keys()].map(() => '0').join('')}${base}`;
    }

    private async onCopyClick(): Promise<void> {
        const domNode = ReactDOM.findDOMNode(this);
        const text = domNode?.textContent;

        if (text !== null && text !== undefined) {
            await navigator.clipboard.writeText(text);
        }
    }

    public render(): ReactNode {
        return (
            <Grid item sx={snippetTheme} xs={12}>
                <IconButton sx={copyButtonStyle} aria-label="copy" size="small" onClick={this.onCopyClick}>
                    <CopyAll />
                </IconButton>
                {this.props.children}
            </Grid>
        );
    }
}
