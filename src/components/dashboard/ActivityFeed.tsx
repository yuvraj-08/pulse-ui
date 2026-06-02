"use client"

import { motion } from "framer-motion"

interface ActivityItem {
  id: string
  action: string
  subject: string
  time: string
  dotColor: string
}

const ACTIVITY: ActivityItem[] = [
  {
    id: "1",
    action: "Completed",
    subject: "UI component library setup",
    time: "2m ago",
    dotColor: "#10b981",
  },
  {
    id: "2",
    action: "Reviewed",
    subject: "Dashboard animations PR",
    time: "18m ago",
    dotColor: "#8b5cf6",
  },
  {
    id: "3",
    action: "Created",
    subject: "New design system tokens",
    time: "1h ago",
    dotColor: "#3b82f6",
  },
  {
    id: "4",
    action: "Deployed",
    subject: "Production v2.4.1",
    time: "3h ago",
    dotColor: "#f59e0b",
  },
  {
    id: "5",
    action: "Commented on",
    subject: "Auth flow improvements",
    time: "5h ago",
    dotColor: "#ec4899",
  },
]

export function ActivityFeed() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, type: "spring", stiffness: 100, damping: 15 }}
      className="rounded-2xl border border-black/[0.07] dark:border-white/[0.08] bg-white dark:bg-white/[0.03] p-6 shadow-sm dark:shadow-none"
    >
      <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-5">Recent Activity</h2>

      <div className="flex flex-col gap-1">
        {ACTIVITY.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.65 + i * 0.07, type: "spring", stiffness: 120, damping: 15 }}
            whileHover={{ x: 5, transition: { duration: 0.15 } }}
            className="flex items-center gap-3 py-3 group cursor-default rounded-xl px-2 hover:bg-black/[0.03] dark:hover:bg-white/[0.03] transition-colors duration-150"
          >
            <div
              className="h-2 w-2 rounded-full shrink-0"
              style={{ backgroundColor: item.dotColor }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-zinc-500 dark:text-zinc-400 truncate group-hover:text-zinc-800 dark:group-hover:text-zinc-200 transition-colors duration-150">
                <span className="text-zinc-400 dark:text-zinc-600">{item.action} </span>
                {item.subject}
              </p>
            </div>
            <span className="text-xs text-zinc-400 dark:text-zinc-600 shrink-0 tabular-nums">{item.time}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
