

window.onload=()=>{
var inpArr = []

function createInp(id,max,min='1'){

    $('#inp_tb').append(`
        <tr>
            <td class="inp_value_td"><p class="inp_value">&nbsp</p></td>
            <td><input id="inp_${id}" name="${id}" type="range" value="1" min="1" max="${max}"
            min="${min}"></td>
            <td><p class="inp_desc">${id}</p></td>
        </tr>
    `)

    inpArr.push($(`#inp_${id}`))

}

let outPut = (x) => {
     let dataVal = []
     for (let value of x.values()) {
         dataVal.push(value.val)
     }
     //lo()
     return dataVal
}

function renderPer(fn,name) {
     let Inp_data = []
     for (let [i, inp] of inpArr.entries()) {
         Inp_data.push({
             name: inp.attr('name'),
             val: inp.val()
         })
     }
     $('#inp_box input').on('propertychange input', function (e) {

         for (let inp of Inp_data.values()) {
             if (e.target.name === inp.name) {
                 inp.val = e.target.value
                 e.target.parentNode.parentNode.firstElementChild.innerHTML = e.target.value
             }
         }
         // makePerspect(Inp_data)
         $('#show_title').text(`${name}`)
         lo(fn)
         fn(Inp_data)
     })
 }

 let t = (x, y) => {
     let m = new Snap.Matrix()
     m.translate(x, y)
     return m
 }


let rNF = (x) => {
    return Math.floor(Math.random() * x)
}

let rN = (x)=>{
    return (Math.random() * x) - x
}

let Rate = (x)=>{
    if(0<x && x<100){
        if (Math.random() * 100 < x) {
            return true
        }
    }else{
        return false
    }
    
}

let lo = (x) => {
    return console.log(x)
}

function pt() {
    let x = Math.random() * w;
    let y = Math.random() * h;
    let point = { x, y };
    return point
}



    const w = window.innerWidth;
    const h = window.innerHeight;

    var s1 = Snap('#svg1').attr({
        // width:w,
        // height:h,
        // viewBox:`${-0.2*w},${-0.2*h},${1.5*w},${1.5*h}`,
        preserveAspectRatio:"xMinYMid meet"

    })

    let light = () => {
        var graC = s1.paper.gradient("l(0, 1, 1, 1)black-#A6AEE5-black");
        return graC
    }

    // const colors = [
    //     '#061E48', '#243360', '#3D4979', '#576193', '#707AAE', '#8B93C9', '#A6AEE5', '#C2C9FF', '#DEE5FF', '#FBFFFF', light()
    // ]
    
    
    

    const colors = []
    const colors2 = []

    let pushColors = (arr,color,count)=>{
        for(let i=0;i<count;i++){
            arr.push(color)
        }
    }

   

    function makeDiamond() {
        var setMeetPoint = []
        const mP = 2000
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
                stroke: 'black',
                strokeWidth:  Math.random()* 0.5,

            })
        }

        // for (let pts of arrCnt.values()) {
        //     let p1 = pts[0]
        //     let p2 = pts[1]
        //     line(p1,p2)
        // }

        for(let i=0;i<mP*10;i++){



            let trg = []
            for(let i=0;i<3;i++){
                let pt = arrCnt[rNF(arrCnt.length)]
                trg.push(pt)
            }

            let [Tp1,Tp2,Tp3] = [...trg]

            

            s1.paper.polygon(Tp1[0].x,Tp1[0].y,Tp2[0].x,Tp2[0].y,Tp3[0].x,Tp3[0].y).attr({
                fill:colors[rNF(colors.length)],
                // fill:'none',
                strokeWidth: Math.random() * 3,
                // stroke:'red',
                mixBlendMode:'multiply',
                opacity:Math.random()
            })

        }

    }

   // makeDiamond()

function makeDynamicPoly(){
    let [a, b, c] = [pt(), pt(), pt()]
    s1.paper.polygon([a.x,a.y],[b.x,b.y],[c.x,c.y]).attr({
        fill:'blue',
        class:'dPoly'
    })

    anime({
        targets: '.dPoly',
        points:[
           {value:
               `${a.x-5100} ${a.y-5500} ${b.x-300} ${b.y-300} ${c.x-300} ${c.y-300}`
           }
        ],
        
        duration:1000,
        easing:'easeInQuad'
    })

}


