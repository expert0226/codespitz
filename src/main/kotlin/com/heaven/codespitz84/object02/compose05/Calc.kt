package com.heaven.codespitz84.object02.compose05

import com.heaven.codespitz84.object02.base.Call
import com.heaven.codespitz84.object02.base.Money

interface Calc {
    public abstract fun calc(calls: Set<Call>, result: Money): Money
}