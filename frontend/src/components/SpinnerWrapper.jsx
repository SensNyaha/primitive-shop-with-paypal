import { Spinner } from "react-bootstrap";
import { Transition } from "react-transition-group";

function SpinnerWrapper({ isLoading }) {
    const transitionStyles = {
        entering: { opacity: 1, zIndex: 9999 },
        entered: { opacity: 1, zIndex: 9999 },
        exiting: { opacity: 0, zIndex: -1 },
        exited: { opacity: 0, zIndex: -1 },
    };
    return (
        <Transition in={isLoading} timeout={1000}>
            {(state) => (
                <div
                    className="spinner-wrapper"
                    style={{ ...transitionStyles[state] }}
                >
                    <Spinner />
                </div>
            )}
        </Transition>
    );
}

export default SpinnerWrapper;
