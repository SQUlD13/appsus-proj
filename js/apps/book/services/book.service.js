import booksDB from '../books.js'
import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage-service.js'


const BOOK_KEY = 'books'
const SEARCH_KEY = 'searches'


export const bookService = {
    query,
    filter,
    getBook,
    getBookIdx,
    getBookByIdx,
    addBook,
    addReview,
    deleteReview,
    getCurrencySymbol,
    googleSearchBooks,
    createBooks
}

function query() {
    return storageService.query(BOOK_KEY)
}
function filter(filter, books) {
    if (!filter) {
        return books
    }
    else {
        var filtered = books.filter(book => {
            var min = (filter.min === '') ? 0 : filter.min
            var max = (filter.max === '') ? Infinity : filter.max
            return book.title.toLowerCase().includes(filter.title.toLowerCase()) && (book.listPrice.amount > min && book.listPrice.amount < max)
        })
        console.log("🚀 ~ file: book.service.js ~ line 37 ~ filter ~ filtered", filtered)

        return filtered
    }
}

//HELPERS
function getCurrencySymbol(currencyCode) {
    var currencyIcon = ''
    if (currencyCode === 'EUR') currencyIcon = '€'
    else if (currencyCode === 'USD') currencyIcon = '$'
    else currencyIcon = '₪'
    return currencyIcon
}
//GET
function getBook(id) {
    return Promise.resolve(query()
        .then((books) => {
            return books.find(book => { return book.id === id })
        }))
}
function getBookIdx(id) {
    return Promise.resolve(query()
        .then(books => {
            return books.findIndex(book => { return book.id === id })
        })
    )
}
function getBookByIdx(idx) {
    return Promise.resolve(query()
        .then(books => {
            return books[idx]
        })
    )
}


function addBook(book) {
    return storageService.post(BOOK_KEY, book)
}
//REVIEWS
function addReview(id, review) {
    return getBook(id)
        .then(book => {
            book.reviews.push(review)
            storageService.put(BOOK_KEY, book)
            return Promise.resolve(book)
        })
}
function deleteReview(bookId, reviewId) {
    return getBook(bookId)
        .then(book => {
            var idx = book.reviews.findIndex(review => review.id === reviewId)
            book.reviews.splice(idx, 1)
            storageService.put(BOOK_KEY, book)
            return Promise.resolve(book)
        })
}


//GOOGLE
function googleSearchBooks(searchVal) {
    searchVal = searchVal.split(' ').join('+')
    return storageService.query(SEARCH_KEY)
        .then(prevSearches => {
            var prevSearchRes = prevSearches.find((prevSearch) => { return prevSearch.searchVal === searchVal })
            if (prevSearchRes) {
                console.log('loading from storage for', searchVal)
                return Promise.resolve(prevSearchRes.results)
            }
            else {
                console.log('Querying google with', searchVal)
                return queryGoogleBooks(searchVal)
            }
        })


}

function queryGoogleBooks(searchVal) {
    var baseURL = `https://www.googleapis.com/books/v1/volumes?printType=books&q=${searchVal}`
    return axios.get(baseURL)
        .then(({ data }) => {
            var results = data.items.map((result) => {
                var book = createBook({ dataType: 'google', data: result })
                return book
            })
            var search = { searchVal, results }
            storageService.post(SEARCH_KEY, search)
            return Promise.resolve(results)
        })
}

//INITIALIZATION
function createBooks() {
    return Promise.resolve(query()
        .then(bookAns => {
            if (!bookAns.length) {
                _initializeBooksDB()
                var books = booksDB
            } else books = bookAns
            return storageService.postMany(BOOK_KEY, books)
                .then(Promise.resolve(books))
        })
    )

}
function _initializeBooksDB() {
    booksDB.forEach(book => {
        book.title = utilService.capitalize(book.title);
        book.reviews = [];
    })
}


function createBook({ dataType, data }) {
    switch (dataType) {
        case 'google':
            var description = (data.volumeInfo.description) ? data.volumeInfo.description : ''
            description.replaceAll(('<[^>]*>', 'g'), '')
            var subtitle = (data.volumeInfo.subtitle) ? data.volumeInfo.subtitle : ''
            var thumbnail = (data.volumeInfo.imageLinks) ? data.volumeInfo.imageLinks.thumbnail : ' '
            var language = (data.searchInfo) ? data.searchInfo.language : 'unknown'
            var listPrice = {
                amount: utilService.getRandomInt(0, 200),
                currencyCode: 'USD',
                isOnSale: Math.random() < 0.5,
            }
            var book = {
                authors: data.volumeInfo.authors,
                categories: data.volumeInfo.categories,
                description,
                id: utilService.makeId(),
                language,
                listPrice,
                pageCount: data.volumeInfo.pageCount,
                publishedDate: data.volumeInfo.publishedDate,
                reviews: [],
                subtitle,
                title: data.volumeInfo.title,
                thumbnail,
            }
            return book
            break;

        default:
            break;
    }
}



