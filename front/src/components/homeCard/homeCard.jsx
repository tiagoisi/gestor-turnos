export default function HomeCard({title, img, description, className}) {
    return (
        <div className={className}>
            <div className="cardImageWrapper">
                <img src={img} alt={title} />
                <div className="cardOverlay"></div>
            </div>
            <div className="cardContent">
                <h2>{title}</h2>
                <h3>{description}</h3>
            </div>
        </div>
    )
}