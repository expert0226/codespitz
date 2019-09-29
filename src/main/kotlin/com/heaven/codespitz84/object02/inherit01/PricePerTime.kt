package com.heaven.codespitz84.object02.inherit01

import com.heaven.codespitz84.object02.base.Call
import com.heaven.codespitz84.object02.base.Money
import java.time.Duration

class PricePerTime(
        private val price: Money,
        private val second: Duration
) : Plan() {
    protected override fun calcCallFee(call: Call): Money {
        return price.times((call.duration.seconds / second.seconds))
    }
}