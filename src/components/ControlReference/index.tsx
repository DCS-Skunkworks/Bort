import {
    Box,
    Checkbox,
    CircularProgress,
    Container,
    FormControl,
    FormControlLabel,
    Grid,
    IconButton,
    InputLabel,
    LinearProgress,
    MenuItem,
    PaletteMode,
    Select,
    SelectChangeEvent,
    Typography,
} from '@mui/material';
import { Component, ReactNode } from 'react';
import ModuleSet from '../../@types/ModuleSet';
import Module from '../Module';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Check } from '@mui/icons-material';
import { red } from '@mui/material/colors';

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
    connectionStatus: boolean;
    hasLoadedModules: boolean;
}

export default class ControlReference extends Component<ControlReferenceProps, ControlReferenceState> {
    private awaitingConnectionAttempt = false;

    public constructor(props: ControlReferenceProps) {
        super(props);

        this.state = {
            moduleNames: [],
            modules: {},
            activeModule: '',
            activeCategory: '',
            connectionStatus: false,
            hasLoadedModules: false,
        };

        this.retryConnection = this.retryConnection.bind(this);
        this.changeModule = this.changeModule.bind(this);
        this.changeCategory = this.changeCategory.bind(this);
        this.updateModules = this.updateModules.bind(this);
        this.updateJsonPath = this.updateJsonPath.bind(this);
        this.updateConnectionStatus = this.updateConnectionStatus.bind(this);
    }

    public async componentDidMount() {
        await this.updateModules();

        window.Main.on('new-json-path', this.updateJsonPath);
        window.Main.on('bios-connection-status', this.updateConnectionStatus);

        window.Main.pollBiosConnection();
    }

    private async updateModules() {
        this.setState({
            hasLoadedModules: false,
        });

        const moduleNames = await window.Main.getModules();
        const modules = await window.Main.getModuleData(moduleNames);

        const activeModuleName = moduleNames.includes('MetadataEnd') ? 'MetadataEnd' : '';
        const activeModule = modules[activeModuleName];
        let activeCategoryName = '';
        if (activeModule !== null && activeModule !== undefined) {
            const activeCategory = activeModule['Metadata'];
            if (activeCategory !== null && activeCategory !== undefined) {
                activeCategoryName = 'Metadata';
            }
        }

        this.setState({
            moduleNames: moduleNames,
            modules: modules,
            activeModule: activeModuleName,
            activeCategory: activeCategoryName,
            hasLoadedModules: true,
        });
    }

    private updateJsonPath(path: string) {
        window.Main.setSettingsJsonPath(path);
        this.updateModules().then(r => r);
    }

    private updateConnectionStatus(status: boolean) {
        this.setState({
            connectionStatus: status,
        });

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
            const firstCategoryName = firstCategory[0];
            this.setState({
                activeModule: newModuleName,
                activeCategory: firstCategoryName,
            });
        }
    }

    private changeCategory(event: SelectChangeEvent) {
        this.setState({
            activeCategory: event.target.value,
        });
    }

    public render(): ReactNode {
        const { theme, onThemeToggle, onShowLiveDataToggle, onShowArduinoCodeToggle, showLiveData, showArduinoData } =
            this.props;
        const { modules, moduleNames, activeModule, activeCategory, connectionStatus, hasLoadedModules } = this.state;

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
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth>
                            <InputLabel>Module</InputLabel>
                            <Select value={activeModule} label={'Module'} onChange={this.changeModule}>
                                {moduleNames.map((m, i) => (
                                    <MenuItem value={m} key={i}>
                                        {m}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={8} md={4}>
                        <FormControl fullWidth>
                            <InputLabel>Category</InputLabel>
                            <Select value={activeCategory} label={'Category'} onChange={this.changeCategory}>
                                {hasModule
                                    ? Object.entries(module).map((m, i) => (
                                          <MenuItem value={m[0]} key={i + 1}>
                                              {m[0]}
                                          </MenuItem>
                                      ))
                                    : []}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={2} md={1} className={'valign-wrapper'}>
                        {connectionStatus ? <Check /> : <CircularProgress />}
                    </Grid>
                    <Grid item xs={4} md={2} className={'valign-wrapper'}>
                        <Typography variant={'body1'}>{connectionStatus ? 'Connected!' : 'Connecting...'}</Typography>
                    </Grid>
                    <Grid xs={4} sm={5} md />
                    <Grid item xs={2} sm={1} className={'valign-wrapper'}>
                        <IconButton onClick={onThemeToggle} color="inherit">
                            {theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={'valign-wrapper'}>
                        <FormControlLabel
                            control={<Checkbox checked={showLiveData} onChange={onShowLiveDataToggle} name="live" />}
                            label="Show live data"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={'valign-wrapper'}>
                        <FormControlLabel
                            control={
                                <Checkbox checked={showArduinoData} onChange={onShowArduinoCodeToggle} name="arduino" />
                            }
                            label="Show arduino scaffold code"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        {hasLoadedModules ? (
                            module ? (
                                <Module
                                    module={module}
                                    moduleName={activeModule}
                                    categoryName={activeCategory}
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
