import BookingItem from './BookingItem';
function BookingList({ bookings, onToggle, onDelete }) {
  return (
    <section className="mt-8">
      <div className="mb-5">
        <h2 className="text-2xl font-semibold text-[#593747]">Your Appointments</h2>
        <p className="mt-1 text-sm text-[#765c68]">Manage your beauty appointments with RE:BELLE.</p>
      </div>
      {bookings.length === 0 ? (
        <div className="rounded-2xl border border-[#ead8df] bg-white p-10 text-center shadow-sm">
          <p className="text-3xl">🌸</p>
          <h3 className="mt-3 text-lg font-semibold text-[#593747]">No appointments yet</h3>
          <p className="mt-2 text-sm text-[#765c68]">Your beauty journey starts here. Add your first booking!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking}
              onToggle={onToggle} onDelete={onDelete} />
          ))}
        </div>
      )}
    </section>
  );
}
export default BookingList;
