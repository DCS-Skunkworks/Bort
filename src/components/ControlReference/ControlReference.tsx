import { Edit, Pin, Translate } from '@mui/icons-material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {
    Autocomplete,
    Box,
    Checkbox,
    Container,
    FormControl,
    FormControlLabel,
    IconButton,
    InputLabel,
    keyframes,
    LinearProgress,
    MenuItem,
    PaletteMode,
    Select,
    SelectChangeEvent,
    TextField,
    Typography,
} from '@mui/material';
import { red } from '@mui/material/colors';
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import Grid from '@mui/system/Unstable_Grid';
import * as React from 'react';
import { Component, ReactNode } from 'react';

import Control from '../../@types/Control';
import ModuleSet from '../../@types/ModuleSet';
import { OutputType } from '../../@types/OutputType';
import Module from '../Module/Module';
import StringParser from '../Output/String/StringParser';

export interface ControlReferenceProps {
    theme: PaletteMode;
    onThemeToggle: () => void;
    onShowLiveDataToggle: () => void;
    onShowArduinoCodeToggle: () => void;
    showLiveData: boolean;
    showArduinoData: boolean;
}

export interface ControlReferenceState {
    moduleNames: string[];
    modules: ModuleSet;
    activeModule: string;
    activeCategory: string;
    focusedComponent: string | null;
    focusedRef: React.RefObject<HTMLDivElement> | null;
    connected: boolean;
    attemptingReconnection: boolean;
    hasLoadedModules: boolean;
    version: string;
}

function buildPulsar(r: number, g: number, b: number): SxProps<Theme> {
    const pulse = keyframes`
0% {
    transform: scale(0.90);
    box-shadow: 0 0 0 0 rgba(${r}, ${g}, ${b}, 0.7);
}

70% {
    transform: scale(1);
    box-shadow: 0 0 0 1rem rgba(${r}, ${g}, ${b}, 0);
}

100% {
    transform: scale(0.90);
    box-shadow: 0 0 0 0 rgba(${r}, ${g}, ${b}, 0);
}`;

    return {
        bgcolor: `rgb(${r}, ${g}, ${b})`,
        borderRadius: '50%',
        margin: '1rem',
        height: '1rem',
        width: '1rem',
        boxShadow: `0 0 0 0 #000000`,
        transform: 'scale(1)',
        animation: `${pulse} 2s infinite`,
    };
}

const connectedPulsar = buildPulsar(16, 201, 122);
const reconnectingPulsar = buildPulsar(255, 196, 94);
const disconnectedPulsar = buildPulsar(255, 103, 97);

export default class ControlReference extends Component<ControlReferenceProps, ControlReferenceState> {
    private awaitingConnectionAttempt = false;
    private parser?: StringParser;

    public constructor(props: ControlReferenceProps) {
        super(props);

        this.state = {
            moduleNames: [],
            modules: {},
            activeModule: '',
            activeCategory: '',
            focusedComponent: null,
            focusedRef: null,
            connected: false,
            attemptingReconnection: true,
            hasLoadedModules: false,
            version: '',
        };

        this.retryConnection = this.retryConnection.bind(this);
        this.changeModule = this.changeModule.bind(this);
        this.changeCategory = this.changeCategory.bind(this);
        this.updateModules = this.updateModules.bind(this);
        this.updateJsonPath = this.updateJsonPath.bind(this);
        this.updateConnectionStatus = this.updateConnectionStatus.bind(this);
        this.versionUpdated = this.versionUpdated.bind(this);
        this.searchBoxChanged = this.searchBoxChanged.bind(this);
    }

    public override async componentDidMount(): Promise<void> {
        await this.updateModules();

        window.Main.on('new-json-path', this.updateJsonPath);
        window.Main.on('bios-connection-status', this.updateConnectionStatus);

        window.Main.pollBiosConnection();
    }

    public override async componentWillUnmount(): Promise<void> {
        this.parser?.stop();
    }

