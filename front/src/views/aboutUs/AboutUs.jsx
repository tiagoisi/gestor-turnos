import styles from "./aboutus.module.css"

const AboutUs = () => {
  return (
    <div className={styles.aboutWrapper}>
      <div className={styles.aboutContainer}>
        
        {/* Hero Section */}
        <div className={styles.heroSection}>
          <h1 className={styles.mainTitle}>ABOUT US</h1>
          <div className={styles.divider}></div>
          <p className={styles.tagline}>Where Discipline Meets Strength</p>
        </div>

        {/* Mission Section */}
        <div className={styles.missionSection}>
          <div className={styles.missionCard}>
            <h2 className={styles.sectionTitle}>Our Mission</h2>
            <p className={styles.missionText}>
              At <span className={styles.brand}>STEELCORE</span>, we believe that discipline creates strength. 
              We're dedicated to providing high-quality personal training services that inspire and 
              challenge you to become the best version of yourself.
            </p>
          </div>
        </div>

        {/* Trainer Section */}
        <div className={styles.trainerSection}>
          <div className={styles.trainerCard}>
            <div className={styles.trainerHeader}>
              <div className={styles.trainerIcon}>👤</div>
              <div className={styles.trainerInfo}>
                <h3 className={styles.trainerName}>Tiago Isidro</h3>
                <p className={styles.trainerRole}>Founder And CEO</p>
              </div>
            </div>
            <p className={styles.trainerDescription}>
              With years of experience in fitness and personal development, Tiago leads our team 
              with a philosophy centered on sustainable results and mental fortitude. His approach 
              combines evidence-based training methods with personalized attention to help each 
              client reach their unique goals.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className={styles.valuesSection}>
          <h2 className={styles.sectionTitle}>What We Offer</h2>
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>🎯</div>
              <h3 className={styles.valueTitle}>Tailored Training</h3>
              <p className={styles.valueText}>
                Customized programs designed specifically for your goals, fitness level, and lifestyle.
              </p>
            </div>
            
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>💪</div>
              <h3 className={styles.valueTitle}>Expert Support</h3>
              <p className={styles.valueText}>
                Continuous guidance and motivation from experienced professionals who care about your progress.
              </p>
            </div>
            
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>📈</div>
              <h3 className={styles.valueTitle}>Lasting Results</h3>
              <p className={styles.valueText}>
                Build confidence, improve fitness, and achieve sustainable transformations that last.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>Ready to Transform?</h2>
          <p className={styles.ctaText}>
            Join our community and start your journey to becoming stronger, both mentally and physically.
          </p>
        </div>

      </div>
    </div>
  )
}

export default AboutUs