package com.heaven.codespitz84.object02.super04

import com.heaven.codespitz84.object02.base.Call
import com.heaven.codespitz84.object02.base.Money

class Tax(
        private val ratio: Double
) : Calculator() {
    override fun calc(calls: Set<Call>, result: Money): Money {
        return result.plus(result.times(ratio))
    }
}