import {PIXI} from "pixi.js"

export interface Idrawable {
    material: any
    container_position: [number, number]
    sprite_path: string
    container: PIXI.container
    sprite: PIXI.sprite

    take()

    put()

    draw()

    remove()

    animation()
}