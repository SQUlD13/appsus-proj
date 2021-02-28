export default {
    template: `
    <section class="center column about">
        <h1> About this website : </h1>
        <div class="about-content center column text-center">
            <p class="light"> This page was created as a collabrative practice of vue.</p>
            <p class="light"> It is generated using a predetermined database for demonstration purposes, going over the <a href="https://vuejs.org/v2/guide/">introduction to vue</a>.</p>
        </div>
        <div class="collaborators center column">
            <h2>Created by <a href="https://github.com/SQUlD13">SQUID13</a> <small>aka Anton Zebnitski</small></h2>
            <h2>and <a href="https://github.com/HadarHarush">Hadar Harush</a> </h2>
        </div>
    </section>
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