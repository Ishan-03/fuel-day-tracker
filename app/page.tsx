"use client"

import { useState, useEffect } from "react"
import {
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
} from "date-fns"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { translations } from "./locales"

export default function Home() {
  const [vehicle, setVehicle] = useState("")
  const [allowedType, setAllowedType] = useState<"odd" | "even" | null>(null)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [locale, setLocale] = useState<"en" | "si" | "ta">("en")
  const [error, setError] = useState("")
  const [isMobile, setIsMobile] = useState(false)

  const t = translations[locale]

  // Detect mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Update current date every minute
  useEffect(() => {
    const interval = setInterval(() => setCurrentDate(new Date()), 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const handleCheck = () => {
    setError("")
    if (vehicle.length !== 4 || !/^\d{4}$/.test(vehicle)) {
      setError(vehicle.length !== 4 ? t.errors.digits : t.errors.invalid)
      setAllowedType(null)
      return
    }
    const lastDigit = parseInt(vehicle[vehicle.length - 1])
    setAllowedType(lastDigit % 2 === 0 ? "even" : "odd")
  }

  // Calendar calculations
  const start = startOfMonth(currentDate)
  const end = endOfMonth(currentDate)
  const days = eachDayOfInterval({ start, end })
  const startDayIndex = getDay(start)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-black dark:to-gray-900 transition-colors p-4">

      {isMobile ? (
        // ---------- MOBILE UI ----------
        <div className="space-y-4">
          {/* Language Switcher */}
          <div className="flex justify-center gap-2 mb-4 flex-wrap">
            {["en", "si", "ta"].map((l) => (
              <Button
                key={l}
                size="sm"
                variant={locale === l ? "default" : "outline"}
                onClick={() => setLocale(l as "en" | "si" | "ta")}
              >
                {l === "en" ? "EN" : l === "si" ? "සිං" : "தமிழ்"}
              </Button>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
            {t.title}
          </h1>

          {/* Input Card */}
          <Card className="backdrop-blur-xl bg-white/70 dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-xl rounded-xl">
            <CardContent className="p-4 space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t.vehicleLabel}
                </label>
                <Input
                  placeholder={t.placeholder}
                  value={vehicle}
                  maxLength={4}
                  onChange={(e) => setVehicle(e.target.value.replace(/\D/g, ""))}
                  className="text-center text-base tracking-widest bg-white/80 dark:bg-black/40 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-green-500"
                />
              </div>

              <Button
                onClick={handleCheck}
                className="w-full text-base font-semibold rounded-lg bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition"
              >
                {t.checkButton}
              </Button>

              {error && (
                <p className="text-center text-sm text-red-500 font-medium">{error}</p>
              )}

              {allowedType && !error && (
                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                  {locale === "si"
                    ? "අයත්වන කාණ්ඩය:"
                    : locale === "ta"
                    ? "வகை:"
                    : "Category Type:"}{" "}
                  <span className="text-green-500 font-semibold">{t.fuelType[allowedType]}</span>
                </p>
              )}
            </CardContent>
          </Card>

          {/* Calendar */}
          <div className="backdrop-blur-xl bg-white/70 dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-xl rounded-xl p-4 overflow-x-auto">
            <div className="flex justify-between items-center mb-3">
              <Button
                variant="outline"
                className="rounded-lg text-sm px-2"
                onClick={() => setCurrentDate(subMonths(currentDate, 1))}
              >
                {t.prevMonth}
              </Button>

              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t.months[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>

              <Button
                variant="outline"
                className="rounded-lg text-sm px-2"
                onClick={() => setCurrentDate(addMonths(currentDate, 1))}
              >
                {t.nextMonth}
              </Button>
            </div>

            {/* Week Days */}
            <div className="grid grid-cols-7 text-center text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
              {t.weekDays.map((day) => (
                <div key={day}>{day}</div>
              ))}
            </div>

            {/* Days */}
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: startDayIndex }).map((_, i) => (
                <div key={"empty-" + i}></div>
              ))}

              {days.map((date) => {
                const day = date.getDate()
                const normalizedDate = new Date(date)
                normalizedDate.setHours(0, 0, 0, 0)
                const isPast = normalizedDate < today
                const isAllowed =
                  allowedType &&
                  ((allowedType === "even" && day % 2 === 0) ||
                    (allowedType === "odd" && day % 2 !== 0))
                const isToday = normalizedDate.getTime() === today.getTime()

                return (
                  <div
                    key={date.toString()}
                    className={`h-10 flex items-center justify-center text-xs font-semibold rounded-md transition-all duration-200 border cursor-pointer
                      ${
                        isPast
                          ? "bg-red-500/80 text-white border-red-500"
                          : isAllowed
                          ? "bg-green-500 text-white border-green-500 shadow hover:scale-105"
                          : "bg-white/80 dark:bg-black/40 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800"
                      }
                      ${isToday ? "ring-1 ring-blue-500" : ""}
                    `}
                  >
                    {day}
                  </div>
                )
              })}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-4 mt-4 text-xs text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 bg-green-500 rounded"></span>
                {t.legend.fuelDay}
              </div>
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 bg-red-500 rounded"></span>
                {t.legend.pastDay}
              </div>
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 bg-gray-300 dark:bg-gray-700 rounded"></span>
                {t.legend.notAllowed}
              </div>
            </div>
          </div>
        </div>
      ) : (
        // ---------- DESKTOP UI ----------
        <div className="p-6">
          {/* Language Switcher */}
          <div className="flex justify-end mb-6 gap-2">
            {["en", "si", "ta"].map((l) => (
              <Button
                key={l}
                size="sm"
                variant={locale === l ? "default" : "outline"}
                onClick={() => setLocale(l as "en" | "si" | "ta")}
              >
                {l === "en" ? "English" : l === "si" ? "සිංහල" : "தமிழ்"}
              </Button>
            ))}
          </div>

          <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            {t.title}
          </h1>

          {/* Input Card */}
          <Card className="max-w-md mx-auto mb-10 backdrop-blur-xl bg-white/70 dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-2xl rounded-2xl">
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t.vehicleLabel}
                </label>
                <Input
                  placeholder={t.placeholder}
                  value={vehicle}
                  maxLength={4}
                  onChange={(e) => setVehicle(e.target.value.replace(/\D/g, ""))}
                  className="text-center text-lg tracking-widest bg-white/80 dark:bg-black/40 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-green-500"
                />
              </div>

              <Button
                onClick={handleCheck}
                className="w-full text-base font-semibold rounded-xl bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition"
              >
                {t.checkButton}
              </Button>

              {error && (
                <p className="text-center text-sm text-red-500 font-medium">{error}</p>
              )}

              {allowedType && !error && (
                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                  {locale === "si"
                    ? "අයත්වන කාණ්ඩය:"
                    : locale === "ta"
                    ? "வகை:"
                    : "Category Type:"}{" "}
                  <span className="text-green-500 font-semibold">{t.fuelType[allowedType]}</span>
                </p>
              )}
            </CardContent>
          </Card>

          {/* Calendar */}
          <div className="max-w-4xl mx-auto backdrop-blur-xl bg-white/70 dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-2xl rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <Button
                variant="outline"
                className="rounded-xl"
                onClick={() => setCurrentDate(subMonths(currentDate, 1))}
              >
                {t.prevMonth}
              </Button>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                {t.months[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>

              <Button
                variant="outline"
                className="rounded-xl"
                onClick={() => setCurrentDate(addMonths(currentDate, 1))}
              >
                {t.nextMonth}
              </Button>
            </div>

            {/* Week Days */}
            <div className="grid grid-cols-7 mb-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
              {t.weekDays.map((day) => (
                <div key={day}>{day}</div>
              ))}
            </div>

            {/* Days */}
            <div className="grid grid-cols-7 gap-3">
              {Array.from({ length: startDayIndex }).map((_, i) => (
                <div key={"empty-" + i}></div>
              ))}

              {days.map((date) => {
                const day = date.getDate()
                const normalizedDate = new Date(date)
                normalizedDate.setHours(0, 0, 0, 0)
                const isPast = normalizedDate < today
                const isAllowed =
                  allowedType &&
                  ((allowedType === "even" && day % 2 === 0) ||
                    (allowedType === "odd" && day % 2 !== 0))
                const isToday = normalizedDate.getTime() === today.getTime()

                return (
                  <div
                    key={date.toString()}
                    className={`h-14 flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-200 border cursor-pointer
                      ${
                        isPast
                          ? "bg-red-500/80 text-white border-red-500"
                          : isAllowed
                          ? "bg-green-500 text-white border-green-500 shadow-lg hover:scale-105"
                          : "bg-white/80 dark:bg-black/40 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800"
                      }
                      ${isToday ? "ring-2 ring-blue-500" : ""}
                    `}
                  >
                    {day}
                  </div>
                )
              })}
            </div>

            {/* Legend */}
            <div className="flex gap-6 mt-6 text-sm justify-center text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-green-500 rounded"></span>
                {t.legend.fuelDay}
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-red-500 rounded"></span>
                {t.legend.pastDay}
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-gray-300 dark:bg-gray-700 rounded"></span>
                {t.legend.notAllowed}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}