package com.heaven.codespitz84.object02.compose05

import com.heaven.codespitz84.object02.base.Call
import com.heaven.codespitz84.object02.base.Money

public class Calculator {
    private val calcs = HashSet<Calc>()

    constructor(calc: Calc) {
        calcs.add(calc)
    }

    public final fun setNext(calc: Calc): Calculator {
        calcs.add(calc)
        return this
    }

    public final fun calcCallFee(calls: Set<Call>, result: Money): Money {
        var _result = result
        for(calc in calcs) _result = calc.calc(calls, _result)
        return _result
    }
}