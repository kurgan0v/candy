import React, {useEffect, useRef, useState} from 'react';

interface IFirstStep {
    run: boolean,
    addProduct: number,
    setAddProduct: React.Dispatch<React.SetStateAction<number>>,
    mass: number
}

export const FirstStep = ({run, addProduct, setAddProduct, mass}: IFirstStep) => {
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>();
    const [timerRun, setTimerRun] = useState<number>();
    const randomInteger = (min: number, max: number) => {
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
    }
    const makeSyrup = useRef<HTMLCanvasElement | null>(null);
    const syrupCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);
    useEffect(()=>{
        if(ctx){
            if(mass === 0){
                drawLiquid("#FFD990", 230, 470, 40, 490 );
            } else {
                drawFactory();
            }
        }
    }, [mass]);
    useEffect(() => {
        if (addProduct >= 0) {
            let addingColor = "";
            let x = 0;
            let y = 0;
            switch (addProduct) {
                case 1:
                    addingColor = "#ECECEC";
                    x = 140;
                    y = 85;
                    break;
                case 2:
                    addingColor = "#b66a08";
                    x = 170;
                    y = 145;
                    break;
                case 3:
                    addingColor = "#BFE8FF";
                    x = 200;
                    y = 205;
                    break;
            }
            if(addingColor && x && y){
                drawLiquid(addingColor, x, y, 18,325);
                setAddProduct(0);
            }
        }
    }, [addProduct]);
    const drawLiquid = (addingColor:string, x:number, y:number, width:number, final:number) => {
        let t = window.setInterval(()=>{
            if(ctx){
                ctx!.clearRect(0, 0, 490, 490);
                drawFactory();
                ctx!.fillStyle = addingColor;
                ctx!.strokeStyle = addingColor;
                ctx!.beginPath();
                ctx!.moveTo(x+width, y);
                ctx!.bezierCurveTo(randomInteger(x+width/2, x+width/2+width), randomInteger(y, final), randomInteger(x-width, x+width), randomInteger(y, final), x+width, final);
                ctx!.lineTo(x+1, final);
                ctx!.bezierCurveTo(randomInteger(x-width/2, x+width/2), randomInteger(y, final), randomInteger(x-width, x+width), randomInteger(y, final), x+1, y);
                ctx!.fill();
                ctx!.stroke();
            }
        }, 100);
        setTimeout(()=>{
            clearInterval(t);
            ctx!.clearRect(0, 0, 490, 490);
            drawFactory();
        }, 2000);
    }
    const outProduct = () => {

    }
    useEffect(() => {
        if (makeSyrup.current) {
            syrupCtxRef.current = makeSyrup.current.getContext('2d');
            setCtx(syrupCtxRef.current);
        }
    }, []);
    const blade = (x: number, y: number, heightBlade: number, widthBlade: number, heightBladeBinding: number) => {
        if (ctx) {
            ctx!.beginPath();
            ctx!.moveTo(x - widthBlade / 2, y - heightBlade / 2);
            ctx!.lineTo(x - 5, y - heightBladeBinding / 2);
            ctx!.lineTo(x + 5, y - heightBladeBinding / 2);
            ctx!.lineTo(x + widthBlade / 2, y - heightBlade / 2);
            ctx!.lineTo(x + widthBlade / 2, y + heightBlade / 2);
            ctx!.lineTo(x + 5, y + heightBladeBinding / 2);
            ctx!.lineTo(x - 5, y + heightBladeBinding / 2);
            ctx!.lineTo(x - widthBlade / 2, y + heightBlade / 2);
            ctx!.closePath();
            ctx!.fill();
            ctx!.stroke();
        }
    }
    const drawFactory = () => {
        if (ctx) {
            const start_x_tr = 100;
            const start_y_tr = 250;
            var gradient = ctx!.createLinearGradient(start_x_tr, 0, start_x_tr + 300, 0);
            gradient.addColorStop(0, '#adadad');
            gradient.addColorStop(1, '#C5C5C5');
            ctx!.fillStyle = gradient;
            ctx!.strokeStyle = gradient;
            ctx!.beginPath();
            ctx!.moveTo(start_x_tr, start_y_tr);
            ctx!.lineTo(start_x_tr + 300, start_y_tr);
            ctx!.lineTo(start_x_tr + 250, start_y_tr + 150);
            ctx!.lineTo(start_x_tr + 50, start_y_tr + 150);
            ctx!.closePath();
            ctx!.fill();
            ctx!.stroke();
            const start_x_drain = start_x_tr + 120;
            const start_y_drain = start_y_tr + 150;
            ctx!.beginPath();
            ctx!.moveTo(start_x_drain, start_y_drain);
            ctx!.lineTo(start_x_drain + 60, start_y_drain);
            ctx!.lineTo(start_x_drain + 50, start_y_drain + 70);
            ctx!.lineTo(start_x_drain + 10, start_y_drain + 70);
            ctx!.closePath();
            ctx!.fill();
            ctx!.stroke();
            gradient = ctx!.createLinearGradient(start_x_tr + 145, 0, start_x_tr + 155, 0);
            gradient.addColorStop(0, '#717171');
            gradient.addColorStop(1, '#8D8D8D');
            ctx!.fillStyle = gradient;
            ctx!.strokeStyle = gradient;
            ctx!.fillRect(start_x_tr + 145, 50, 10, 325);
            ctx!.fillRect(50, 30, 50, 50);
            ctx!.fillRect(100, 50, 60, 15);
            ctx!.fillRect(140, 65, 20, 20);

            ctx!.fillRect(50, 90, 50, 50);
            ctx!.fillRect(100, 110, 90, 15);
            ctx!.fillRect(170, 125, 20, 20);

            ctx!.fillRect(50, 150, 50, 50);
            ctx!.fillRect(100, 170, 120, 15);
            ctx!.fillRect(200, 185, 20, 20);
            blade(start_x_tr + 150, start_y_tr + 85, 10, 120, 4);
            blade(start_x_tr + 150, start_y_tr + 120, 10, 160, 4);
            if(mass){
                ctx!.fillStyle = "#FFD990";
                ctx!.strokeStyle = "#FFD990";
                ctx!.beginPath();
                ctx!.moveTo(160, 390);
                ctx!.lineTo(135, 325);
                ctx!.lineTo(365, 325);
                ctx!.lineTo(340, 390);
                ctx!.fill();
                ctx!.stroke();
            }
            ctx!.fillStyle = gradient;
            ctx!.strokeStyle = gradient;
        }
    }
    let timer: number | undefined;
    useEffect(() => {

        if (ctx) {
            const start_x_tr = 100;
            const start_y_tr = 250;
            ctx!.clearRect(0, 0, 490, 490);
            drawFactory();
            if (run && mass) {
                timer = window.setInterval(() => {
                    ctx!.clearRect(0, 0, 490, 490);
                    ctx!.fillStyle = "#F1F1F1";
                    ctx!.strokeStyle = "#F1F1F1";
                    ctx!.beginPath();
                    ctx!.moveTo(135, 250);
                    ctx!.bezierCurveTo(randomInteger(135, 160), randomInteger(100,250), 320, randomInteger(100,250), 160, randomInteger(100,250));
                    ctx!.bezierCurveTo(randomInteger(160, 365), randomInteger(100,250), 320, randomInteger(100,250), 210, randomInteger(100,250));
                    ctx!.bezierCurveTo(randomInteger(160, 365), randomInteger(100,250), 320, randomInteger(100,250), 290, randomInteger(100,250));
                    ctx!.lineTo(340, 250);
                    ctx!.fill();
                    ctx!.stroke();
                    drawFactory();
                    blade(start_x_tr + 150, start_y_tr + 85, 10, randomInteger(20, 120), 4);
                    blade(start_x_tr + 150, start_y_tr + 120, 10, randomInteger(20, 160), 4);
                    ctx!.fillStyle = "#FFD990";
                    ctx!.strokeStyle = "#FFD990";
                    ctx!.beginPath();
                    ctx!.moveTo(160, 390);
                    ctx!.lineTo(135, 325);
                    ctx!.bezierCurveTo(randomInteger(135, 160), randomInteger(250, 350), 320, randomInteger(250, 350), 160, randomInteger(325 - 30, 325 + 30));
                    ctx!.bezierCurveTo(randomInteger(160, 365), randomInteger(250, 350), 320, randomInteger(250, 350), 365, 325);
                    ctx!.lineTo(340, 390);
                    ctx!.fill();
                    ctx!.stroke();
                }, 100);
                setTimerRun(timer);
            } else {
                clearInterval(timerRun);
            }
        }
    }, [run, ctx]);

    return (
        <canvas ref={makeSyrup}  width="490" height="490"></canvas>
    )
}