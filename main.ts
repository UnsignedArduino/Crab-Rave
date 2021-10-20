namespace SpriteKind {
    export const RhythmStuff = SpriteKind.create()
}
function part_1 () {
	
}
function set_score (s: number) {
    score = s
    update_score()
}
function fade_out (block: boolean) {
    color.startFade(color.Black, color.originalPalette, 1000)
    if (block) {
        color.pauseUntilFadeDone()
    }
}
function update_score () {
    if (!(sprite_score)) {
        sprite_score = textsprite.create("", 0, 15)
        sprite_score.top = 4
        sprite_score.setFlag(SpriteFlag.Ghost, true)
    }
    sprite_score.setText("Score: " + score)
    sprite_score.x = scene.screenWidth() / 2
}
function get_part_music (part: number) {
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
    sprite_player.setFlag(SpriteFlag.Ghost, true)
}
function make_rhythm_stuff () {
    sprite_rhythm_bar = sprites.create(assets.image`rhythm_bar`, SpriteKind.RhythmStuff)
    sprite_rhythm_bar.x = scene.screenWidth() / 2
    sprite_rhythm_bar.top = 16
    sprite_overlapper = sprites.create(assets.image`overlapper`, SpriteKind.Player)
    sprite_overlapper.left = sprite_rhythm_bar.left + 3
    sprite_overlapper.top = 16
}
function setup () {
    scene.setBackgroundColor(9)
    tiles.setTilemap(tilemap`map`)
    set_score(0)
    musical = MusicalImages.create_musical_image()
    make_player()
    make_rhythm_stuff()
}
function run_part (part: number) {
    if (part < 1 && part > 14) {
        return
    }
    timer.background(function () {
        if (part == 1) {
            part_1()
        }
    })
    MusicalImages.set_queue(musical, get_part_music(part))
    MusicalImages.play(musical)
}
function change_score (s: number) {
    score += s
    update_score()
}
let musical: MusicalImages.MusicalImage = null
let sprite_overlapper: Sprite = null
let sprite_rhythm_bar: Sprite = null
let sprite_player: Sprite = null
let sprite_score: TextSprite = null
let score = 0
color.setPalette(
color.Black
)
stats.turnStats(true)
setup()
fade_out(true)
for (let index = 0; index <= 13; index++) {
    run_part(index + 1)
}
