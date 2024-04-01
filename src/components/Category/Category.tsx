import { Stack, Typography } from '@mui/material';
import React, { Component, ReactNode } from 'react';

import CategoryItem from '../../@types/Category';
import Control from '../Control/Control';

export interface CategoryProps {
    moduleName: string;
    categoryName: string;
    category: CategoryItem;
    focusedComponent?: string;
    focusedRef?: React.RefObject<HTMLDivElement>;
    showLiveData: boolean;
    showArduinoData: boolean;
    useAddressConstants: boolean;
}

export default class Category extends Component<CategoryProps> {
    public constructor(props: CategoryProps) {
        super(props);
    }

    public render(): ReactNode {
        const {
            moduleName,
            categoryName,
            category,
            focusedComponent,
            focusedRef,
            showLiveData,
            showArduinoData,
            useAddressConstants,
        } = this.props;
        return (
            <Stack spacing={2} className="category">
                <Typography variant={'h2'}>{categoryName}</Typography>
                {Object.entries(category)
                    .sort((e1, e2) => e1[0].localeCompare(e2[0]))
                    .map((e, i) => (
                        <div key={i} ref={focusedComponent === e[1].identifier ? focusedRef : undefined}>
                            <Control
                                moduleName={moduleName}
                                control={e[1]}
                                key={e[1].identifier}
                                showLiveData={showLiveData}
                                showArduinoData={showArduinoData}
                                useAddressConstants={useAddressConstants}
                            />
                        </div>
                    ))}
            </Stack>
        );
    }
}
