class Matrix {
    constructor(n, m) {
        this.n = n
        this.m = m
        this.matrix = []
        for (let i = 0; i < n; i++) {
            this.matrix[i] = []
            for (let j = 0; j < m; j++) {
                this.matrix[i][j] = 0
            }
        }
    }

    static multiply(matrix1, matrix2) {
        if (matrix1.m !== matrix2.n) {
            throw new Error("Incorrect Dimesions")
        }
        let newMatrix = new Matrix(matrix1.n, matrix2.m)

        for (let matrix1row = 0; matrix1row < matrix1.n; matrix1row++) {
            for (let matrix2column = 0; matrix2column < matrix2.m; matrix2column++) {
                let total = 0
                for (let counter = 0; counter < matrix1.m; counter++) {
                    total += matrix1.matrix[matrix1row][counter] * matrix2.matrix[counter][matrix2column]
                }
                newMatrix.matrix[matrix1row][matrix2column] = total
            }
        }

        return newMatrix
    }
}

let test = () => {
    let matrix1 = new Matrix(3, 3)

    matrix1.matrix = [[1, 0, 0], [0, 1, 0], [0, 0, 1]]

    let matrix2 = new Matrix(3, 1)

    matrix2.matrix = [[1], [2], [3]]

    console.table(Matrix.multiply(matrix1, matrix2).matrix)
}
