const plot = document.getElementById("plot");

/*const lorenz = (ic=[1,1,1], n=1000, h=0.01) => {
    const SIGMA = 10;
    const RHO   = 28;
    const BETA  = 2;

    const fx = (x, y, z) => SIGMA * (y - x);
    const fy = (x, y, z) => (x * (RHO - z)) - y;
    const fz = (x, y, z) => (x * y) - (BETA * z);

    const xArr = [];
    const yArr = [];
    const zArr = [];

    let x = ic[0];
    let y = ic[1];
    let z = ic[2];

    for(; n >= 0; n--) {
        xArr.push(x);
        yArr.push(y);
        zArr.push(z);

        x += h * fx(x, y, z);
        y += h * fy(x, y, z);
        z += h * fz(x, y, z);
    }

    return {
        x: xArr,
        y: yArr,
        z: zArr
    };
}*/

const lorenz = (ic=[1,1,1], n=100, h=0.01) => {
    const SIGMA = 10;
    const RHO   = 28;
    const BETA  = 2;

    const fx = (x, y, z) => SIGMA * (y - x);
    const fy = (x, y, z) => (x * (RHO - z)) - y;
    const fz = (x, y, z) => (x * y) - (BETA * z);

    const xArr = [];
    const yArr = [];
    const zArr = [];

    let x = ic[0];
    let y = ic[1];
    let z = ic[2];

    for(; n >= 0; n--) {
        xArr.push(x);
        yArr.push(y);
        zArr.push(z);

        const k1x = h * fx(x, y, z);
        const k1y = h * fy(x, y, z);
        const k1z = h * fz(x, y, z);

        const k2x = h * fx(x + k1x/2, y + k1y/2, z + k1z/2);
        const k2y = h * fy(x + k1x/2, y + k1y/2, z + k1z/2);
        const k2z = h * fz(x + k1x/2, y + k1y/2, z + k1z/2);

        const k3x = h * fx(x + k2x/2, y + k2y/2, z + k2z/2);
        const k3y = h * fy(x + k2x/2, y + k2y/2, z + k2z/2);
        const k3z = h * fz(x + k2x/2, y + k2y/2, z + k2z/2);

        const k4x = h * fx(x + k3x/2, y + k3y/2, z + k3z/2);
        const k4y = h * fy(x + k3x/2, y + k3y/2, z + k3z/2);
        const k4z = h * fz(x + k3x/2, y + k3y/2, z + k3z/2);

        x += (1/6) * (k1x + 2*k2x + 2*k3x + k4x);
        y += (1/6) * (k1y + 2*k2y + 2*k3y + k4y);
        z += (1/6) * (k1z + 2*k2z + 2*k3z + k4z);
    }

    return {
        x: xArr,//.filter((_, i) => i % 5 === 0),
        y: yArr,//.filter((_, i) => i % 5 === 0),
        z: zArr//.filter((_, i) => i % 5 === 0)
    };
}

const layout = {
    scene: {
        aspectmode: "manual",
        aspectratio: {
            x: 1, y: 1, z: 1
        },
        xaxis: {
            //range: [-20, 20],
            autorange: true,
            showspikes: false,
            spikesides: false,
            zeroline: false,
            showticklabels: false,
            title: "",
        },
        yaxis: {
            //range: [-40, 40],
            autorange: true,
            showspike: false,
            spikesides: false,
            zeroline: false,
            showticklabels: false,
            title: ""
        },
        zaxis: {
            //range: [10, 40],
            autorange: true,
            showspikes: false,
            spikesides: false,
            zeroline: false,
            showticklabels: false,
            title: ""
        }
    },
    hovermode: false,
    showlegend: false
}

const data = (pts1, pts2) => [
    {
        type: "scatter3d",
        ...pts1,
        mode: "lines",
        line: {
            width: 5,
            color: "#0f0"
        }
    },
    {
        type: "scatter3d",
        ...pts2,
        mode: "lines",
        line: {
            width: 5,
            color: "#f00"
        }
    }
]

/*Plotly.newPlot(
    plot,
    data(lorenz([1,1,1], 1000), lorenz([1.1,1,1], 1000)),
    layout,
    {
        displayModeBar: false,
        scrollZoom: true,
        responsive: true,
        autosize: true
    }
)*/

document.getElementById("btn").onchange = () => {
    Plotly.animate(
        plot,
        {
            data: data(lorenz([1,1,1], 1000), lorenz([document.getElementById("btn").value, 1, 1], 1000)),
            layout: layout
        },
        {
            transition: {
                duration: 500,
                easing: 'cubic-in-out'
            },
            frame: {
                duration: 500
            }
        }
    )
}


/*Plotly.newPlot(
    plot,
    [
        {
            type: "scatter3d",
            ...lorenz([1,1,1], 1000),
            mode: "lines",
            line: {
                width: 5,
                color: "#0ff"
            }
        },
        {
            type: "scatter3d",
            ...lorenz([1.1,1,1], 1000),
            mode: "lines",
            line: {
                width: 5,
                color: "#f00"
            }
        }
    ],
    {
        scene: {
            aspectmode: "manual",
            aspectratio: {
                x: 1, y: 1, z: 1
            },
            xaxis: {
                //range: [-20, 20],
                autorange: true,
                showspikes: false,
                spikesides: false,
                zeroline: false,
                showticklabels: false,
                title: "",
            },
            yaxis: {
                //range: [-40, 40],
                autorange: true,
                showspike: false,
                spikesides: false,
                zeroline: false,
                showticklabels: false,
                title: ""
            },
            zaxis: {
                //range: [10, 40],
                autorange: true,
                showspikes: false,
                spikesides: false,
                zeroline: false,
                showticklabels: false,
                title: ""
            }
        },
        hovermode: false
    },
    {
        displayModeBar: false,
        scrollZoom: true,
        responsive: true,
        autosize: true
    }
);*/