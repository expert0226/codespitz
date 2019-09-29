package com.heaven.codespitz84.object02.inherit01

import com.heaven.codespitz84.base.Call
import com.heaven.codespitz84.base.Money

public abstract class Plan {
    private val calls = HashSet<Call>()

    public final fun addCall(call: Call) {
        calls.add(call)
    }

    public final fun calculateFee(): Money {
        var result = Money.ZERO;

        for(call in calls) result = result.plus(calcCallFee(call))

        return result;
    }

    protected abstract fun calcCallFee(call: Call): Money
}