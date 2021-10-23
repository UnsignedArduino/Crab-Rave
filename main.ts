namespace SpriteKind {
    export const RhythmStuff = SpriteKind.create()
    export const RhythmButton = SpriteKind.create()
    export const RhythmSuccess = SpriteKind.create()
    export const RhythmFail = SpriteKind.create()
    export const DecorationCrab = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.RhythmButton, SpriteKind.RhythmFail, function (sprite, otherSprite) {
    sprite.setVelocity(0, 100)
    sprite.setFlag(SpriteFlag.Ghost, true)
    timer.after(100, function () {
        sprite.destroy()
    })
    popup_message(0, false)
})
function part_3 () {
    animation_state = 2
    do_buttons_for_part(3, 1500)
}
function part_4_transition () {
    animation_state = 3
    add_crabs(1)
    do_buttons_for_part(4, 1250)
}
function part_1 () {
    animation_state = 0
    do_buttons_for_part(1, 2000)
}
function get_button_pressed () {
    if (controller.up.isPressed()) {
        return controller.combos.idToString(controller.combos.ID.up)
    } else if (controller.down.isPressed()) {
        return controller.combos.idToString(controller.combos.ID.down)
    } else if (controller.left.isPressed()) {
        return controller.combos.idToString(controller.combos.ID.left)
    } else if (controller.right.isPressed()) {
        return controller.combos.idToString(controller.combos.ID.right)
    } else {
        return ""
    }
}
function set_score (s: number) {
    score = s
}
function fade_out (block: boolean) {
    color.startFade(color.Black, color.originalPalette, 1000)
    if (block) {
        color.pauseUntilFadeDone()
    }
}
sprites.onOverlap(SpriteKind.RhythmButton, SpriteKind.RhythmSuccess, function (sprite, otherSprite) {
    if (get_button_pressed() != "") {
        if (sprites.readDataString(sprite, "direction") == get_button_pressed()) {
            sprite.setVelocity(0, -100)
            sprite.setFlag(SpriteFlag.Ghost, true)
            timer.after(100, function () {
                sprite.destroy()
            })
            accuracy = Math.map(Math.abs(sprite.x - otherSprite.x), 8, 0, 0, 100)
            if (false) {
                sprite_player.sayText(Math.abs(sprite.x - otherSprite.x))
            }
            if (false) {
                sprite_player.sayText(Math.round(accuracy))
            }
            if (false) {
                sprite_player.sayText(accuracy / 100)
            }
            change_score(Math.round(accuracy))
            popup_message(accuracy, true)
        } else {
            sprite.setVelocity(0, -100)
            sprite.setFlag(SpriteFlag.Ghost, true)
            timer.after(100, function () {
                sprite.destroy()
            })
            popup_message(0, false)
        }
    }
})
function update_score () {
    if (!(sprite_score)) {
        sprite_score = textsprite.create("", 0, 15)
        sprite_score.top = 4
        sprite_score.setFlag(SpriteFlag.Ghost, true)
    }
    sprite_score.setText("Score: " + show_score)
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
    sprite_player.setFlag(SpriteFlag.Ghost, true)
    sprites.setDataBoolean(sprite_player, "facing_left", true)
    tiles.placeOnTile(sprite_player, tiles.getTileLocation(4, 5))
    sprite_player.x += tiles.tileWidth() / 2
}
function add_crabs (count: number) {
    timer.background(function () {
        for (let index = 0; index < count; index++) {
            sprite_left_crab = sprites.create(assets.image`crab_idle_right`, SpriteKind.DecorationCrab)
            sprite_left_crab.setFlag(SpriteFlag.Ghost, true)
            sprites.setDataBoolean(sprite_left_crab, "facing_left", true)
            sprite_left_crab.right = 0
            sprite_left_crab.y = sprite_player.y
            animation.runImageAnimation(
            sprite_left_crab,
            assets.animation`crab_right_walking_animation`,
            200,
            true
            )
            sprite_right_crab = sprites.create(assets.image`crab_idle_left`, SpriteKind.DecorationCrab)
            sprite_right_crab.setFlag(SpriteFlag.Ghost, true)
            sprites.setDataBoolean(sprite_right_crab, "facing_left", false)
            sprite_right_crab.left = scene.screenWidth()
            sprite_right_crab.y = sprite_player.y
            animation.runImageAnimation(
            sprite_right_crab,
            assets.animation`crab_right_walking_animation0`,
            200,
            true
            )
            timer.background(function () {
                story.spriteMoveToLocation(sprite_right_crab, all_crabs[all_crabs.length - 1].x + 32, sprite_player.y, 30)
                animation.stopAnimation(animation.AnimationTypes.All, sprite_right_crab)
            })
            story.spriteMoveToLocation(sprite_left_crab, all_crabs[0].x - 32, sprite_player.y, 30)
            animation.stopAnimation(animation.AnimationTypes.All, sprite_left_crab)
            all_crabs.unshift(sprite_left_crab)
            all_crabs.push(sprite_right_crab)
        }
    })
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
    show_score = 0
    update_score()
    button_speed = 50
    current_part = 0
    animation_state = 0
    allowed_buttons = [
    controller.combos.idToString(controller.combos.ID.up),
    controller.combos.idToString(controller.combos.ID.down),
    controller.combos.idToString(controller.combos.ID.left),
    controller.combos.idToString(controller.combos.ID.right)
    ]
    musical = MusicalImages.create_musical_image()
    make_player()
    all_crabs = [sprite_player]
    make_rhythm_stuff()
}
function summon_button_press (button: string) {
    sprite_button_press = sprites.create(get_button_image(button), SpriteKind.RhythmButton)
    sprites.setDataString(sprite_button_press, "direction", button)
    sprite_button_press.top = sprite_overlapper.top
    sprite_button_press.right = sprite_rhythm_bar.right
    sprite_button_press.z = 1
    sprite_button_press.vx = button_speed * -1
}
function popup_message (accuracy: number, is_success: boolean) {
    if (!(spriteutils.isDestroyed(sprite_message))) {
        sprite_message.destroy()
    }
    if (is_success) {
        sprite_message = textsprite.create(get_success_message(accuracy), 0, 6)
    } else {
        sprite_message = textsprite.create("Fail", 0, 2)
    }
    sprite_message.top = sprite_overlapper.bottom + 2
    sprite_message.left = sprite_overlapper.x
    sprite_message.lifespan = 1000
}
function get_success_message (accuracy: number) {
    if (accuracy > 90) {
        return "Amazing!"
    } else if (accuracy > 80) {
        return "Awesome!"
    } else if (accuracy > 70) {
        return "Great"
    } else if (accuracy > 60) {
        return "Good!"
    } else {
        return "Success"
    }
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
        } else if (part == 2) {
            part_2_transition()
        } else if (part == 3) {
            part_3()
        } else if (part == 4) {
            part_4_transition()
        }
    })
    MusicalImages.set_queue(musical, get_part_music(part))
    MusicalImages.play(musical)
}
function change_score (s: number) {
    score += s
}
function part_2_transition () {
    animation_state = 1
    add_crabs(1)
    do_buttons_for_part(2, 1750)
}
function do_buttons_for_part (part: number, frequency: number) {
    while (current_part == part) {
        summon_button_press(allowed_buttons._pickRandom())
        pause(randint(frequency - 500, frequency + 500))
    }
}
let frame_delay = 0
let sprite_message: TextSprite = null
let sprite_button_press: Sprite = null
let musical: MusicalImages.MusicalImage = null
let allowed_buttons: string[] = []
let current_part = 0
let button_speed = 0
let sprite_failed_overlapper: Sprite = null
let sprite_overlapper: Sprite = null
let sprite_rhythm_bar: Sprite = null
let all_crabs: Sprite[] = []
let sprite_right_crab: Sprite = null
let sprite_left_crab: Sprite = null
let show_score = 0
let sprite_score: TextSprite = null
let sprite_player: Sprite = null
let accuracy = 0
let score = 0
let animation_state = 0
color.setPalette(
color.Black
)
stats.turnStats(true)
setup()
music.setVolume(20)
fade_out(true)
timer.background(function () {
    for (let index = 0; index <= 13; index++) {
        run_part(index + 1)
    }
})
game.onUpdateInterval(20, function () {
    if (score > show_score) {
        if (score - show_score > 20) {
            show_score += 3
        } else {
            show_score += 1
        }
        update_score()
    }
})
forever(function () {
    if (animation_state <= 3) {
        if (animation_state == 0) {
            frame_delay = 200
        } else if (animation_state == 1) {
            frame_delay = 166
        } else if (animation_state == 2) {
            frame_delay = 133
        } else {
            frame_delay = 100
        }
        for (let crab of all_crabs) {
            if (sprites.readDataBoolean(crab, "facing_left")) {
                animation.runImageAnimation(
                crab,
                assets.animation`crab_left_animation`,
                frame_delay,
                false
                )
            } else {
                animation.runImageAnimation(
                crab,
                assets.animation`crab_right_walking_animation`,
                frame_delay,
                false
                )
            }
        }
        pause(assets.animation`crab_left_animation`.length * frame_delay)
    }
})