//makeDynamicPoly()

function makeOwn(){

    let eyeUp = -200
    let eye = {x:100,y:100}
    let eyeWidth = 100
    let [a, b] = [[eye.x, eye.y], [eye.x + eyeWidth]]
    let c = 2* eyeWidth

    // M584.5, 351.5h483S831.5, 111.5, 584.5, 351.5Z
    
    let eyeG1 =  s1.paper.path(`M${a}h${b}S${c},${eye.y},${a}Z`).attr({
        class:'eyeL',
        strokeWidth:4,
        stroke:'white',
        fill:'none'
       
    }).toDefs()

    let eyeG2 = eyeG1.use().attr({
        transform:`translate(800,0) scale(-1,1)`
    }).toDefs()

    

    let face = s1.paper.circle(400, 100, 350).attr({
        strokeWidth: 4,
        stroke: 'white',
        fill: 'none'
    }).toDefs()

    let gE = s1.g(eyeG1, eyeG2,face).attr({
        transform: `translate(300,200) scale(0.3)`
    }).toDefs()

    
    for (let i=0;i<10;i++){
        let theGE = gE.use().attr({
            class:'gE'
        })
        
    }
    let discColor = s1.paper.gradient('l(0,0,0,1)black-red')
    let disc = s1.paper.circle(w/2,h/2,h/2).attr({
        fill: discColor,
        
    })

    let gEA = s1.selectAll('.gE')
    let discG = s1.g(disc,gEA).attr({
        class:'discG'
    })

    // .remove()

    

    anime({
        targets:'.eyeL',
        d: [
            { value: `M${a}h${b}S${c},${eyeUp},${a}Z`,duration:500,easing:'easeInQuad'},
            { value: `M${a}h${b}S${c},${eye.y},${a}Z`,delay:1500,duration: 300,easing:'easeInQuad' },
            { value: `M${a}h${b}S${c},${eyeUp},${a}Z`, duration: 300,easing:'easeInQuad' },
            { value: `M${a}h${b}S${c},${eye.y},${a}Z`, duration: 200,easing:'easeInQuad' },
        ],
        strokeWidth:[
            { value: '10', delay: 1500, duration: 300, easing: 'easeInQuad' },
            { value: '10', duration: 500, easing: 'easeInQuad' },
            { value: '10', duration: 300, easing: 'easeInQuad' },
            { value: '10', duration: 200, easing: 'easeInQuad' },
        ],
        
        easing:'easeInQuad',
        loop:true
    })

    anime.set('.gE',{
        rotate:function(el,i){
            return i * 36
        }
    })


    anime({
        targets:'.discG',
        rotate:'1turn',
        duration:10000,
        easing:'linear',
        loop:true
    })
   

    

}

//makeOwn()
    
