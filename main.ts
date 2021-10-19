function get_part (part: number) {
    if (part == 1 || part == 6) {
        return assets.animation`beginning`
    } else if (part == 2 || part == 7) {
        return assets.animation`beginning to part 1`
    } else if (part == 3 || part == 8) {
        return assets.animation`part 1`
    } else if (part == 4 || part == 9) {
        return assets.animation`part 1 to chorus`
    } else if (part == 5) {
        return assets.animation`chorus`
    } else if (part == 10) {
        return assets.animation`part 1 to chorus 2`
    } else if (part == 11) {
        return assets.animation`chorus 2`
    } else if (part == 12) {
        return assets.animation`chorus 2 to end`
    } else if (part == 13) {
        return assets.animation`end`
    } else if (part == 14) {
        return assets.animation`very end`
    } else {
        return []
    }
}
function make_player () {
    sprite_player = sprites.create(assets.image`crab_idle_left`, SpriteKind.Player)
    tiles.placeOnTile(sprite_player, tiles.getTileLocation(4, 5))
    sprite_player.x += tiles.tileWidth() / 2
}
function setup () {
    scene.setBackgroundColor(9)
    tiles.setTilemap(tilemap`map`)
    musical = MusicalImages.create_musical_image()
    make_player()
}
let sprite_player: Sprite = null
let musical: MusicalImages.MusicalImage = null
stats.turnStats(true)
setup()
for (let index = 0; index <= 13; index++) {
    MusicalImages.set_queue(musical, get_part(index + 1))
    sprite_player.sayText("Part " + (index + 1))
    MusicalImages.play(musical)
}
