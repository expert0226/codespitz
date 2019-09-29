package com.heaven.codespitz84.object02.compose05

import com.heaven.codespitz84.object02.base.Money
import java.time.Duration

fun main(args: Array<String>) {
    val plan = Plan()

    plan.setCalculator(
            Calculator(PricePerTime(Money.of(18), Duration.ofSeconds(60)))
                    .setNext(AmountDiscount(Money.of(10000)))
                    .setNext(Tax(0.1))
    )

    println(plan.calculaterFee().balance)
}