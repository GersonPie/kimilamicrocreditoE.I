import { useState, useEffect } from 'react';
import { db, collection, getDocs } from '../config/firebase';

export const Firestoretest = () => {
    const [users, setUsers] = useState([]);
    const [loans, setLoans] = useState([]);
    const [payments, setPayments] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          // Fetch all collections in parallel
          const [usersSnapshot, loansSnapshot, paymentsSnapshot] = await Promise.all([
            getDocs(collection(db, "users")),
            getDocs(collection(db, "loans")),
            getDocs(collection(db, "payments")),
          ]);
  
          // Map and set the data for each collection
          setUsers(usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
          setLoans(loansSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
          setPayments(paymentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      };
  
      fetchData();
  }, []);

  // ... rest of your component
  return (
    <>
    hello
        {users.map(user => (
  <div key={user.id}>
    <h3>{user.name}</h3>
    <ul>
      {loans.filter(loan => loan.userId === user.id).map(loan => (
        <li key={loan.id}>
          Loan Amount: {loan.amount}
          <ul>
            {payments.filter(payment => payment.loanId === loan.id).map(payment => (
              <li key={payment.id}>Payment Amount: {payment.amount}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  </div>
  ))}
  </>
  )
}







