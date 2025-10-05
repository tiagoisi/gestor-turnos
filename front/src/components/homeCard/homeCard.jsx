export default function HomeCard({title,img,description,className}) {
    return (
        <div className={className}>
        <h2>{title}</h2>
        <img src={img} />
        <h3>{description}</h3>    
        </div>
    )
}