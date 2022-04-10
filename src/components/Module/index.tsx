import {
    Button,
    Container,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    TablePagination,
} from '@mui/material';
import { Component, ReactNode } from 'react';
import ModuleSet from '../../@types/ModuleSet';
import Category from '../Category';
import Aircraft from '../../@types/Aircraft';

export interface ModuleProps {
    moduleName: string;
    module: Aircraft;
    categoryName: string;
}

export default class Module extends Component<ModuleProps, any> {
    public constructor(props: ModuleProps) {
        super(props);
    }

    public render(): ReactNode {
        const { module, moduleName, categoryName } = this.props;
        const category = module ? module[categoryName] : undefined;
        return (
            <Stack spacing={2}>
                {category !== undefined && (
                    <Category moduleName={moduleName} categoryName={categoryName} category={category!} />
                )}
            </Stack>
        );
    }
}
