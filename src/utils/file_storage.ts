import { existsSync, mkdirSync, writeFileSync } from "node:fs";

export class FileStorage {
    private output_directory: string;
    private filename: string = "";
    private file_binary: ArrayBuffer = new ArrayBuffer(0);

    public constructor(output_directory: string) {
        this.output_directory = output_directory;
    }

    public getFilename() {
        return this.filename;
    }

    public setFilename(filename: string) {
        this.filename = filename;
    }

    public getFileBinary() {
        return this.file_binary;
    }

    public setFileBinary(file_binary: ArrayBuffer) {
        this.file_binary = file_binary;
    }

    public writeToDisc(): number {
        if (!existsSync(this.output_directory)) {
            mkdirSync(this.output_directory, { recursive: true });
        }

        if (!this.output_directory.endsWith("/")) {
            this.output_directory = this.output_directory+"/";
        }

        if (this.filename.includes("/")) {
            let foldername = this.filename.split("/")[0];
            mkdirSync(this.output_directory+foldername, { recursive: true });
        }

        if (this.file_binary.byteLength > 0) {
            writeFileSync(this.output_directory+this.filename, new DataView(this.file_binary));
            console.log(`Wrote file '${this.output_directory}${this.filename}' to disc.`);
            return 1;
        }
        console.log(`Skipped file '${this.output_directory}${this.filename}'. is Empty.`);
        return 0;
    }
}
