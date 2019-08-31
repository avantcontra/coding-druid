import React, { useState, useEffect } from 'react';
import './Fourier.css';

export default function Fourier() {
    // Declare a new state variable
    const [degree, setDegree] = useState(0);
    const [n, setN] = useState(1); //n = 1, 3, 5, 7

    useEffect(() => {
        const id = setInterval(() => {
            //If the new state is computed using the previous state, you can pass a function to setState. 
            //https://reactjs.org/docs/hooks-reference.html#functional-updates
            setDegree(c => {
                if (c < 360) {
                    return c + 1;
                } else {
                    return 0;
                }
            });
        }, 30);
        return () => clearInterval(id);
    }, []);

    const onSlider = ()=>{
       var slider = document.getElementById("myRange");
    //    console.log('onSlider', slider.value);
       if(slider.value % 2 > 0) {
        setN(slider.value);
       }
       
    }

    return (<div id='container'>
        <FourierDraw className="draw1" degree={degree} n={n}/>
        <div className="slidecontainer">
            <input type="range" min="1" max="23" defaultValue="1" step="2" className="slider" id="myRange"
            onInput={onSlider}/>
        </div>
    </div>);
}


const FourierDraw = ({className, degree, n }) => (
    <div className={'fourierDiv' + ' ' + className}>
        <svg width='940' height='350' xmlns='http://www.w3.org/2000/svg' >
            <g transform='translate(20 80)'>
               

                {/* circle */}
                {circleItems(n, degree)}

                {/* sine */}
                <g transform='translate(460 0)'>
                    <line className='gray' x1="0" y1="100" x2="360" y2="100" />

                    <polyline
                        points={Array.from({ length: 360 }, (value, key) => {
                            // return key + " " + (Math.sin(n *key / 180 * Math.PI - degree/180 * Math.PI) * 100 *4/(n*Math.PI)+ 100)
                            return key + " " + sumSine(n, key, degree);
                        })} />
                </g>

                 {/* connected line */}
                 <line className='connectedLine' 
                    x1={ sumCircleCenterX(n, degree) + 110} 
                    y1={ sumCircleCenterY(n, degree)}
                    x2={460} 
                    y2={sumSine(n, 360, degree)} />


                <text x='396' y='250'>
                    n = {n}
                </text>
            </g>
        </svg>
    </div>
)

const circleItems = (n, degree) => {
    const items = [];
    n = Number(n);
    const len = (n+1)/2; //1, 3, 5, 7
    // console.log('n',n,'len',len)
    Array.from({length: len}, (value, key) => {
        // console.log(value, key); //0, 1, 2, 3
        return 2*(key + 1)-1; //1, 3, 5, 7
    }).forEach(i => {
        //  console.log(i) //1, 3, 5, 7
        items.push(
        <g key={'fou_circle_' + i} transform='translate(110 0)'>
            <circle className='gray' 
                cx = {i === 1 ? 100 :
                    sumCircleCenterX(i-2, degree)}
                cy = {i === 1 ? 100 :
                    sumCircleCenterY(i-2, degree)}
                r={ 4/(i*Math.PI) * 100} />
            <line 
                x1 = {i === 1 ? 100 :
                    sumCircleCenterX(i-2, degree)}
                y1 = {i === 1 ? 100 :
                    sumCircleCenterY(i-2, degree)}
                x2={sumCircleCenterX(i, degree)} 
                y2={sumCircleCenterY(i, degree)} />
        </g>);        
    });
    // console.log(items)
    return items;
}


const sumSine = (n, key, degree) => {
    n = Number(n);
    let sum = 0;
    for (let i = n; i > 0; i-=2) {
        sum += ( Math.sin(i *dToR(key) - i *dToR(degree)) * 4/(i*Math.PI) * 100 )
    }

    sum += 100;
    return sum;
    // (Math.sin(n *key / 180 * Math.PI - degree/180 * Math.PI) * 100 *4/(n*Math.PI)+ 100)
}

//degreeToRad
const dToR = (degree) => {
    return degree/180 * Math.PI;
}


const sumCircleCenterX = (n, degree) => {
    n = Number(n);
    let sum = 0;
    let i=n;
    for (let i = n; i > 0; i-=2) {
        sum += ( Math.cos(i*dToR(degree)) *  4/(i*Math.PI) * 100 )
    }
    sum += 100;
    return sum;
}

const sumCircleCenterY = (n, degree) => {
    n = Number(n);
    let i=n;
    let sum = 0;
    for (let i = n; i > 0; i-=2) {
        sum += ( -Math.sin(i*dToR(degree)) *  4/(i*Math.PI) * 100)
    }
    sum += 100;
    return sum;
}