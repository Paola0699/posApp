function Hero(props) {
    const { title, subtitle} = props;
    return (
        <section className="hero is-primary welcome">
            <div className="hero-body">
                <div className="container">
                    <h1 className="title">{title}</h1>
                    <h2 className="subtitle">{subtitle}</h2>
                </div>
            </div>
        </section>
    )
}
export default Hero;