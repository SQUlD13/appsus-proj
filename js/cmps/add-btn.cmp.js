
export default {
    template: `
        <button class="btn add-btn" @click="$emit('add')">
                <svg class="icon" height="10" width="10">
                        <path id="horizontal" d="M5 0 L5 10" stroke="#8A8F89" stroke-width="3" stroke-linecap="round"/>
                        <path id="vertical" d="M0 5 L10 5" stroke="#8A8F89" stroke-width="3" stroke-linecap="round"/>
                    </svg>
        </button>
    `,

}