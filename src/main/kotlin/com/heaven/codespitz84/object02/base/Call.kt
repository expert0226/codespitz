package com.heaven.codespitz84.object02.base

import java.time.Duration

class Call(val duration: Duration = Duration.ZERO) {
    val from = MyTime(0, 0, 0)
}

class MyTime(val hour: Int, val minute: Int, val second: Int)