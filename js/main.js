window.onload=()=>{


let rNF = (x) => {
    return Math.floor(Math.random() * x)
}

let lo = (x)=>{
    return console.log(x)
}

function pt() {
    let x = Math.random() * w
    let y = Math.random() * h
    let point = { x, y }
    return point
}



    const w = window.innerWidth
    const h = window.innerHeight 

    var s1 = Snap('#svg1').attr({
        width:w,
        height:h,
        
    })

    

    function makeNet() {
        var setMeetPoint = []
        const mP = 10
        const q = mP*mP

        
        for (let i = 0; i < mP ; i++) {
            // let pt = pt()
            setMeetPoint.push(pt())
        }
            

        var connection = new Set()

        do {
            let p1 = setMeetPoint[rNF(setMeetPoint.length)]
            let p2 = setMeetPoint[rNF(setMeetPoint.length)]
            connection.add([p1,p2])
        } while (connection.size<q);

        var arrCnt = Array.from(connection)

        function line(p1,p2) {

            s1.paper.line(p1.x, p1.y, p2.x, p2.y).attr({
                stroke: 'white',
                strokeWidth:  Math.random()* 5
            })
        }

        for (let pts of arrCnt.values()) {
            let p1 = pts[0]
            let p2 = pts[1]
            line(p1,p2)
        }

        for(let i=0;i<q;i++){

        

            let trg = []
            for(let i=0;i<3;i++){
                let pt = arrCnt[rNF(arrCnt.length)]
                trg.push(pt)
            }

            let [Tp1,Tp2,Tp3] = [...trg]
            lo(Tp2)

            s1.paper.polygon(Tp1[0].x,Tp1[0].y,Tp2[0].x,Tp2[0].y,Tp3[0].x,Tp3[0].y).attr({
                fill:'black',
                strokeWidth: Math.random() * 3,
                stroke:'white',
                opacity:0.1
            })

        }

    }

    makeNet()

    




}