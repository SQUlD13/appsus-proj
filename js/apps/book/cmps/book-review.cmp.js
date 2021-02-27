import delBtn from '../../../cmps/delete-btn.cmp.js'
export default {
    props: ['review'],
    template: `
    <div class="book-review">
        <header class="flex space-between">
            <h1 class="user-name">{{review.user}} <span class="light">wrote : </span></h1>
            <del-btn :info="{color:'firebrick',size:10}" @delete="$emit('delete-review',review.id)" />
        </header>
        <div class="review-content">
            <pre>{{review.review}}</pre>
            <p>Rating : {{review.rating}}/5</p>
        </div>
    </div>
    `,
    components: { delBtn }
}