import { ALiYunSLSAddress} from "@tg/shared";
import {error} from '@tg/utils'

export default class Tracert {
    constructor(opts: CORE.BootstrapOptions) {
        this.server = ALiYunSLSAddress

        this.taskChain = Promise.resolve().then(()=>{
            this.prepare()
        }).then(()=>{
            this.run()
        }).then(()=>{
            this.end()
        })

    }
    public sayHi() {
        error.error('timeout')
    }

    public prepare() {
        console.log('prepare')
    }

    public run() {
        console.log('run')
    }

    public end() {
        console.log('end')
    }

}
