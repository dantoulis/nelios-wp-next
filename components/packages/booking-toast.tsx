type BookingToastProps = {
  message: string | null;
};

export function BookingToast({ message }: BookingToastProps) {
  return (
    <div
      aria-live="polite"
      className={`fixed bottom-5 left-1/2 z-[60] w-[calc(100%-40px)] max-w-[420px] -translate-x-1/2 rounded-[8px] bg-brand-black px-5 py-4 text-center text-button text-white shadow-[0_18px_38px_rgba(85,85,99,0.24)] transition duration-300 md:left-auto md:right-6 md:w-[360px] md:translate-x-0 ${
        message
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
      role="status"
    >
      {message}
    </div>
  );
}
