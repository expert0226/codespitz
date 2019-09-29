package com.heaven.codespitz83.object01.theater01

class Theater(val fee: Long) {
    private val ticketOffices: MutableList<TicketOffice> = mutableListOf()

    fun setTicketOffices(vararg tickerOffices: TicketOffice) = ticketOffices.addAll(tickerOffices)

    fun setTicket(tickerOffice: TicketOffice, num: Long) {
        if(!ticketOffices.contains(tickerOffice)) return

        for(i in 1..num) tickerOffice.addTicket(Ticket(this))
    }

    fun setInvitation(audience: Audience) {
        audience.setInvitation(Invitation())
    }

    fun enter(audience: Audience): Boolean {
        val ticket = audience.getTicket()
        return ticket.isValid(this)
    }
}