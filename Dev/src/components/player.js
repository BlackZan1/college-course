import { attackBoxCollision } from '../utils/collision'
import { PIXI } from '../utils/pixi'

const gravity = 0.7
const damage = 20

const stepAudio = new Audio('public/assets/audio/step.wav')
stepAudio.volume = 0.4

const jumpAudio = new Audio('public/assets/audio/jump.mp3')
jumpAudio.volume = 0.6

export class Player {
    health = 100
    keys = {
        right: false,
        left: false,
        up: false,
        shift: false
    }
    attackBox = {
        isAttacking: false,
        offsetX: 85,
        offsetY: 50,
        width: 200,
        height: 50,
        object: {}
    }
    vel = {
        x: 0,
        y: 0,
        isFalling: false,
        isLeft: false
    }
    attackCount = 0
    jumpCount = 0
    enemyHitting = false
    isReverse = false
    width = 0
    height = 0
    idleSpeed = 0.2
    attackSpeed = 0.45
    isDead = false

    constructor(sprites, offsetX, offsetY, width = 650, height = 750) {
        this.sprites = sprites

        this.width = width
        this.height = height

        this.init()

        this.object.x = offsetX
        this.object.y = offsetY
        this.rectangle.x = this.object.x
        this.rectangle.y = this.object.y - 18
    }

    init() {
        this.rectangle = PIXI.Sprite.from(
            PIXI.Texture.EMPTY
        )
        this.rectangle.width = 100
        this.rectangle.height = 200
        this.rectangle.anchor.set(0.5)

        this.object = new PIXI.AnimatedSprite(this.sprites['idle'])
        this.changeSprite('idle')

        this.object.anchor.set(0.5)
        this.object.scale.set(1)
        this.object.loop = true
        this.object.animationSpeed = this.idleSpeed
        
        this.updateSize()

        this.attackBox.object = PIXI.Sprite.from(PIXI.Texture.WHITE)
        this.attackBox.object.width = this.attackBox.width
        this.attackBox.object.height = this.attackBox.height
    }

    updateSize() {
        this.object.width = this.width
        this.object.height = this.height
    }

    changeSprite(type) {
        if(this.object.spriteType === type) return

        if(this.object.playing) this.object.stop()

        this.object.spriteType = type
        this.object.textures = this.sprites[type]

        switch(type) {
            case 'idle':
                this.object.animationSpeed = this.idleSpeed

                break
            case 'move':
                this.object.animationSpeed = 0.35

                break
            case 'jump':
                this.object.animationSpeed = 0.3

                break
            case 'fall':
                this.object.animationSpeed = 0.3

                break 
            case 'hit':
                this.object.animationSpeed = 0.25

                break 
            case 'attack':
                this.object.animationSpeed = this.attackSpeed

                break
        }

        setTimeout(() => this.object.play(), 10)
    }

    changeHealth(dmg, id) {
        this.health -= dmg

        const bar = document
            .getElementById(id)
            .querySelector('div')
        bar.style.width = `${this.health}%`

        console.log(bar)

        if(this.health <= 0) this.isDead = true
    }

    changeSide(isLeft) {
        if(isLeft) {
            if(this.isReverse) this.object.scale.set(1, 1)
            else this.object.scale.set(-1, 1)
        }
        else {
            if(this.isReverse) this.object.scale.set(-1, 1)
            else this.object.scale.set(1, 1)
        }

        this.updateSize()
    }

