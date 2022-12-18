import Store from 'electron-store';
import { PaletteMode } from '@mui/material';

interface SettingsSchema {
    theme: PaletteMode;
    jsonPath: string;
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

    public get JsonPath(): string {
        return this.store.get('jsonPath');
    }

    public set JsonPath(newPath: string) {
        this.store.set({
            jsonPath: newPath,
        });
    }
}
