import PropTypes from "prop-types";

function Rating({ value, text, color }) {
    return (
        <div className="rating">
            {new Array(Math.floor(value)).fill("").map((_, i) => (
                <span key={i} style={{ color }} className="fas fa-star" />
            ))}
            {value - Math.floor(value) > 0 && (
                <span
                    key={value}
                    style={{ color }}
                    className="fas fa-star-half-alt"
                />
            )}
            {new Array(5 - Math.ceil(value)).fill("").map((_, i) => (
                <span key={5 - i} style={{ color }} className="far fa-star" />
            ))}
            {"  "}
            {text && text}
        </div>
    );
}

Rating.defaultProps = {
    color: "grey",
};

Rating.propTypes = {
    value: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    color: PropTypes.string,
};

export default Rating;
