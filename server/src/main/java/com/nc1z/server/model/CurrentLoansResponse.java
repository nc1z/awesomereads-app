package com.nc1z.server.model;

import com.nc1z.server.entity.Book;
import lombok.Data;

@Data
public class CurrentLoansResponse {

    private Book book;

    private int daysLeft;

    public CurrentLoansResponse(Book book, int daysLeft) {
        this.book = book;
        this.daysLeft = daysLeft;
    }
}
