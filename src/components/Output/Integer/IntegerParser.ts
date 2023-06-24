import { IpcRendererEvent } from 'electron';

export default class IntegerParser {
    public constructor(
        private readonly address: number,
        private readonly mask: number,
        private readonly shiftBy: number,
        private readonly updateCallback: (value: number) => void,
    ) {
        this.onReceive = this.onReceive.bind(this);
    }

    public start() {
        window.Main.onBiosReceive(this.address, this.onReceive);
    }

    public stop() {
        window.Main.stopBiosListening(this.address, this.onReceive);
    }

    private onReceive(event: IpcRendererEvent, address: number, data: Uint16Array) {
        this.updateCallback((data[0] & this.mask) >> this.shiftBy);
    }
}
