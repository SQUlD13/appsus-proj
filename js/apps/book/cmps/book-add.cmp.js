import { bookService } from '../services/book.service.js'
import { eventBus } from '../../../services/event-bus.service.js'
import bookPreview from './book-preview.cmp.js'
export default {
    props: [],
    template: `
    <div class="book-add">
        <h1>Search Book</h1>
        <input type="text" name="addBook" id="addBook" @input="inputDebounce(searchBooks)" v-model="input">
        <transition name="slide-down">
        <ul class="clean-list book-list" v-if="results && input !== ''">
            <li v-if="results" v-for="result in results" :key="result.id">
                <book-preview class="clean list" :book="result" :currencyIcon="getCurrencyIcon(result.listPrice.currencyCode)" @click.native="addBook(result)"/>
            </li>
        </ul>
        </transition>
    </div>
    `,
    data() {
        return {
            input: '',
            results: null,
            interval: null,
            wait: 450,
        }
    },
    methods: {
        inputDebounce(func) {
            const later = () => {
                clearTimeout(this.interval);
                func()
            };
            clearTimeout(this.interval);
            this.interval = setTimeout(later, this.wait);
        },
        searchBooks() {
            console.log('searching book')
            if (this.input) {
                bookService.googleSearchBooks(this.input)
                    .then(results => {
                        this.results = results
                    })
            }
        },
        getCurrencyIcon(val) {
            return bookService.getCurrencySymbol(val)
        },
        addBook(book) {
            bookService.addBook(book)
                .then(() => {
                    console.log('starting book addition emition chain')
                    this.results = null
                    this.input = ''
                    eventBus.$emit('show-msg', { txt: 'Book added!', type: 'success' })
                    this.$emit('update-shop')
                })
        }
    },
    components: { bookPreview }
}