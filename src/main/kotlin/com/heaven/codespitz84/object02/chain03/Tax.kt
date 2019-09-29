package com.heaven.codespitz84.object02.chain03

import com.heaven.codespitz84.object02.base.Call
import com.heaven.codespitz84.object02.base.Money

class Tax(
        private val next: com.heaven.codespitz84.object02.chain03.Calculator?,
        private val ratio: Double
) : com.heaven.codespitz84.object02.chain03.Calculator {
    override fun calcCallFee(calls: Set<Call>, result: Money): Money {
        var _result = result
        _result = result.plus(result.times(ratio))
        return next?.calcCallFee(calls, _result) ?: _result
    }
}