const { pick } = require('ramda');

module.exports = pick([
    'courier_name',
    'reference',
    'recipient_first_name',
    'recipient_last_name',
    'recipient_location',
    'status'
])