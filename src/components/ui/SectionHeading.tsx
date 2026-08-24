import { motion } from 'framer-motion'

interface Props {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

export function SectionHeading({ eyebrow, title, description, align = 'left' }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={align === 'center' ? 'text-center mx-auto max-w-2xl' : ''}
    >
      <div className={`flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`}>
        <span className="h-px w-8 bg-violet" />
        <span className="eyebrow">{eyebrow}</span>
      </div>
      <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold uppercase leading-[0.95] text-white">
        {title}
      </h2>
      {description && <p className="mt-4 text-sm sm:text-base text-mist max-w-xl">{description}</p>}
    </motion.div>
  )
}
