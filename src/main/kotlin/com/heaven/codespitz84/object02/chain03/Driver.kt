package com.heaven.codespitz84.object02.chain03

import com.heaven.codespitz84.object02.base.Money
import java.time.Duration

fun main(args: Array<String>) {
    val plan = Plan()

    plan.setCalculator(
            PricePerTime(
                    com.heaven.codespitz84.object02.chain03.AmountDiscount(
                            Tax(null, 0.1),
                            Money.of(10000)
                    ),
                    Money.of(18),
                    Duration.ofSeconds(60)
            )
    )

    println(plan.calculaterFee().balance)
}