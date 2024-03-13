import { readFileSync, writeFileSync } from "node:fs";
import { Utils } from "./utils/utils";
import { FileStorage } from "./utils/file_storage";
import { LCEPlatform } from "./lce_platform";

export class SavegameExtractor {

    public extract(savegameFile: string, platform: LCEPlatform) {
        let file: DataView = new DataView(this.decompress(readFileSync(savegameFile).buffer, platform).slice(0));

        let files_extracted: number = 0;
        let fs: FileStorage = new FileStorage("./extracted");

        // Get file count (second 4 bytes, first 4 is offset which we don't use)
        let file_count: number = file.getInt32(4);

        // Get level.dat file
        let level_filename: ArrayBuffer = Utils.stringToBytes("level.dat");
        let level_index: number = Utils.indexOf(file, level_filename);
        let level_length: number = file.getInt32(level_index + 127);
        let level_offset: number = file.getInt32(level_index + 131);

        fs.setFilename("level.dat");
        fs.setFileBinary(Utils.copy(file.buffer, level_offset, level_length));
        files_extracted += fs.writeToDisc();

        // Get Mineshaft.dat file
        let mineshaft_filename: ArrayBuffer = Utils.stringToBytes("data/Mineshaft.dat");
        let mineshaft_index: number = Utils.indexOf(file, mineshaft_filename);
        let mineshaft_length: number = file.getInt32(mineshaft_index + 127);
        let mineshaft_offset: number = file.getInt32(mineshaft_index + 131);

        fs.setFilename("data/Mineshaft.dat");
        fs.setFileBinary(Utils.copy(file.buffer, mineshaft_offset, mineshaft_length));
        files_extracted += fs.writeToDisc();

        // Get Fortress.dat file
        let fortress_filename: ArrayBuffer = Utils.stringToBytes("data/Fortress.dat");
        let fortress_index: number = Utils.indexOf(file, fortress_filename);
        let fortress_length: number = file.getInt32(fortress_index + 127);
        let fortress_offset: number = file.getInt32(fortress_index + 131);

        fs.setFilename("data/Fortress.dat");
        fs.setFileBinary(Utils.copy(file.buffer, fortress_offset, fortress_length));
        files_extracted += fs.writeToDisc();

        // Get Temple.dat file
        let temple_filename: ArrayBuffer = Utils.stringToBytes("data/Temple.dat");
        let temple_index: number = Utils.indexOf(file, temple_filename);
        let temple_length: number = file.getInt32(temple_index + 127);
        let temple_offset: number = file.getInt32(temple_index + 131);

        fs.setFilename("data/Temple.dat");
        fs.setFileBinary(Utils.copy(file.buffer, temple_offset, temple_length));
        files_extracted += fs.writeToDisc();

        // Get Monument.dat file
        let monument_filename: ArrayBuffer = Utils.stringToBytes("data/Monument.dat");
        let monument_index: number = Utils.indexOf(file, monument_filename);
        let monument_length: number = file.getInt32(monument_index + 127);
        let monument_offset: number = file.getInt32(monument_index + 131);

        fs.setFilename("data/Monument.dat");
        fs.setFileBinary(Utils.copy(file.buffer, monument_offset, monument_length));
        files_extracted += fs.writeToDisc();

        // Get Villages.dat file
        let villages_filename: ArrayBuffer = Utils.stringToBytes("data/villages.dat");
        let villages_index: number = Utils.indexOf(file, villages_filename);
        let villages_length: number = file.getInt32(villages_index + 127);
        let villages_offset: number = file.getInt32(villages_index + 131);

        fs.setFilename("data/villages.dat");
        fs.setFileBinary(Utils.copy(file.buffer, villages_offset, villages_length));
        files_extracted += fs.writeToDisc();

        // Get Village.dat file
        let village_filename: ArrayBuffer = Utils.stringToBytes("data/Village.dat");
        let village_index: number = Utils.indexOf(file, village_filename);
        let village_length: number = file.getInt32(village_index + 127);
        let village_offset: number = file.getInt32(village_index + 131);

        fs.setFilename("data/Village.dat");
        fs.setFileBinary(Utils.copy(file.buffer, village_offset, village_length));
        files_extracted += fs.writeToDisc();

        // Get Mansion.dat file
        let mansion_filename: ArrayBuffer = Utils.stringToBytes("data/Mansion.dat");
        let mansion_index: number = Utils.indexOf(file, mansion_filename);
        let mansion_length: number = file.getInt32(mansion_index + 127);
        let mansion_offset: number = file.getInt32(mansion_index + 131);

        fs.setFilename("data/Mansion.dat");
        fs.setFileBinary(Utils.copy(file.buffer, mansion_offset, mansion_length));
        files_extracted += fs.writeToDisc();

        // Get Shipwreck.dat file
        let shipwreck_filename: ArrayBuffer = Utils.stringToBytes("data/Shipwreck.dat");
        let shipwreck_index: number = Utils.indexOf(file, shipwreck_filename);
        let shipwreck_length: number = file.getInt32(shipwreck_index + 127);
        let shipwreck_offset: number = file.getInt32(shipwreck_index + 131);

        fs.setFilename("data/Shipwreck.dat");
        fs.setFileBinary(Utils.copy(file.buffer, shipwreck_offset, shipwreck_length));
        files_extracted += fs.writeToDisc();

        // Get largeDataMappings.dat file
        let largedatamappings_filename: ArrayBuffer = Utils.stringToBytes("data/largeMapDataMappings.dat");
        let large_data_mappings_index: number = Utils.indexOf(file, largedatamappings_filename);
        let large_data_mappings_length: number = file.getInt32(large_data_mappings_index + 127);
        let large_data_mappings_offset: number = file.getInt32(large_data_mappings_index + 131);

        fs.setFilename("data/largeMapDataMappings.dat");
        fs.setFileBinary(Utils.copy(file.buffer, large_data_mappings_offset, large_data_mappings_length));
        files_extracted += fs.writeToDisc();

        // Get requiredGameRules.grf file
        let gamerules_filename: ArrayBuffer = Utils.stringToBytes("requiredGameRules.grf");
        let gamerules_index: number = Utils.indexOf(file, gamerules_filename);
        let gamerules_length: number = file.getInt32(gamerules_index + 127);
        let gamerules_offset: number = file.getInt32(gamerules_index + 131);

        fs.setFilename("requiredGameRules.grf");
        fs.setFileBinary(Utils.copy(file.buffer, gamerules_offset, gamerules_length));
        files_extracted += fs.writeToDisc();

        // Get Stronghold.dat file
        let stronghold_filename: ArrayBuffer = Utils.stringToBytes("data/StrongHold.dat");
        let stronghold_index: number = Utils.indexOf(file, stronghold_filename);
        let stronghold_length: number = file.getInt32(stronghold_index + 127);
        let stronghold_offset: number = file.getInt32(stronghold_index + 131);

        fs.setFilename("data/StrongHold.dat");
        fs.setFileBinary(Utils.copy(file.buffer, stronghold_offset, stronghold_length));
        files_extracted += fs.writeToDisc();

        // Get Buried Treaure.dat file
        let buriedTreaure_filename: ArrayBuffer = Utils.stringToBytes("data/Buried Treasure.dat");
        let buried_treasure_index: number = Utils.indexOf(file, buriedTreaure_filename);
        let buried_treasure_length: number = file.getInt32(buried_treasure_index + 127);
        let buried_treasure_offset: number = file.getInt32(buried_treasure_index + 131);

        fs.setFilename("data/Buried Treasure.dat");
        fs.setFileBinary(Utils.copy(file.buffer, buried_treasure_offset, buried_treasure_length));
        files_extracted += fs.writeToDisc();

        // Get DIM-1 region files
        let dim_nether_neg1_neg1_filename: ArrayBuffer = Utils.stringToBytes("DIM-1/r.-1.-1.mcr");
        let dim_nether_0_neg1_filename: ArrayBuffer = Utils.stringToBytes("DIM-1/r.0.-1.mcr");
        let dim_nether_0_0_filename: ArrayBuffer = Utils.stringToBytes("DIM-1/r.0.0.mcr");
        let dim_nether_neg1_0_filename: ArrayBuffer = Utils.stringToBytes("DIM-1/r.-1.0.mcr");

        let dim_nether_neg1_neg1_index: number = Utils.indexOf(file, dim_nether_neg1_neg1_filename);
        let dim_nether_0_neg1_index: number = Utils.indexOf(file, dim_nether_0_neg1_filename);
        let dim_nether_0_0_index: number = Utils.indexOf(file, dim_nether_0_0_filename);
        let dim_nether_neg1_0_index: number = Utils.indexOf(file, dim_nether_neg1_0_filename);

        if (dim_nether_neg1_neg1_index == -1) {
            dim_nether_neg1_neg1_index = Utils.indexOf(file, Utils.stringToBytes("DIM-1r.-1.-1.mcr"));
            dim_nether_0_neg1_index = Utils.indexOf(file, Utils.stringToBytes("DIM-1r.0.-1.mcr"));
            dim_nether_0_0_index = Utils.indexOf(file, Utils.stringToBytes("DIM-1r.0.0.mcr"));
            dim_nether_neg1_0_index = Utils.indexOf(file, Utils.stringToBytes("DIM-1r.-1.0.mcr"));
        }
        let dim_nether_neg1_neg1_length: number = file.getInt32(dim_nether_neg1_neg1_index + 127);
        let dim_nether_neg1_neg1_offset: number = file.getInt32(dim_nether_neg1_neg1_index + 131);
        let dim_nether_0_neg1_length: number = file.getInt32(dim_nether_0_neg1_index + 127);
        let dim_nether_0_neg1_offset: number = file.getInt32(dim_nether_0_neg1_index + 131);
        let dim_nether_0_0_length: number = file.getInt32(dim_nether_0_0_index + 127);
        let dim_nether_0_0_offset: number = file.getInt32(dim_nether_0_0_index + 131);
        let dim_nether_neg1_0_length: number = file.getInt32(dim_nether_neg1_0_index + 127);
        let dim_nether_neg1_0_offset: number = file.getInt32(dim_nether_neg1_0_index + 131);

        fs.setFilename("DIM-1/r.-1.-1.mcr");
        fs.setFileBinary(Utils.copy(file.buffer, dim_nether_neg1_neg1_offset, dim_nether_neg1_neg1_length));
        files_extracted += fs.writeToDisc();

        fs.setFilename("DIM-1/r.0.-1.mcr");
        fs.setFileBinary(Utils.copy(file.buffer, dim_nether_0_neg1_offset, dim_nether_0_neg1_length));
        files_extracted += fs.writeToDisc();

        fs.setFilename("DIM-1/r.0.0.mcr");
        fs.setFileBinary(Utils.copy(file.buffer, dim_nether_0_0_offset, dim_nether_0_0_length));
        files_extracted += fs.writeToDisc();

        fs.setFilename("DIM-1/r.-1.0.mcr");
        fs.setFileBinary(Utils.copy(file.buffer, dim_nether_neg1_0_offset, dim_nether_neg1_0_length));
        files_extracted += fs.writeToDisc();

        // Get DIM1 region files
        let dim_end_neg1_neg1_filename: ArrayBuffer = Utils.stringToBytes("DIM1/r.-1.-1.mcr");
        let dim_end_0_neg1_filename: ArrayBuffer = Utils.stringToBytes("DIM1/r.0.-1.mcr");
        let dim_end_0_0_filename: ArrayBuffer = Utils.stringToBytes("DIM1/r.0.0.mcr");
        let dim_end_neg1_0_filename: ArrayBuffer = Utils.stringToBytes("DIM1/r.-1.0.mcr");

        let dim_end_neg1_neg1_index: number = Utils.indexOf(file, dim_end_neg1_neg1_filename);
        let dim_end_0_neg1_index: number = Utils.indexOf(file, dim_end_0_neg1_filename);
        let dim_end_0_0_index: number = Utils.indexOf(file, dim_end_0_0_filename);
        let dim_end_neg1_0_index: number = Utils.indexOf(file, dim_end_neg1_0_filename);

        let dim_end_neg1_neg1_length: number = file.getInt32(dim_end_neg1_neg1_index + 127);
        let dim_end_neg1_neg1_offset: number = file.getInt32(dim_end_neg1_neg1_index + 131);
        let dim_end_0_neg1_length: number = file.getInt32(dim_end_0_neg1_index + 127);
        let dim_end_0_neg1_offset: number = file.getInt32(dim_end_0_neg1_index + 131);
        let dim_end_0_0_length: number = file.getInt32(dim_end_0_0_index + 127);
        let dim_end_0_0_offset: number = file.getInt32(dim_end_0_0_index + 131);
        let dim_end_neg1_0_length: number = file.getInt32(dim_end_neg1_0_index + 127);
        let dim_end_neg1_0_offset: number = file.getInt32(dim_end_neg1_0_index + 131);

        fs.setFilename("DIM1/r.-1.-1.mcr");
        fs.setFileBinary(Utils.copy(file.buffer, dim_end_neg1_neg1_offset, dim_end_neg1_neg1_length));
        files_extracted += fs.writeToDisc();

        fs.setFilename("DIM1/r.0.-1.mcr");
        fs.setFileBinary(Utils.copy(file.buffer, dim_end_0_neg1_offset, dim_end_0_neg1_length));
        files_extracted += fs.writeToDisc();

        fs.setFilename("DIM1/r.0.0.mcr");
        fs.setFileBinary(Utils.copy(file.buffer, dim_end_0_0_offset, dim_end_0_0_length));
        files_extracted += fs.writeToDisc();

        fs.setFilename("DIM1/r.-1.0.mcr");
        fs.setFileBinary(Utils.copy(file.buffer, dim_end_neg1_0_offset, dim_end_neg1_0_length));
        files_extracted += fs.writeToDisc();

        // Get region files
        let dim_overworld_neg1_neg1_filename: ArrayBuffer = Utils.stringToBytes("r.-1.-1.mcr");
        let dim_overworld_0_neg1_filename: ArrayBuffer = Utils.stringToBytes("r.0.-1.mcr");
        let dim_overworld_0_0_filename: ArrayBuffer = Utils.stringToBytes("r.0.0.mcr");
        let dim_overworld_neg1_0_filename: ArrayBuffer = Utils.stringToBytes("r.-1.0.mcr");

        let dim_overworld_neg1_neg1_index: number = Utils.lastIndexOf(file, dim_overworld_neg1_neg1_filename);
        let dim_overworld_0_neg1_index: number = Utils.lastIndexOf(file, dim_overworld_0_neg1_filename);
        let dim_overworld_0_0_index: number = Utils.lastIndexOf(file, dim_overworld_0_0_filename);
        let dim_overworld_neg1_0_index: number = Utils.lastIndexOf(file, dim_overworld_neg1_0_filename);

        let dim_overworld_neg1_neg1_length: number = file.getInt32(dim_overworld_neg1_neg1_index + 127);
        let dim_overworld_neg1_neg1_offset: number = file.getInt32(dim_overworld_neg1_neg1_index + 131);
        let dim_overworld_0_neg1_length: number = file.getInt32(dim_overworld_0_neg1_index + 127);
        let dim_overworld_0_neg1_offset: number = file.getInt32(dim_overworld_0_neg1_index + 131);
        let dim_overworld_0_0_length: number = file.getInt32(dim_overworld_0_0_index + 127);
        let dim_overworld_0_0_offset: number = file.getInt32(dim_overworld_0_0_index + 131);
        let dim_overworld_neg1_0_length: number = file.getInt32(dim_overworld_neg1_0_index + 127);
        let dim_overworld_neg1_0_offset: number = file.getInt32(dim_overworld_neg1_0_index + 131);

        fs.setFilename("r.-1.-1.mcr");
        fs.setFileBinary(Utils.copy(file.buffer, dim_overworld_neg1_neg1_offset, dim_overworld_neg1_neg1_length));
        files_extracted += fs.writeToDisc();

        fs.setFilename("r.0.-1.mcr");
        fs.setFileBinary(Utils.copy(file.buffer, dim_overworld_0_neg1_offset, dim_overworld_0_neg1_length));
        files_extracted += fs.writeToDisc();

        fs.setFilename("r.0.0.mcr");
        fs.setFileBinary(Utils.copy(file.buffer, dim_overworld_0_0_offset, dim_overworld_0_0_length));
        files_extracted += fs.writeToDisc();

        fs.setFilename("r.-1.0.mcr");
        fs.setFileBinary(Utils.copy(file.buffer, dim_overworld_neg1_0_offset, dim_overworld_neg1_0_length));
        files_extracted += fs.writeToDisc();

        // Get player data files
        let player_searchPattern: ArrayBuffer = Utils.stringToBytes("players/");
        let players_indexes: Int32Array = Utils.getOccurencesIndex(file, player_searchPattern);

        for (let i: number = 0; i < players_indexes.length; i++) {
            let file_extention: number = 0;
            let j: number = -1;

            while (file_extention != 46) {
                j++;
                file_extention = file.getInt32(players_indexes[i]! + j);
            }

            let player_filename_length: number = (players_indexes[i]! + j) - players_indexes[i]! + 7;
            let player_filename: ArrayBuffer = Utils.copy(file.buffer, players_indexes[i]!, player_filename_length);
            let player_index: number = Utils.indexOf(file, player_filename);
            let player_length: number = file.getInt32(player_index + 127);
            let player_offset: number = file.getInt32(player_index + 131);

            fs.setFilename(Utils.bytesToString(player_filename));
            fs.setFileBinary(Utils.copy(file.buffer, player_offset, player_length));
            files_extracted += fs.writeToDisc();
        }

        // Get map files
        let map_searchPattern: ArrayBuffer = Utils.stringToBytes("data/map_");
        let map_count: number = Utils.countOccurences(file, map_searchPattern);

        for (let i: number = 0; i < map_count; i++) {
            let map_filename: ArrayBuffer = Utils.stringToBytes(`data/map_${i}.dat`);
            let map_index: number = Utils.indexOf(file, map_filename);
            let map_length: number = file.getInt32(map_index + 127);
            let map_offset: number = file.getInt32(map_index + 131);

            fs.setFilename(`data/map_${i}.dat`);
            fs.setFileBinary(Utils.copy(file.buffer, map_offset, map_length));
            files_extracted += fs.writeToDisc();
        }

        // Output message
        if (files_extracted != file_count) {
            console.log(`Some files could not be extracted: ${files_extracted}/${file_count} files extracted.`);
        } else {
            console.log(`All files extracted: ${files_extracted}/${file_count} files extracted.`);
        }
    }

    // TODO: Implement decompressing file (X360: XMemCompress / WiiU: Zlib)
    private decompress(src: ArrayBuffer, platform: LCEPlatform): ArrayBuffer {
        switch (platform) {
            case LCEPlatform.XBOX360:
                return src;
            case LCEPlatform.WIIU:
                return src;
            default:
                return src;
        }
    }
}

function main() {
    let extractor: SavegameExtractor = new SavegameExtractor();
    extractor.extract("./savegame-decompressed.dat", LCEPlatform.XBOX360);
}

main();
