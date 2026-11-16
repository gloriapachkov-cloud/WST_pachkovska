import { addBooking as coreAdd, removeBooking as coreRemove, toggleBooking as coreToggle, sortBookings, searchBookings } from '@rebelle/core';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import BookingForm from './components/BookingForm';
import BookingList from './components/BookingList';
function App() {
  const [search, setSearch] = useState('');
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
    setBookings((previousBookings) => coreAdd(previousBookings, newBooking));
  }
  function toggleBooking(id) {
    setBookings((previousBookings) => coreToggle(previousBookings, id));
  }
  function deleteBooking(id) {
    setBookings((previousBookings) => coreRemove(previousBookings, id));
  }
  const totalBookings = bookings.length;
  const completedBookings = bookings.filter((booking) => booking.completed).length;
  return (
    <div className="min-h-screen bg-[#fdf9fa]">
      <Header total={totalBookings} completed={completedBookings} />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <BookingForm onAddBooking={addBooking} />
        <div className="mt-8"><label className="block text-sm text-[#593747] mb-2">Search appointments</label><input className="w-full rounded-xl border border-[#e8d5dc] p-3" placeholder="Search by client or service" value={search} onChange={e => setSearch(e.target.value)} /></div>
        <BookingList bookings={sortBookings(searchBookings(bookings,search))} onToggle={toggleBooking} onDelete={deleteBooking} />
      </main>
      <footer className="py-8 text-center text-sm text-[#9c687a]">
        © 2026 RE:BELLE Beauty Studio
      </footer>
    </div>
  );
}
export default App;
