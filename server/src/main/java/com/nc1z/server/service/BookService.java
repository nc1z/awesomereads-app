package com.nc1z.server.service;

import com.nc1z.server.dao.BookRepository;
import com.nc1z.server.dao.CheckoutRepository;
import com.nc1z.server.entity.Book;
import com.nc1z.server.entity.Checkout;
import com.nc1z.server.model.CurrentLoansResponse;
import org.hibernate.annotations.Check;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private CheckoutRepository checkoutRepository;

    public Book checkoutBook(String userEmail, Long bookId) throws Exception {

        Optional<Book> book = bookRepository.findById(bookId);

        Checkout validateCheckout = checkoutRepository.findByUserEmailAndBookId(userEmail, bookId);

        if (!book.isPresent() || validateCheckout != null || book.get().getCopiesAvailable() <= 0) {
            throw new Exception("Book doesn't exist or already checked out by user");
        }

        book.get().setCopiesAvailable(book.get().getCopiesAvailable() - 1);
        bookRepository.save(book.get());

        Checkout checkout = new Checkout(
                userEmail,
                LocalDate.now().toString(),
                LocalDate.now().plusDays(7).toString(),
                book.get().getId()
        );

        checkoutRepository.save(checkout);

        return book.get();
    }

    public Boolean checkoutBookByUser(String userEmail, Long bookId) {
        Checkout validateCheckout = checkoutRepository.findByUserEmailAndBookId(userEmail, bookId);
        if (validateCheckout != null) {
            return true;
        } else {
            return false;
        }
    }

    public int currentLoansCount(String userEmail) {
        return checkoutRepository.findBooksByUserEmail(userEmail).size();
    }

    //
    // This currentLoans() method queries for a list of the user's checkout transactions, gets the book id(s)
    // from it and store it in a List. It then uses that list of id(s) to find all books.
    // Now that it has the book objects from the list and its checkout/return date from the checkout transactions,
    // it can calculate and return a List of CurrentLoansResponses, each containing a book object and daysLeft.
    //
    public List<CurrentLoansResponse> currentLoans(String userEmail) throws Exception {

        List<CurrentLoansResponse> currentLoansResponses = new ArrayList<>();

        List<Checkout> checkoutList = checkoutRepository.findBooksByUserEmail(userEmail);

        List<Long> bookIdList = new ArrayList<>();

        for (Checkout checkedOutBook: checkoutList) {
            bookIdList.add(checkedOutBook.getBookId());
        }

        List<Book> books = bookRepository.findBooksByBookIds(bookIdList);
    }
}
