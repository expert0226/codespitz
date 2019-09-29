package com.heaven.codespitz84.object02.super04

import com.heaven.codespitz84.base.Call
import com.heaven.codespitz84.base.Money

public abstract class Calculator {
    private var next: Calculator? = null

    public final fun setNext(next: Calculator) : Calculator {
        this.next = next
        return this
    }

    public final fun calcCallFee(calls: Set<Call>, result: Money): Money {
        var _result = calc(calls, result)
        return next?.calcCallFee(calls, _result) ?: _result
    }

    protected abstract fun calc(calls: Set<Call>, result: Money): Money
}