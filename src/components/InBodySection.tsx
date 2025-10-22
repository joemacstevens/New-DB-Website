import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import inbodyMachine from "../assets/inbody-app/inbody-380.webp?url";
import styles from "./InBodySection.module.css";

interface Metric {
  label: string;
  value: string;
}

interface FloatingMetric {
  text: string;
  style: CSSProperties;
}

const floatingMetrics: FloatingMetric[] = [
  { text: "+5 lb Muscle", style: { top: "2.5rem", left: "2.5rem" } },
  { text: "-4% Body Fat", style: { bottom: "2.5rem", right: "3rem" } },
  {
    text: "45 sec Scan",
    style: { top: "52%", left: "60%", transform: "translate(-50%, -50%)" },
  },
];

const metrics: Metric[] = [
  { label: "average muscle gain", value: "+5 lb" },
  { label: "average body-fat loss", value: "-4%" },
  { label: "scan time", value: "45 sec" },
];

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const metricVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.3 + index * 0.1, ease: "easeOut" },
  }),
};

export default function InBodySection() {
  return (
    <section className={styles.section}>
      <div className={styles.ambient} aria-hidden="true">
        <span className={styles.texture} />
      </div>

      <div className={styles.wrapper}>
        <motion.div
          className={styles.visual}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={containerVariants}
        >
          <span className={styles.visualGlow} aria-hidden="true" />
          <img
            src={inbodyMachine}
            alt="Member stepping onto the InBody 380 body composition scan machine"
            className={styles.device}
            loading="lazy"
          />

          {floatingMetrics.map((metric, index) => (
            <motion.div
              key={metric.text}
              className={styles.floatingMetric}
              style={metric.style}
              initial={{ opacity: 0, scale: 0.85, y: 12 }}
              whileInView={{
                opacity: 1,
                scale: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  delay: 0.4 + index * 0.18,
                  ease: "easeOut",
                },
              }}
              viewport={{ once: true }}
              animate={{
                opacity: [0.85, 1, 0.85],
                scale: [1, 1.05, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 3 + index * 0.5,
                ease: "easeInOut",
              }}
            >
              {metric.text}
            </motion.div>
          ))}
        </motion.div>

        <div className={styles.content}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={containerVariants}
          >
            <motion.h2
              className={styles.headline}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, ease: "easeOut" },
              }}
              viewport={{ once: true }}
            >
              Train with Data, Not Guesswork.
            </motion.h2>

            <motion.p
              className={styles.copy}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, delay: 0.12, ease: "easeOut" },
              }}
              viewport={{ once: true }}
            >
              Every InBody scan gives your coach precise numbers on muscle, fat,
              and water balance — so every training block is evidence-based.
            </motion.p>
          </motion.div>

          <motion.ul
            className={styles.metrics}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.08 },
              },
            }}
          >
            {metrics.map((metric, index) => (
              <motion.li
                key={metric.label}
                className={styles.metricCard}
                custom={index}
                variants={metricVariants}
                whileHover={{ scale: 1.03 }}
              >
                <motion.span
                  className={styles.metricValue}
                  initial={{ opacity: 0.85 }}
                  whileInView={{
                    opacity: [0.85, 1, 0.85],
                    color: ["#e11d48", "#f43f5e", "#e11d48"],
                    textShadow: [
                      "0 0 0 rgba(244,63,94,0)",
                      "0 0 24px rgba(244,63,94,0.55)",
                      "0 0 0 rgba(244,63,94,0)",
                    ],
                    transition: {
                      duration: 1.5,
                      delay: 0.25 + index * 0.12,
                      ease: "easeOut",
                    },
                  }}
                  viewport={{ once: true }}
                >
                  {metric.value}
                </motion.span>
                <span className={styles.metricLabel}>{metric.label}</span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            className={styles.ctas}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.7, delay: 0.2, ease: "easeOut" },
            }}
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.a
              href="/contact"
              className={styles.ctaPrimary}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              data-cta="inbody-book-scan"
            >
              Book a Scan
            </motion.a>
            <motion.a
              href="/membership"
              className={styles.ctaSecondary}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              data-cta="inbody-see-memberships"
            >
              See Memberships
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
