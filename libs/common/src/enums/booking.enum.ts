export enum ORDER_CMD {
    CREATE = 'create_order',
    GET_ALL = 'get_all_orders',
    GET_BY_ID = 'get_order_by_id',
    UPDATE = 'update_order',
    DELETE = 'delete_order',
}

export enum TICKET_CMD {
    CREATE = 'create_ticket',
    GET_ALL = 'get_all_tickets',
    GET_BY_ID = 'get_ticket_by_id',
    GET_BOOKED_BY_SHOWTIME = 'get_booked_tickets_by_showtime',
    UPDATE = 'update_ticket',
    DELETE = 'delete_ticket',
}

export enum PaymentStatus {
    PENDING = 'PENDING',
    PAID = 'PAID',
    CANCELLED = 'CANCELLED',
    EXPIRED = 'EXPIRED',
    FAILED = 'FAILED',
}

export enum TicketStatus {
    HELD = 'HELD',
    BOOKED = 'BOOKED',
    CANCELLED = 'CANCELLED',
}
