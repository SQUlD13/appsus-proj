import { utilService } from './util.service.js'
import storageService from './async-storage-service.js'

import { eventBus } from './event-bus.service.js'

const KEEP_KEY = 'keepDB'

function query() {
    storageService.query(KEEP_KEY)
}

