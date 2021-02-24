
export default {
    template: `
    <button class="btn delete-btn" @click="$emit('delete')">
        <svg class="icon" height="10" width="10">
            <path id="mainDiagonal" d="M10 0 L0 10" stroke="firebrick" stroke-width="3" stroke-linecap="round"/>
            <path id="secondaryDiagonal" d="M0 0 L10 10" stroke="firebrick" stroke-width="3" stroke-linecap="round"/>
        </svg>
    </button>
    `
}