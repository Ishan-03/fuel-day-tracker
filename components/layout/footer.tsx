
export default function Footer() {
  return (
    <footer className="mt-16 backdrop-blur-xl bg-white/70 dark:bg-white/5 border-t border-gray-200 dark:border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-1">

        {/* Brand & Description */}
        <div>
          <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
            ⛽ FDT
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Track your fuel days easily using the odd/even vehicle number system.
            Stay updated and never miss your fuel schedule.
          </p>
        </div>

        {/* Copyright */}
        <div className="text-sm text-gray-600 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-800">
          © {new Date().getFullYear()} Fuel Day Tracker by CFE404
        </div>
      </div>
    </footer>
  )
}