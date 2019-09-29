package com.heaven.codespitz84.object02.chain03

import com.heaven.codespitz84.base.Call
import com.heaven.codespitz84.base.Money
import java.time.Duration

class NightDiscount(
        private val next: Calculator?,
        private val dayPrice: Money,
        private val nightPrice: Money,
        private val second: Duration
) : Calculator {
    override fun calcCallFee(calls: Set<Call>, result: Money): Money {
        var _result = result

        for (call in calls) {
            val price = if (call.from.hour >= 22) nightPrice else dayPrice
            result.plus(price.times((call.duration.seconds / second.seconds)))
        }

        return next?.calcCallFee(calls, _result) ?: _result
    }
}