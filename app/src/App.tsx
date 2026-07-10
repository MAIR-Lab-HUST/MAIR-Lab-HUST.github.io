import { motion } from "motion/react"
import hustLogoUrl from "@/assets/HUST_logo.png"
import mairLogoUrl from "@/assets/MAIR_logo.png"
import specImageUrl from "@/assets/signature-spine-spec.jpg"

const videoUrl =
  "https://res.cloudinary.com/daklr2whx/video/upload/v1778602552/track-video_2_s9lp53.mp4"

const navLinks = [
  { label: "Research", href: "#research" },
  { label: "Open Source", href: "#open-source" },
  { label: "Vision", href: "#vision" },
  { label: "Join Us", href: "#join" },
]

function SpecCrop({ className, label }: { className: string; label: string }) {
  return (
    <div className={`spec-crop ${className}`} role="img" aria-label={label}>
      <img src={specImageUrl} alt="" aria-hidden="true" />
    </div>
  )
}

function App() {
  return (
    <section className="signature-page relative w-full overflow-hidden text-black">
      <header className="absolute inset-x-0 top-[22px] z-40 px-5 md:px-[5.65vw]">
        <nav className="mx-auto flex h-[65px] max-w-[1242px] items-center justify-between rounded-full border border-black/15 px-5 md:px-[20px]">
          <a
            href="#"
            className="text-[21px] leading-none tracking-[-0.03em] text-black no-underline md:text-[24px]"
            style={{ fontFamily: "'Instrument Serif', serif" }}
            aria-label="MAIR Lab homepage"
          >
            MAIR Lab @ HUST
          </a>

          <div className="hidden items-center gap-[34px] md:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[13px] font-normal text-black/90 no-underline transition-opacity duration-200 hover:opacity-65"
              >
                {link.label}
              </a>
            ))}
          </div>

          <motion.a
            href="mailto:mzyth@hust.edu.cn"
            className="flex h-[43px] min-w-[92px] items-center justify-center rounded-full border border-black/15 px-5 text-[13px] font-semibold text-black no-underline transition-colors duration-200 hover:bg-black/5"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            Contact
          </motion.a>
        </nav>
      </header>

      <main
        className="relative z-20 flex w-full flex-col items-center px-5 pb-[170px] pt-[130px] text-center md:px-8"
      >
        <div className="flex h-[105px] items-center justify-center gap-[16px] md:h-[140px] md:gap-[22px]">
          <img
            src={mairLogoUrl}
            alt="MAIR Lab geometric mark"
            className="h-[78px] w-[78px] object-contain md:h-[118px] md:w-[118px]"
          />
          <span
            className="h-[48px] w-px shrink-0 bg-black/25 md:h-[64px]"
            aria-hidden="true"
          />
          <img
            src={hustLogoUrl}
            alt="Huazhong University of Science and Technology emblem"
            className="h-[72px] w-auto object-contain md:h-[104px]"
          />
        </div>

        <p
          className="mt-[24px] text-[10px] font-semibold uppercase leading-none tracking-[0.46em] text-black/95 sm:text-[12px] md:mt-[22px] md:translate-x-[7px] md:tracking-[0.48em]"
        >
          Multimodal Artificial Intelligence Research Lab
        </p>

        <div className="mt-[22px]">
          <h1
            className="signature-title text-[46px] font-normal leading-[0.98] tracking-[-0.045em] text-black sm:text-[58px]"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            <span className="block">Engineering the next frontier of</span>
            <span className="block">multimodal intelligence.</span>
          </h1>
        </div>

        <p
          className="mt-[25px] max-w-[800px] text-[14px] font-normal leading-[1.6] text-black md:translate-x-[20px] md:text-[18px]"
        >
          <span className="md:block">
            At MAIR Lab, we build multimodal systems that move from perception to generation,
          </span>{" "}
          <span className="md:block">
            from reasoning to action, and from isolated models to intelligent agents that can
          </span>{" "}
          <span className="md:block">understand and shape complex worlds.</span>
        </p>

        <div className="mt-[4px]">
          <SpecCrop className="signature-spec-crop" label="MAIR handwritten signature" />
        </div>
      </main>

      <div
        className="signature-video-base absolute inset-x-0 bottom-0 z-10 h-[132px] md:h-[164px]"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover object-bottom"
          aria-hidden="true"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[110px] bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  )
}

export default App
