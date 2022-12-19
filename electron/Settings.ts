import Store from 'electron-store';
import { PaletteMode } from '@mui/material';

interface SettingsSchema {
    theme: PaletteMode;
    jsonPath: string;
    showLiveData: boolean;
    showArduinoData: boolean;
}

export default class Settings {
    private static readonly instance: Settings = new Settings();

    private readonly store: Store<SettingsSchema>;

    private constructor() {
        this.store = new Store<SettingsSchema>({
            defaults: {
                theme: 'light',
                jsonPath: '%USERPROFILE%/Saved Games/DCS.openbeta/Scripts/DCS-BIOS/doc/json'.replace(
                    /%([^%]+)%/g,
                    (_, n) => process.env[n] ?? ""
                ),
                showLiveData: true,
                showArduinoData: false,
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
            showLiveData: newValue
        });
    }

    public get ShowArduinoData(): boolean {
        return this.store.get('showArduinoData');
    }

    public set ShowArduinoData(newValue: boolean) {
        this.store.set({
            showArduinoData: newValue
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
}
