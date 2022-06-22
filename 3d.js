class Render {
    constructor(cameraPosition, renderPlane) {
        this.cameraPosition = cameraPosition
        this.renderPlane = renderPlane
    }

    calculatePoint(point) {
        let line = Line.createFromTwoPoints(this.cameraPosition, point)
        return Plane.intersectionWithLine(this.renderPlane, line)
    }

    renderPoint(point, rotation) {
        if (rotation) {
            point = Vector.fromMatrix(Matrix.multiply(rotation, Vector.toMatrix(point)))
            // console.table(point)
        }
        let intersection = this.calculatePoint(point)
        // console.table(intersection)
        // console.log("---------------------")
        ctx.beginPath()
        ctx.arc(intersection.x, intersection.y, 2, 0, 100)
        ctx.fill()
    }

    renderLine(line) {
        let point1 = line.getMultiple(0)
        let point2 = line.getMultiple(1)

        let intersection1 = this.calculatePoint(point1)
        let intersection2 = this.calculatePoint(point2)

        ctx.beginPath()
        ctx.moveTo(intersection1.x, intersection1.y)
        ctx.lineTo(intersection2.x, intersection2.y)
        ctx.stroke()
    }

    renderFace(center, width, height, rotation) {
        let points = []
        points.push(new Vector(center.x - width / 2, center.y + height / 2, center.z))
        points.push(new Vector(center.x + width / 2, center.y + height / 2, center.z))
        points.push(new Vector(center.x + width / 2, center.y - height / 2, center.z))
        points.push(new Vector(center.x - width / 2, center.y - height / 2, center.z))

        if (rotation) {
            for (let i = 0; i < points.length; i++) {
                points[i] = Vector.fromMatrix(Matrix.multiply(rotation, Vector.toMatrix(points[i])))
            }
        }

        for (let i = 0; i < points.length; i++) {
            this.renderPoint(points[i])
            this.renderLine(Line.createFromTwoPoints(points[i], points[i + 1 === points.length ? 0 : i + 1]))
        }
    }
}