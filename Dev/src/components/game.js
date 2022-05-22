import { PIXI } from '../utils/pixi'
import { Player } from './player'

export class Game {
    app = {}
    size = [1920, 1080]
    ratio = this.size[0] / this.size[1]
    offsetY = (window.innerHeight / 100) * 20
    heroYOffset = window.innerHeight - 200

    constructor() {
        this.app = new PIXI.Application({
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: '#323232',
            antialias: true,
            resolution: 1
        })
        this.media = {
            attack: new Audio('public/assets/audio/attack.mp3')
        }
    }

    resize() {
        window.onresize = () => {
            this.app.renderer.resize(window.innerWidth, window.innerHeight)

            this.bg.width = window.innerWidth
            this.bg.height = window.innerHeight
        }
    }

    loadFiles() {
        this.app.loader.baseUrl = 'public/assets'
        this.app.loader
        .add('bg', 'background.png')
        .add('shop', 'shop.png')
        .add('playerBg', 'playerBg.png')
        // hero sprites
        .add('heroIdle', '/hero/idle.png')
        .add('heroMove', '/hero/move.png')
        .add('heroJump', '/hero/jump.png')
        .add('heroFall', '/hero/fall.png')
        .add('heroAttack', '/hero/attack.png')
        .add('heroAttack2', '/hero/attack2.png')
        .add('heroHit', '/hero/hit.png')
        .add('heroDeath', '/hero/death.png')
        // enemy sprites
        .add('enemyIdle', '/enemy/idle.png')
        .add('enemyMove', '/enemy/move.png')
        .add('enemyJump', '/enemy/jump.png')
        .add('enemyFall', '/enemy/fall.png')
        .add('enemyAttack', '/enemy/attack.png')
        .add('enemyAttack2', '/enemy/attack2.png')
        .add('enemyHit', '/enemy/hit.png')
        .add('enemyDeath', '/enemy/death.png')
    }

    createShop() {
        let sheet = new PIXI.BaseTexture.from(
            this.app.loader.resources['shop'].url
        )
        const width = 118
        const height = 128

        this.shop = new PIXI.AnimatedSprite([
            new PIXI.Texture(sheet, new PIXI.Rectangle(0 * width, 0, width, height)),
            new PIXI.Texture(sheet, new PIXI.Rectangle(1 * width, 0, width, height)),
            new PIXI.Texture(sheet, new PIXI.Rectangle(2 * width, 0, width, height)),
            new PIXI.Texture(sheet, new PIXI.Rectangle(3 * width, 0, width, height)),
            new PIXI.Texture(sheet, new PIXI.Rectangle(4 * width, 0, width, height)),
            new PIXI.Texture(sheet, new PIXI.Rectangle(5 * width, 0, width, height))
        ])

        this.shop.width = 350
        this.shop.height = 400
        this.shop.loop = true
        this.shop.animationSpeed = 0.2
        this.shop.play()
    }

