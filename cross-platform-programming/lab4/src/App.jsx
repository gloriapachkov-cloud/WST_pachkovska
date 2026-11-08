import { useState, useEffect } from 'react';
import Header from './components/Header';
import BookingForm from './components/BookingForm';
import BookingList from './components/BookingList';
function App() {
  const [bookings, setBookings] = useState(() => {
    try {
      const savedBookings = localStorage.getItem('rebelle-bookings');
      const parsedBookings = savedBookings ? JSON.parse(savedBookings) : [];
      return Array.isArray(parsedBookings) ? parsedBookings : [];
    } catch { return []; }
  });
  useEffect(() => {
    localStorage.setItem('rebelle-bookings', JSON.stringify(bookings));
  }, [bookings]);
  function addBooking(newBooking) {
    setBookings((previousBookings) => [...previousBookings, newBooking]);
  }
  function toggleBooking(id) {
    setBookings((previousBookings) => previousBookings.map((booking) =>
      booking.id === id ? { ...booking, completed: !booking.completed } : booking
    ));
  }
  function deleteBooking(id) {
    setBookings((previousBookings) => previousBookings.filter((booking) => booking.id !== id));
  }
  const totalBookings = bookings.length;
  const completedBookings = bookings.filter((booking) => booking.completed).length;
  return (
    <div className="min-h-screen bg-[#fdf9fa]">
      <Header total={totalBookings} completed={completedBookings} />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <BookingForm onAddBooking={addBooking} />
        <BookingList bookings={bookings} onToggle={toggleBooking} onDelete={deleteBooking} />
      </main>
      <footer className="py-8 text-center text-sm text-[#9c687a]">
        © 2026 RE:BELLE Beauty Studio
      </footer>
    </div>
  );
}
export default App;
