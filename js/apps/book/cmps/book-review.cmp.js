
export default {
    props: ['review'],
    template: `
    <div class="book-review">
        <header class="flex space-between">
            <h1 class="user-name">{{review.user}} <span class="light">wrote : </span></h1>
            <button class="btn delete-review-btn" @click="$emit('delete-review',review.id)">
                <svg class="icon" height="10" width="10">
                    <path id="mainDiagonal" d="M10 0 L0 10" stroke="firebrick" stroke-width="3" stroke-linecap="round"/>
                    <path id="secondaryDiagonal" d="M0 0 L10 10" stroke="firebrick" stroke-width="3" stroke-linecap="round"/>
                </svg>
            </button>
        </header>
        <div class="review-content">
            <pre>{{review.review}}</pre>
            <p>Rating : {{review.rating}}/5</p>
        </div>
    </div>
    `,
}