    createHero() {
        const width = 200, height = 200

        const idleSheet = new PIXI.BaseTexture.from(
            this.app.loader.resources['heroIdle'].url
        )
        const moveSheet = new PIXI.BaseTexture.from(
            this.app.loader.resources['heroMove'].url
        )
        const jumpSheet = new PIXI.BaseTexture.from(
            this.app.loader.resources['heroJump'].url
        )
        const fallSheet = new PIXI.BaseTexture.from(
            this.app.loader.resources['heroFall'].url
        )
        const attackSheet = new PIXI.BaseTexture.from(
            this.app.loader.resources['heroAttack'].url
        )
        const attack2Sheet = new PIXI.BaseTexture.from(
            this.app.loader.resources['heroAttack2'].url
        )
        const hitSheet = new PIXI.BaseTexture.from(
            this.app.loader.resources['heroHit'].url
        )
        const deathSheet = new PIXI.BaseTexture.from(
            this.app.loader.resources['heroDeath'].url
        )

        this.updateHeroOffset()
        this.hero = new Player(
            {
                idle: [
                    new PIXI.Texture(idleSheet, new PIXI.Rectangle(0 * width, 0, width, height)),
                    new PIXI.Texture(idleSheet, new PIXI.Rectangle(1 * width, 0, width, height)),
                    new PIXI.Texture(idleSheet, new PIXI.Rectangle(2 * width, 0, width, height)),
                    new PIXI.Texture(idleSheet, new PIXI.Rectangle(3 * width, 0, width, height)),
                    new PIXI.Texture(idleSheet, new PIXI.Rectangle(4 * width, 0, width, height)),
                    new PIXI.Texture(idleSheet, new PIXI.Rectangle(5 * width, 0, width, height)),
                    new PIXI.Texture(idleSheet, new PIXI.Rectangle(6 * width, 0, width, height)),
                    new PIXI.Texture(idleSheet, new PIXI.Rectangle(7 * width, 0, width, height))
                ],
                move: [
                    new PIXI.Texture(moveSheet, new PIXI.Rectangle(0 * width, 0, width, height)),
                    new PIXI.Texture(moveSheet, new PIXI.Rectangle(1 * width, 0, width, height)),
                    new PIXI.Texture(moveSheet, new PIXI.Rectangle(2 * width, 0, width, height)),
                    new PIXI.Texture(moveSheet, new PIXI.Rectangle(3 * width, 0, width, height)),
                    new PIXI.Texture(moveSheet, new PIXI.Rectangle(4 * width, 0, width, height)),
                    new PIXI.Texture(moveSheet, new PIXI.Rectangle(5 * width, 0, width, height)),
                    new PIXI.Texture(moveSheet, new PIXI.Rectangle(6 * width, 0, width, height)),
                    new PIXI.Texture(moveSheet, new PIXI.Rectangle(7 * width, 0, width, height))
                ],
                jump: [
                    new PIXI.Texture(jumpSheet, new PIXI.Rectangle(0 * width, 0, width, height)),
                    new PIXI.Texture(jumpSheet, new PIXI.Rectangle(1 * width, 0, width, height))
                ],
                fall: [
                    new PIXI.Texture(fallSheet, new PIXI.Rectangle(0 * width, 0, width, height)),
                    new PIXI.Texture(fallSheet, new PIXI.Rectangle(1 * width, 0, width, height))
                ],
                attack: [
                    new PIXI.Texture(attackSheet, new PIXI.Rectangle(0 * width, 0, width, height)),
                    new PIXI.Texture(attackSheet, new PIXI.Rectangle(1 * width, 0, width, height)),
                    new PIXI.Texture(attackSheet, new PIXI.Rectangle(2 * width, 0, width, height)),
                    new PIXI.Texture(attackSheet, new PIXI.Rectangle(3 * width, 0, width, height)),
                    new PIXI.Texture(attackSheet, new PIXI.Rectangle(4 * width, 0, width, height)),
                    new PIXI.Texture(attackSheet, new PIXI.Rectangle(5 * width, 0, width, height))
                ],
                attack2: [
                    new PIXI.Texture(attack2Sheet, new PIXI.Rectangle(0 * width, 0, width, height)),
                    new PIXI.Texture(attack2Sheet, new PIXI.Rectangle(1 * width, 0, width, height)),
                    new PIXI.Texture(attack2Sheet, new PIXI.Rectangle(4 * width, 0, width, height)),
                    new PIXI.Texture(attack2Sheet, new PIXI.Rectangle(5 * width, 0, width, height))
                ],
                hit: [
                    new PIXI.Texture(hitSheet, new PIXI.Rectangle(0 * width, 0, width, height)),
                    new PIXI.Texture(hitSheet, new PIXI.Rectangle(1 * width, 0, width, height)),
                    new PIXI.Texture(hitSheet, new PIXI.Rectangle(2 * width, 0, width, height)),
                    new PIXI.Texture(hitSheet, new PIXI.Rectangle(3 * width, 0, width, height))
                ],
                death: [
                    new PIXI.Texture(deathSheet, new PIXI.Rectangle(0 * width, 0, width, height)),
                    new PIXI.Texture(deathSheet, new PIXI.Rectangle(1 * width, 0, width, height)),
                    new PIXI.Texture(deathSheet, new PIXI.Rectangle(2 * width, 0, width, height)),
                    new PIXI.Texture(deathSheet, new PIXI.Rectangle(3 * width, 0, width, height)),
                    new PIXI.Texture(deathSheet, new PIXI.Rectangle(4 * width, 0, width, height)),
                    new PIXI.Texture(deathSheet, new PIXI.Rectangle(5 * width, 0, width, height))
                ]
            },
            200,
            this.heroYOffset,
            650,
            750
        )
        this.hero.attackSpeed = 0.45
    }

    updateHeroOffset() {
        this.heroYOffset = (window.innerHeight - 80) - (window.innerHeight / 100) * 16.5
    }

