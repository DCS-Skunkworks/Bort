import { Component, ReactNode } from 'react';
import CategoryItem from '../../@types/Category';
import Control from '../Control';
import { Grid, Stack, Typography } from '@mui/material';

export interface CategoryProps {
    moduleName: string;
    categoryName: string;
    category: CategoryItem;
}

export default class Category extends Component<CategoryProps, any> {
    public constructor(props: CategoryProps) {
        super(props);
    }

    public render(): ReactNode {
        const { moduleName, categoryName, category } = this.props;
        return (
            <Stack spacing={2} className="category">
                <Typography variant={'h2'}>{categoryName}</Typography>
                {Object.entries(category)
                    .sort((e1, e2) => e1[0].localeCompare(e2[0]))
                    .map((e, i) => (
                        <Control moduleName={moduleName} control={e[1]} key={i} />
                    ))}
            </Stack>
        );
    }
}
