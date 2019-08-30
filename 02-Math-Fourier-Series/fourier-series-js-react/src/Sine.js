import React, { useState, useEffect } from 'react';

export default function Sine() {
    // Declare a new state variable
    const [degree, setDegree] = useState(0);

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

    return (<SinusDraw degree={degree} />);
}

const SinusDraw = ({ degree }) => (
    <div id='container'>
        <svg width='940' height='240' xmlns='http://www.w3.org/2000/svg' >
            <g transform='translate(20 20)'>

                <text x="0" y="100">
                    sin(
            </text>

                {/* connected line */}
                <line className='grey' x1={Math.cos(degree / 180 * Math.PI) * 100 + 100 + 110} y1={-Math.sin(degree / 180 * Math.PI) * 100 + 100}
                    x2={degree + 460} y2={-Math.sin(degree / 180 * Math.PI) * 100 + 100} />

                {/* circle */}
                <g transform='translate(110 0)'>
                    <line className='grey' x1="100" y1="100" x2="200" y2="100" />


                    <circle className='grey' cx="100" cy="100" r="100" />
                    <path d={'M 130 100 A 30 30 0 ' + (degree <= 180 ? '0' : '1') + ' 0' + (Math.cos(degree / 180 * Math.PI) * 30 + 100) + ' ' + (-Math.sin(degree / 180 * Math.PI) * 30 + 100)} />
                    <line className='grey' x1="100" y1="100" x2={Math.cos(degree / 180 * Math.PI) * 100 + 100} y2={-Math.sin(degree / 180 * Math.PI) * 100 + 100} />
                    <text x={Math.cos(degree / 180 * Math.PI) * 100 + 100 + 10} y={-Math.sin(degree / 180 * Math.PI) * 100 + 100}>
                        {degree}°
              </text>
                </g>

                <text x="370" y="100">
                    ) =
            </text>

                {/* sine */}
                <g transform='translate(460 0)'>
                    <line className='grey' x1="0" y1="100" x2="360" y2="100" />

                    <polyline className='grey'
                        points={Array.from({ length: 360 }, (value, key) => {
                            return key + " " + (-Math.sin(key / 180 * Math.PI) * 100 + 100)
                        })} />
                    <polyline
                        points={Array.from({ length: degree }, (value, key) => {
                            return key + " " + (-Math.sin(key / 180 * Math.PI) * 100 + 100)
                        })} />
                    <text x={degree + 10} y={-Math.sin(degree / 180 * Math.PI) * 100 + 100}>
                        {parseFloat(Math.sin(degree / 180 * Math.PI)).toFixed(4)}
                    </text>
                </g>
            </g>
        </svg>
    </div>
)