    createEnemy() {
        const width = 200, height = 200

        const idleSheet = new PIXI.BaseTexture.from(
            this.app.loader.resources['enemyIdle'].url
        )
        const moveSheet = new PIXI.BaseTexture.from(
            this.app.loader.resources['enemyMove'].url
        )
        const jumpSheet = new PIXI.BaseTexture.from(
            this.app.loader.resources['enemyJump'].url
        )
        const fallSheet = new PIXI.BaseTexture.from(
            this.app.loader.resources['enemyFall'].url
        )
        const attackSheet = new PIXI.BaseTexture.from(
            this.app.loader.resources['enemyAttack'].url
        )
        const attack2Sheet = new PIXI.BaseTexture.from(
            this.app.loader.resources['enemyAttack2'].url
        )
        const hitSheet = new PIXI.BaseTexture.from(
            this.app.loader.resources['enemyHit'].url
        )
        const deathSheet = new PIXI.BaseTexture.from(
            this.app.loader.resources['enemyDeath'].url
        )

        this.updateHeroOffset()
        this.enemy = new Player(
            {
                idle: [
                    new PIXI.Texture(idleSheet, new PIXI.Rectangle(0 * width, 10, width, height - 10)),
                    new PIXI.Texture(idleSheet, new PIXI.Rectangle(1 * width, 10, width, height - 10)),
                    new PIXI.Texture(idleSheet, new PIXI.Rectangle(2 * width, 10, width, height - 10)),
                    new PIXI.Texture(idleSheet, new PIXI.Rectangle(3 * width, 10, width, height - 10))
                ],
                move: [
                    new PIXI.Texture(moveSheet, new PIXI.Rectangle(0 * width, 10, width, height - 10)),
                    new PIXI.Texture(moveSheet, new PIXI.Rectangle(1 * width, 10, width, height - 10)),
                    new PIXI.Texture(moveSheet, new PIXI.Rectangle(2 * width, 10, width, height - 10)),
                    new PIXI.Texture(moveSheet, new PIXI.Rectangle(3 * width, 10, width, height - 10)),
                    new PIXI.Texture(moveSheet, new PIXI.Rectangle(4 * width, 10, width, height - 10)),
                    new PIXI.Texture(moveSheet, new PIXI.Rectangle(5 * width, 10, width, height - 10)),
                    new PIXI.Texture(moveSheet, new PIXI.Rectangle(6 * width, 10, width, height - 10)),
                    new PIXI.Texture(moveSheet, new PIXI.Rectangle(7 * width, 10, width, height - 10))
                ],
                jump: [
                    new PIXI.Texture(jumpSheet, new PIXI.Rectangle(0 * width, 10, width, height - 10)),
                    new PIXI.Texture(jumpSheet, new PIXI.Rectangle(1 * width, 10, width, height - 10))
                ],
                fall: [
                    new PIXI.Texture(fallSheet, new PIXI.Rectangle(0 * width, 10, width, height - 10)),
                    new PIXI.Texture(fallSheet, new PIXI.Rectangle(1 * width, 10, width, height - 10))
                ],
                attack: [
                    new PIXI.Texture(attackSheet, new PIXI.Rectangle(2 * width, 10, width, height - 10)),
                    new PIXI.Texture(attackSheet, new PIXI.Rectangle(0 * width, 10, width, height - 10)),
                    new PIXI.Texture(attackSheet, new PIXI.Rectangle(1 * width, 10, width, height - 10)),
                    new PIXI.Texture(attackSheet, new PIXI.Rectangle(3 * width, 10, width, height - 10))
                ],
                attack2: [
                    new PIXI.Texture(attack2Sheet, new PIXI.Rectangle(2 * width, 10, width, height - 10)),
                    new PIXI.Texture(attack2Sheet, new PIXI.Rectangle(0 * width, 10, width, height - 10)),
                    new PIXI.Texture(attack2Sheet, new PIXI.Rectangle(1 * width, 10, width, height - 10)),
                    new PIXI.Texture(attack2Sheet, new PIXI.Rectangle(3 * width, 10, width, height - 10))
                ],
                hit: [
                    new PIXI.Texture(hitSheet, new PIXI.Rectangle(0 * width, 10, width, height - 10)),
                    new PIXI.Texture(hitSheet, new PIXI.Rectangle(1 * width, 10, width, height - 10)),
                    new PIXI.Texture(hitSheet, new PIXI.Rectangle(2 * width, 10, width, height - 10))
                ],
                death: [
                    new PIXI.Texture(deathSheet, new PIXI.Rectangle(0 * width, 10, width, height - 10)),
                    new PIXI.Texture(deathSheet, new PIXI.Rectangle(1 * width, 10, width, height - 10)),
                    new PIXI.Texture(deathSheet, new PIXI.Rectangle(2 * width, 10, width, height - 10)),
                    new PIXI.Texture(deathSheet, new PIXI.Rectangle(3 * width, 10, width, height - 10)),
                    new PIXI.Texture(deathSheet, new PIXI.Rectangle(4 * width, 10, width, height - 10)),
                    new PIXI.Texture(deathSheet, new PIXI.Rectangle(5 * width, 10, width, height - 10))
                ]
            },
            window.innerWidth - 200,
            this.heroYOffset,
            640,
            640
        )
        this.enemy.isReverse = true
        this.enemy.attackSpeed = 0.28
        this.enemy.vel.isLeft = true
    }
     
