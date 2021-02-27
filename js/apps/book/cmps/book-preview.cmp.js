

export default {
    props: ['book', 'currencyIcon'],
    template: `
    <div class="book-preview">
            <div class="img-container">
                <img :src="book.thumbnail"/>
            </div>
        <div class="preview-line flex aic space-between">
            <h1 class="text-nowrap"> Title : </h1>
            <p class="light text-end"> {{book.title}}</p>
        </div>
        <div class="preview-line flex aic space-between">
            <h1> Price : </h1>
            <p class="light">{{book.listPrice.amount}} <span>{{currencyIcon}}</span></p>
        </div>
    </div>
    `,


}