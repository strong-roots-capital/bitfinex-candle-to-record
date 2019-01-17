import test from 'ava'
const got = require('got')
import { URLSearchParams } from 'url'
import Record from 'timeseries-record'

const URL_BITFINEX = 'https://api.bitfinex.com/v2'

/**
 * Library under test
 */

import bitfinexCandleToRecord from '../src/bitfinex-candle-to-record'

type Candle = number[]

async function getLastCompleteCandle(tradepair: string, session: string): Promise<Candle> {
    let candle: Candle = []
    try {
        const response = await got(`candles/trade:${session}:t${tradepair}/hist`,
                                   {baseUrl: URL_BITFINEX,
                                    query: new URLSearchParams([['limit', '2']])})
        const body: number[][] = JSON.parse(response.body)
        candle = body[body.length - 1]
        // console.log('candle is:', candle)
    } catch (error) {
        console.log('Aborting: ', error.response.body)
    }
    return candle
}


test('should convert fresh candles from bitfinex api to records', async t => {
    try {
        const candle: Candle = await getLastCompleteCandle('BTCUSD', '1D')
        const record: Record = bitfinexCandleToRecord(candle)
        t.is(candle[0], record.Time)
        t.is(candle[1], record.Open)
        t.is(candle[2], record.Close)
        t.is(candle[3], record.High)
        t.is(candle[4], record.Low)
        t.is(candle[5], record.Volume)
    } catch (error) {
        t.fail()
    }
})