    checkAttack(app, enemy, enemyBarId) {
        // SHOW attack rectangle
        if(this.attackBox.isAttacking && this.attackCount <= 17) {
            this.attackCount += 1

            if(this.vel.isLeft) {
                this.attackBox.object.x = (this.rectangle.x - this.attackBox.offsetX - 42.5) - this.rectangle.width
            }
            else {
                this.attackBox.object.x = (this.rectangle.x + this.attackBox.offsetX + 67.5) - this.rectangle.width / 2
            }

            if(
                !this.enemyHitting 
                && attackBoxCollision({ attackBox: this.attackBox.object }, enemy.rectangle)
                && !enemy.vel.y
            ) {
                this.enemyHitting = true

                enemy.changeSprite('hit')
                enemy.changeHealth(damage, enemyBarId)

                if(!enemy.isDead) {
                    enemy.vel.x = (this.vel.isLeft) ? -this.rectangle.width : this.rectangle.width

                    if(enemy.keys.left || enemy.keys.right) enemy.changeSprite('move')
                }

                const randInt = Math.floor(Math.random() * 3) + 1

                const hitAudio = new Audio(`public/assets/audio/hit${randInt === 1 ? '' : randInt}.mp3`)
                hitAudio.play()

                setTimeout(() => {
                    enemy.changeSprite('idle')
                }, 250)

                console.log('hit!')
            }

            app.stage.addChild(this.attackBox.object)
        }
        else {
            if(this.attackBox.isAttacking) {
                this.changeSprite('idle')

                console.log('ANIMATION LOOP #4')
            }

            this.attackBox.isAttacking = false

            this.attackCount = 0
            this.enemyHitting = false
        }
    }

    checkBorders() {
        const absX = this.rectangle.x

        if(absX + this.vel.x >= window.innerWidth) {
            this.rectangle.x = this.object.x = 0

            const tpAudio = new Audio('public/assets/audio/tp.mp3')
            tpAudio.play()
        }
        else if(absX + this.vel.x <= 0) {
            this.rectangle.x = this.object.x = window.innerWidth - (this.rectangle.width / 3)

            const tpAudio = new Audio('public/assets/audio/tp.mp3')
            tpAudio.play()
        }
    } 

    update(app, yOffset, enemy, enemyBarId) {
        if(this.isDead) {
            this.object.y = yOffset

            if(this.object.spriteType !== 'death') {
                this.object.loop = false

                this.changeSprite('death')
            }
            
            return
        }

        if(this.vel.x || this.vel.y) {
            this.attackBox.isAttacking = false
        }

        // JUMP
        if (
            ((this.object.y + this.object.height) + this.vel.y >= (yOffset + this.object.height)) &&
            this.jumpCount <= 2
        ) {
            if(this.vel.isFalling) {
                this.changeSprite('idle')

                stepAudio.play()

                if(this.keys.right || this.keys.left) {
                    this.changeSprite('move')
                }

                console.log('ANIMATION LOOP #1')
            }

            this.vel.y = 0
            this.jumpCount = 0
            this.object.y = yOffset
            this.vel.isFalling = false
        } 
        else {
            if(this.vel.isFalling) {
                this.changeSprite('fall')

                console.log('ANIMATION LOOP #2')

                this.vel.y += gravity 
                this.vel.isFalling = true
            }
            else {
                this.changeSprite('jump')
                jumpAudio.play()

                console.log('ANIMATION LOOP #3')

                setTimeout(() => {
                    this.vel.y += gravity 
                    this.vel.isFalling = true
                }, 250)
            }
        }

        this.checkBorders()

        if(this.vel.x && !this.vel.y) {
            setTimeout(() => {
                stepAudio.play()
            }, 100)
        }
        
        // UPDATE player position
        this.rectangle.x += this.vel.x
        this.rectangle.y = this.object.y - 18
        // - hero -
        this.object.x += this.vel.x
        this.object.y += this.vel.y

        // UPDATE attack position
        this.attackBox.object.y = (this.rectangle.y - this.rectangle.height / 2) + this.attackBox.offsetY

        // REMOVE velocity after calc
        this.vel.x = 0

        this.checkAttack(app, enemy, enemyBarId)

        // CHANGE velocity
        if(this.keys.right) {
            // if(keys.shift) playerVel.x = 10
            // else playerVel.x = 5
            this.vel.x = 12.5
            this.vel.isLeft = false
        }
        if(this.keys.left) {
            // if(keys.shift) playerVel.x = -10
            // else playerVel.x = -5
            this.vel.x = -12.5
            this.vel.isLeft = true
        }
    }
}