import { utilService } from '../../../services/util.service.js'
export default {
    props: ['user'],
    template: `
    <div class="compose-review">
        <p>Writing review as <span>{{user}}</span> : </p>
        <form @submit.prevent="$emit('addingReview',getReview())">
            <textarea type="text" ref="reviewText" v-model="review" required/>
                <div class="rating">
                <label class="light" for="review-rating"> Rating: </label>
                <select v-model="rating" class="rating" id="review-rating" name="review-rating" required>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
            <button class="btn go-btn">Post</button>
        </form>
    </div>
    
    `,
    data() {
        return {
            review: '',
            rating: 0,
        }
    },
    mounted() {
        this.$refs.reviewText.focus()
    },
    methods: {
        getReview() {
            return { user: this.user, rating: this.rating, review: this.review, id: utilService.makeId() }
        }
    }
}