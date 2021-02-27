import { bookService } from '../services/book.service.js'
import { eventBus } from '../../../services/event-bus.service.js'
import bookReview from './book-review.cmp.js'
import composeReview from './compose-review.cmp.js'
export default {
    props: ['book'],
    template: `
        <div v-if="book" class="book-reviews"> 
            <compose-review @addingReview="addReview" :user="this.user"></compose-review>
            <transition name="fade">
            <div v-if="reviews.length>0" class="reviews">
                <h1> User Reviews : </h1>
                <ul class="clean-list">
                    <transition-group name="list-column" tag="li">
                        <li v-for="review in reviews" :key="review.id">
                            <book-review :review="review" @delete-review="deleteReview"/>
                        </li>
                    </transition-group>
                </ul>
            </div>
            </transition>
        </div>
    `,
    data() {
        return {
            user: 'Books Reader',
            review: '',
            rating: 0,
            reviews: this.book.reviews
        }
    },
    methods: {
        addReview(review) {
            bookService.addReview(this.book.id, review)
                .then(() => {
                    this.getBook()
                    eventBus.$emit('show-msg', { txt: 'Review Added', type: 'success' })
                })
        },
        deleteReview(reviewId) {
            bookService.deleteReview(this.book.id, reviewId)
                .then(this.getBook)
        },
        getBook() {
            bookService.getBook(this.book.id)
                .then((book) => {
                    this.reviews = book.reviews
                })
        }
    },
    components: { bookReview, composeReview }
}