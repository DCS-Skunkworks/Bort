import { Box, createTheme, PaletteMode, responsiveFontSizes, ThemeOptions, ThemeProvider } from '@mui/material';
import { blue, green } from '@mui/material/colors';
import React, { Component } from 'react';

import ControlReference from './components/ControlReference/ControlReference';

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
    // components: {
    //     // autocomplete and outlined input overrides get the autocomplete box *close* to the standard height
    //     // and remove some weird height inconsistencies
    //     MuiAutocomplete: {
    //         styleOverrides: {
    //             input: {
    //                 paddingTop: 'unset !important',
    //                 paddingBottom: 'unset !important',
    //                 borderBottomColor: '#00000000 !important',
    //                 boxShadow: 'unset !important',
    //                 marginBottom: '4px !important',
    //                 marginTop: '4px !important',
    //                 bottom: '0 !important',
    //             },
    //         },
    //     },
    //     MuiTextField: {
    //         styleOverrides: {
    //             input: {
    //                 paddingTop: 'unset !important',
    //                 paddingBottom: 'unset !important',
    //                 borderBottomColor: '#00000000 !important',
    //                 boxShadow: 'unset !important',
    //                 marginBottom: '4px !important',
    //                 marginTop: '4px !important',
    //                 bottom: '0 !important',
    //             },
    //         },
    //     },
    //     MuiOutlinedInput: {
    //         styleOverrides: {
    //             root: {
    //                 paddingTop: 'unset !important',
    //                 paddingBottom: 'unset !important',
    //             },
    //         },
    //     },
    // },
});

interface AppState {
    mode: PaletteMode;
    showLiveData: boolean;
    showArduinoData: boolean;
    useAddressConstants: boolean;
}

export default class App extends Component<unknown, AppState> {
    public constructor(props: unknown) {
        super(props);

        this.state = {
            mode: 'light',
            showLiveData: true,
            showArduinoData: false,
            useAddressConstants: false,
        };

        this.toggleColorMode = this.toggleColorMode.bind(this);
        this.toggleShowLiveData = this.toggleShowLiveData.bind(this);
        this.toggleShowArduinoData = this.toggleShowArduinoData.bind(this);
        this.toggleUseAddressConstants = this.toggleUseAddressConstants.bind(this);
    }

    public componentDidMount() {
        this.setState({
            mode: window.Main.getSettingsTheme(),
            showLiveData: window.Main.getShowLiveData(),
            showArduinoData: window.Main.getShowArduinoData(),
            useAddressConstants: window.Main.getUseAddressConstants(),
        });
    }

    private toggleColorMode() {
        const newTheme = this.state.mode === 'light' ? 'dark' : 'light';
        window.Main.setSettingsTheme(newTheme);
        this.setState({
            mode: newTheme,
        });
    }

    private toggleShowLiveData() {
        const newValue = !this.state.showLiveData;
        window.Main.setShowLiveData(newValue);
        this.setState({
            showLiveData: newValue,
        });
    }

    private toggleShowArduinoData() {
        const newValue = !this.state.showArduinoData;
        window.Main.setShowArduinoData(newValue);
        this.setState({
            showArduinoData: newValue,
        });
    }

    private toggleUseAddressConstants() {
        const newValue = !this.state.useAddressConstants;
        window.Main.setUseAddressConstants(newValue);
        this.setState({
            useAddressConstants: newValue,
        });
    }

    public render() {
        const { mode, showLiveData, showArduinoData, useAddressConstants } = this.state;
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
                    <ControlReference
                        theme={mode}
                        onThemeToggle={this.toggleColorMode}
                        onShowLiveDataToggle={this.toggleShowLiveData}
                        onShowArduinoCodeToggle={this.toggleShowArduinoData}
                        onUseAddressConstantsToggle={this.toggleUseAddressConstants}
                        showLiveData={showLiveData}
                        showArduinoData={showArduinoData}
                        useAddressConstants={useAddressConstants}
                    />
                </ThemeProvider>
            </React.StrictMode>
        );
    }
}
