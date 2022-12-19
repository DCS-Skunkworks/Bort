import { OutputType } from './OutputType';

export default interface Output {
    address: number;
    suffix: string;
    mask?: number;
    shift_by?: number;
    max_value?: number;
    max_length?: number;
    description?: string;
    type: OutputType;
}
