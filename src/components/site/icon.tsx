import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"
import { cn } from "@/lib/utils"

type IconProps = {
  icon: IconSvgElement
  className?: string
  size?: number
  // Pass a label only when the icon carries meaning on its own.
  label?: string
}

export function Icon({ icon, className, size = 16, label }: IconProps) {
  return (
    <HugeiconsIcon
      icon={icon}
      size={size}
      strokeWidth={1.6}
      className={cn("shrink-0", className)}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? "img" : undefined}
      focusable="false"
    />
  )
}
