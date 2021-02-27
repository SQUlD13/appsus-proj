import { bookService } from '../services/book.service.js'
import bookPreview from './book-preview.cmp.js'
import { eventBus } from '../../../services/event-bus.service.js'

export default {
    props: ['books'],
    template: `
    <ul class="clean-list book-list">
        <li v-for="book in books" :key="book.id">
            <book-preview :book="book" :currencyIcon="getCurrencyIcon(book.listPrice.currencyCode)" @click.native="openEditor(book.id)"/>
        </li>
    </ul>
    `,
    methods: {
        getCurrencyIcon(currCode) {
            return bookService.getCurrencySymbol(currCode)
        },
        openEditor(id) {
            this.$router.push('/book/' + id)
        },
    },
    components: { bookPreview }
}