import styles from "../home/home.module.css";
import homeCardStyles from "../../components/homeCard/homeCard.module.css"
import HomeCard from "../../components/homeCard/homeCard";
import gym1 from "../../assets/gym1.jpg"
import gym2 from "../../assets/gym2.jpg"
import gym3 from "../../assets/gym3.jpg"

const Home = () => {
    return (
        <div>
            <h1 className={styles.title}>STEELCORE</h1>
            <h2 className={styles.subtitle}>Discipline creates strength</h2>
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
    );
};

export default Home;