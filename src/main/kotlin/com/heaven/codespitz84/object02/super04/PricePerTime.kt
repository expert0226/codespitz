package com.heaven.codespitz84.object02.super04

import com.heaven.codespitz84.base.Call
import com.heaven.codespitz84.base.Money
import java.time.Duration

public final class PricePerTime(
        private val price: Money,
        private val second: Duration
) : Calculator() {
    override fun calc(calls: Set<Call>, result: Money): Money {
        var _result = result
        for (call in calls) _result = result.plus(price.times((call.duration.seconds / second.seconds)))
        return _result
    }
}