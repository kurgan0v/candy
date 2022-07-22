import React, {useEffect, useRef} from 'react';
import style from './style.module.scss';
export const FactoryPage = () => {
    const makeSyrup = useRef<HTMLCanvasElement | null>(null);
    const syrupCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);
    useEffect(()=>{
        if(makeSyrup.current){
            syrupCtxRef.current = makeSyrup.current.getContext('2d');
            let ctx = syrupCtxRef.current;
            ctx!.fillStyle = "#eee";
            ctx!.strokeStyle = "#231955";
            ctx!.lineWidth = 2;
            let pos_x = 0, pos_y = 0;
            ctx!.fillRect(pos_x, pos_y, 50, 50);
            ctx!.strokeRect(pos_x, pos_y, 50, 50);
            // setInterval(function () {
            //     ctx!.clearRect(0, 0, 300, 200);
            //     if (pos_x + 50 <= 300 && pos_y == 0) {
            //         pos_x++;
            //     }
            //     if (pos_x + 50 == 300 && pos_y + 50 <= 200) {
            //         pos_y++;
            //     }
            //     if (pos_x >= 0 && pos_y + 50 == 200) {
            //         pos_x--;
            //     }
            //     if (pos_x == 0 && pos_y >= 0) {
            //         pos_y--;
            //     }
            //     ctx!.fillRect(pos_x, pos_y, 50, 50);
            // }, 10);
        }
    }, [makeSyrup]);

    return(
        <section className={style.main}>
            <h1>Фабрика</h1>
            <canvas ref={makeSyrup} className={style.canvas} width="490" height="490"></canvas>
        </section>
    )
}