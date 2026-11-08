function BookingItem({ booking, onToggle, onDelete }) {
  return (
    <div className={`rounded-2xl border p-5 shadow-sm transition ${
      booking.completed ? 'border-green-200 bg-green-50' : 'border-[#ead8df] bg-white'
    }`}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <input type="checkbox" checked={booking.completed}
            onChange={() => onToggle(booking.id)}
            aria-label={`Mark ${booking.clientName}'s booking as completed`}
            className="mt-1 h-5 w-5 accent-[#8d5c70]" />
          <div>
            <h3 className={`text-lg font-semibold ${
              booking.completed ? 'text-gray-400 line-through' : 'text-[#593747]'
            }`}>{booking.clientName}</h3>
            <p className="mt-1 text-sm text-[#765c68]">{booking.service}</p>
            <p className="mt-1 text-sm text-gray-500">{booking.date}</p>
            <span className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-medium ${
              booking.completed ? 'bg-green-100 text-green-700' : 'bg-[#f8eef1] text-[#8d5c70]'
            }`}>{booking.completed ? 'Completed' : 'Upcoming'}</span>
          </div>
        </div>
        <button type="button" onClick={() => onDelete(booking.id)}
          className="rounded-xl border border-red-200 px-4 py-2 text-sm text-red-500 transition hover:bg-red-50">
          Delete
        </button>
      </div>
    </div>
  );
}
export default BookingItem;