    private async updateModules() {
        this.setState({
            hasLoadedModules: false,
        });

        let moduleNames = await window.Main.getModules();
        const modules = await window.Main.getModuleData(moduleNames);

        // if something didn't load, just filter it out
        moduleNames = moduleNames.filter(n => modules[n] !== undefined);

        const lastModule = window.Main.getLastModule();
        let activeModuleName: string;
        let activeCategoryName = '';

        if (moduleNames.includes(lastModule)) {
            activeModuleName = lastModule;
            const lastCategoryName = window.Main.getLastCategory();
            const activeModule = modules[activeModuleName];
            if (activeModule[lastCategoryName] !== undefined) {
                activeCategoryName = lastCategoryName;
            } else {
                console.warn('unable to find category', lastCategoryName, 'in', activeModule);
                activeCategoryName = Object.entries(activeModule)[0][0];
            }
        } else {
            console.warn('unable to find module', lastModule, 'in', moduleNames);
            activeModuleName = moduleNames.includes('MetadataEnd') ? 'MetadataEnd' : '';
            const activeModule = modules[activeModuleName];
            if (activeModule !== null && activeModule !== undefined) {
                const activeCategory = activeModule['Metadata'];
                if (activeCategory !== null && activeCategory !== undefined) {
                    activeCategoryName = 'Metadata';
                } else {
                    console.error('unable to load default Metadata category', activeModule);
                }
            } else {
                console.error('unable to load default MetadataEnd module', modules);
            }
        }

        window.Main.setLastModule(activeModuleName);
        window.Main.setLastCategory(activeCategoryName);

        this.setState(
            {
                moduleNames: moduleNames,
                modules: modules,
                activeModule: activeModuleName,
                activeCategory: activeCategoryName,
                focusedComponent: null,
                focusedRef: null,
                hasLoadedModules: true,
            },
            () => {
                this.parser?.stop();
                const versionData = this.state.modules['CommonData']?.['Metadata']?.['DCS_BIOS']?.outputs.filter(
                    o => o.type === OutputType.STRING,
                )[0];
                if (versionData !== undefined && versionData.max_length !== undefined) {
                    this.parser = new StringParser(versionData.address, versionData.max_length, this.versionUpdated);
                    this.parser.start();
                }
            },
        );
    }

    private updateJsonPath(path: string) {
        window.Main.setSettingsJsonPath(path);
        this.updateModules().then(r => r);
    }

    private async updateConnectionStatus(status: boolean) {
        this.setState({
            connected: status,
        });

        if (status) {
            await this.updateModules();
        }

        if (!status && !this.awaitingConnectionAttempt) {
            this.awaitingConnectionAttempt = true;
            setTimeout(this.retryConnection, 5000);
        }
    }

    private async retryConnection() {
        this.awaitingConnectionAttempt = false;
        window.Main.retryBiosConnection();
    }

    private changeModule(event: SelectChangeEvent) {
        if (this.state.activeModule != event.target.value) {
            const newModuleName = event.target.value;
            const newModule = this.state.modules[newModuleName];
            const firstCategory = Object.entries(newModule)[0];
            const newCategory = firstCategory[0];

            window.Main.setLastCategory(newCategory);
            window.Main.setLastModule(newModuleName);

            this.setState({
                activeModule: newModuleName,
                activeCategory: newCategory,
                focusedComponent: null,
                focusedRef: null,
            });
        }
    }

    private changeCategory(event: SelectChangeEvent) {
        window.Main.setLastCategory(event.target.value);
        this.setState({
            activeCategory: event.target.value,
            focusedComponent: null,
            focusedRef: null,
        });
    }

    private heartbeat?: NodeJS.Timeout;
    private versionUpdated(version: string): void {
        clearTimeout(this.heartbeat);
        this.heartbeat = setTimeout(
            () =>
                this.setState({
                    attemptingReconnection: true,
                }),
            1000,
        );

        if (this.state.version !== version) {
            this.setState({
                version: version,
            });
        }

        if (this.state.attemptingReconnection) {
            this.setState({
                attemptingReconnection: false,
            });
        }
    }

    private searchBoxChanged(event: React.SyntheticEvent, value: AutoCompleteOption | null) {
        if (value !== null) {
            const ref: React.RefObject<HTMLDivElement> = React.createRef();
            this.setState(
                {
                    activeCategory: value.control.category,
                    focusedComponent: value.control.identifier,
                    focusedRef: ref,
                },
                () => {
                    if (ref.current !== null) {
                        ref.current.scrollIntoView({ behavior: 'smooth' });
                    }
                },
            );
        }
    }

