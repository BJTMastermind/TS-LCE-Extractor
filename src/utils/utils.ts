export class Utils {

    public static bytesToString(bytes: ArrayBuffer): string {
        return new TextDecoder().decode(bytes).replace("\0", "");
    }

    public static copy(src: ArrayBuffer, srcOffset: number, length: number) {
        return src.slice(srcOffset, srcOffset + length);
    }

    public static stringToBytes(str: string): ArrayBuffer {
        let strAsBytes = new DataView(new TextEncoder().encode(str).buffer);
        let bytes = new DataView(new ArrayBuffer(strAsBytes.byteLength * 2));

        for (let i = 0, j = 0; i < strAsBytes.byteLength; i++) {
            bytes.setUint8(j, strAsBytes.getUint8(i));
            j += 2;
        }
        return bytes.buffer;
    }

    public static indexOf(src: DataView, find: ArrayBuffer): number {
        if (find.byteLength > src.buffer.byteLength) {
            return -1;
        }

        for (let i: number = 0; i < src.byteLength - find.byteLength; i++) {
            let found: boolean = true;

            for (let j: number = 0; j < find.byteLength; j++) {
                if (src.getUint8(i + j) != new DataView(find).getUint8(j)) {
                    found = false;
                    break;
                }
            }

            if (found) {
                return i;
            }
        }
        return -1;
    }

    public static lastIndexOf(src: DataView, find: ArrayBuffer): number {
        if (find.byteLength > src.buffer.byteLength) {
            return -1;
        }

        for (let i: number = src.byteLength - find.byteLength; i > 0; i--) {
            let found: boolean = true;

            for (let j: number = 0; j < find.byteLength; j++) {
                if (src.getUint8(i + j) != new DataView(find).getUint8(j)) {
                    found = false;
                    break;
                }
            }

            if (found) {
                return i;
            }
        }
        return -1;
    }

    public static countOccurences(src: DataView, find: ArrayBuffer): number {
        let occurences: number = 0;

        if (find.byteLength > src.byteLength) {
            return occurences;
        }

        for (let i: number = 0; i < src.byteLength - find.byteLength; i++) {
            let found: boolean = true;

            for (let j: number = 0; j < find.byteLength; j++) {
                if (src.getUint8(i + j) != new DataView(find).getUint8(j)) {
                    found = false;
                    break;
                }
            }

            if (found) {
                occurences++;
            }
        }
        return occurences;
    }

    public static getOccurencesIndex(src: DataView, find: ArrayBuffer): Int32Array {
        let occurences_indexes: Int32Array = new Int32Array();

        if (find.byteLength > src.byteLength) {
            return occurences_indexes;
        }

        let index = 0;
        for (let i: number = 0, j = 0; i < src.byteLength - find.byteLength; i++) {
            let found: boolean = true;

            for (let j: number = 0; j < find.byteLength; j++) {
                if (src.getUint8(i + j) != new DataView(find).getUint8(j)) {
                    found = false;
                    break;
                }
            }

            if (found) {
                occurences_indexes[index] = i;
                index++;
            }
        }
        return occurences_indexes;
    }
}
