package com.heaven.codespitz84.object02.compose02

import com.heaven.codespitz84.base.Call
import com.heaven.codespitz84.base.Money

public interface Calculator {
    fun calcCallFee(call: Call): Money
}