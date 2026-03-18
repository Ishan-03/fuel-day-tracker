import Link from "next/link"

export default function Footer() {
  return (
    <footer className="mt-16 backdrop-blur-xl bg-white/70 dark:bg-white/5 border-t border-gray-200 dark:border-white/10">
      
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-3">

        {/* Brand */}
        <div>
          <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
            ⛽ Fuel Tracker
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Track your fuel days easily using the odd/even vehicle number system.
            Stay updated and never miss your fuel schedule.
          </p>
        </div>

        {/* Info Links */}
        <div className="flex flex-col gap-2 text-sm">
          {/* <Link
            href="#"
            className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition"
          >
            How It Works
          </Link>
          <Link
            href="#"
            className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition"
          >
            Fuel Rules
          </Link>
          <Link
            href="#"
            className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition"
          >
            Help / Support
          </Link> */}
        </div>

        {/* Extra Info */}
        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
          <p>📅 Smart calendar-based fuel tracking</p>
          <p className="pt-2 border-t border-gray-200 dark:border-gray-800">
            © {new Date().getFullYear()} Fuel Tracker
          </p>
        </div>
      </div>
    </footer>
  )
}