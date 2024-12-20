import { app, BrowserWindow, dialog, ipcMain, Menu, MenuItem } from 'electron';
import Store from 'electron-store';
import * as net from 'net';

import ProtocolParser from './ProtocolParser';
import Settings from './Settings';

let mainWindow: BrowserWindow | null;
let isAlwaysOnTopChecked: boolean = Settings.Instance.AlwaysOnTop;

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// const assetsPath =
//   process.env.NODE_ENV === 'production'
//     ? process.resourcesPath
//     : app.getAppPath()

let socketClient: net.Socket;
let protocolParser: ProtocolParser;

function createWindow() {
    Store.initRenderer();
    mainWindow = new BrowserWindow({
        // icon: path.join(assetsPath, 'assets', 'icon.png'),
        width: 900,
        height: 1200,
        minWidth: 500,
        maxWidth: 1200,
        minHeight: 150,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
        },
    });

    // setting up the menu with just two items
    const menu = Menu.buildFromTemplate([
        {
            label: 'Menu',
            submenu: [
                {
                    label: 'Select dcs-bios location',
                    accelerator: 'CmdOrCtrl+O',
                    // this is the main bit hijack the click event
                    click(menuItem, browserWindow) {
                        // construct the select file dialog
                        dialog
                            .showOpenDialog({
                                properties: ['openDirectory'],
                                defaultPath: '%USERPROFILE%/Saved Games/'.replace(
                                    /%([^%]+)%/g,
                                    (_, n) => process.env[n] ?? '',
                                ),
                            })
                            .then(function (fileObj) {
                                // the fileObj has two props
                                if (!fileObj.canceled) {
                                    browserWindow?.webContents?.send('new-json-path', fileObj.filePaths[0]);
                                }
                            })
                            // should always handle the error yourself, later Electron release might crash if you don't
                            .catch(function (err) {
                                console.error(err);
                            });
                    },
                },
                {
                    label: 'Always on Top',
                    type: 'checkbox',
                    checked: isAlwaysOnTopChecked,
                    click(menuItem, browserWindow) {
                        Settings.Instance.AlwaysOnTop = !Settings.Instance.AlwaysOnTop;
                        browserWindow?.setAlwaysOnTop(Settings.Instance.AlwaysOnTop);
                        isAlwaysOnTopChecked = Settings.Instance.AlwaysOnTop;
                    },
                },
                {
                    label: 'Show version',
                    accelerator: 'CmdOrCtrl+I',
                    click(menuItem, browserWindow) {
                        const packageInfo = require('../package.json');
                        dialog
                            .showMessageBox({
                                message: `Bort version: ${ packageInfo.version }`
                            })
                            // should always handle the error yourself, later Electron release might crash if you don't
                            .catch(function (err) {
                                console.error(err);
                            });
                    },
                },
                {
                    label: 'Exit',
                    click() {
                        app.quit();
                    },
                },
            ],
        },
        new MenuItem({
            role: 'viewMenu',
        }),
    ]);
    Menu.setApplicationMenu(menu);

    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
    mainWindow.setAlwaysOnTop(isAlwaysOnTopChecked);
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
    protocolParser = new ProtocolParser((addressArray, data) => {
        const address = addressArray[0];
        mainWindow?.webContents?.send(`receive-from-bios-${address}`, address, data);
    });

    socketClient = new net.Socket();

    socketClient.setNoDelay();
    socketClient.on('connect', () => {
        connectedToBios = true;
        reportBiosStatus();
    });
    socketClient.on('ready', () => {
        console.log('ready');
    });
    socketClient.on('data', data => {
        const d = new DataView(data.buffer);
        for (let i = 0; i < d.byteLength; i++) {
            protocolParser.processChar(d.getUint8(i));
        }
    });
    socketClient.on('end', () => {
        console.log('disconnected from server');
        connectedToBios = false;
        reportBiosStatus();
    });
    socketClient.on('error', () => {
        console.log('error connecting');
        connectedToBios = false;
        reportBiosStatus();
    });

    connectToSocket();
}

let connectedToBios = false;

function connectToSocket() {
    /* Instance socket on create window */
    socketClient.connect({ host: '127.0.0.1', port: 7778 });
}

function reportBiosStatus() {
    mainWindow?.webContents?.send('bios-connection-status', connectedToBios);
}

function rawStringToBuffer(str: string) {
    const len = str.length;
    const arr = new Array(len);
    for (let idx = 0; idx < len; ++idx) {
        arr[idx] = str.charCodeAt(idx) & 0xff;
    }
    // You may create an ArrayBuffer from a standard array (of values) as follows:
    return new Uint8Array(arr);
}

async function registerListeners() {
    /**
     * This comes from bridge integration, check bridge.ts
     */
    ipcMain.on('message', (_, message) => {
        console.log(message);
    });

    ipcMain.on('send-event', (_, message) => {
        console.log('writing data to bios:', message);
        socketClient?.write(rawStringToBuffer(message));
    });

    ipcMain.on('retry-connection', () => {
        console.log('attempting to reconnect...');
        connectToSocket();
    });

    ipcMain.on('poll-bios-connection', reportBiosStatus);
}

app.on('ready', createWindow)
    .whenReady()
    // .then(() => {
    //     installExtension(REACT_DEVELOPER_TOOLS)
    //         .then(name => console.log(`Added Extension:  ${name}`))
    //         .catch(err => console.log('An error occurred: ', err));
    // })
    .then(registerListeners)
    .catch(e => console.error(e));

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

app.on('before-quit', function () {
    socketClient?.end();
});
