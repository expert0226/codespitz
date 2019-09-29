package com.heaven.codespitz84.object02.compose05

import com.heaven.codespitz84.object02.base.Call
import com.heaven.codespitz84.object02.base.Money

public final class Plan {
    private lateinit var calc: Calculator
    private val calls = HashSet<Call>()

    public final fun setCalculator(calc: Calculator) {
        this.calc = calc
    }

    public final fun addCall(call: Call) {
        calls.add(call)
    }

    public final fun calculaterFee(): Money {
        return calc.calcCallFee(calls, Money.ZERO)
    }
}