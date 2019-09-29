package com.heaven.codespitz83.object01.worker02

open class Worker: Runnable {
    override fun run() = println("working")
    fun print() = run()
}

class HardWorker: Worker() {
    override fun run() = println("HardWorking")
}

fun main(args: Array<String>) {
    var worker: Worker = HardWorker()
    worker.print()
}