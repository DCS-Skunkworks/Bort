import {
    Button,
    CircularProgress,
    Container,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Typography,
} from '@mui/material';
import { Component, ReactNode } from 'react';
import ModuleSet from '../../@types/ModuleSet';
import Category from '../Category';
import Module from '../Module';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Check } from '@mui/icons-material';

export interface ControlReferenceProps {
    theme: 'light' | 'dark';
    onThemeToggle: () => void;
}

export interface ControlReferenceState {
    moduleNames: string[];
    modules: ModuleSet;
    activeModule: string;
    activeCategory: string;
    connectionStatus: boolean;
}

export default class ControlReference extends Component<ControlReferenceProps, ControlReferenceState> {
    public constructor(props: any) {
        super(props);

        this.state = {
            moduleNames: [],
            modules: {},
            activeModule: 'MetadataEnd',
            activeCategory: 'Metadata',
            connectionStatus: false,
        };

        this.retryConnection = this.retryConnection.bind(this);
        this.changeModule = this.changeModule.bind(this);
        this.changeCategory = this.changeCategory.bind(this);
        this.updateConnectionStatus = this.updateConnectionStatus.bind(this);
    }

    public async componentDidMount() {
        const moduleNames = await window.Main.getModules();
        const modules = await window.Main.getModuleData(moduleNames);

        this.setState({
            moduleNames: moduleNames,
            modules: modules,
        });

        window.Main.on('bios-connection-status', this.updateConnectionStatus);

        window.Main.pollBiosConnection();
    }

    private updateConnectionStatus(status: boolean) {
        this.setState({
            connectionStatus: status,
        });

        if (!status) {
            setTimeout(window.Main.retryBiosConnection, 5000);
        }
    }

    private async retryConnection() {
        window.Main.retryBiosConnection();
    }

    private changeModule(event: SelectChangeEvent) {
        if (this.state.activeModule != event.target.value) {
            const newModuleName = event.target.value;
            const newModule = this.state.modules[newModuleName];
            const firstCategory = Object.entries(newModule)[0];
            const firstCategoryName = firstCategory ? firstCategory![0] : '';
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
        const { theme, onThemeToggle } = this.props;
        const { modules, moduleNames, activeModule, activeCategory, connectionStatus } = this.state;

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
                    <Grid item xs={4}>
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
                    <Grid item xs={4}>
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
                    <Grid item xs={1}>
                        {connectionStatus ? <Check /> : <CircularProgress />}
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant={'body1'}>{connectionStatus ? 'Connected!' : 'Connecting...'}</Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton onClick={onThemeToggle} color="inherit">
                            {theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>
                    </Grid>
                    <Grid item xs={12}>
                        <Module module={module} moduleName={activeModule} categoryName={activeCategory} />
                    </Grid>
                </Grid>
            </Container>
        );
    }
}
