import { bookService } from '../services/book.service.js'

import bookList from '../cmps/book-list.cmp.js'
import bookFilter from '../cmps/book-filter.cmp.js'
import bookDetails from '../cmps/book-details.cmp.js'


export default {
    data() {
        return {
            books: null,
            filterBy: null,
        }
    },
    template: `
    <div class="store">
        <book-filter @filtered="setFilter" @update-shop="updateList"/>
        <book-list ref="shop" :books="booksToShow"/>
    </div>
    `,
    created() {
        bookService.query()
            .then(books => {
                if (!books.length) {
                    bookService.createBooks()
                        .then((books) => { this.books = books })
                } else this.books = books
            })
    },
    computed: {
        booksToShow() {
            return bookService.filter(this.filterBy, this.books)
        }
    },
    methods: {
        setFilter(filter) {
            this.filterBy = filter
        },
        updateList() {
            console.log('emission change reached target')
            bookService.query()
                .then(books => {
                    this.books = books
                    console.log(books)
                })
        },
    },
    components: { bookList, bookFilter, bookDetails }
}

