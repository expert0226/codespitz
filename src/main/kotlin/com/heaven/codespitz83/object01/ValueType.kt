package com.heaven.codespitz83.object01

class ValueType(val name: String) {
//    override operator fun equals(n: Any?) = n == name
}

data class User(val name: String, val age: Int)

fun main(args: Array<String>) {
    val a = Integer(10)
    val b = Integer(10)

    println(a == b)  // true
    println(a === b) // false

    val a1 = ValueType("abc")
    val b1 = ValueType("abc")

    println(a1 == b1) // false
    println(a1 === b1) // false

    val a2 = User("name", 25)
    val b2 = User("name", 25)

    println(a2 == b2) // false
    println(a2 === b2) // false
}