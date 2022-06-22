class Vector {
    constructor(x, y, z) {
        this.x = x
        this.y = y
        this.z = z
    }

    add(v2) {
        this.x += v2.x
        this.y += v2.y
        this.z += v2.z
        return this
    }

    static add(v1, v2) {
        return new Vector(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z)
    }

    subtract(v2) {
        this.x -= v2.x
        this.y -= v2.y
        this.z -= v2.z
        return this
    }

    static subtract(v1, v2) {
        return new Vector(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z)
    }

    multiply(v2) {
        this.x *= v2.x
        this.y *= v2.y
        this.z *= v2.z
        return this
    }

    static multiply(v1, v2) {
        return new Vector(v1.x * v2.x, v1.y * v2.y, v1.z * v2.z)
    }

    divide(v2) {
        this.x /= v2.x
        this.y /= v2.y
        this.z /= v2.z
        return this
    }

    static divide(v1, v2) {
        return new Vector(v1.x / v2.x, v1.y / v2.y, v1.z / v2.z)
    }

    static dotProduct(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z
    }

    static crossProduct(v1, v2) {
        return new Vector(v1.y * v2.z - v1.z * v2.y, v1.z * v2.x - v1.x * v2.z, v1.x * v2.y - v1.y * v2.x)
    }

    static toMatrix(point) {
        let matrix = new Matrix(3, 1)
        matrix.matrix = [[point.x], [point.y], [point.z]]
        return matrix
    }

    static fromMatrix(matrix) {
        return new Vector(matrix.matrix[0][0], matrix.matrix[1][0], matrix.matrix[2][0])
    }
}

class Line {
    constructor(point, directionVector) {
        this.point = point
        this.directionVector = directionVector
    }

    static createFromTwoPoints(p1, p2) {
        return new Line(p1, Vector.subtract(p2, p1))
    }

    getMultiple(num) {
        return new Vector(this.point.x + this.directionVector.x * num, this.point.y + this.directionVector.y * num, this.point.z + this.directionVector.z * num)
    }
}

class Plane {
    constructor(point = new Vector(0, 0, 0), directionVector1 = new Vector(0, 0, 0), directionVector2 = new Vector(0, 0, 0)) {
        this.vector = { point, directionVector1, directionVector2 }

        this.cartesian = this.toCartesian(this.vector)
    }

    static createFromCartesian(x, y, z, d) {
        let plane = new Plane()
        plane.cartesian = { x, y, z, d }

        plane.vector = plane.toVector(plane.cartesian)
        return plane
    }

    toCartesian(vectorEquation) {
        let normal = Vector.crossProduct(vectorEquation.directionVector1, vectorEquation.directionVector2)
        return { x: normal.x, y: normal.y, z: normal.z, d: Vector.dotProduct(normal, vectorEquation.point) }
    }

    toVector(cartesianEquation) {
        let normal = new Vector(cartesianEquation.x, cartesianEquation.y, cartesianEquation.z)
        let directionVector1 = new Vector(1, 0, -(normal.x * 1 + normal.y * 0) / normal.z)
        let directionVector2 = new Vector(0, 1, -(normal.x * 0 + normal.y * 1) / normal.z)
        let point = new Vector(0, 0, cartesianEquation.d / cartesianEquation.z)
        return { point, directionVector1, directionVector2 }
    }

    static createFromPoints(p1, p2, p3) {
        let directionVector1 = Vector.subtract(p2, p1)
        let directionVector2 = Vector.subtract(p3, p1)
        return new Plane(p1, directionVector1, directionVector2)
    }

    static intersectionWithLine(plane, line) {
        let sumLeft = line.point.x * plane.cartesian.x + line.point.y * plane.cartesian.y + line.point.z * plane.cartesian.z
        let right = plane.cartesian.d - sumLeft
        let sumLeftLambda = line.directionVector.x * plane.cartesian.x + line.directionVector.y * plane.cartesian.y + line.directionVector.z * plane.cartesian.z
        let lambdaValue = right / sumLeftLambda
        // console.log(lambdaValue)
        return new Vector(line.point.x + lambdaValue * line.directionVector.x, line.point.y + lambdaValue * line.directionVector.y, line.point.z + lambdaValue * line.directionVector.z)
    }
}