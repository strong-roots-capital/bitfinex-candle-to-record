# bitfinex-candle-to-record [![Build Status](https://travis-ci.org/strong-roots-capital/bitfinex-candle-to-record.svg?branch=master)](https://travis-ci.org/strong-roots-capital/bitfinex-candle-to-record) [![npm version](https://img.shields.io/npm/v/bitfinex-candle-to-record.svg)](https://npmjs.org/package/bitfinex-candle-to-record) [![npm](https://img.shields.io/npm/dt/bitfinex-candle-to-record.svg)](https://www.npmjs.com/package/bitfinex-candle-to-record)

> Map a Bitfinex candle to a talib Record

## Install

``` shell
npm install bitfinex-candle-to-record
```

## Use

``` typescript
import bitfinexCandleToRecord from 'bitfinex-candle-to-record'

const URL_BITFINEX = 'https://api.bitfinex.com/v2'

const got = require('got')
import { URLSearchParams } from 'url'
import Record from 'timeseries-record'

type Candle = number[]

async function getCandles(tradepair: string, session: string): Promise<Candle[]> {
    let candles: Candle[] = []
    try {
        const response = await got(`candles/trade:${session}:t${tradepair}/hist`,
                                   {baseUrl: URL_BITFINEX})
        candles = JSON.parse(response.body)
    } catch (error) {
        console.log('Aborting: ', error.response.body)
    }
    return candles
}


async function main() {
    try {
        const candles: Candle[] = await getCandles('BTCUSD', '1D')
        const records: Record[] = candles.map(bitfinexCandleToRecord)
        console.log('Records:\n', records)
    } catch (error) {
        console.error('Error:', error)
    }
}

main()
//=> Records:
//   [ { Time: 1547683200000,
//      Open: 3675.4,
//      High: 3725,
//      Low: 3606.2,
//      Close: 3701.7,
//      Volume: 9515.37704315 },
//    { Time: 1547510400000,
//      Open: 3749.3,
//      High: 3780.87473393,
//      Low: 3623.1,
//      Close: 3654.3,
//      Volume: 13323.05379345 },
//    { Time: 1547424000000,
//      Open: 3590.9,
//      High: 3799.4,
//      Low: 3580,
//      Close: 3749.3,
//      Volume: 14836.12276868 },
//    ... ]
```
