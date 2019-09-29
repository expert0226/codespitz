package com.heaven.codespitz84.object02.inherit01

import com.heaven.codespitz84.base.Call
import com.heaven.codespitz84.base.Money
import java.time.Duration

class NightDiscount(
        private val dayPrice: Money,
        private val nightPrice: Money,
        private val second: Duration
) : Plan() {
    protected override fun calcCallFee(call: Call): Money {
        val price = if (call.from.hour >= 22) nightPrice else dayPrice
        return price.times((call.duration.seconds / second.seconds))
    }
}