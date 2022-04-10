import { InputInterface } from './InputInterface';

export default interface Input {
    interface: InputInterface;
    argument?: string;
    max_value?: number;
    suggested_step?: number;
}
