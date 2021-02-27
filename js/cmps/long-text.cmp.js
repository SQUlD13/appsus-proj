export default {
    props: ['value', 'line', 'isList',],
    template: ` 
    <div class="long-text">
            <!-- <pre>
            edit :{{this.line.editing}}
            full :{{this.isFull}} 
            length>100 : {{this.txt.length>100}}
            </pre> -->
    
        <p :contentEditable="this.line && this.line.editing" class="long-text" @click="toggleFull" :value="this.txt" v-html="this.description" @input="onEdit" 
        @blur="$emit('update-text',$event.target.innerText)" :style="calcStyle">
        </p>
    </div>
    `,
    data() {
        return {
            fullState: (this.line) ? this.line.active : false,
        }
    },
    computed: {
        description() {
            return (this.isFull) ? `${this.txt}` : (this.txt.length > 100) ?
                this.txt.substr(0, 99) + '...' : this.txt.substr(0, 99)
        },
        calcStyle() {
            var str = (this.line && (!this.line.editing && !this.line.active)) ? 'text-decoration:line-through;' : ''
            if (this.line && this.line.editing) str += 'background:#fff;'
            return str
        },
        isFull() {
            if (this.line && this.line.editing) return true
            else return this.fullState
        },
        classStr() {
            var str = 'long-text'
            if (this.line && this.line.editing) str += 'editing'
            return str
        },
        txt() {
            return this.value
        }
    },
    methods: {
        toggleFull() {
            if (this.line && !this.line.editing) this.fullState = !this.fullState
            if (this.line && !this.line.editing && this.isList) this.line.active = !this.line.active
        },
        emit(event) {
            $emit('input', event.target.value)
            console.log(event)
        },
        onEdit(evt) {
            var src = evt.target.innerText
            this.$emit('text-change', src)
        },
    }
}