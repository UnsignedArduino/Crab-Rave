function make_player () {
    sprite_player = sprites.create(assets.image`crab_idle_left`, SpriteKind.Player)
    tiles.placeOnTile(sprite_player, tiles.getTileLocation(4, 5))
    sprite_player.x += tiles.tileWidth() / 2
}
function setup () {
    scene.setBackgroundColor(9)
    tiles.setTilemap(tilemap`map`)
    make_player()
}
let sprite_player: Sprite = null
stats.turnStats(true)
setup()
