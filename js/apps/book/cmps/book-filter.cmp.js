import bookAdd from './book-add.cmp.js'
export default {
    data() {
        return {
            title: '',
            min: 0,
            max: Infinity,
        }
    },
    template: `
    <div class="book-filter">
        <h1>Filter By:</h1>
        <form class="flex column book-filter-form space-evenly" @submit.prevent="setFilter">
            <div class="filter-text-container">
                <input type="text" placeholder="Book name..." v-model="title" @input="setFilter">
                <div v-if="this.title" class="delete-search" @click="clearSearch">
                    <svg height="12" width="12">
                        <path id="mainDiagonal" d="M0 0 L12 12" stroke="#999" stroke-width="2" />
                        <path id="secondaryDiagonal" d="M12 0 L0 12" stroke="#999" stroke-width="2" />
                    </svg>
                </div>
            </div>
            <div class="filter-price flex">
                <div class="inline-flex flex-1 aic">
                    <label class="light" for="filter-price-range-min">
                        from:
                    </label>
                    <input type="number" min="0" :max="max" v-model.number="min" id="filter-price-range-min" placeholder="0">
                </div>
                <div class="inline-flex flex-1 aic">
                    <label class="light" for="filter-price-range-max">
                        to:
                    </label>
                    <input type="number" min="0" :max="max" v-model.number="max" id="filter-price-range-max" placeholder="Infinity">
                </div>
            </div>
            <button v-if="(min > 0 && min) || (max < 9999 && (max!==Infinity && max)) || title"class="btn go-btn"> Search </button>
        </form>
        <book-add @update-shop="updateShop"/>
    </div>
    `,
    methods: {
        setFilter() {
            console.log('filter emitting')
            this.$emit('filtered', { title: this.title, min: this.min, max: this.max })
        },
        clearSearch() {
            this.title = ''
            this.setFilter()
        },
        updateShop() {
            console.log('emission chaing book add passing through filter')
            this.$emit('update-shop')
        }
    },
    components: {
        bookAdd,
    }
}