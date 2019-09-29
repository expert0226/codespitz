package com.heaven.codespitz84.object02.base

class Money(var balance: Double = 0.0) {
    companion object {
        fun of(balance: Int): Money {
            return Money(balance.toDouble())
        }

        fun of(balance: Double): Money {
            return Money(balance)
        }

        val ZERO = Money()
    }

    fun plus(money: Money): Money {
        return Money(balance + money.balance)
    }

    fun times(times: Long): Money {
        return Money(balance * times.toDouble())
    }

    fun times(times: Double): Money {
        return Money(balance * times)
    }

    fun minus(amount: Money): Money {
        return Money(balance - amount.balance)
    }
}