import React from 'react';
import {View} from 'react-native';

class Timermanager extends React.Component
{
    constructor(props) {
        super(props);
        this.state={
            timer:0
        }
    }
    componentDidMount(){
        this.interval = setInterval(() => {
            this.setState((prevState)=>({
                timer:prevState.timer+1
            }))
        }, 1000);
    }
    componentWillUnmount(){
        clearInterval(this.interval)
    }
    render(){
        const{timer}= this.state;
        console.log('time : ',timer)
        return <View/>;
    }
}

export default Timermanager;
