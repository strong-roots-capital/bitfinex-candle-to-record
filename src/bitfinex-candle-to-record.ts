/**
 * bitfinex-candle-to-record
 * Map a Bitfinex candle to a talib Record
 */

import Record from 'timeseries-record'


/**
 * Transform a candle (number[]) as returned from the Bitfinex REST
 * API into a Record used by talib.
 */
function bitfinexCandleToRecord(candle: number[]): Record {
    return {
        Time: candle[0],
        Open: candle[1],
        High: candle[3],
        Low: candle[4],
        Close: candle[2],
        Volume: candle[5]
    }
}

export default bitfinexCandleToRecord
