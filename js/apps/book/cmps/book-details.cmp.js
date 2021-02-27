import books from '../books.js'
import { bookService } from '../services/book.service.js'
import reviewAdd from './book-reviews.cmp.js'
import longDescription from './long-text.cmp.js'
export default {
    template: `
    <div v-if="book" class="book-details">
        <div class="img-container">
            <img class="inline-flex flex-1" :src="book.thumbnail" :alt="alt">
        </div>
        <div class="inline-flex space-between column content">
            <div class="flex aic title">
                <h1>Title : </h1>
                <p class="light">{{book.title}}</p>
            </div>
            <div class="flex aic book-length">
                <h1>Length : </h1>
                <p class="light">{{bookLength}} ({{book.pageCount}} pages)</p>
            </div>
            <div class="flex align-start column book-veterancy">
                <h1 v-if="displayDate">{{displayDate}}</h1>
                <p > Available for:</p> 
                <p class="light">{{yearDiff}} years</p>
            </div>
            <div class="flex aic book-price">
                <h1 >Price : </h1>
                <div class="flex aic">
                    <p class="self-center light" :class="priceClass">{{book.listPrice.amount}}{{currencyIcon}}</p>
                    <p class="sale" v-if="this.book.listPrice.isOnSale"> SALE! </p>
                </div>
            </div>
            <div class="description">
                <h1>Description :</h1>    
                <longDescription class="light ":text="book.description" />
            </div>
            <nav class="book-nav flex space-evenly aic">
                <router-link v-if="prevTag" :to="prevTag">Previous</router-link>
                <router-link to="/">Back to Store</router-link>
                <router-link v-if="nextTag" :to="nextTag">Next</router-link>
            </nav>
            
        </div>
        <review-add :book="this.book"/>
    </div>
    `,
    data() {
        return {
            book: null,
            id: null,
            idx: null,
            currencyIcon: null,
            prevTag: null,
            nextTag: null
        }
    },
    created() {
        this.id = this.$route.params.id
        this.initPage()
    },
    computed: {
        yearDiff() {
            return new Date(Date.now()).getFullYear() - this.book.publishedDate
        },
        bookLength() {
            var pageCount = this.book.pageCount
            var length = ''
            if (pageCount > 500) length = 'Long reading'
            else if (pageCount > 200) length = 'Decent reading'
            else if (pageCount < 100) length = 'Light reading'
            return length
        },
        priceClass() {
            return (this.book.listPrice.amount > 150) ? 'tense' : (this.book.listPrice.amount < 20) ? 'calm' : ''
        },
        displayDate() {
            return (this.yearDiff > 10) ? 'Veteran book' : (this.yearDiff < 1) ? 'New!' : ''
        },
        alt() {
            return this.book.title + '\'s Picture'
        },
    },
    methods: {
        initPage() {
            bookService.getBook(this.id)
                .then(book => {
                    this.book = book
                    this.currencyIcon = bookService.getCurrencySymbol(book.listPrice.currencyCode)
                    bookService.getBookIdx(book.id)
                        .then((idxAns) => {
                            this.idx = idxAns
                            this.getPrevBookTag()
                            this.getNextBookTag()
                        })
                })
        },
        getPrevBookTag() {
            var idx = this.idx - 1
            bookService.getBookByIdx(idx)
                .then((book) => {
                    if (book) this.prevTag = '/book/' + book.id
                    else this.prevTag = null
                })
        },
        getNextBookTag() {
            var idx = this.idx + 1
            bookService.getBookByIdx(idx)
                .then(book => {
                    if (book) this.nextTag = '/book/' + book.id
                    else this.nextTag = null
                })
        }
    },
    watch: {
        '$route.params.id'(val) {
            this.id = val
            console.log('watching url')
            this.initPage()
            this.$forceUpdate()
        }
    },
    components: { longDescription, reviewAdd }
}