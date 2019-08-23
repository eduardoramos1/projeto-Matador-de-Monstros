new Vue({
    el: '.wrapper',
    data: {
        gameOver: false,
        winner: '',
        playerHp: 100,
        monsterHp: 100,
        monsterWins: false,
        especialUsed: false,
        log: []
    },
    computed: {
        playerHealthBar() {
            if (this.playerHp <= 45) {
                return {
                    width: `${this.playerHp}%`,
                    background: 'red'
                }
            } else {
                return {
                    width: `${this.playerHp}%`
                }
            }

        },

        monsterHealthBar() {
            if (this.monsterHp <= 45) {
                return {
                    width: `${this.monsterHp}%`,
                    background: 'red'
                }
            } else {
                return {
                    width: `${this.monsterHp}%`
                }
            }
        }
    },
    methods: {
        attack(ev) {
            let playerDmg

            playerDmg = Math.floor((Math.random() * (12 - 6) + 6))

            this.log.push(`Player causou ${playerDmg} de dano!`)
            
            this.monsterHp -= playerDmg

            if (this.monsterHp <= 0) {
                this.monsterHp = 0
                this.winner = 'O Player foi o vencedor =)'
                this.gameOver = true
                this.monsterWins = false
            }

            this.monsterAttack();

        },

        monsterAttack(ev) {
            let monsterDmg
            monsterDmg = Math.floor((Math.random() * (15 - 8) + 8))

            this.log.push(`Monstro causou ${monsterDmg} de dano! `)

            this.playerHp -= monsterDmg

            if (this.playerHp <= 0) {
                this.playerHp = 0
                this.winner = 'O monstro foi o vencedor =('
                this.gameOver = true
                this.monsterWins = true
            }

        },

        reset(ev) {
            this.gameOver = false
            this.log = []
            this.playerHp = 100
            this.monsterHp = 100
            this.especialUsed = false
        },

        regen(ev) {
            let hpRecover = 0
            hpRecover = Math.ceil(Math.random() * (15 - 9) + 9)
            this.playerHp += hpRecover
            
            if (this.playerHp > 100) this.playerHp = 100
            this.log.push(`O player regenerou ${hpRecover} de vida`)
            
            this.monsterAttack()

        },

        specialAttack(ev){
            this.especialUsed = true

            let playerDmg

            playerDmg = Math.floor((Math.random() * (22 - 15) + 15))

            this.log.push(`Player causou ${playerDmg} de dano em um ataque especial!`)
            
            this.monsterHp -= playerDmg

            if (this.monsterHp <= 0) {
                this.monsterHp = 0
                this.winner = 'O Player foi o vencedor =)'
                this.gameOver = true
                this.monsterWins = false
            }

            this.monsterAttack();
        },

        giveup(ev){
            let giveUp = confirm('Você realmente deseja parar de jogar?')
            if(giveUp) this.reset()
            else return false
        }

    }
})