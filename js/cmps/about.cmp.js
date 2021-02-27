
export default {
    template: `
        <div class="center column about">
            <h1> About this website : </h1>
            <p class="light"> This page was created as a way to practice vue.</p>
            <p class="light"> It is generated using a predetermined library, going over the <a href="https://vuejs.org/v2/guide/">introduction to vue</a>.</p>
            <h2>Created by SQUID13 <small>aka Anton Zebnitski</small></h2>
            <p class="light">feel free to visit my <a href="https://github.com/SQUlD13">github.</a> Not much there yet, but im workin' on it!1!!</p>
        </div>
    `,
    data() {
        return {
            interval: null,
            timer: 0,
        }
    },
    created() {
        this.interval = setInterval(() => { this.timer += 1 }, 1000)
    },
    destroyed() {
        this.interval = clearInterval(this.interval)
        this.interval = null
        console.log('clearing interval. time alive is', this.timer)
        this.timer = 0
    }
}
