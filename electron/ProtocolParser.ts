export default class ProtocolParser {
    state: State = State.WAIT_FOR_SYNC;
    sync_byte_count = 0;
    address_buffer: ArrayBuffer = new ArrayBuffer(2);
    address_uint8: Uint8Array = new Uint8Array(this.address_buffer);
    address_uint16: Uint16Array = new Uint16Array(this.address_buffer);
    count_buffer: ArrayBuffer = new ArrayBuffer(2);
    count_uint8: Uint8Array = new Uint8Array(this.count_buffer);
    count_uint16: Uint16Array = new Uint16Array(this.count_buffer);
    data_buffer: ArrayBuffer = new ArrayBuffer(2);
    data_uint8: Uint8Array = new Uint8Array(this.data_buffer);
    data_uint16: Uint16Array = new Uint16Array(this.data_buffer);

    readonly callback: ParserCallback;

    public constructor(callback: ParserCallback) {
        this.callback = callback;
    }

    public processChar(c: number) {
        switch (this.state) {
            case State.WAIT_FOR_SYNC:
                break;

            case State.ADDRESS_LOW:
                this.address_uint8[0] = c;
                this.state = State.ADDRESS_HIGH;
                break;

            case State.ADDRESS_HIGH:
                this.address_uint8[1] = c;
                if (this.address_uint16[0] !== 0x5555) {
                    this.state = State.COUNT_LOW;
                } else {
                    this.state = State.WAIT_FOR_SYNC;
                }
                break;

            case State.COUNT_LOW:
                this.count_uint8[0] = c;
                this.state = State.COUNT_HIGH;
                break;

            case State.COUNT_HIGH:
                this.count_uint8[1] = c;
                this.state = State.DATA_LOW;
                break;

            case State.DATA_LOW:
                this.data_uint8[0] = c;
                this.count_uint16[0]--;
                this.state = State.DATA_HIGH;
                break;

            case State.DATA_HIGH:
                this.data_uint8[1] = c;
                this.count_uint16[0]--;
                this.callback(this.address_uint16, this.data_uint16);
                this.address_uint16[0] += 2;
                if (this.count_uint16[0] === 0) {
                    this.state = State.ADDRESS_LOW;
                } else {
                    this.state = State.DATA_LOW;
                }
                break;
        }

        if (c === 0x55) this.sync_byte_count++;
        else this.sync_byte_count = 0;

        if (this.sync_byte_count === 4) {
            this.state = State.ADDRESS_LOW;
            this.sync_byte_count = 0;
        }
    }
}

type ParserCallback = (address: Uint16Array, data: Uint16Array) => void;

enum State {
    WAIT_FOR_SYNC,
    ADDRESS_LOW,
    ADDRESS_HIGH,
    COUNT_LOW,
    COUNT_HIGH,
    DATA_LOW,
    DATA_HIGH,
}
