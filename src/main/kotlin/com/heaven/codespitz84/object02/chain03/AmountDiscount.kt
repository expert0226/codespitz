package com.heaven.codespitz84.object02.chain03

import com.heaven.codespitz84.object02.base.Call
import com.heaven.codespitz84.object02.base.Money

class AmountDiscount(
        private val next: com.heaven.codespitz84.object02.chain03.Calculator?,
        private val amount: Money
) : com.heaven.codespitz84.object02.chain03.Calculator {
    override fun calcCallFee(calls: Set<Call>, result: Money): Money {
        var _result = result
        _result = result.minus(amount)
        return next?.calcCallFee(calls, _result) ?: _result
    }
}