    createBg() {
        this.bg = new PIXI.Sprite(this.app.loader.resources['bg'].texture)
        this.bg.position.set(0, 0)
        this.bg.anchor.set(0, 0)
        this.bg.roundPixels = true
    }

    initListener() {
        window.addEventListener('keydown', (ev) => {
            if(this.hero.isDead || this.enemy.isDead) return

            switch(ev.key) {
                case 'd':
                    this.hero.keys.right = true

                    if(this.hero.object.spriteType !== 'move') {
                        this.hero.changeSprite('move')
                    }
                    this.hero.changeSide(false)

                    break
                case 'a':
                    this.hero.keys.left = true

                    if(this.hero.object.spriteType !== 'move') {
                        this.hero.changeSprite('move')
                    }
                    this.hero.changeSide(true)
                    
                    break
                case ' ':
                case 'w':
                    if(!this.hero.vel.isFalling) {
                        this.hero.vel.y = -13

                        this.hero.changeSprite('jump')
                    }

                    break
                case 's':
                    if(this.hero.attackBox.isAttacking || this.hero.object.spriteType === 'hit') return

                    this.hero.attackBox.isAttacking = true

                    if(this.hero.vel.x === 0 && this.hero.vel.y === 0) {
                        const randInt = Math.round(Math.random())

                        const attackAudio = new Audio(`public/assets/audio/${randInt >= 1 ? 'attack' : 'attack2'}.mp3`)
                        attackAudio.volume = 0.7
                        attackAudio.play()

                        this.hero.changeSprite(randInt >= 1 ? 'attack' : 'attack2')
                    }

                    break
                case 'ArrowLeft':
                    this.enemy.keys.left = true

                    if(this.enemy.object.spriteType !== 'move') {
                        this.enemy.changeSprite('move')
                    }
                    this.enemy.changeSide(true)
                    
                    break
                case 'ArrowRight':
                    this.enemy.keys.right = true

                    if(this.enemy.object.spriteType !== 'move') {
                        this.enemy.changeSprite('move')
                    }
                    this.enemy.changeSide(false)

                    break
                case 'ArrowUp':
                    if(!this.enemy.vel.isFalling) {
                        this.enemy.vel.y = -13

                        this.enemy.changeSprite('jump')
                    }

                    break
                case 'ArrowDown':
                    if(this.enemy.attackBox.isAttacking || this.enemy.object.spriteType === 'hit') return

                    this.enemy.attackBox.isAttacking = true

                    if(this.enemy.vel.x === 0 && this.enemy.vel.y === 0) {
                        const randInt = Math.round(Math.random())

                        const attackAudio = new Audio(`public/assets/audio/${randInt >= 1 ? 'attack' : 'attack2'}.mp3`)
                        attackAudio.volume = 0.7
                        attackAudio.play()

                        this.enemy.changeSprite(randInt ? 'attack' : 'attack2')
                    }

                    break
            }
        })

        window.addEventListener('keyup', (ev) => {
            if(this.hero.isDead || this.enemy.isDead) return

            switch(ev.key) {
                case 'd':
                    this.hero.keys.right = false

                    if(!this.hero.keys.left) {
                        this.hero.changeSprite('idle')
                    }

                    break
                case 'a':
                    this.hero.keys.left = false

                    if(!this.hero.keys.right) {
                        this.hero.changeSprite('idle')
                    }
                    
                    break
                case 'ArrowLeft':
                    this.enemy.keys.left = false

                    if(!this.enemy.keys.right) {
                        this.enemy.changeSprite('idle')
                    }

                    break
                case 'ArrowRight':
                    this.enemy.keys.right = false

                    if(!this.enemy.keys.left) {
                        this.enemy.changeSprite('idle')
                    }

                    break
            }
        })
    }

    init(node) {
        node.appendChild(this.app.view)

        this.resize()
        this.loadFiles()
        this.initListener()

        this.app.loader.load(() => {
            this.createBg()
            this.createShop()
            this.createHero()
            this.createEnemy()
            this.update()
        })
    }

