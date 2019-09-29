package com.heaven.codespitz84.object02.chain03

import com.heaven.codespitz84.object02.base.Call
import com.heaven.codespitz84.object02.base.Money

public final class Plan {
    private lateinit var calc: com.heaven.codespitz84.object02.chain03.Calculator
    private val calls = HashSet<Call>()

    public final fun setCalculator(calc: com.heaven.codespitz84.object02.chain03.Calculator) {
        this.calc = calc
    }

    public final fun addCall(call: Call) {
        calls.add(call)
    }

    public final fun calculaterFee(): Money {
        return calc.calcCallFee(calls, Money.ZERO)
    }
}