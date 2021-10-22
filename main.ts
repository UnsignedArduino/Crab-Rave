namespace SpriteKind {
    export const RhythmStuff = SpriteKind.create()
    export const RhythmButton = SpriteKind.create()
    export const RhythmSuccess = SpriteKind.create()
    export const RhythmFail = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.RhythmButton, SpriteKind.RhythmFail, function (sprite, otherSprite) {
    sprite.destroy()
})
function part_1 () {
    button_frequency = 2000
    while (current_part == 1) {
        summon_button_press(allowed_buttons._pickRandom())
        pause(randint(button_frequency - 500, button_frequency + 500))
    }
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
    sprite_overlapper = sprites.create(assets.image`overlapper`, SpriteKind.RhythmSuccess)
    sprite_overlapper.left = sprite_rhythm_bar.left + 8
    sprite_overlapper.top = sprite_rhythm_bar.top
    sprite_overlapper.z = 2
    sprite_failed_overlapper = sprites.create(assets.image`button_failed_overlapper`, SpriteKind.RhythmFail)
    sprite_failed_overlapper.right = sprite_rhythm_bar.left
    sprite_failed_overlapper.top = sprite_rhythm_bar.top
    sprite_failed_overlapper.setFlag(SpriteFlag.Invisible, true)
}
function setup () {
    scene.setBackgroundColor(9)
    tiles.setTilemap(tilemap`map`)
    set_score(0)
    button_speed = 50
    button_frequency = 1000
    current_part = 0
    allowed_buttons = [
    controller.combos.idToString(controller.combos.ID.up),
    controller.combos.idToString(controller.combos.ID.down),
    controller.combos.idToString(controller.combos.ID.left),
    controller.combos.idToString(controller.combos.ID.right)
    ]
    musical = MusicalImages.create_musical_image()
    make_player()
    make_rhythm_stuff()
}
function summon_button_press (button: string) {
    sprite_button_press = sprites.create(get_button_image(button), SpriteKind.RhythmButton)
    sprite_button_press.top = sprite_overlapper.top
    sprite_button_press.right = sprite_rhythm_bar.right
    sprite_button_press.z = 1
    sprite_button_press.vx = button_speed * -1
}
function get_button_image (button: string) {
    if (button == controller.combos.idToString(controller.combos.ID.up)) {
        return assets.image`up_button`
    } else if (button == controller.combos.idToString(controller.combos.ID.down)) {
        return assets.image`down_button`
    } else if (button == controller.combos.idToString(controller.combos.ID.left)) {
        return assets.image`left_button`
    } else if (button == controller.combos.idToString(controller.combos.ID.right)) {
        return assets.image`right_button`
    } else {
        return [][0]
    }
}
function run_part (part: number) {
    if (part < 1 && part > 14) {
        return
    }
    current_part = part
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
let sprite_button_press: Sprite = null
let musical: MusicalImages.MusicalImage = null
let button_speed = 0
let sprite_failed_overlapper: Sprite = null
let sprite_overlapper: Sprite = null
let sprite_rhythm_bar: Sprite = null
let sprite_player: Sprite = null
let sprite_score: TextSprite = null
let score = 0
let allowed_buttons: string[] = []
let current_part = 0
let button_frequency = 0
color.setPalette(
color.Black
)
stats.turnStats(true)
setup()
fade_out(true)
for (let index = 0; index <= 13; index++) {
    run_part(index + 1)
}