    public render(): ReactNode {
        const { theme, onThemeToggle, onShowLiveDataToggle, onShowArduinoCodeToggle, showLiveData, showArduinoData } =
            this.props;
        const {
            modules,
            moduleNames,
            activeModule,
            activeCategory,
            focusedComponent,
            focusedRef,
            connected,
            attemptingReconnection,
            hasLoadedModules,
            version,
        } = this.state;

        const module = modules[activeModule];
        const hasModule = module !== null && module !== undefined;

        return (
            <Container
                sx={{
                    bgcolor: theme => theme.palette.background.default,
                    color: theme => theme.palette.text.primary,
                    height: '100vh',
                    paddingTop: '1rem',
                }}
            >
                <Grid container sx={{ alignItems: 'center' }} spacing={2}>
                    <Grid xs={'auto'}>
                        <Box
                            sx={
                                connected
                                    ? attemptingReconnection
                                        ? reconnectingPulsar
                                        : connectedPulsar
                                    : disconnectedPulsar
                            }
                        ></Box>
                    </Grid>
                    <Grid xs={4} sm={9}>
                        <Typography variant={'body1'}>
                            {connected ? <>dcs-bios {version}</> : 'Connecting...'}
                        </Typography>
                    </Grid>
                    <Grid xs={'auto'} xsOffset={'auto'}>
                        <IconButton onClick={onThemeToggle} color="inherit">
                            {theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>
                    </Grid>
                    <Grid xs={12} sm={4}>
                        <FormControl fullWidth>
                            <InputLabel>Module</InputLabel>
                            <Select value={activeModule} label={'Module'} onChange={this.changeModule}>
                                {moduleNames.map(m => (
                                    <MenuItem value={m} key={m}>
                                        {m}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid xs={12} sm={8}>
                        <FormControl fullWidth>
                            <InputLabel>Category</InputLabel>
                            <Select value={activeCategory} label={'Category'} onChange={this.changeCategory}>
                                {hasModule
                                    ? [
                                          <MenuItem value={'ALL'} key={-1}>
                                              {'⚠️ Show all'}
                                          </MenuItem>,
                                          ...Object.entries(module).map(m => (
                                              <MenuItem value={m[0]} key={m[0]}>
                                                  {m[0]}
                                              </MenuItem>
                                          )),
                                      ]
                                    : []}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid xs={12}>
                        <FormControl fullWidth>
                            <Autocomplete
                                disablePortal
                                options={
                                    module === undefined
                                        ? []
                                        : Object.entries(module).flatMap(e =>
                                              Object.values(e[1]).map(control => ({
                                                  label: control.description,
                                                  control: control,
                                              })),
                                          )
                                }
                                groupBy={option => option.control.category}
                                renderInput={params => (
                                    <TextField {...params} type={'search'} label={'Search'} variant={'outlined'} />
                                )}
                                renderOption={(props, option, state) => (
                                    <Box component={'li'} {...props}>
                                        <Box component={'span'} sx={{ width: '2rem' }}>
                                            {option.control.outputs.filter(o => o.type === OutputType.STRING).length >
                                            0 ? (
                                                <Translate />
                                            ) : (
                                                (option.control.inputs.length > 0 ||
                                                    option.control.outputs.filter(o => o.type === OutputType.INTEGER)
                                                        .length > 0) && <Pin />
                                            )}
                                        </Box>
                                        <Box component={'span'} sx={{ width: '2rem' }}>
                                            {option.control.inputs.length > 0 && <Edit />}
                                        </Box>
                                        <pre> {option.control.identifier} </pre>
                                        {option.control.description}
                                    </Box>
                                )}
                                blurOnSelect
                                clearOnBlur
                                selectOnFocus
                                onChange={this.searchBoxChanged}
                                isOptionEqualToValue={(a, b) => a.control.identifier === b.control.identifier}
                            />
                        </FormControl>
                    </Grid>
                    <Grid xs={12} sm={6} md={4} lg={3} xl={2}>
                        <FormControlLabel
                            control={<Checkbox checked={showLiveData} onChange={onShowLiveDataToggle} name="live" />}
                            label="Show live data"
                        />
                    </Grid>
                    <Grid xs={12} sm={6} md={4} lg={3} xl={2}>
                        <FormControlLabel
                            control={
                                <Checkbox checked={showArduinoData} onChange={onShowArduinoCodeToggle} name="arduino" />
                            }
                            label="Show arduino scaffold code"
                        />
                    </Grid>
                    <Grid xs={12}>
                        {hasLoadedModules ? (
                            module ? (
                                <Module
                                    module={module}
                                    moduleName={activeModule}
                                    categoryName={activeCategory}
                                    focusedComponent={focusedComponent ?? undefined}
                                    focusedRef={focusedRef ?? undefined}
                                    showLiveData={showLiveData}
                                    showArduinoData={showArduinoData}
                                />
                            ) : (
                                <Box
                                    sx={{
                                        backgroundColor: red[500] + '22',
                                        borderStyle: 'solid',
                                        borderWidth: '1px',
                                        borderColor: red[800],
                                        borderRadius: '1rem',
                                        width: '100%',
                                        padding: '1rem',
                                    }}
                                >
                                    <Typography component={'div'}>
                                        <p>
                                            Unable to locate modules. Please set the path of the DCS-BIOS .json files
                                            from Menu &gt; Select dcs-bios location.
                                        </p>
                                        <span>
                                            Current path: <pre>{window.Main.getSettingsJsonPath()}</pre>
                                        </span>
                                    </Typography>
                                </Box>
                            )
                        ) : (
                            <LinearProgress />
                        )}
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

interface AutoCompleteOption {
    label: string;
    control: Control;
}
