
export const eventBus = new Vue()

eventBus.$on('show-msg', str => {
    // console.log('event bus book heard show msg', str)
})