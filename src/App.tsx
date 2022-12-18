import ControlReference from './components/ControlReference';
import { Box, createTheme, PaletteMode, responsiveFontSizes, ThemeOptions, ThemeProvider } from '@mui/material';
import { blue, green } from '@mui/material/colors';
import React, { Component } from 'react';

const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
    palette: {
        mode: mode,
        ...{
            // palette values for light mode
            secondary: {
                light: green[500] + '22',
                main: green[500],
                dark: green[800],
            },
            primary: {
                light: blue[500] + '22',
                main: blue[500],
                dark: blue[800],
            },
        },
    },
});

interface AppState {
    mode: PaletteMode;
}

export default class App extends Component<unknown, AppState> {
    public constructor(props: unknown) {
        super(props);

        this.state = {
            mode: 'light',
        };

        this.toggleColorMode = this.toggleColorMode.bind(this);
    }

    public componentDidMount() {
        this.setState({
            mode: window.Main.getSettingsTheme(),
        });
    }

    private toggleColorMode() {
        const newTheme = this.state.mode === 'light' ? 'dark' : 'light';
        window.Main.setSettingsTheme(newTheme);
        this.setState({
            mode: newTheme,
        });
    }

    public render() {
        const { mode } = this.state;
        const theme = responsiveFontSizes(createTheme(getDesignTokens(mode)), {
            factor: 5,
        });

        return (
            <React.StrictMode>
                <ThemeProvider theme={theme}>
                    <Box
                        sx={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            backgroundColor: theme.palette.background.default,
                            zIndex: -999999,
                        }}
                    />
                    <ControlReference theme={mode} onThemeToggle={this.toggleColorMode} />
                </ThemeProvider>
            </React.StrictMode>
        );
    }
}
