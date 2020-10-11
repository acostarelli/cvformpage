import * as THREE from "https://unpkg.com/three@0.121.1/build/three.module.js";
import {OrbitControls} from "https://unpkg.com/three@0.121.1/examples/jsm/controls/OrbitControls.js";

class Graph {
    constructor() {
        const renderer = new THREE.WebGLRenderer({alpha: true});
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.1,
            500
        );
        const controls = new OrbitControls(camera, renderer.domElement);
        const baseGeo = new THREE.BufferGeometry();
        const modiGeo = new THREE.BufferGeometry();

        renderer.setSize(window.innerWidth, window.innerHeight);

        baseGeo.setAttribute(
            "position",
            new THREE.BufferAttribute(this._lorenz(), 3)
        );
        modiGeo.setAttribute(
            "position",
            new THREE.BufferAttribute(this._lorenz(), 3)
        );
        const baseLine = new THREE.Line(
            baseGeo,
            new THREE.LineBasicMaterial({ color: 0x0000ff })
        );
        const modiLine = new THREE.Line(
            modiGeo,
            new THREE.LineBasicMaterial({ color: 0xff0000 })
        );

        camera.position.set(80, 0, 0);
        controls.target = new THREE.Vector3(2.5, 4.5, 25);
        controls.enablePan = false;
        controls.update();

        scene.add(baseLine, modiLine);

        this.renderer = renderer;
        this.scene = scene;
        this.camera = camera;
        this.controls = controls;
        this.baseGeo = baseGeo;
        this.modiGeo = modiGeo;
        this.baseLine = baseLine;
        this.modiLine = modiLine;
    }

    start(el) {
        el.appendChild(this.renderer.domElement);
        this._loop();
    }

    _loop() {
        requestAnimationFrame(() => { // requestAnimationFrame loses "this"
            this._loop();
        });

        this._updateSize();

        this.controls.update();
        this.renderer.render(this.scene, this.camera);

        this.modiLine.geometry.attributes.position.usage = THREE.DynamicDrawUsage;
        this.modiLine.geometry.attributes.position.needsUpdate = true;
    }

    update(x, y, z) {
        const change = this._lorenz([x, y, z]);
        const pos = this.modiLine.geometry.attributes.position;

        for(let i = 0; i < pos.array.length; i++) {
            pos.array[i] = change[i];
        }
    }

    _lorenz(ic=[1,1,1], n=1000, h=0.01) {
        const SIGMA = 10;
        const RHO   = 28;
        const BETA  = 2;

        const fx = (x, y, z) => SIGMA * (y - x);
        const fy = (x, y, z) => (x * (RHO - z)) - y;
        const fz = (x, y, z) => (x * y) - (BETA * z);

        let ret = [];
        let x = ic[0];
        let y = ic[1];
        let z = ic[2];

        for(; n >= 0; n--) {
            ret = ret.concat([x, y, z])

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

        return Float32Array.from(ret);
    }

    _updateSize() {
        const canvas = this.renderer.domElement;
        const width = canvas.parentElement.clientWidth;
        const height = canvas.parentElement.clientHeight;

        if (canvas.width !== width || canvas.height !== height) {
            this.renderer.setSize(width, height, false);
            this.renderer.domElement.style.width = width;
            this.renderer.domElement.style.height = height;
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
        }
    }
}

const graph = new Graph();
graph.start($$("#canvas-container")[0]);

const slidex = $$("#slidex")[0];
const slidey = $$("#slidey")[0];
const slidez = $$("#slidez")[0];
const input = () => {
    graph.update(
        parseFloat(slidex.value),
        parseFloat(slidey.value),
        parseFloat(slidez.value)
    )
}
slidex.oninput = input;
slidey.oninput = input;
slidez.oninput = input;