import React from 'react'
import Loader from "../../../components/Loader";
import { useAuth } from '../../../contexts/Auth';
import { LiveClassInfo } from '../components/classConsole/Liveclass';
import {Teachers} from "./index"

const Live = () => {
    const {
        generalState: { loading },
  
      } = useAuth();

    return (
    <Teachers header={"Live Schedule"} >
        {loading && <Loader />}
        <LiveClassInfo />
    </Teachers>
  )
}

export default Live