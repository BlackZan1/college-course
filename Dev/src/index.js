import { Game } from './components/game'

// styles
import './styles/main.scss'

export const game = new Game()

const audioEl = new Audio()
audioEl.src = 'public/assets/audio/theme.mp3'
audioEl.volume = 0.5
audioEl.loop = true

window.onload = () => {
    const audioBtn = document.getElementById('audio-btn')

    game.init(document.body)

    audioBtn.addEventListener('click', () => {  
        audioEl.play()
    })
}