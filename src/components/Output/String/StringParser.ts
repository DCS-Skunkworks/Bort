import { IpcRendererEvent } from 'electron';

export default class StringParser {
    private readonly stringBuffer: ArrayBuffer;
    private readonly stringBuffer_uint8: Uint8Array;
    private readonly maxAddress: number;
    private value = '';

    public constructor(
        private readonly baseAddress: number,
        private readonly maxLength: number,
        private readonly updateCallback: (value: string) => void,
    ) {
        this.stringBuffer = new ArrayBuffer(maxLength);
        this.stringBuffer_uint8 = new Uint8Array(this.stringBuffer);
        this.maxAddress = this.baseAddress + this.maxLength;

        this.onReceive = this.onReceive.bind(this);
    }

    public start() {
        // this can probably go up in increments of two, but at least this way we're safe
        for (let i = 0; i < this.maxLength; i++) {
            window.Main.onBiosReceive(this.baseAddress + i, this.onReceive);
        }
    }

    public stop() {
        for (let i = 0; i < this.maxLength; i++) {
            window.Main.stopBiosListening(this.baseAddress + i, this.onReceive);
        }
    }

    private onReceive(event: IpcRendererEvent, address: number, data: Uint16Array) {
        this.updateValue(address, data);
        this.updateCallback(this.value);
    }

    private updateValue(calledAddress: number, data: Uint16Array): void {
        const data_uint8 = new Uint8Array(data.buffer);
        const c1 = this.stringBuffer_uint8[calledAddress - this.baseAddress];
        const v1 = data_uint8[0];
        let updatedBuffer = false;
        if (c1 !== v1) {
            updatedBuffer = true;
            this.stringBuffer_uint8[calledAddress - this.baseAddress] = v1;
        }

        if (this.maxAddress > calledAddress + 1) {
            const c2 = this.stringBuffer_uint8[calledAddress - this.baseAddress + 1];
            const v2 = data_uint8[1];

            if (c2 !== v2) {
                updatedBuffer = true;
                this.stringBuffer_uint8[calledAddress - this.baseAddress + 1] = v2;
            }
        }

        if (!updatedBuffer) {
            return;
        }

        const strComponents: string[] = [];
        for (let i = 0; i < this.stringBuffer.byteLength; i++) {
            if (this.stringBuffer_uint8[i] == 0) break;
            strComponents.push(String.fromCharCode(this.stringBuffer_uint8[i]));
        }

        this.value = strComponents.join('');
    }
}
