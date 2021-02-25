export default {
    props: ['value'],
    template: ` 
    <div class="long-text">
         <!-- <p>isFull : {{isFull}} 
             txt : {{this.txt}}
            description : {{description}}
            length > 100? {{value.length>100}}
         </p>  -->
        <p contentEditable="true" class="long-text" @click="toggleFull" :value="this.txt" v-text="this.description" @input="onEdit" @blur="$emit('update-text',$event.target.innerText)"
        :style="calcStyle">
            <!-- :value="this.dispTxt" -->
             <!-- @input="$emit('input',$event.target.value) -->
        </p>
    </div>
    `,
    data() {
        return {
            isFull: false,
            txt: this.value
        }
    },
    computed: {
        description() {
            return (this.isFull) ? `${this.txt}` : (this.txt.length > 100) ?
                this.txt.substr(0, 99) + '...' : this.txt.substr(0, 99)
        },
        calcStyle() {
            var str = (this.isFull) ? '' : 'text-decoration:line-through;'
        }
    },
    methods: {
        toggleFull() {
            this.isFull = !this.isFull
        },
        emit(event) {
            $emit('input', event.target.value)
            console.log(event)
        },
        onEdit(evt) {
            var src = evt.target.innerText
            this.$emit('text-change', src)
        }
    },
}