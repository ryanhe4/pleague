import * as React from "react";
import {useTypedSelector} from "../rootReducer";

const Home = () => {
    const data = useTypedSelector((state => state.user));

    return(
        <>
            아이디 : {data.id}
            이름 : {data.name}
        </>
    )
};

export default Home
