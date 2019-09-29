package com.heaven.codespitz84.object02.compose05

import com.heaven.codespitz84.object02.base.Call
import com.heaven.codespitz84.object02.base.Money

class AmountDiscount(
        private val amount: Money
) : Calc {
    override fun calc(calls: Set<Call>, result: Money): Money {
        return result.minus(amount)
    }
}