import Aircraft from './Aircraft';

export default interface ModuleSet {
    [moduleName: string]: Aircraft;
}
