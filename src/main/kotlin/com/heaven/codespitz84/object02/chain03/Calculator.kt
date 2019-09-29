package com.heaven.codespitz84.object02.chain03

import com.heaven.codespitz84.base.Call
import com.heaven.codespitz84.base.Money

public interface Calculator {
    fun calcCallFee(calls: Set<Call>, result: Money): Money
}