// Auto-generated code. Do not edit.
namespace myTiles {
    //% fixedInstance jres blockIdentity=images._tile
    export const transparency16 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile1 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile2 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile3 = image.ofBuffer(hex``);

    helpers._registerFactory("tilemap", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "map":
            case "level1":return tiles.createTilemap(hex`0a0008000000000000000000000000000000000000000000000000000000000000000005000000000000000000040000000000000000000600000000000003000101010101010101010102020202020202020202`, img`
. . . . . . . . . . 
. . . . . . . . . . 
. . . . . . . . . . 
. . . . . . . . . . 
. . . . . . . . . . 
. . . . . . . . . . 
. . . . . . . . . . 
. . . . . . . . . . 
`, [myTiles.transparency16,sprites.builtin.oceanSand6,sprites.builtin.oceanSand10,sprites.builtin.coral0,myTiles.tile2,myTiles.tile1,myTiles.tile3], TileScale.Sixteen);
        }
        return null;
    })

    helpers._registerFactory("tile", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "transparency16":return transparency16;
            case "tall_seaweed_1":
            case "tile1":return tile1;
            case "tall_seaweed_2":
            case "tile2":return tile2;
            case "tall_seaweed_3":
            case "tile3":return tile3;
        }
        return null;
    })

}
// Auto-generated code. Do not edit.
