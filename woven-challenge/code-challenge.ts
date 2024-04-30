export interface User {
  id: number
  name: string
  activatedOn: Date
  deactivatedOn: Date | null
  customerId: number
}

export interface Subscription {
  id: number
  customerId: number
  monthlyPriceInCents: number
}

export function monthlyCharge(
  yearMonth: string,
  subscription: Subscription | null,
  users: User[]
): number {
  if (!subscription) {
    return 0
  }

  // Parse year and month
  const [year, month] = yearMonth.split('-').map(Number)
  const firstDay = firstDayOfMonth(new Date(year, month - 1, 1)) // month - 1 because Date expects 0-indexed months
  const lastDay = lastDayOfMonth(new Date(year, month - 1, 1))

  // Calculate daily rate
  const daysInMonth = lastDay.getDate() - firstDay.getDate() + 1
  const dailyRate = subscription.monthlyPriceInCents / daysInMonth

  let totalCharge = 0

  // Iterate through each day of the month
  for (let d = new Date(firstDay); d <= lastDay; d = nextDay(d)) {
    // Filter active users for the day
    const activeUsersCount = users.filter((user) => {
      const activation = user.activatedOn
      const deactivation = user.deactivatedOn || new Date() // Assume active if no deactivation date

      return activation <= d && (!deactivation || deactivation >= d)
    }).length

    // Calculate charge for the day
    totalCharge += dailyRate * activeUsersCount
  }

  // Round the total charge to the nearest cent
  return Math.round(totalCharge)
}

function firstDayOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function lastDayOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0)
}

function nextDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
}
