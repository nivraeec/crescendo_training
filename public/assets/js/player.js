const player = {
    player: document.querySelector('#player'),
    info: document.querySelector('.info'), 
    listsDiv: document.querySelector('.music__lists'),
    lists: document.querySelectorAll('.music__list'),
    init() {
        if(this.player === null) return;       
        this.setEffect()
    },
    setEffect() {
        this.player.onmouseover = () => {
            this.info.classList.toggle('up')
        }
        this.player.onmouseout = () => {
            this.info.classList.toggle('up')
        }

        (this.lists).forEach(el=>{
            el.onmouseover = () => {
                this.info.classList.toggle('up')
            }
            el.onmouseout = () => {
                this.info.classList.toggle('up')
            }
        })

    },
};

export default {...player};
