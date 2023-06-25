export default class IntegerParser {
    private listenerStopper?: () => void;

    public constructor(
        private readonly address: number,
        private readonly mask: number,
        private readonly shiftBy: number,
        private readonly updateCallback: (value: number) => void,
    ) {
        this.listener = this.listener.bind(this);
    }

    public start() {
        this.listenerStopper = window.Main.onBiosReceive(this.address, this.listener);
    }

    public stop() {
        this.listenerStopper?.();
    }

    private readonly listener = (address: number, data: Uint16Array) => {
        this.updateCallback((data[0] & this.mask) >> this.shiftBy);
    };
}
