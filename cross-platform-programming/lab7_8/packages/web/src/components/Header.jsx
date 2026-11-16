function Header({ total, completed }) {
  return (
    <header className="bg-[#f8eef1] px-6 py-10 text-center">
      <p className="mb-2 text-sm uppercase tracking-[0.3em] text-[#9c687a]">Beauty Studio</p>
      <h1 className="text-5xl font-semibold tracking-wider text-[#593747]">RE:BELLE</h1>
      <p className="mt-3 text-[#765c68]">Your beauty, your confidence, your moment.</p>
      <div className="mx-auto mt-7 flex max-w-md justify-center gap-4">
        <div className="w-40 rounded-2xl bg-white p-4 shadow-sm">
          <p className="text-3xl font-semibold text-[#593747]">{total}</p>
          <p className="text-sm text-[#765c68]">Total Bookings</p>
        </div>
        <div className="w-40 rounded-2xl bg-white p-4 shadow-sm">
          <p className="text-3xl font-semibold text-[#593747]">{completed}</p>
          <p className="text-sm text-[#765c68]">Completed</p>
        </div>
      </div>
    </header>
  );
}
export default Header;
