package com.heaven.codespitz84.object02.chain03

import com.heaven.codespitz84.object02.base.Call
import com.heaven.codespitz84.object02.base.Money
import java.time.Duration

class PricePerTime(
        private val next: com.heaven.codespitz84.object02.chain03.Calculator?,
        private val price: Money,
        private val second: Duration
) : com.heaven.codespitz84.object02.chain03.Calculator {
    override fun calcCallFee(calls: Set<Call>, result: Money): Money {
        var _result = result
        for (call in calls) _result = result.plus(price.times((call.duration.seconds / second.seconds)))
        return next?.calcCallFee(calls, _result) ?: _result
    }
}