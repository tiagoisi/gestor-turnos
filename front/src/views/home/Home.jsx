import styles from "../home/home.module.css";
import homeCardStyles from "../../components/homeCard/homeCard.module.css"
import HomeCard from "../../components/homeCard/homeCard";
import { Link } from "react-router-dom";
import gym1 from "../../assets/gym1.jpg"
import gym2 from "../../assets/gym2.jpg"
import gym3 from "../../assets/gym3.jpg"
import { useEffect, useState } from "react";

const Home = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

    return (
        <div className={styles.homeWrapper}>
            {/* Hero Section */}
            <div className={styles.heroSection}>
                <h1 className={styles.title}>STEELCORE</h1>
                <h2 className={styles.subtitle}>Discipline creates strength</h2>
                <div className={styles.divider}></div>
                <p className={styles.heroDescription}>
                    Transform your body and mind through personalized training programs designed to push your limits and achieve sustainable results.
                </p>
                <div className={styles.ctaButtons}>
                    <div className={styles.ctaButtons}>
                    <Link to={user ? "/appointments/schedule" : "/register"}>
                        <button className={styles.primaryBtn}>Book a Session</button>
                    </Link>
                    <Link to="/aboutus">
                        <button className={styles.secondaryBtn}>Learn More</button>
                    </Link>
                    </div>
                </div>
            </div>

            {/* Services Section */}
            <div className={styles.servicesSection}>
                <h2 className={styles.sectionTitle}>Our Training Programs</h2>
                <div className={homeCardStyles.container}>
                    <HomeCard
                        className={homeCardStyles.card}
                        title="Progress Tracking & Performance Analysis"
                        img={gym1}
                        description="by Tiago Isidro"
                    />
                    <HomeCard
                        className={homeCardStyles.card}
                        title="Muscle Building & Hypertrophy"
                        img={gym2}
                        description="by Tiago Isidro"
                    />
                    <HomeCard
                        className={homeCardStyles.card}
                        title="Focused on Discipline and Sustainable Results"
                        img={gym3}
                        description="by Tiago Isidro"
                    />
                </div>
            </div>

            {/* Why Choose Us Section */}
            <div className={styles.whySection}>
                <h2 className={styles.sectionTitle}>Why Choose STEELCORE</h2>
                <div className={styles.featuresGrid}>
                    <div className={styles.featureCard}>
                        <div className={styles.featureIcon}>🎯</div>
                        <h3 className={styles.featureTitle}>Personalized Approach</h3>
                        <p className={styles.featureText}>
                            Every program is tailored to your specific goals, fitness level, and schedule.
                        </p>
                    </div>
                    
                    <div className={styles.featureCard}>
                        <div className={styles.featureIcon}>📊</div>
                        <h3 className={styles.featureTitle}>Data-Driven Results</h3>
                        <p className={styles.featureText}>
                            Track your progress with detailed analytics and performance metrics.
                        </p>
                    </div>
                    
                    <div className={styles.featureCard}>
                        <div className={styles.featureIcon}>💡</div>
                        <h3 className={styles.featureTitle}>Expert Guidance</h3>
                        <p className={styles.featureText}>
                            Learn from experienced trainers who understand the science of fitness.
                        </p>
                    </div>
                    
                    <div className={styles.featureCard}>
                        <div className={styles.featureIcon}>🔥</div>
                        <h3 className={styles.featureTitle}>Sustainable Methods</h3>
                        <p className={styles.featureText}>
                            Build habits that last, not quick fixes that fade away.
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className={styles.statsSection}>
                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <div className={styles.statNumber}>500+</div>
                        <div className={styles.statLabel}>Clients Trained</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statNumber}>10+</div>
                        <div className={styles.statLabel}>Years Experience</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statNumber}>95%</div>
                        <div className={styles.statLabel}>Success Rate</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statNumber}>24/7</div>
                        <div className={styles.statLabel}>Support Available</div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className={styles.finalCta}>
                <h2 className={styles.ctaTitle}>Ready to Start Your Journey?</h2>
                <p className={styles.ctaText}>
                    Join hundreds of clients who have transformed their lives through disciplined training and expert guidance.
                </p>
                <Link to={user ? "/appointments/schedule" : "/register"}>
                    <button className={styles.ctaButton}>Schedule Your First Session</button>
                </Link>
            </div>
        </div>
    );
};

export default Home;