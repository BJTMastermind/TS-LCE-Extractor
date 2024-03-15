import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { exit } from "node:process";
import { inflateSync } from "node:zlib";
import { LCEPlatform } from "./lce_platform";

export class SavegameExtractor {
    private data: DataView;
    private extractedData!: Map<string, ArrayBuffer>;

    public constructor(savegameFile: string, platform: LCEPlatform) {
        if (!existsSync(savegameFile)) {
            console.log(`Failed to read '${savegameFile}'. File does not exist.`);
            exit(1);
        }
        let data: ArrayBuffer = this.decompress(readFileSync(savegameFile).buffer, platform);
        this.data = new DataView(data);
    }

    public extractToMemory(): Map<string, ArrayBuffer> {
        this.extractedData = new Map<string, ArrayBuffer>();

        let offset: number = this.data.getInt32(0);
        let fileCount: number = this.data.getInt32(4);

        for (let i = offset; i < (offset + (144 * fileCount)); i += 144) {
            let filename: string = this.getString(this.data, i, 128).split("\0")[0]!.replace("DIM-1", "DIM-1/");

            let fileSize: number = this.data.getInt32(i + 128);
            let fileOffset: number = this.data.getInt32(i + 128 + 4);

            if (fileSize <= 0) {
                continue;
            }

            let fileData: ArrayBuffer = this.data.buffer.slice(fileOffset, fileOffset + fileSize);

            this.extractedData.set(filename, fileData);
        }
        return this.extractedData;
    }

    public writeToDisc(outputPath: string) {
        for (let filename of this.extractedData.keys()) {
            let fileData: ArrayBuffer = this.extractedData.get(filename)!;

            let extendedPath: string = "";
            if (filename.includes("/")) {
                let split: string[] = filename.split("/");
                filename = split[split.length - 1]!;
                for (let i: number = 0; i < split.length - 1; i++) {
                    extendedPath += split[i] + "/";
                }
            }

            if (!outputPath.endsWith("/")) {
                outputPath += "/";
            }

            if (!existsSync(outputPath+extendedPath)) {
                mkdirSync(outputPath+extendedPath, { recursive: true } );
            }

            let output: string = outputPath+extendedPath+filename;
            writeFileSync(output, new DataView(fileData));
            console.log(`Wrote file '${output}' to disc.`);
        }
    }

    // TODO: Implement decompressing file
    private decompress(src: ArrayBuffer, platform: LCEPlatform): ArrayBuffer {
        switch (platform) {
            case LCEPlatform.XBOX360: // XMemCompress
                return src;
            case LCEPlatform.WIIU: // Zlib
                let zlibData = src.slice(8);
                let out: ArrayBuffer = inflateSync(zlibData).buffer;
                return out;
            default: // PS3 - No Compression
                return src;
        }
    }

    private getString(buffer: DataView, offset: number, length: number): string {
        let decoder = new TextDecoder("utf-16be");
        let stringBytes = buffer.buffer.slice(offset, offset + length);
        return decoder.decode(stringBytes);
    }
}

function main() {
    let extractor: SavegameExtractor = new SavegameExtractor("./test_files/savegame.wii", LCEPlatform.WIIU);
    extractor.extractToMemory();
    extractor.writeToDisc("./extracted/");
}

main();