    update() {
        let finished = false

        // borders hero
        const b1 = PIXI.Sprite.from(PIXI.Texture.WHITE)
        b1.height = this.hero.rectangle.height
        b1.width = 5

        const b2 = PIXI.Sprite.from(PIXI.Texture.WHITE)
        b2.height = this.hero.rectangle.height
        b2.width = 5

        // borders enemy
        const b3 = PIXI.Sprite.from(PIXI.Texture.WHITE)
        b3.height = this.enemy.rectangle.height
        b3.width = 5

        const b4 = PIXI.Sprite.from(PIXI.Texture.WHITE)
        b4.height = this.enemy.rectangle.height
        b4.width = 5

        const bBottom = PIXI.Sprite.from(PIXI.Texture.WHITE)
        bBottom.height = 5
        bBottom.width = window.innerWidth

        const attack1 = PIXI.Sprite.from(PIXI.Texture.WHITE)
        const attack2 = PIXI.Sprite.from(PIXI.Texture.WHITE)

        let ticker = () => {
            if(finished) {
                document.getElementById('final').style.display = 'flex'

                return
            }

            if(this.hero.isDead) {
                document.getElementById('player-win').textContent = 'Second player'

                setTimeout(() => {
                    finished = true
                }, 2000)
            }
            else if(this.enemy.isDead) {
                document.getElementById('player-win').textContent = 'First player'

                setTimeout(() => {
                    finished = true
                }, 2000)
            }

            this.updateHeroOffset()

            // CALC ground height
            this.offsetY = window.innerHeight - (window.innerHeight / 100) * 16.5

            // UPDATE shop positioning
            this.shop.x = (window.innerWidth / 100) * 25
            this.shop.y = this.offsetY - 400

            // UPDATE background size
            this.bg.width = window.innerWidth
            this.bg.height = window.innerHeight

            this.hero.update(
                this.app,
                this.heroYOffset,
                this.enemy,
                'second-player'
            )
            this.enemy.update(
                this.app,
                this.heroYOffset,
                this.hero,
                'first-player'
            )

            // ADD components to stage
            this.app.stage.addChild(this.bg)
            this.app.stage.addChild(this.shop)
            this.app.stage.addChild(this.hero.rectangle)
            this.app.stage.addChild(this.hero.object)
            this.app.stage.addChild(this.enemy.rectangle)
            this.app.stage.addChild(this.enemy.object)
            
            // - borders hero -
                b1.x = this.hero.rectangle.x - this.hero.rectangle.width / 2
                b1.y = this.hero.rectangle.y - this.hero.rectangle.height / 2

                b2.x = (this.hero.rectangle.x + this.hero.rectangle.width / 2) + b2.width
                b2.y = this.hero.rectangle.y - this.hero.rectangle.height / 2

                bBottom.y = window.innerHeight - (window.innerHeight / 100) * 16.5
                bBottom.x = 0

                // this.app.stage.addChild(b1)
                // this.app.stage.addChild(b2)
                // this.app.stage.addChild(bBottom)
            // - borders -

            // - borders enemy -
                b3.x = this.enemy.rectangle.x - this.enemy.rectangle.width / 2
                b3.y = this.enemy.rectangle.y - this.enemy.rectangle.height / 2

                b4.x = (this.enemy.rectangle.x + this.enemy.rectangle.width / 2) + b4.width
                b4.y = this.enemy.rectangle.y - this.enemy.rectangle.height / 2

                // this.app.stage.addChild(b3)
                // this.app.stage.addChild(b4)
            // - borders -

            attack1.y = -100
            attack1.x = -100
            attack2.y = -100
            attack2.x = -100

            attack1.width = this.hero.attackBox.object.width - 20
            attack1.height = this.hero.attackBox.object.height
            attack1.y = this.hero.attackBox.object.y
            attack1.x = this.hero.attackBox.object.x

            attack2.width = this.enemy.attackBox.object.width - 20
            attack2.height = this.enemy.attackBox.object.height
            attack2.y = this.enemy.attackBox.object.y
            attack2.x = this.enemy.attackBox.object.x

            // if(this.hero.attackBox.isAttacking) {
            //     this.app.stage.addChild(attack1)
            // }

            // if(this.enemy.attackBox.isAttacking) {
            //     this.app.stage.addChild(attack2)
            // }

            requestAnimationFrame(ticker)
        }

        ticker = ticker.bind(this)
        ticker()
    }
}