import { Stack } from '@mui/material';
import React, { Component, ReactNode } from 'react';

import Aircraft from '../../@types/Aircraft';
import Category from '../Category/Category';

export interface ModuleProps {
    moduleName: string;
    module: Aircraft;
    categoryName: string;
    focusedComponent?: string;
    focusedRef?: React.RefObject<HTMLDivElement>;
    showLiveData: boolean;
    showArduinoData: boolean;
}

export default class Module extends Component<ModuleProps> {
    public constructor(props: ModuleProps) {
        super(props);
    }

    public render(): ReactNode {
        const { module, moduleName, categoryName, focusedComponent, focusedRef, showLiveData, showArduinoData } =
            this.props;
        const category = module[categoryName];

        return (
            <Stack spacing={2}>
                {category !== undefined ? (
                    <Category
                        moduleName={moduleName}
                        categoryName={categoryName}
                        category={category}
                        showLiveData={showLiveData}
                        showArduinoData={showArduinoData}
                        focusedComponent={focusedComponent}
                        focusedRef={focusedRef}
                    />
                ) : (
                    Object.entries(module).map((e, i) => (
                        <Category
                            key={i}
                            moduleName={moduleName}
                            categoryName={e[0]}
                            category={e[1]}
                            focusedComponent={focusedComponent}
                            showLiveData={showLiveData}
                            showArduinoData={showArduinoData}
                            focusedRef={focusedRef}
                        />
                    ))
                )}
            </Stack>
        );
    }
}
