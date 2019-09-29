package com.heaven.codespitz84.object02.exercise

class Exam01(val gender: Boolean, name: String) {
    public val age = 5
}

fun main(args: Array<String>) {
    val ex = Exam01(true,"kbs")

    println(ex.age)
    println(ex.gender)
}