function makeMix(matrixR,spc,changeR){
        let row = matrixR
        let space = spc
        let change = changeR
        let size = (horizen,vertical)=>{
            let r = [row / 2 - Math.abs(horizen - row / 2)] * change/2 + [row / 2 - Math.abs(vertical - row / 2)] * change/2
            return r
        }

         pushColors(colors,'red', 100)
         pushColors(colors,'blue', 40)
         pushColors(colors,'yellow', 5)
         pushColors(colors,'lightgreen', 1)
        
        for(let i=1;i<row;i++){
            for (let v = 1; v < row; v++) {
                s1.paper.circle(300 + 2 * space * i, 200 + v * 2 * space, size(i, v)).attr({
                    fill: colors[rNF(colors.length)],
                    opacity: rNF(10)*0.1,
                    class:'mixDots',
                    mixBlendMode: 'screen',
                    id:`x${i}y${v}`
                })
            }

        }

        s1.selectAll('.mixDots').forEach((element,index) => {
            let xy = element.node.id
            let color = element.attr('fill')
            strContent = xy
            var regexp2 = /\d+/g
            var xyNum = strContent.match(regexp2)
            let [x,y] = [xyNum[0],xyNum[1]]

            
            if(10<parseInt(x) && parseInt(x)<60 && 20<y && y<60){
                let getColor = ()=>{
                    pushColors(colors,'red',40)
                    pushColors(colors,'blue', 5)
                    pushColors(colors,'yellow', 1)
                    return colors[rNF(colors.length)]
                }
                $(`#x${x}y${y}`).attr({
                   fill: getColor()
                })
            }

            lo(color)
            if (color === 'rgb(144, 238, 144)') {
                element.attr({
                    r:r=+ 100,
                    fill:'red'
                })
            }

        });

        let mixSet = s1.g()
        mixSet.add(s1.selectAll('.mixDots')).toDefs()

        s1.use(mixSet).attr({
            mixBlendMode:'screen',
            transform:`scale(.7) transform(0,${h})`
        })

         s1.attr({
            // width:w,
            // height:h,
             viewBox: `0,${h*0.5},${w*4},${h*4}`,
            preserveAspectRatio: "xMidYMid meet"

        })
}

    // makeMix(100,25,1.5)
    
    
    // makeMix(20,25,5)

   

    function makePerspect(data){
        
        let [q, gQ, space, width, height, rotate] = outPut(data)
        s1.selectAll('#Rect_g1').remove()
       

        

        const colors = [
            'red','blue','lightgreen'
        ]

        let r1 = s1.paper.rect(100, 500, width, height).attr({
            //fill: colors[rNF(colors.length)],
            stroke: 'red',
            strokeWidth: 0,
            opacity: .7,
            class: `rPerc`,
            transform: `skewY(30) skewX(-45))`
        }).toDefs()

        
        let gRect = s1.paper.g().attr({
            id:'Rect_g1',
            mixBlendMode:'screen'
        })
        for(let i=0;i<gQ;i++){
            let rG = s1.paper.g()

            for (let i = 0; i < q; i++) {
                rG.add(s1.use(r1).transform(`${t(0,space*i)} rotate(${i*rotate})`).attr({
                    fill: colors[rNF(colors.length)]
                }))
            }
            gRect.add(rG.transform(`translate(${i * 30},0)`))
        }
        gRect.transform(`${t(400,0)}`).drag()

        
    }

    
    renderPer(
        makePerspect,
        'Matrix1',
        createInp('row', 50),
        createInp('vertical', 10),
        createInp('space', 20),
        createInp('width', w/2),
        createInp('height', w/4),
        createInp('rotate', 20,0)
    )

    // funDrag(document.getElementById('inp_box'))
    
    function makeDotted(data){
        s1.selectAll('#dotG').remove()
        let [width,space,size] = outPut(data)
        let mtx = []
        for(let x=0;x<width;x++){
            for(let y=0;y<width;y++){
                mtx.push({x:x*space,y:y*space})
            }
        }

        pushColors(colors,'blue',100)
        pushColors(colors,'red',200)
        pushColors(colors,'yellow', 10)

        

        let cir = s1.paper.circle(10,10, size).attr({
            class: 'dotCir_ori',
            
        }).toDefs()

         let g = s1.paper.g().add(s1.selectAll('dotCir')).attr({
             id: 'dotG',
             height: h
         }).drag()

        for(let dot of mtx.values()){
            let use = s1.paper.use(cir).transform(`${t(dot.x,dot.y)}`).attr({
                class: 'dotCir',
                fill: colors[rNF(colors.length)],
                opacity: .7,
            })

            if(Rate(50)){
                use.attr({
                    transform: t(dot.x+10, dot.y+10),
                    opacity: .9,
                })
            }


            if(Rate(50) && Rate(50)){
                let rSize = rNF(5)
                g.add(
                    s1.paper.circle(dot.x,dot.y,size*rSize).attr({
                    class: 'dotCir',
                    fill: 'orange',
                    opacity: .9,
                    })
                )
                if(Rate(50)){
                    pushColors(colors2,'blue',10)
                    pushColors(colors2, 'grey', 10)
                    pushColors(colors2, 'yellow', 10)
                    let ran = 10
                    for(let i=0;i<ran;i++){
                        g.add(
                            s1.paper.circle(dot.x, dot.y, size * rSize * 0.1*[ran-i]).attr({
                                class: 'dotCir',
                                fill: colors2[rNF(colors2.length)],
                                opacity: .9,
                            })
                        )
                    }

                }
            }

            g.add(use)
            
            
        }
       
    }

    
    // renderPer(
    //     makeDotted,
    //     'Dotted',
    //     createInp('x-y',50),
    //     createInp('space', 30),
    //     createInp('size', 30)
    // )



}
