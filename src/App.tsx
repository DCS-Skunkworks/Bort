import ControlReference from './components/ControlReference';
import { Box, createTheme, PaletteMode, responsiveFontSizes, ThemeOptions, ThemeProvider } from '@mui/material';
import { blue, green } from '@mui/material/colors';
import React from 'react';

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

export function App() {
    const [mode, setMode] = React.useState<'light' | 'dark'>('light');
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        []
    );

    const theme = React.useMemo(
        () =>
            responsiveFontSizes(createTheme(getDesignTokens(mode)), {
                factor: 5,
            }),
        [mode]
    );

    return (
        <>
            <React.StrictMode>
                <ThemeProvider theme={theme}>
                    <Box
                        sx={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            bgcolor: theme.palette.background.default,
                            zIndex: -999999,
                        }}
                    />
                    <ControlReference theme={mode} onThemeToggle={colorMode.toggleColorMode} />
                </ThemeProvider>
            </React.StrictMode>
        </>
    );
}
