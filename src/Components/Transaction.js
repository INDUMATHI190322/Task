import React, { useEffect, useState } from 'react';
import { getTransactions, createTransaction, getUsers, getBooks, updateTransaction, deleteTransaction } from '../services/api';

const Transaction = () => {
  const [books, setBooks] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const [newTransaction, setNewTransaction] = useState({
    bookId: '',
    userId: '',
    borrowDate: '',
    returnDate: '',
  });

  useEffect(() => {
    fetchTransactions();
    fetchUsers();
    fetchBooks();
  }, []);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await getTransactions();
      setTransactions(response.data);
    } catch (error) {
      setError('Error fetching transactions');
    } finally {
      setLoading(false);
    }
  };

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await getBooks();
      setBooks(response.data);
    } catch (error) {
      setError('Error fetching books');
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      setError('Error fetching users');
    } finally {
      setLoading(false);
    }
  };

  const calculateFine = (returnDate) => {
    const today = new Date();
    const returnDateObj = new Date(returnDate);
    if (today > returnDateObj) {
      const diffTime = today - returnDateObj;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays * 1; // Fine is $1 per day
    }
    return 0; // No fine if return date hasn't passed
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newTransaction.bookId || !newTransaction.userId || !newTransaction.borrowDate || !newTransaction.returnDate) {
      setError('All fields are required.');
      return;
    }

    setLoading(true);

    try {
      if (editingTransaction) {
        // Update transaction
        await updateTransaction(editingTransaction.id, newTransaction);
        setEditingTransaction(null);
        setNewTransaction({
          bookId: '',
          userId: '',
          borrowDate: '',
          returnDate: ''
      });
    }else {
        // Create new transaction
        await createTransaction(newTransaction);
      }
      fetchTransactions();
      setNewTransaction({
        bookId: '',
        userId: '',
        borrowDate: '',
        returnDate: '',
      });
    } catch (error) {
      setError('Error processing transaction');
    } finally {
      setLoading(false);
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingTransaction) return;
  
    if (!newTransaction.bookId || !newTransaction.userId || !newTransaction.borrowDate || !newTransaction.returnDate) {
      setError('All fields are required.');
      return;
    }
  
    console.log('Updating transaction with:', newTransaction); // Log data being sent
  
    try {
      await updateTransaction(editingTransaction.id, newTransaction);
      fetchTransactions();
      setEditingTransaction(null);
      setNewTransaction({
        bookId: '',
        userId: '',
        borrowDate: '',
        returnDate: '',
      });
    } catch (error) {
      console.error('Error while updating transaction:', error);
      setError('Failed to update transaction.');
    }
  };
  

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
  
    // Convert the date to yyyy-MM-dd format
    const formattedBorrowDate = new Date(transaction.borrowDate).toISOString().split('T')[0];
    const formattedReturnDate = new Date(transaction.returnDate).toISOString().split('T')[0];
  
    setNewTransaction({
      bookId: transaction.bookId,
      userId: transaction.userId,
      borrowDate: formattedBorrowDate,
      returnDate: formattedReturnDate,
    });
  };
  

  const handleDelete = async (transactionId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this transaction?');
    if (!confirmDelete) return;

    setLoading(true);
    try {
      await deleteTransaction(transactionId);
      setTransactions(transactions.filter((transaction) => transaction.id !== transactionId));
    } catch (error) {
      setError('Error deleting transaction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Transaction Management</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <select
          value={newTransaction.bookId}
          onChange={(e) => setNewTransaction({ ...newTransaction, bookId: e.target.value })}
        >
          <option value="">Select Book</option>
          {books.map((book) => (
            <option key={book.id} value={book.id}>
              {book.title}
            </option>
          ))}
        </select>
        <select
          value={newTransaction.userId}
          onChange={(e) => setNewTransaction({ ...newTransaction, userId: e.target.value })}
        >
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={newTransaction.borrowDate}
          onChange={(e) => setNewTransaction({ ...newTransaction, borrowDate: e.target.value })}
        />
        <input
          type="date"
          value={newTransaction.returnDate}
          onChange={(e) => setNewTransaction({ ...newTransaction, returnDate: e.target.value })}
        />
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? 'Processing...' : editingTransaction ? 'Update Transaction' : 'Add Transaction'}
        </button>

        {editingTransaction && (
          <button
            className="btn btn-secondary ml-2"
            type="button"
            onClick={() => {
              setEditingTransaction(null);
              setNewTransaction({
                bookId: '',
                userId: '',
                borrowDate: '',
                returnDate: '',
              });
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <table className="table mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Book Title</th>
            <th>User</th>
            <th>Borrow Date</th>
            <th>Return Date</th>
            <th>Fine</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => {
            const fine = calculateFine(transaction.returnDate);
            return (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.book?.title}</td>
                <td>{transaction.user?.name}</td>
                <td>{transaction.borrowDate}</td>
                <td>{transaction.returnDate}</td>
                <td>{fine > 0 ? `$${fine}` : 'No Fine'}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm mr-2"
                    onClick={() => handleEdit(transaction)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(transaction.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Transaction;
