import { useEffect, useState, useRef } from 'react';

function Project() {
    const [startX, setStartX] = useState(0)
    const [startY, setStartY] = useState(0)
    const [canvasContext, setCanvasContext] = useState(null)
    const canvasRef = useRef(null)
    const [count, setCount] = useState(0)
    const [PX, setPX] = useState(0)
    const [PY, setPY] = useState(0)

    //add image to canvas
    


    const start = () => {
        window.alert("welcome to mario game save the princess with the best amount of moves, click Enter to start the game")
    }
    var X;
    var Y;


    useEffect(() => {
        function calculate(){
            X = Math.floor(Math.random() * 6) * 50
            if(X < 10){
                X = X + 50
            }
            Y = Math.floor(Math.random() * 3) * 50
            if(Y < 0){
                Y = Y + 50
            }
        }
        calculate()
        setPX(X)
        setPY(Y)
    }, [])

    
    function Princess(X,Y){
        const image = new Image();
        image.src = "princess.png";
        image.onload = () => {
            canvasContext.drawImage(image, X, Y, 50, 50);
        }
    }

    useEffect(() => {
        start()
    }, [window.onload])

    useEffect(() => {
        if (canvasRef.current) setCanvasContext(canvasRef.current.getContext('2d'))
    }, [canvasRef.current])

    useEffect(() => {
        if (canvasContext) {
            mario()
            move()
            const X = PX
            const Y = PY
            Princess(X,Y)

            if(startX === X && startY === Y){
                alert("Congratulations you have saved the princess with "+ count +" moves click enter to start again")
                window.location.reload()
            }
            else    if(count >= 8){
                    alert("you couldn't get the princess,press enter to try again")
                window.location.reload()
            }
        }
        })

    const mario = () => {
        
        const mario = new Image();
        mario.src = "mario.png";
        mario.onload = () => {
            clearcanvas()
            design()
            canvasContext.drawImage(mario, startX, startY, 50, 50);
        }
    }
        
    const clearcanvas = () => {
        canvasContext.clearRect(0,0,700,500)
    }
    

    const VerticalGrid = (x,y,z) => {
        canvasContext.moveTo(x,y)
        canvasContext.lineTo(z,500)
        canvasContext.fillStyle = "#D3D3D3"
        canvasContext.stroke()
    }

    const HorizontalGrid = (x,y,z) => {
        canvasContext.moveTo(x,y)
        canvasContext.lineTo(500,z)
        canvasContext.fillStyle = "#D3D3D3"
        canvasContext.stroke()
    }
    
    const design = () => {
        VerticalGrid(0,0,0)
        VerticalGrid(50,0,50)
        VerticalGrid(100,0,100)
        VerticalGrid(150,0,150)
        VerticalGrid(200,0,200)
        VerticalGrid(250,0,250)
        VerticalGrid(300,0,300)

        HorizontalGrid(0,0,0)
        HorizontalGrid(0,50,50)
        HorizontalGrid(0,100,100)
        HorizontalGrid(0,150,150)
    }
    
    const moveRight = () => {
        clearcanvas()
        if(startX < 230){
            setStartX(startX + 50)
            setCount(count + 1)
        }
        else{
            setStartX(startX)
        }
        mario()
        const X = PX
        const Y = PY
        Princess(X,Y)
    }

    const moveLeft = () => {
        clearcanvas()
        if(startX > 0){
            setStartX(startX - 50)
            setCount(count + 1)
        }
        else{
            setStartX(startX)
        }
        mario()
        const X = PX
        const Y = PY
        Princess(X,Y)
    }

    const moveUp = () => {
        clearcanvas()
        if(startY > 0){
            setStartY(startY - 50)
            setCount(count + 1)
        }
        else{
            setStartY(startY)
        }
        mario()
            const X = PX
            const Y = PY
            Princess(X,Y)
    }

    const moveDown = () => {
        clearcanvas()
        if(startY < 100){
            setStartY(startY + 50)
            setCount(count + 1)
        }
        else{
            setStartY(startY)
        }
        mario()
        const X = PX
        const Y = PY
        Princess(X,Y)
    }

    function move(){
        document.onkeydown = function (e) {
        switch (e.key) {
            case 'ArrowUp':
                moveUp()
                break;
            case 'ArrowDown':
                moveDown()
                break;
            case 'ArrowLeft':
                moveLeft()
                break;
            case 'ArrowRight':
                moveRight()
            // eslint-disable-next-line no-fallthrough
            default:
            break;      
        }
        };
    }
  return (
    <div>
        <div className="mycanvas">
            <canvas ref={canvasRef} style={{ height: 300, width: 500}}></canvas>
        </div>
        <p>You have made {count} moves</p>
    </div>
  );
}

export default Project