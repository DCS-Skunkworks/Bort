import { contextBridge, ipcMain, ipcRenderer, IpcRendererEvent } from 'electron';
import ModuleSet from '../src/@types/ModuleSet';
import { promises as fs } from 'fs';
import * as path from 'path';

interface AircraftData {
    [name: string]: string[];
}

type IntegerFunction = (data: number) => void;
type StringFunction = (data: string) => void;

const callbacks: { [name: number]: (IntegerFunction | StringFunction)[] } = {};

function getFileFromRoot(file: string): string {
    return `%USERPROFILE%/Saved Games/DCS.openbeta/Scripts/DCS-BIOS/doc/json/${file}`.replace(
        /%([^%]+)%/g,
        (_, n) => process.env[n]!
    );
}

export const api = {
    /**
     * Here you can expose functions to the renderer process
     * so they can interact with the main (electron) side
     * without security problems.
     *
     * The function below can accessed using `window.Main.sendMessage`
     */

    sendMessage: (message: string) => {
        ipcRenderer.send('message', message);
    },

    /**
     * Provide an easier way to listen to events
     */
    on: (channel: string, callback: Function) => {
        ipcRenderer.on(channel, (_, data) => callback(data));
    },

    /**
     * Provide an easier way to listen to events
     */
    onBiosReceive: (callback: (event: IpcRendererEvent, address: number, data: Uint16Array) => void) => {
        ipcRenderer.on('receive-from-bios', callback);
    },

    stopBiosListening: (callback: (event: IpcRendererEvent, address: number, data: Uint16Array) => void) => {
        ipcRenderer.off('receive-from-bios', callback);
    },

    getModules: async (): Promise<string[]> => {
        const modules: ModuleSet = {};
        modules['MetadataEnd'] = {};
        modules['MetadataStart'] = {};
        modules['CommonData'] = {};

        const modulesSet = new Set<string>();
        modulesSet.add('MetadataStart');
        modulesSet.add('MetadataEnd');

        const buffer = await fs.readFile(getFileFromRoot('AircraftAliases.json'));
        const data: AircraftData = JSON.parse(buffer.toString());

        // we can parse the values of AircraftAliases.json to find the json files for all modules
        Object.entries(data).forEach(entry => {
            const values = entry[1];
            if (values !== undefined && values !== null) {
                values.forEach(value => modulesSet.add(value));
            }
        });

        // once the first three items are added, all others should be added in alphabetical order
        return Array.from(modulesSet).sort();
    },

    getModuleData: async (moduleNames: string[]): Promise<ModuleSet> => {
        const modules: ModuleSet = {};

        for (const n of moduleNames) {
            const buffer = await fs.readFile(getFileFromRoot(`${n}.json`));
            modules[n] = JSON.parse(buffer.toString());
        }

        return modules;
    },

    sendToBios: async (message: string): Promise<void> => {
        console.log(`sending to [${message}]`);
        ipcRenderer.send('send-event', message);
        return Promise.resolve();
    },

    retryBiosConnection: (): void => {
        ipcRenderer.send('retry-connection');
    },

    pollBiosConnection: (): void => {
        ipcRenderer.send('poll-bios-connection');
    },

    registerIntegerListener: (address: number, callback: IntegerFunction) => {
        console.log('registering output for address', address);
        if (callbacks[address] === undefined) {
            callbacks[address] = [];
        }
        callbacks[address].push(callback);
    },

    registerStringListener: (address: number, callback: StringFunction) => {
        ipcRenderer.send('register-output', address, callback);
    },

    deregisterListener: (address: number) => {
        delete callbacks[address];
    },

    parseData: (address: Uint16Array, data: Uint16Array) => {
        const functions = callbacks[address[0]];
        console.log('sending', data[0], 'to', address[0]);
        if (functions !== null && functions !== undefined) {
            functions.forEach(f => {
                const d: never = data[0] as never;
                f(d);
            });
        }
    },
};

contextBridge.exposeInMainWorld('Main', api);
