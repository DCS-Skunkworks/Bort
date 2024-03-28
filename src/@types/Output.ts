import { OutputType } from './OutputType';

export default interface Output {
    address: number;
    address_mask_shift_identifier?: string;
    address_mask_identifier?: string;
    address_identifier?: string;
    suffix: string;
    mask?: number;
    shift_by?: number;
    max_value?: number;
    max_length?: number;
    description?: string;
    type: OutputType;
}
