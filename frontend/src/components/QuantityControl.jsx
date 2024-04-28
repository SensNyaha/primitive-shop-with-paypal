import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

function QuantityControl({ quantity, onDecrease, onIncrease, maxCount }) {
    const [showedQnt, setShowedQnt] = useState(quantity);
    const [moveRight, setMoveRight] = useState(false);
    const [moveLeft, setMoveLeft] = useState(false);

    useEffect(() => {
        if (quantity < showedQnt) setMoveRight(true);
        else if (quantity > showedQnt) setMoveLeft(true);
    }, [quantity]);

    function handleIncrease() {
        if (!moveRight && !moveLeft) onIncrease();
    }
    function handleDecrease() {
        if (!moveRight && !moveLeft) onDecrease();
    }

    return (
        <div className="quantity-control">
            <Button
                size="sm"
                className="btn-w-hover "
                onClick={handleDecrease}
                disabled={quantity <= 1 || moveRight}
            >
                <i className="fa fa-minus" />
            </Button>
            <div className="quantity-control__wrapper">
                <div
                    className={`quantity-control__content ${
                        moveRight ? "to-right" : ""
                    } ${moveLeft ? "to-left" : ""} `}
                    onTransitionEnd={() => {
                        setMoveLeft(false);
                        setMoveRight(false);
                        setShowedQnt(quantity);
                    }}
                >
                    <span>{showedQnt - 1}</span>
                    <span>{showedQnt}</span>
                    <span>{showedQnt + 1}</span>
                </div>
            </div>
            <Button
                size="sm"
                className="btn-w-hover "
                onClick={handleIncrease}
                disabled={quantity >= maxCount || moveLeft}
            >
                <i className="fa fa-plus" />
            </Button>
        </div>
    );
}

export default QuantityControl;
