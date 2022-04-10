import Control from './Control';

export default interface Category {
    [categoryName: string]: Control;
}
