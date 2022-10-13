import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCircleCheck, faTruck, faCreditCard } from "@fortawesome/free-solid-svg-icons";
import "./OrderProgressBar.css"

class OrderProgressBar extends React.Component {
    render() {
        const { orderStep } = this.props;
        const iconIncompleteColor = "rgb(176, 176, 176)";
        const iconCompleteColor = "rgb(238, 238, 238)";
        const circleCompleteColor = "rgb(100, 100, 100,)";
        const barStyle = {
            right: `${(3 - orderStep) / 3 * 100}%`,
        }
        const circles = [
            {
                icon: faCheck,
                style: {
                    background: circleCompleteColor,
                    color: iconCompleteColor,
                },
            },
            {
                icon: faTruck,
                style: {
                    background: orderStep >= 1 ? circleCompleteColor : "lightGray",
                    color: orderStep >= 1 ? iconCompleteColor : iconIncompleteColor,
                },
            },
            {
                icon: faCreditCard,
                style: {
                    background: orderStep >= 2 ? circleCompleteColor : "lightGray",
                    color: orderStep >= 2 ? iconCompleteColor : iconIncompleteColor,
                },
            },
            {
                icon: faCircleCheck,
                style: {
                    background: orderStep === 3 ? circleCompleteColor : "lightGray",
                    color: orderStep >= 3 ? iconCompleteColor : iconIncompleteColor,
                },
            },
        ]

        return (
            <div className="order-progress-bar">
                <div className="progress-bar-frame">
                    <div className="progress-bar-fill" style={barStyle}></div>
                </div>
                {circles.map((circle, index) => {
                    return (
                        <div className="progress-bar-circle" style={circle.style}>
                            <FontAwesomeIcon icon={circle.icon} key={index} />
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default OrderProgressBar;