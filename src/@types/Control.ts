import Input from './Input';
import Output from './Output';

export default interface Control {
    category: string;
    control_type: string;
    identifier: string;
    inputs: Input[];
    outputs: Output[];
    momentary_positions: string;
    physical_variant: string;
    description: string;
}
