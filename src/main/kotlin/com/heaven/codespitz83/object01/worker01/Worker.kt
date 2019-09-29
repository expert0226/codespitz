package com.heaven.codespitz83.object01.worker01

open class Worker: Runnable {
    override fun run() = println("working")
}

class HardWorker: Worker() {
    override fun run() = println("HardWorking")
}

fun main(args: Array<String>) {
    var worker: Runnable = Worker()
    worker.run()

    worker = HardWorker()
    worker.run()
}