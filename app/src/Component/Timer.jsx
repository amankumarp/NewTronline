import React from "react";
import { useDispatch } from "react-redux";
import { useTimer } from "react-timer-hook";
import { IS_UNSTAKE } from "../redux/constant";

function MyTimer({ expiryTimestamp }) {

    const dispatch = useDispatch();

    const {
        seconds,
        minutes,
        hours,
        days,
    } = useTimer({
        expiryTimestamp,
        onExpire: () => {
            dispatch({ type: IS_UNSTAKE, data: true });
        }
    });

    return (
        <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "25px", padding: "5px", marginTop: "10px" }}>
                <span style={{widht: "150px", height: "100px", backgroundColor: "black", padding: "10px", borderRadius: "10px", }}>{days} <span style={{fontSize: "15px"}}> days </span> </span>:<span style={{widht: "300px", height: "100px", backgroundColor: "black", padding: "5px", borderRadius: "10px"}}>{hours} <span style={{fontSize: "15px"}}> hours </span> </span>:<span style={{widht: "300px", height: "100px", backgroundColor: "black", padding: "5px", borderRadius: "10px"}}>{minutes} <span style={{fontSize: "15px"}}> minutes </span> </span>:
                 <span style={{widht: "300px", height: "100px", backgroundColor: "black", padding: "5px", borderRadius: "10px"}}>{seconds} <span style={{fontSize: "15px"}}>seconds</span></span>
            </div>


        </div>
    );
}

export default MyTimer