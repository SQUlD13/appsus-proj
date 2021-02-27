
export default {
    template: `
    <header>
        <div class="flex aic space-between">
            <router-link class="logo" to="/">Miss Books</router-link>
            <nav class="nav flex space-between aic">
                <ul class="clean-list">
                    <router-link class="nav-link" to="/book">Shop</router-link>
                    <router-link class="nav-link" to="/about">About</router-link>
                </ul>
            </nav>
        </div>
    </header>
    `,
}

