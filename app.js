var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

ctx.translate(canvas.width / 2, canvas.height / 2);
// ctx.fillStyle = "#FF0000";
// ctx.fillRect(0, 0, 150, 75);

let cameraPosition = new Vector(0, 0, -1)
let renderPlane = new Plane(new Vector(0, 0, 0), new Vector(1, 0, 0), new Vector(0, 1, 0))

let render = new Render(cameraPosition, renderPlane)

let points = []

let currentAngle = 0

points.push([new Vector(200, 200, 0), new Vector(200, 300, 0)])
points.push([new Vector(200, 300, 0), new Vector(300, 300, 0)])
points.push([new Vector(300, 300, 0), new Vector(300, 200, 0)])
points.push([new Vector(200, 200, 0), new Vector(300, 200, 0)])

let point1 = new Vector(240, 240, 0)
let point2 = new Vector(240, 260, 0)

let toRad = deg => {
    return (2 * Math.PI) / 360 * deg
}

let position = new Vector(0, 0, 10)
let rotationMatrix2 = new Matrix(3, 3)
rotationMatrix2.matrix = [[1, 0, 0], [0, Math.cos(toRad(45)), -Math.sin(toRad(45))], [0, Math.sin(toRad(45)), Math.cos(toRad(45))]]
cameraPosition = Vector.fromMatrix(Matrix.multiply(rotationMatrix2, Vector.toMatrix(cameraPosition)))

let r = () => {
    ctx.clearRect(-canvas.clientWidth, -canvas.clientHeight, canvas.clientWidth * 2, canvas.clientHeight * 2)
    // render.renderLine(Line.createFromTwoPoints(new Vector(0, 0, 0), new Vector(500, 0, 0)))

    let rotationMatrix = new Matrix(3, 3)
    rotationMatrix.matrix = [[1, 0, 0], [0, 1, 0], [0, 0, 1]]

    // rotationMatrix.matrix = [[1, 0, 0], [0, Math.cos(toRad(currentAngle)), -Math.sin(toRad(currentAngle))], [0, Math.sin(toRad(currentAngle)), Math.cos(toRad(currentAngle))]]
    // console.table(rotationMatrix.matrix) 
    rotationMatrix.matrix = [[Math.cos(toRad(currentAngle)), 0, Math.sin(toRad(currentAngle))], [0, 1, 0], [-Math.sin(toRad(currentAngle)), 0, Math.cos(toRad(currentAngle))]]
    // rotationMatrix.matrix = [[Math.cos(toRad(currentAngle)), -Math.sin(toRad(currentAngle)), 0], [Math.sin(toRad(currentAngle)), Math.cos(toRad(currentAngle)), 0], [0, 0, 1]]

    // render.renderFace(position, 100, 100, rotationMatrix)
    ctx.fillStyle = "#000000";
    render.renderPoint(new Vector(10, 0, 0))
    ctx.fillStyle = "#FF0000";
    render.renderPoint(new Vector(10, 0, 0), rotationMatrix)

    render.renderLine(Line.createFromTwoPoints(new Vector(-100, 0, 0), new Vector(100, 0, 0)))
    render.renderLine(Line.createFromTwoPoints(new Vector(0, -100, 0), new Vector(0, 100, 0)))
    render.renderLine(Line.createFromTwoPoints(new Vector(0, 0, 0), new Vector(0, 0, 100)))
    // render.renderFace(position, 1000, 1000, rotationMatrix)
    // render.renderPoint(new Vector(0, 0, 0))
}

r()

canvas.addEventListener("mousewheel", e => {
    // cameraPosition.z += e.deltaY * -0.1
    currentAngle += e.deltaY * -0.1
    console.log(currentAngle)
    r()
})

document.addEventListener("keydown", e => {
    if (e.key.toLowerCase() === "w") {
        position.z += 1
    } else if (e.key.toLowerCase() === "s") {
        position.z -= 1
    } else if (e.key.toLowerCase() === "a") {
        position.x -= 10
    } else if (e.key.toLowerCase() === "d") {
        position.x += 10
    } else if (e.key.toLowerCase() === "e") {
        position.y -= 10
    } else if (e.key.toLowerCase() === "q") {
        position.y += 10
    }
    r()
})


// let repeat = 0

// let interval = setInterval(() => {
//     if (repeat < 361) {
//         // ctx.clearRect(0, 0, canvas.width, canvas.height);
//         r()
//         currentAngle++
//         repeat += 1
//     } else {
//         clearInterval(interval)
//     }
// }, 100)