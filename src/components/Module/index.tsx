import { Stack } from '@mui/material';
import { Component, ReactNode } from 'react';

import Aircraft from '../../@types/Aircraft';
import Category from '../Category';

export interface ModuleProps {
    moduleName: string;
    module: Aircraft;
    categoryName: string;
    showLiveData: boolean;
    showArduinoData: boolean;
}

export default class Module extends Component<ModuleProps> {
    public constructor(props: ModuleProps) {
        super(props);
    }

    public render(): ReactNode {
        const { module, moduleName, categoryName, showLiveData, showArduinoData } = this.props;
        const category = module[categoryName];

        return (
            <Stack spacing={2}>
                {category !== undefined && (
                    <Category
                        moduleName={moduleName}
                        categoryName={categoryName}
                        category={category}
                        showLiveData={showLiveData}
                        showArduinoData={showArduinoData}
                    />
                )}
            </Stack>
        );
    }
}
