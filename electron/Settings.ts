import { PaletteMode } from '@mui/material';
import Store from 'electron-store';

interface SettingsSchema {
    theme: PaletteMode;
    jsonPath: string;
    showLiveData: boolean;
    showArduinoData: boolean;
    lastModule: string;
    lastCategory: string;
    alwaysOnTop: boolean;
    useAddressConstants: boolean;
}

export default class Settings {
    private static readonly instance: Settings = new Settings();

    private readonly store: Store<SettingsSchema>;

    private constructor() {
        this.store = new Store<SettingsSchema>({
            defaults: {
                theme: 'light',
                jsonPath: '%USERPROFILE%/Saved Games/DCS/Scripts/DCS-BIOS/doc/json'.replace(
                    /%([^%]+)%/g,
                    (_, n) => process.env[n] ?? '',
                ),
                showLiveData: true,
                showArduinoData: false,
                lastModule: 'MetadataEnd',
                lastCategory: 'Metadata',
                alwaysOnTop: true,
                useAddressConstants: true,
            },
        });
    }

    public static get Instance(): Settings {
        return this.instance;
    }

    public get Theme(): PaletteMode {
        return this.store.get('theme');
    }

    public set Theme(newTheme: PaletteMode) {
        this.store.set({
            theme: newTheme,
        });
    }

    public get ShowLiveData(): boolean {
        return this.store.get('showLiveData');
    }

    public set ShowLiveData(newValue: boolean) {
        this.store.set({
            showLiveData: newValue,
        });
    }

    public get ShowArduinoData(): boolean {
        return this.store.get('showArduinoData');
    }

    public set ShowArduinoData(newValue: boolean) {
        this.store.set({
            showArduinoData: newValue,
        });
    }

    public get JsonPath(): string {
        return this.store.get('jsonPath');
    }

    public set JsonPath(newPath: string) {
        this.store.set({
            jsonPath: newPath,
        });
    }

    public get LastModule(): string {
        return this.store.get('lastModule');
    }

    public set LastModule(newPath: string) {
        this.store.set({
            lastModule: newPath,
        });
    }

    public get LastCategory(): string {
        return this.store.get('lastCategory');
    }

    public set LastCategory(newPath: string) {
        this.store.set({
            lastCategory: newPath,
        });
    }

    public get AlwaysOnTop(): boolean {
        return this.store.get('alwaysOnTop');
    }

    public set AlwaysOnTop(newValue: boolean) {
        this.store.set({
            alwaysOnTop: newValue,
        });
    }

    public get UseAddressConstants(): boolean {
        return this.store.get('useAddressConstants');
    }

    public set UseAddressConstants(newValue: boolean) {
        this.store.set({
            useAddressConstants: newValue,
        });
    }
}
