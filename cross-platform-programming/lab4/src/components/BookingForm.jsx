import { useState } from 'react';
function BookingForm({ onAddBooking }) {
  const [clientName, setClientName] = useState('');
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  function handleSubmit(event) {
    event.preventDefault();
    if (!clientName.trim() || !service || !date) {
      setError('Please fill in all fields.');
      return;
    }
    onAddBooking({
      id: crypto.randomUUID(),
      clientName: clientName.trim(), service, date, completed: false,
    });
    setClientName(''); setService(''); setDate(''); setError('');
  }
  return (
    <section className="rounded-3xl bg-white p-6 shadow-md sm:p-8">
      <h2 className="mb-2 text-2xl font-semibold text-[#593747]">Book Your Appointment</h2>
      <p className="mb-6 text-sm text-[#765c68]">Choose your favorite beauty treatment.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-2 block text-sm text-[#593747]">Client Name</label>
          <input type="text" value={clientName}
            onChange={(event) => setClientName(event.target.value)}
            placeholder="Enter your name"
            className="w-full rounded-xl border border-[#e8d5dc] p-3 outline-none focus:border-[#a87587]" />
        </div>
        <div>
          <label className="mb-2 block text-sm text-[#593747]">Beauty Service</label>
          <select value={service} onChange={(event) => setService(event.target.value)}
            className="w-full rounded-xl border border-[#e8d5dc] bg-white p-3 outline-none focus:border-[#a87587]">
            <option value="">Select a service</option>
            <option value="Hair Styling">Hair Styling</option>
            <option value="Manicure">Manicure</option>
            <option value="Facial Treatment">Facial Treatment</option>
            <option value="Makeup">Makeup</option>
            <option value="Eyebrow Styling">Eyebrow Styling</option>
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm text-[#593747]">Appointment Date</label>
          <input type="date" value={date} onChange={(event) => setDate(event.target.value)}
            className="w-full rounded-xl border border-[#e8d5dc] p-3 outline-none focus:border-[#a87587]" />
        </div>
        {error && <p role="alert" className="text-sm text-red-500">{error}</p>}
        <button type="submit"
          className="w-full rounded-xl bg-[#8d5c70] py-3 font-medium text-white transition hover:bg-[#704558]">
          Add Booking
        </button>
      </form>
    </section>
  );
}
export default BookingForm;
