package com.heaven.codespitz84.object02.compose05

import com.heaven.codespitz84.base.Call
import com.heaven.codespitz84.base.Money

class Tax(
        private val ratio: Double
) : Calc {
    override fun calc(calls: Set<Call>, result: Money): Money {
        return result.plus(result.times(ratio))
    }
}