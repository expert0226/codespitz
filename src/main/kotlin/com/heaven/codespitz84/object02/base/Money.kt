package com.heaven.codespitz84.object02.base

class Money(var balance: Double = 0.0) {
    companion object {
        fun of(balance: Int): com.heaven.codespitz84.object02.base.Money {
            return com.heaven.codespitz84.object02.base.Money(balance.toDouble())
        }

        fun of(balance: Double): com.heaven.codespitz84.object02.base.Money {
            return com.heaven.codespitz84.object02.base.Money(balance)
        }

        val ZERO = com.heaven.codespitz84.object02.base.Money()
    }

    fun plus(money: com.heaven.codespitz84.object02.base.Money): com.heaven.codespitz84.object02.base.Money {
        return com.heaven.codespitz84.object02.base.Money(balance + money.balance)
    }

    fun times(times: Long): com.heaven.codespitz84.object02.base.Money {
        return com.heaven.codespitz84.object02.base.Money(balance * times.toDouble())
    }

    fun times(times: Double): com.heaven.codespitz84.object02.base.Money {
        return com.heaven.codespitz84.object02.base.Money(balance * times)
    }

    fun minus(amount: com.heaven.codespitz84.object02.base.Money): com.heaven.codespitz84.object02.base.Money {
        return com.heaven.codespitz84.object02.base.Money(balance - amount.balance)
    }
}